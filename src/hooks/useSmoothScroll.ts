
import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Handle hash navigation
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    };
    
    window.addEventListener("load", handleHashNavigation);
    
    return () => {
      window.removeEventListener("load", handleHashNavigation);
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);
};
