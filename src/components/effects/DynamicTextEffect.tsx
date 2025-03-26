
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface DynamicTextEffectProps {
  text: string;
  className?: string;
  delay?: number;
  onComplete?: () => void;
  tag?: keyof JSX.IntrinsicElements;
}

const DynamicTextEffect = ({
  text,
  className,
  delay = 0,
  onComplete,
  tag = "div"
}: DynamicTextEffectProps) => {
  const [displayText, setDisplayText] = useState("");
  const letterElements = useRef<HTMLElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const Component = tag as any; // Type assertion to avoid complex union type
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const timer = setTimeout(() => {
      let index = 0;
      
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.substring(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          if (onComplete) onComplete();
        }
      }, 50);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [text, delay, onComplete]);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    letterElements.current = Array.from(containerRef.current.querySelectorAll(".letter"));
    
    const handleMouseMove = (e: MouseEvent) => {
      letterElements.current.forEach((letter) => {
        const rect = letter.getBoundingClientRect();
        const letterX = rect.left + rect.width / 2;
        const letterY = rect.top + rect.height / 2;
        
        const distanceX = e.clientX - letterX;
        const distanceY = e.clientY - letterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        const maxDistance = 200;
        const intensity = Math.max(0, 1 - distance / maxDistance);
        
        if (intensity > 0) {
          const angle = Math.atan2(distanceY, distanceX);
          const forceX = Math.cos(angle) * intensity * 10;
          const forceY = Math.sin(angle) * intensity * 10;
          
          letter.style.transform = `translate(${-forceX}px, ${-forceY}px)`;
          letter.style.textShadow = `${forceX * 0.5}px ${forceY * 0.5}px 0 rgba(14, 165, 233, ${intensity})`;
        } else {
          letter.style.transform = "";
          letter.style.textShadow = "";
        }
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [displayText]);
  
  return (
    <Component
      ref={containerRef}
      className={cn("", className)}
    >
      {displayText.split("").map((letter, index) => (
        <span
          key={index}
          className="letter inline-block transition-all duration-300"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </Component>
  );
};

export default DynamicTextEffect;
