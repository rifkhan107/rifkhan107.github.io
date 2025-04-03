
import { useTheme } from "@/components/ui/ThemeProvider";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, LogOut, Home } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const AdminHeader = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentUser = authService.getCurrentUser();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  const handleLogout = () => {
    authService.logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };
  
  const handleGoHome = () => {
    navigate("/");
  };
  
  const userInitials = currentUser?.name 
    ? currentUser.name.split(" ").map(n => n[0]).join("").toUpperCase()
    : "U";
  
  return (
    <header className="bg-background/95 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleGoHome}>
            <Home className="h-5 w-5" />
            <span className="sr-only">Go to homepage</span>
          </Button>
          <h1 className="text-lg font-medium">Admin Portal</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentUser?.avatarUrl} alt={currentUser?.name || "User"} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <span className="hidden md:inline-block font-medium">
              {currentUser?.name || "User"}
            </span>
          </div>
          
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Log out</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
