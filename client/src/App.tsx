import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import PersistentLanguageSelector from "@/components/persistent-language-selector";
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
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <Switch>
      {!isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/about" component={About} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/terms-of-service" component={TermsOfService} />
          <Route path="/contact" component={Contact} />
          <Route path="/:rest*" component={AuthPage} />
        </>
      ) : (
        <>
          <Route path="/" component={Home} />
          <Route path="/admin" component={AdminPanel} />
          <Route path="/validate" component={Validation} />
          <Route path="/results/:sessionId" component={Results} />
          <Route path="/about" component={About} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/terms-of-service" component={TermsOfService} />
          <Route path="/contact" component={Contact} />
          <Route path="/auth" component={Home} />
          <Route path="/:rest*" component={NotFound} />
        </>
      )}
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <div className="fixed top-4 left-4 z-50">
            <PersistentLanguageSelector />
          </div>
          <Router />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
