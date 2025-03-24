
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
      {/* J letter */}
      <path 
        d="M25 20H45M35 20V65C35 72.5 30 80 20 80" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="text-rifkhan"
      />
      
      {/* M letter */}
      <path 
        d="M50 80V40M50 40L65 60L80 40M80 40V80" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="text-rifkhan"
      />
      
      {/* R letter */}
      <path 
        d="M80 20H100C105 20 110 25 110 30C110 35 105 40 100 40H80V20Z" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
        className="text-rifkhan"
      />
      <path 
        d="M95 40L110 60" 
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
