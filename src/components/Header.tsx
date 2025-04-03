
import { useState, useEffect } from "react";
import { useTheme } from "@/components/ui/ThemeProvider";
import { cn } from "@/lib/utils";
import { Moon, Sun, Menu, X, Lock, User, LogIn, ChevronDown } from "lucide-react";
import AnimatedRMLogo from "./ui/AnimatedRMLogo";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  openAdminAnalytics?: () => void;
}

const Header = ({ openAdminAnalytics }: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isLoggedIn = authService.isLoggedIn();
  const currentUser = authService.getCurrentUser();
  const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleAdminClick = () => {
    if (openAdminAnalytics) {
      openAdminAnalytics();
    } else {
      toast({
        title: "Admin Analytics",
        description: "Analytics functionality is not available",
        duration: 3000,
      });
    }
  };
  
  const handleLogin = () => {
    navigate("/login");
  };
  
  const handleLogout = () => {
    authService.logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };
  
  const handleAdminDashboard = () => {
    navigate("/admin");
  };
  
  const userInitials = currentUser?.name 
    ? currentUser.name.split(" ").map(n => n[0]).join("").toUpperCase()
    : "U";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled
          ? "backdrop-blur-lg bg-white/70 dark:bg-black/30 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a
          href="#home"
          className="text-xl font-medium text-foreground flex items-center space-x-2"
        >
          <AnimatedRMLogo size={70} />
          <span className="hidden sm:inline-block font-rockybilly text-5xl">Mohamed Rifkhan</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {["About", "Experience", "Skills", "Blog", "Contact"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-foreground/80 hover:text-rifkhan transition-colors relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rifkhan transition-all duration-300 group-hover:w-full"></span>
              </a>
            )
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser?.avatarUrl} alt={currentUser?.name || "User"} />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{currentUser?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin && (
                  <>
                    <DropdownMenuItem onClick={handleAdminDashboard}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleAdminClick}>
                      <Lock className="mr-2 h-4 w-4" />
                      <span>Analytics</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem onClick={handleLogout}>
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={handleLogin}
              variant="ghost"
              className="hidden sm:flex"
              size="sm"
            >
              <LogIn className="h-4 w-4 mr-2" /> Login
            </Button>
          )}
          
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 hover:bg-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden rounded-full p-2 hover:bg-accent transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 backdrop-blur-lg bg-white/90 dark:bg-black/90 border-t border-border animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {["About", "Experience", "Skills", "Blog", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-foreground/80 hover:text-rifkhan transition-colors py-2"
                  onClick={toggleMobileMenu}
                >
                  {item}
                </a>
              )
            )}
            {!isLoggedIn ? (
              <Button
                onClick={handleLogin}
                variant="outline"
                className="mt-2"
                size="sm"
              >
                <LogIn className="h-4 w-4 mr-2" /> Login
              </Button>
            ) : (
              <>
                {isAdmin && (
                  <>
                    <Button
                      onClick={handleAdminDashboard}
                      variant="outline"
                      className="mt-2"
                      size="sm"
                    >
                      <User className="h-4 w-4 mr-2" /> Admin Dashboard
                    </Button>
                    <Button
                      onClick={handleAdminClick}
                      variant="outline"
                      className="mt-2"
                      size="sm"
                    >
                      <Lock className="h-4 w-4 mr-2" /> Analytics
                    </Button>
                  </>
                )}
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="mt-2"
                  size="sm"
                >
                  <LogIn className="h-4 w-4 mr-2" /> Logout
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
