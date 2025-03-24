
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/ui/ThemeProvider";

const AnimatedJMRLogo = ({ size = 40 }: { size?: number }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [animated, setAnimated] = useState(false);
  
  // Handle 3D mouse movement effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Calculate the rotation based on mouse position
      const rotateY = ((mouseX - centerX) / (rect.width / 2)) * 15;
      const rotateX = ((centerY - mouseY) / (rect.height / 2)) * 15;
      
      setRotateX(rotateX);
      setRotateY(rotateY);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Animation effects
  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll(".logo-path");
    const container = containerRef.current;
    
    setAnimated(false);
    
    if (paths && container) {
      // Reset all animations
      paths.forEach(path => {
        (path as SVGPathElement).style.filter = "none";
        path.getAnimations().forEach(anim => anim.cancel());
      });
      
      container.getAnimations().forEach(anim => anim.cancel());
      
      // Initial reveal animation
      container.animate(
        [
          { opacity: 0, transform: 'scale(0.8) translateZ(-100px)' },
          { opacity: 1, transform: 'scale(1) translateZ(0)' }
        ],
        {
          duration: 1200,
          fill: "forwards",
          easing: "cubic-bezier(0.34, 1.56, 0.64, 1)"
        }
      );
      
      // Sequential path animations with enhanced 3D effects
      paths.forEach((path, index) => {
        const length = (path as SVGPathElement).getTotalLength();
        
        // Reset path
        (path as SVGPathElement).style.strokeDasharray = `${length}`;
        (path as SVGPathElement).style.strokeDashoffset = `${length}`;
        
        // Drawing animation
        const drawAnimation = path.animate(
          [
            { 
              strokeDashoffset: length, 
              stroke: theme === 'dark' ? '#f97316' : '#ea580c',
              transform: 'translateZ(-20px)'
            },
            { 
              strokeDashoffset: 0, 
              stroke: theme === 'dark' ? '#f97316' : '#ea580c',
              transform: 'translateZ(20px)'
            }
          ],
          {
            duration: 1200,
            delay: index * 200,
            fill: "forwards",
            easing: "cubic-bezier(0.17, 0.67, 0.83, 0.67)"
          }
        );
        
        // Add effects after the path is drawn
        drawAnimation.onfinish = () => {
          // Apply orange incredible glow effect
          (path as SVGPathElement).style.filter = theme === 'dark' 
            ? "drop-shadow(0 0 6px rgba(249, 115, 22, 0.9))" 
            : "drop-shadow(0 0 6px rgba(234, 88, 12, 0.9))";
          
          // 3D extrusion effect with pulsing
          path.animate(
            [
              { 
                transform: 'translateZ(15px)', 
                filter: theme === 'dark' 
                  ? 'drop-shadow(0 0 4px rgba(249, 115, 22, 0.8))' 
                  : 'drop-shadow(0 0 4px rgba(234, 88, 12, 0.8))'
              },
              { 
                transform: 'translateZ(30px)', 
                filter: theme === 'dark' 
                  ? 'drop-shadow(0 0 10px rgba(249, 115, 22, 1))' 
                  : 'drop-shadow(0 0 10px rgba(234, 88, 12, 1))'
              },
              { 
                transform: 'translateZ(15px)', 
                filter: theme === 'dark' 
                  ? 'drop-shadow(0 0 4px rgba(249, 115, 22, 0.8))' 
                  : 'drop-shadow(0 0 4px rgba(234, 88, 12, 0.8))'
              }
            ],
            {
              duration: 3000,
              iterations: Infinity,
              easing: "ease-in-out"
            }
          );
        };
      });
      
      setAnimated(true);
    }
  }, [theme]);
  
  return (
    <div 
      ref={containerRef}
      className="relative flex items-center justify-center overflow-visible"
      style={{ 
        width: size, 
        height: size, 
        perspective: '800px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* 3D floating element with mouse-based rotation */}
      <div 
        className="w-full h-full flex items-center justify-center transition-transform duration-300"
        style={{ 
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Orange glow backdrop - "Incredibles" style */}
        <div 
          className="absolute rounded-full incredible-gradient opacity-70"
          style={{ 
            width: size * 0.85, 
            height: size * 0.85,
            filter: 'blur(15px)',
            transform: 'translateZ(-20px)'
          }}
        />
        
        {/* Main SVG logo */}
        <svg 
          ref={svgRef}
          width={size} 
          height={size} 
          viewBox="0 0 120 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="relative"
          style={{ transform: 'translateZ(10px)' }}
        >
          {/* Background gradient circle */}
          <circle 
            cx="65" 
            cy="50" 
            r="42" 
            className="incredible-gradient opacity-20"
          />
          
          {/* J letter */}
          <path 
            d="M25 20V65C25 73 30 80 40 80H50" 
            stroke="#ea580c"
            strokeWidth="6" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="logo-path"
          />
          
          {/* M letter */}
          <path 
            d="M45 80V40M45 40L60 65L75 40M75 40V80" 
            stroke="#ea580c"
            strokeWidth="6" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="logo-path"
          />
          
          {/* R letter */}
          <path 
            d="M80 20H95C106 20 115 29 115 40C115 51 106 60 95 60H80V20Z" 
            stroke="#ea580c"
            strokeWidth="6" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="logo-path"
          />
          <path 
            d="M95 60L115 80" 
            stroke="#ea580c"
            strokeWidth="6" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="logo-path"
          />
          
          {/* Decorative elements - more Incredibles style */}
          <circle 
            cx="65" 
            cy="50" 
            r="44" 
            stroke="#f97316" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeDasharray="2 6"
            opacity="0.6"
          />
          
          {/* Cardinal points with Incredibles glow */}
          <circle cx="65" cy="6" r="3" fill="#f97316" className="animate-pulse-slow">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="109" cy="50" r="3" fill="#f97316" className="animate-pulse-slow">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" begin="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="65" cy="94" r="3" fill="#f97316" className="animate-pulse-slow">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" begin="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="21" cy="50" r="3" fill="#f97316" className="animate-pulse-slow">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" begin="3s" repeatCount="indefinite" />
          </circle>
          
          {/* Energy burst effect - Incredibles style */}
          <circle cx="65" cy="50" r="0" fill="url(#burstGradient)" opacity="0">
            <animate 
              attributeName="r" 
              values="0;70;0" 
              dur="5s" 
              begin="0.5s"
              repeatCount="indefinite" 
            />
            <animate 
              attributeName="opacity" 
              values="0;0.6;0" 
              dur="5s"
              begin="0.5s" 
              repeatCount="indefinite" 
            />
          </circle>
          
          {/* Incredibles-style gradient definitions */}
          <defs>
            <radialGradient id="burstGradient" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default AnimatedJMRLogo;
