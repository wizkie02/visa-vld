import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { User as SelectUser, InsertUser, LoginData } from "@shared/schema";
import { queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  user: SelectUser | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<{ user: SelectUser; token: string }, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<{ user: SelectUser; token: string }, Error, InsertUser>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

// Token management functions
const TOKEN_KEY = 'auth-token';

function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

// API request function with Authorization header
async function apiRequestWithAuth(method: string, url: string, data?: any) {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(errorData.message || `HTTP ${response.status}`);
  }

  return response;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentUser, setCurrentUser] = useState<SelectUser | null>(null);
  
  const {
    data: user,
    error,
    isLoading,
    refetch,
  } = useQuery<SelectUser | null, Error>({
    queryKey: ["/api/user"],
    queryFn: async () => {
      try {
        const res = await apiRequestWithAuth("GET", "/api/user");
        const userData = await res.json();
        setCurrentUser(userData);
        return userData;
      } catch (error: any) {
        if (error.message.includes('401') || error.message.includes('Unauthorized')) {
          removeToken(); // Clear invalid token
          setCurrentUser(null);
          return null;
        }
        throw error;
      }
    },
    enabled: isInitialized,
    retry: false,
  });

  // Initialize auth state
  useEffect(() => {
    setIsInitialized(true);
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequestWithAuth("POST", "/api/login", credentials);
      return await res.json();
    },
    onSuccess: (data: { user: SelectUser; token: string }) => {
      setToken(data.token);
      setCurrentUser(data.user);
      queryClient.setQueryData(["/api/user"], data.user);
      refetch(); // Force a refetch to ensure state consistency
      toast({
        title: "Login successful",
        description: `Welcome back, ${data.user.username}!`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (credentials: InsertUser) => {
      const res = await apiRequestWithAuth("POST", "/api/register", credentials);
      return await res.json();
    },
    onSuccess: (data: { user: SelectUser; token: string }) => {
      setToken(data.token);
      setCurrentUser(data.user);
      queryClient.setQueryData(["/api/user"], data.user);
      refetch(); // Force a refetch to ensure state consistency
      toast({
        title: "Registration successful",
        description: `Welcome, ${data.user.username}!`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequestWithAuth("POST", "/api/logout");
    },
    onSuccess: () => {
      removeToken();
      setCurrentUser(null);
      queryClient.setQueryData(["/api/user"], null);
      queryClient.clear(); // Clear all cached data
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    },
    onError: (error: Error) => {
      // Even if logout fails on server, clear local token
      removeToken();
      setCurrentUser(null);
      queryClient.setQueryData(["/api/user"], null);
      queryClient.clear();
      toast({
        title: "Logged out",
        description: "You have been logged out.",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: currentUser ?? user ?? null,
        isLoading: !isInitialized || isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useNewAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useNewAuth must be used within an AuthProvider");
  }
  return context;
}