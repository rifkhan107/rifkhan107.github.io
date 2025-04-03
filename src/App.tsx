
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Analytics from "./components/Analytics";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import { authService } from "./services/authService";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ 
  element, 
  requiredRole,
}: { 
  element: React.ReactNode; 
  requiredRole?: string;
}) => {
  const isLoggedIn = authService.isLoggedIn();
  const userRole = authService.getCurrentUserRole();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return <>{element}</>;
};

const App = () => {
  const [showAnalytics, setShowAnalytics] = useState(false);

  const openAdminAnalytics = () => {
    setShowAnalytics(true);
  };

  const closeAdminAnalytics = () => {
    setShowAnalytics(false);
  };

  useEffect(() => {
    // Check authentication status on app load
    const isLoggedIn = authService.isLoggedIn();
    console.log("Authentication status:", isLoggedIn ? "Logged in" : "Not logged in");
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
            <Route path="/login" element={<Login />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute 
                  element={<AdminDashboard />} 
                  requiredRole="admin"
                />
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
