
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Analytics from "./components/Analytics";

const queryClient = new QueryClient();

const App = () => {
  const [showAnalytics, setShowAnalytics] = useState(false);

  const openAdminAnalytics = () => {
    setShowAnalytics(true);
  };

  const closeAdminAnalytics = () => {
    setShowAnalytics(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showAnalytics && <Analytics onClose={closeAdminAnalytics} />}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index openAdminAnalytics={openAdminAnalytics} />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
