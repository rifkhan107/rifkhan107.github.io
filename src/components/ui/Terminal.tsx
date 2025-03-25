
import { useState, useEffect } from 'react';
import { useTheme } from "@/components/ui/ThemeProvider";

const Terminal = ({ 
  children,
  title = "rifkhan@aws:~$" 
}: { 
  children: React.ReactNode,
  title?: string 
}) => {
  const { theme } = useTheme();
  const [typedContent, setTypedContent] = useState('');
  const [contentToType, setContentToType] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  
  // Convert children to string content for typing effect
  useEffect(() => {
    if (typeof children === 'string') {
      setContentToType(children);
    } else if (Array.isArray(children)) {
      const content = children
        .map(child => 
          typeof child === 'string' 
            ? child 
            : ''
        )
        .join('');
      setContentToType(content);
    }
  }, [children]);
  
  // Typing effect
  useEffect(() => {
    if (!contentToType) return;
    
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < contentToType.length) {
        setTypedContent(prev => prev + contentToType[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30); // Typing speed
    
    return () => clearInterval(typingInterval);
  }, [contentToType]);
  
  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);
  
  return (
    <div className="terminal-container rounded-lg overflow-hidden border border-foreground/10 shadow-lg">
      {/* Terminal header */}
      <div className="terminal-header flex items-center p-3 bg-gray-800 text-white">
        <div className="terminal-buttons flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="terminal-title text-sm font-mono">{title}</div>
      </div>
      
      {/* Terminal content */}
      <div className={`terminal-content p-4 font-mono text-sm overflow-auto ${
        theme === 'dark' ? 'bg-black text-green-400' : 'bg-gray-900 text-green-400'
      }`}>
        <div className="whitespace-pre-line">
          {typedContent}
          <span className={`cursor ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>▮</span>
        </div>
      </div>
      
      <style jsx>{`
        .terminal-container {
          backdrop-filter: blur(16px);
          transition: all 0.3s ease;
        }
        
        .terminal-content {
          min-height: 250px;
          max-height: 50vh;
        }
        
        @media (max-width: 768px) {
          .terminal-content {
            min-height: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default Terminal;
