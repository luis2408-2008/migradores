import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import CountriesPage from "@/pages/countries-page";
import CountriesSearchPage from "@/pages/countries-search-page";
import CountryDetailPage from "@/pages/country-detail-page";
import ResourcesPage from "@/pages/resources-page";
import CommunityPage from "@/pages/community-page";
import HelpPage from "@/pages/help-page";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/paises" component={CountriesPage} />
      <Route path="/paises/buscar" component={CountriesSearchPage} />
      <Route path="/paises/:id" component={CountryDetailPage} />
      <Route path="/recursos" component={ResourcesPage} />
      <ProtectedRoute path="/comunidad" component={CommunityPage} />
      <Route path="/ayuda" component={HelpPage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="migraguia-theme">
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Router />
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
