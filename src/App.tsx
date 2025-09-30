import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TravelerSignUp from "./pages/TravelerSignUp";
import AuthoritySignUp from "./pages/AuthoritySignUp";
import TravelerLogin from "./pages/TravelerLogin";
import AuthorityLogin from "./pages/AuthorityLogin";
import TravelerDashboard from "./pages/TravelerDashboard";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/traveler-signup" element={<TravelerSignUp />} />
          <Route path="/authority-signup" element={<AuthoritySignUp />} />
          <Route path="/traveler-login" element={<TravelerLogin />} />
          <Route path="/authority-login" element={<AuthorityLogin />} />
          <Route path="/traveler-dashboard" element={<TravelerDashboard />} />
          <Route path="/authority-dashboard" element={<AuthorityDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
