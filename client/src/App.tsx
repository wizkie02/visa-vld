import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import PersistentLanguageSelector from "@/components/persistent-language-selector";
import ErrorBoundary from "@/components/error-boundary";
import Home from "@/pages/home";
import About from "@/pages/about";
import Validation from "@/pages/validation";
import Results from "@/pages/results";
import NotFound from "@/pages/not-found";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import Contact from "@/pages/contact";
import Landing from "@/pages/landing";
import AuthPage from "@/pages/auth";
import AdminPanel from "@/pages/admin";

function Router() {
  const { isAuthenticated, isLoading, error } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
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
      {!isAuthenticated ? (
        <>
          <Route path="/" component={() => <SafeComponent Component={Landing} />} />
          <Route path="/auth" component={() => <SafeComponent Component={AuthPage} />} />
          <Route path="/about" component={() => <SafeComponent Component={About} />} />
          <Route path="/privacy-policy" component={() => <SafeComponent Component={PrivacyPolicy} />} />
          <Route path="/terms-of-service" component={() => <SafeComponent Component={TermsOfService} />} />
          <Route path="/contact" component={() => <SafeComponent Component={Contact} />} />
          <Route path="/:rest*" component={() => <SafeComponent Component={AuthPage} />} />
        </>
      ) : (
        <>
          <Route path="/" component={() => <SafeComponent Component={Home} />} />
          <Route path="/admin" component={() => <SafeComponent Component={AdminPanel} />} />
          <Route path="/validate" component={() => <SafeComponent Component={Validation} />} />
          <Route path="/results/:sessionId" component={() => <SafeComponent Component={Results} />} />
          <Route path="/about" component={() => <SafeComponent Component={About} />} />
          <Route path="/privacy-policy" component={() => <SafeComponent Component={PrivacyPolicy} />} />
          <Route path="/terms-of-service" component={() => <SafeComponent Component={TermsOfService} />} />
          <Route path="/contact" component={() => <SafeComponent Component={Contact} />} />
          <Route path="/auth" component={() => <SafeComponent Component={Home} />} />
          <Route path="/:rest*" component={() => <SafeComponent Component={NotFound} />} />
        </>
      )}
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
