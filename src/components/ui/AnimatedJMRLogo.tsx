
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/ui/ThemeProvider";

// Particle component for background effects
const Particles = ({ count = 20 }: { count?: number }) => {
  const particles = [];
  
  for (let i = 0; i < count; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const scale = 0.2 + Math.random() * 0.8;
    const duration = 3 + Math.random() * 7;
    const delay = Math.random() * 5;
    
    particles.push(
      <div 
        key={i}
        className="absolute rounded-full bg-rifkhan/40"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: `${scale * 6}px`,
          height: `${scale * 6}px`,
          opacity: 0,
          animation: `particle ${duration}s infinite ${delay}s`
        }}
      />
    );
  }
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>
        {`
        @keyframes particle {
          0% { 
            transform: translate(0, 0) scale(0); 
            opacity: 0;
          }
          20% { 
            opacity: 0.8;
          }
          100% { 
            transform: translate(${Math.random() > 0.5 ? '-' : ''}${10 + Math.random() * 20}px, 
                               ${Math.random() > 0.5 ? '-' : ''}${10 + Math.random() * 20}px) 
                               scale(0);
            opacity: 0;
          }
        }
        `}
      </style>
      {particles}
    </div>
  );
};

const AnimatedJMRLogo = ({ size = 40 }: { size?: number }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const circleRef = useRef<SVGGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll(".logo-path");
    const circle = circleRef.current;
    const container = containerRef.current;
    const outerRing = outerRingRef.current;
    
    setAnimated(false);
    
    if (paths && circle && container && outerRing) {
      // Reset all animations
      paths.forEach(path => {
        (path as SVGPathElement).style.filter = "none";
        path.getAnimations().forEach(anim => anim.cancel());
      });
      
      circle.getAnimations().forEach(anim => anim.cancel());
      container.getAnimations().forEach(anim => anim.cancel());
      outerRing.getAnimations().forEach(anim => anim.cancel());
      
      // Initial reveal animation for the container
      container.animate(
        [
          { opacity: 0, transform: 'scale(0.8)' },
          { opacity: 1, transform: 'scale(1)' }
        ],
        {
          duration: 800,
          fill: "forwards",
          easing: "cubic-bezier(0.34, 1.56, 0.64, 1)"
        }
      );
      
      // Floating animation for the entire logo
      container.animate(
        [
          { transform: 'translateY(0px)' },
          { transform: 'translateY(-6px)' },
          { transform: 'translateY(0px)' }
        ],
        {
          duration: 6000,
          iterations: Infinity,
          easing: "ease-in-out"
        }
      );
      
      // Animate the inner circle with rotation
      circle.animate(
        [
          { transform: 'rotate(0deg)' },
          { transform: 'rotate(360deg)' }
        ],
        {
          duration: 20000,
          iterations: Infinity,
          easing: 'linear'
        }
      );
      
      // Animate the outer ring with reverse rotation and pulse
      outerRing.animate(
        [
          { transform: 'rotate(0deg) scale(1)', opacity: 0.7 },
          { transform: 'rotate(-180deg) scale(1.05)', opacity: 1 },
          { transform: 'rotate(-360deg) scale(1)', opacity: 0.7 }
        ],
        {
          duration: 15000,
          iterations: Infinity,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }
      );
      
      // Sequential path animations with enhanced effects
      paths.forEach((path, index) => {
        const length = (path as SVGPathElement).getTotalLength();
        
        // Reset path
        (path as SVGPathElement).style.strokeDasharray = `${length}`;
        (path as SVGPathElement).style.strokeDashoffset = `${length}`;
        (path as SVGPathElement).style.opacity = "0";
        
        // Path opacity animation
        path.animate(
          [
            { opacity: 0 },
            { opacity: 1 }
          ],
          {
            duration: 500,
            delay: index * 150,
            fill: "forwards",
            easing: "ease-out"
          }
        );
        
        // Initial drawing animation
        const drawAnimation = path.animate(
          [
            { strokeDashoffset: length, stroke: '#2563EB' },
            { strokeDashoffset: 0, stroke: '#3B82F6' }
          ],
          {
            duration: 1800,
            delay: index * 150,
            fill: "forwards",
            easing: "cubic-bezier(0.34, 1.56, 0.64, 1)"
          }
        );
        
        // Add effects after the path is drawn
        drawAnimation.onfinish = () => {
          // Glow effect
          (path as SVGPathElement).style.filter = "drop-shadow(0 0 3px rgba(59, 130, 246, 0.7))";
          
          // Pulse animation with varying sizes based on index
          const pulseSize = 0.2 + (index * 0.1);
          path.animate(
            [
              { strokeWidth: '4', filter: 'drop-shadow(0 0 2px rgba(59, 130, 246, 0.5))' },
              { strokeWidth: `${4 + pulseSize}`, filter: 'drop-shadow(0 0 5px rgba(59, 130, 246, 0.8))' },
              { strokeWidth: '4', filter: 'drop-shadow(0 0 2px rgba(59, 130, 246, 0.5))' }
            ],
            {
              duration: 2000 + (index * 200),
              delay: index * 100,
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
    <div className="relative flex items-center justify-center overflow-hidden" style={{ width: size, height: size }}>
      {/* Outer glowing ring */}
      <div 
        ref={outerRingRef}
        className="absolute rounded-full border-4 border-rifkhan/30"
        style={{ 
          width: size * 1.1, 
          height: size * 1.1,
          filter: "blur(2px)"
        }}
      />
      
      {/* Radial background */}
      <div 
        className="absolute rounded-full bg-gradient-to-r from-rifkhan/10 to-rifkhan/10"
        style={{ 
          width: size, 
          height: size,
          animation: "pulse 4s infinite ease-in-out",
          opacity: animated ? 0.8 : 0
        }}
      >
        <style>
          {`
          @keyframes pulse {
            0% { transform: scale(0.95); opacity: 0.5; }
            50% { transform: scale(1.05); opacity: 0.8; }
            100% { transform: scale(0.95); opacity: 0.5; }
          }
          `}
        </style>
      </div>
      
      {/* Particles effect */}
      <Particles count={15} />
      
      {/* Main logo container */}
      <div 
        ref={containerRef}
        className="relative flex items-center justify-center"
        style={{ opacity: 0 }}
      >
        <svg 
          ref={svgRef}
          width={size} 
          height={size} 
          viewBox="0 0 120 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* J letter */}
          <path 
            d="M25 20V65C25 73 30 80 40 80H50" 
            stroke="#3B82F6" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="logo-path"
          />
          
          {/* M letter */}
          <path 
            d="M45 80V40M45 40L60 65L75 40M75 40V80" 
            stroke="#3B82F6" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="logo-path"
          />
          
          {/* R letter */}
          <path 
            d="M80 20H95C106 20 115 29 115 40C115 51 106 60 95 60H80V20Z" 
            stroke="#3B82F6" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="logo-path"
          />
          <path 
            d="M95 60L115 80" 
            stroke="#3B82F6" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="logo-path"
          />
          
          {/* Animated decorative elements */}
          <g ref={circleRef}>
            <circle 
              cx="65" 
              cy="50" 
              r="44" 
              stroke="#3B82F6" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeDasharray="6 4"
            />
            
            {/* Cardinal dots with glow */}
            <circle cx="65" cy="6" r="2" fill="#3B82F6">
              <animate attributeName="r" values="2;3;2" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="109" cy="50" r="2" fill="#3B82F6">
              <animate attributeName="r" values="2;3;2" dur="3s" begin="0.75s" repeatCount="indefinite" />
            </circle>
            <circle cx="65" cy="94" r="2" fill="#3B82F6">
              <animate attributeName="r" values="2;3;2" dur="3s" begin="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="21" cy="50" r="2" fill="#3B82F6">
              <animate attributeName="r" values="2;3;2" dur="3s" begin="2.25s" repeatCount="indefinite" />
            </circle>
            
            {/* Small decorative lines */}
            <line x1="65" y1="15" x2="65" y2="25" stroke="#3B82F6" strokeWidth="1.5" opacity="0.6">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
            </line>
            <line x1="100" y1="50" x2="90" y2="50" stroke="#3B82F6" strokeWidth="1.5" opacity="0.6">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" begin="1s" repeatCount="indefinite" />
            </line>
            <line x1="65" y1="85" x2="65" y2="75" stroke="#3B82F6" strokeWidth="1.5" opacity="0.6">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" begin="2s" repeatCount="indefinite" />
            </line>
            <line x1="30" y1="50" x2="40" y2="50" stroke="#3B82F6" strokeWidth="1.5" opacity="0.6">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" begin="3s" repeatCount="indefinite" />
            </line>
          </g>
          
          {/* Light burst effect */}
          <circle cx="65" cy="50" r="0" fill="url(#burstGradient)" opacity="0">
            <animate 
              attributeName="r" 
              values="0;60;0" 
              dur="4s" 
              begin="1s"
              repeatCount="indefinite" 
            />
            <animate 
              attributeName="opacity" 
              values="0;0.4;0" 
              dur="4s"
              begin="1s" 
              repeatCount="indefinite" 
            />
          </circle>
          
          {/* Gradient definitions */}
          <defs>
            <radialGradient id="burstGradient" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default AnimatedJMRLogo;
