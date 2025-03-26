
import { useEffect, useRef, useState } from "react";
import AnimatedCard from "@/components/ui/AnimatedCard";
import { Calendar, Clock } from "lucide-react";

interface TimelineItem {
  id: string;
  title: string;
  company: string;
  logo: string;
  period: string;
  location: string;
  description: string[];
}

interface InteractiveTimelineProps {
  items: TimelineItem[];
  activeItem: string;
  onItemChange: (id: string) => void;
}

const InteractiveTimeline = ({ items, activeItem, onItemChange }: InteractiveTimelineProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const activeItemIndex = items.findIndex(item => item.id === activeItem);
  const active = items.find(item => item.id === activeItem) || items[0];
  
  useEffect(() => {
    if (!timelineRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(timelineRef.current);
    
    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);
  
  return (
    <div ref={timelineRef} className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 right-0 h-0.5 bg-accent top-8 transform -translate-y-1/2 md:left-1/2 md:right-auto md:top-0 md:bottom-0 md:w-0.5 md:h-auto md:transform-none"></div>
      
      {/* Timeline events */}
      <div className="relative z-10 flex flex-col space-y-12">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`timeline-item flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center opacity-0 ${isVisible ? "animate-timeline" : ""}`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {/* Timeline node */}
            <div 
              className={`timeline-node w-16 h-16 rounded-full flex items-center justify-center glass-card cursor-pointer transition-all border-2 ${
                item.id === activeItem 
                  ? "border-rifkhan scale-110 shadow-lg shadow-rifkhan/20" 
                  : "border-transparent hover:border-rifkhan/50"
              }`}
              onClick={() => onItemChange(item.id)}
            >
              <img
                src={item.logo}
                alt={item.company}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            
            {/* Timeline content */}
            <div 
              className={`timeline-content mt-4 md:mt-0 md:w-[calc(50%-4rem)] ${
                index % 2 === 0 ? "md:ml-8" : "md:mr-8"
              }`}
            >
              {item.id === activeItem && (
                <AnimatedCard className="glass-card p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-medium text-rifkhan">{item.company}</h4>
                    <div className="flex items-center text-sm text-foreground/60">
                      <Calendar className="w-3 h-3 mr-1" />
                      {item.period}
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80 mb-2">{item.title}</p>
                  <div className="flex items-center text-xs text-foreground/60 mb-2">
                    <Clock className="w-3 h-3 mr-1" />
                    {item.location}
                  </div>
                </AnimatedCard>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Active item details */}
      <AnimatedCard className="glass-card rounded-2xl p-8 mt-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-foreground">{active.title}</h3>
            <p className="text-rifkhan">{active.company}</p>
            <p className="text-sm text-foreground/60 mt-1">{active.period} • {active.location}</p>
          </div>
          <img
            src={active.logo}
            alt={active.company}
            className="w-16 h-16 rounded-lg object-cover hidden sm:block"
          />
        </div>

        <ul className="space-y-3">
          {active.description.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-rifkhan mr-3">•</span>
              <span className="text-foreground/80">{item}</span>
            </li>
          ))}
        </ul>
      </AnimatedCard>
    </div>
  );
};

export default InteractiveTimeline;
