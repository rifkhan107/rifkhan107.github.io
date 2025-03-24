
import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ui/ThemeProvider";

const AnimatedRMLogo = ({ size = 40 }: { size?: number }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll("path");
    
    if (paths) {
      paths.forEach((path, index) => {
        const length = path.getTotalLength();
        
        // Reset path
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
        
        // Animate path
        path.animate(
          [
            { strokeDashoffset: length },
            { strokeDashoffset: 0 }
          ],
          {
            duration: 1500,
            delay: index * 150,
            fill: "forwards",
            easing: "cubic-bezier(0.4, 0, 0.2, 1)"
          }
        );
      });
    }
  }, [theme]);
  
  return (
    <svg 
      ref={svgRef}
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="transition-colors duration-300"
    >
      {/* R letter */}
      <path 
        d="M30 20H50C61 20 70 29 70 40C70 51 61 60 50 60H30V20Z" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
        className="text-rifkhan"
      />
      <path 
        d="M50 60L70 80" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="text-rifkhan"
      />
      
      {/* M letter */}
      <path 
        d="M30 80V40M30 40L50 65L70 40M70 40V80" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="text-rifkhan"
      />
      
      {/* Decorative circle */}
      <circle 
        cx="50" 
        cy="50" 
        r="40" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeDasharray="6 4"
        className="text-foreground/30"
      />
    </svg>
  );
};

export default AnimatedRMLogo;