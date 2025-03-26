
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  icon: string;
  proficiency: number;
  category: string;
}

interface InteractiveSkillsProps {
  skills: Skill[];
  selectedCategory: string;
  className?: string;
}

const InteractiveSkills = ({ skills, selectedCategory, className }: InteractiveSkillsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const skillElements = containerRef.current.querySelectorAll('.skill-item');
    const progressElements = containerRef.current.querySelectorAll('.skill-progress');
    const percentageElements = containerRef.current.querySelectorAll('.skill-percentage');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-skills');
            
            // Find the progress and percentage elements for this skill
            const skillItem = entry.target as HTMLElement;
            const progressBar = skillItem.querySelector('.skill-progress') as HTMLElement;
            const percentageText = skillItem.querySelector('.skill-percentage') as HTMLElement;
            
            if (progressBar && percentageText) {
              const targetWidth = progressBar.style.getPropertyValue('--target-width');
              const percentValue = parseInt(targetWidth);
              
              // Animate the progress bar
              progressBar.style.width = '0%';
              setTimeout(() => {
                progressBar.style.width = targetWidth;
              }, 100);
              
              // Animate the percentage counter
              let startValue = 0;
              const duration = 1500;
              const increment = Math.ceil(percentValue / (duration / 20));
              
              const updateCounter = () => {
                startValue += increment;
                if (startValue > percentValue) {
                  startValue = percentValue;
                }
                percentageText.textContent = startValue.toString();
                
                if (startValue < percentValue) {
                  requestAnimationFrame(updateCounter);
                }
              };
              
              requestAnimationFrame(updateCounter);
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    
    skillElements.forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      skillElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [skills, selectedCategory]);
  
  const filteredSkills = selectedCategory === "All"
    ? skills
    : skills.filter(skill => skill.category === selectedCategory);
  
  return (
    <div 
      ref={containerRef}
      className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", className)}
    >
      {filteredSkills.map((skill, index) => (
        <div 
          key={skill.name}
          className="skill-item glass-card rounded-xl p-6 hover:shadow-lg transition-all opacity-0 transform translate-y-8"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-sm relative overflow-hidden group">
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-8 h-8 object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-rifkhan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div>
              <h3 className="font-bold text-foreground">{skill.name}</h3>
              <p className="text-xs text-foreground/60">{skill.category}</p>
            </div>
          </div>
          
          <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 bg-rifkhan rounded-full skill-progress"
              style={{ 
                width: '0%',
                '--target-width': `${skill.proficiency}%` 
              } as React.CSSProperties}
            ></div>
          </div>
          <p className="text-right text-sm text-foreground/70 mt-1">
            <span className="skill-percentage">0</span>%
          </p>
        </div>
      ))}
    </div>
  );
};

export default InteractiveSkills;
