
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Analytics from "./components/Analytics";
import { analyticsService } from "./services/analyticsService";

const queryClient = new QueryClient();

const App = () => {
  const [showAnalytics, setShowAnalytics] = useState(false);

  const openAdminAnalytics = () => {
    setShowAnalytics(true);
  };

  const closeAdminAnalytics = () => {
    setShowAnalytics(false);
  };

  useEffect(() => {
    // Initialize analytics service
    analyticsService.init();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showAnalytics && <Analytics onClose={closeAdminAnalytics} />}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index openAdminAnalytics={openAdminAnalytics} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
