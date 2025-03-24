
import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ui/ThemeProvider";

const AnimatedRMLogo = ({ size = 40 }: { size?: number }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
        
        // Add subtle glow after drawing
        setTimeout(() => {
          const color = theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(30, 144, 255, 0.7)';
          path.style.filter = `drop-shadow(0 0 2px ${color})`;
        }, 1500 + (index * 150));
      });
    }
  }, [theme]);
  
  return (
    <div 
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{ 
        width: size, 
        height: size, 
        perspective: '500px',
      }}
    >
      <svg 
        ref={svgRef}
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transition-colors duration-300"
        style={{ transform: 'rotateY(10deg) rotateX(5deg)', transformStyle: 'preserve-3d' }}
      >
        {/* R letter */}
        <path 
          d="M25 20H45C56 20 65 29 65 40C65 51 56 60 45 60H25V20Z" 
          stroke={theme === 'dark' ? 'white' : '#1E90FF'} 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="none"
        />
        <path 
          d="M45 60L65 80" 
          stroke={theme === 'dark' ? 'white' : '#1E90FF'} 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        {/* M letter */}
        <path 
          d="M50 80V40M50 40L65 60L80 40M80 40V80" 
          stroke={theme === 'dark' ? 'white' : '#1E90FF'} 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        {/* Decorative circle */}
        <circle 
          cx="50" 
          cy="50" 
          r="40" 
          stroke={theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(30, 144, 255, 0.3)'} 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeDasharray="6 4"
        />
      </svg>
    </div>
  );
};

export default AnimatedRMLogo;
