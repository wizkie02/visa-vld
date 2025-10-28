import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useNewAuth, AuthProvider } from "@/hooks/use-new-auth";
import PersistentLanguageSelector from "@/components/persistent-language-selector";
import ErrorBoundary from "@/components/error-boundary";
import LoadingSpinner from "@/components/loading-spinner";
import Home from "@/pages/home";
import About from "@/pages/about";
import Validation from "@/pages/validation";
import Results from "@/pages/results";
import Documents from "@/pages/documents";
import NotFound from "@/pages/not-found";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import Contact from "@/pages/contact";
import AuthPage from "@/pages/auth-clean";
import AdminPanel from "@/pages/admin";

function Router() {
  const { user, isLoading, error } = useNewAuth();
  const isAuthenticated = !!user;

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="text-center max-w-md mx-auto px-4">
          {/* Logo/Brand area */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">VisaValidator Pro</h1>
            <p className="text-gray-600 text-sm">Professional Visa Document Validation</p>
          </div>

          {/* Enhanced Loading Spinner */}
          <LoadingSpinner
            size="lg"
            text="Initializing your experience..."
            className="mb-8"
          />

          {/* Loading Features */}
          <div className="space-y-3 text-left bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Secure authentication system</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
              <span className="text-sm text-gray-600">AI-powered document analysis</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
              <span className="text-sm text-gray-600">Global visa requirements database</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-6 animate-pulse">
            Preparing your secure validation environment...
          </p>
        </div>
      </div>
    );
  }

  // Show error state with fallback to landing page
  if (error) {
    console.error("Auth error:", error);
  }

  // Fallback component for unhandled states
  const SafeComponent = ({ Component }: { Component: React.ComponentType }) => {
    try {
      return <Component />;
    } catch (error) {
      console.error('Component render error:', error);
      return (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h1>
            <p className="text-gray-600">Please wait while we prepare your experience.</p>
          </div>
        </div>
      );
    }
  };

  return (
    <Switch>
      {/* Common routes for both authenticated and unauthenticated users */}
      <Route path="/" component={() => <SafeComponent Component={Home} />} />
      <Route path="/about" component={() => <SafeComponent Component={About} />} />
      <Route path="/privacy-policy" component={() => <SafeComponent Component={PrivacyPolicy} />} />
      <Route path="/terms-of-service" component={() => <SafeComponent Component={TermsOfService} />} />
      <Route path="/contact" component={() => <SafeComponent Component={Contact} />} />

      {/* Authentication routes */}
      <Route path="/auth" component={() => <SafeComponent Component={AuthPage} />} />

      {/* Protected routes - only for authenticated users */}
      {isAuthenticated && (
        <>
          <Route path="/admin" component={() => <SafeComponent Component={AdminPanel} />} />
          <Route path="/documents" component={() => <SafeComponent Component={Documents} />} />
          <Route path="/validation" component={() => <SafeComponent Component={Validation} />} />
          <Route path="/results/:sessionId" component={() => <SafeComponent Component={Results} />} />
        </>
      )}

      {/* Fallback routes */}
      <Route path="/:rest*" component={() => <SafeComponent Component={isAuthenticated ? NotFound : AuthPage} />} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <ErrorBoundary>
            <div className="min-h-screen bg-background">
              <div className="fixed top-4 left-4 z-50">
                <PersistentLanguageSelector />
              </div>
              <Router />
            </div>
            <Toaster />
          </ErrorBoundary>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
