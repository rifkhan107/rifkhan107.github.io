
import { useState, useEffect, useCallback } from 'react';
import { useTheme } from "@/components/ui/ThemeProvider";

type Command = {
  command: string;
  output: string;
  delay?: number;
};

const defaultCommands: Command[] = [
  { 
    command: "whoami",
    output: "rifkhan",
    delay: 800
  },
  { 
    command: "cat /etc/profile",
    output: `# DevOps Engineer Profile
export FULL_NAME="Rifkhan Mohamed"
export ROLE="DevOps Engineer & Cloud Architect"
export LOCATION="Sri Lanka"
export SKILLS=("AWS" "Terraform" "Docker" "Kubernetes" "CI/CD" "DevSecOps")
export CERTIFICATIONS=("AWS Solutions Architect" "AWS DevOps Engineer")`,
    delay: 1500
  },
  { 
    command: "ls -la ~/projects/",
    output: `total 64
drwxr-xr-x  11 rifkhan staff   352 Jun 10 09:45 .
drwxr-xr-x   5 rifkhan staff   160 Jun 10 09:45 ..
drwxr-xr-x  14 rifkhan staff   448 Jun 10 09:45 aws-infrastructure
drwxr-xr-x  12 rifkhan staff   384 Jun 10 09:45 cloud-automation
drwxr-xr-x  10 rifkhan staff   320 Jun 10 09:45 devops-pipeline
drwxr-xr-x  13 rifkhan staff   416 Jun 10 09:45 kubernetes-cluster`,
    delay: 1200
  },
  { 
    command: "aws --version",
    output: "aws-cli/2.15.32 Python/3.11.6 Darwin/23.4.0 exe/x86_64 prompt/off",
    delay: 800
  },
  { 
    command: "terraform --version",
    output: "Terraform v1.7.4\non darwin_amd64",
    delay: 800
  },
  { 
    command: "kubectl version --client",
    output: `Client Version: v1.28.4
Kustomize Version: v5.0.4`,
    delay: 1000
  },
  { 
    command: "cd ~/projects/aws-infrastructure && ls",
    output: `cloudformation
terraform
cdk
serverless
lambda-functions
ecs-configs
eks-manifests`,
    delay: 1200
  },
  { 
    command: "grep -r \"AWS\" ~/certifications/",
    output: `~/certifications/professional.txt:AWS Certified Solutions Architect - Professional
~/certifications/associate.txt:AWS Certified Developer - Associate
~/certifications/associate.txt:AWS Certified SysOps Administrator - Associate
~/certifications/specialty.txt:AWS Certified Security - Specialty`,
    delay: 1400
  },
  { 
    command: "ps aux | grep docker",
    output: `rifkhan   1234  0.5  0.8 5857064 142460 ?      Ssl  08:32   0:12 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
rifkhan   2345  0.2  0.5 4217064  85460 ?       Ssl  08:32   0:07 docker-compose up -d`,
    delay: 900
  },
  { 
    command: "echo $PATH",
    output: "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/aws/bin:/home/rifkhan/.local/bin",
    delay: 600
  }
];

const Terminal = ({ 
  children,
  title = "rifkhan@aws:~$",
  commands = defaultCommands
}: { 
  children?: React.ReactNode;
  title?: string;
  commands?: Command[];
}) => {
  const { theme } = useTheme();
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [isTypingCommand, setIsTypingCommand] = useState(true);
  const [isShowingOutput, setIsShowingOutput] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [initialContent] = useState(typeof children === 'string' ? children : '');
  
  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);
  
  // Initial content typing effect
  useEffect(() => {
    if (!initialContent) return;
    
    let position = 0;
    const typingInterval = setInterval(() => {
      if (position < initialContent.length) {
        setDisplayedContent(initialContent.substring(0, position + 1));
        position++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentCommandIndex(0);
          setIsTypingCommand(true);
        }, 1000);
      }
    }, 30);
    
    return () => clearInterval(typingInterval);
  }, [initialContent]);
  
  // Command typing and output display logic
  const typeCommand = useCallback(() => {
    if (currentCommandIndex >= commands.length) return;
    
    const currentCommand = commands[currentCommandIndex];
    let commandPosition = 0;
    
    setIsTypingCommand(true);
    setIsShowingOutput(false);
    
    const typingInterval = setInterval(() => {
      if (commandPosition < currentCommand.command.length) {
        setDisplayedContent(prev => 
          prev + (commandPosition === 0 ? '\n' + title + ' ' : '') + 
          currentCommand.command.charAt(commandPosition)
        );
        commandPosition++;
      } else {
        clearInterval(typingInterval);
        setIsTypingCommand(false);
        
        // Show command output after a delay
        setTimeout(() => {
          setIsShowingOutput(true);
          setDisplayedContent(prev => prev + '\n' + currentCommand.output);
          
          // Move to next command after delay
          const delay = currentCommand.delay || 1000;
          setTimeout(() => {
            setCurrentCommandIndex(prev => prev + 1);
            setIsTypingCommand(true);
          }, delay);
        }, 500);
      }
    }, 80); // Typing speed
    
    return () => clearInterval(typingInterval);
  }, [currentCommandIndex, commands, title]);
  
  // Trigger typing of next command
  useEffect(() => {
    if (!isTypingCommand || currentCommandIndex >= commands.length) return;
    
    const typingTimeout = setTimeout(() => {
      typeCommand();
    }, 500);
    
    return () => clearTimeout(typingTimeout);
  }, [currentCommandIndex, isTypingCommand, typeCommand, commands]);
  
  // Loop back to the beginning when all commands are completed
  useEffect(() => {
    if (currentCommandIndex >= commands.length) {
      const resetTimeout = setTimeout(() => {
        setCurrentCommandIndex(0);
      }, 3000);
      
      return () => clearTimeout(resetTimeout);
    }
  }, [currentCommandIndex, commands.length]);
  
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
          {displayedContent}
          <span className={`cursor ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>▮</span>
        </div>
      </div>
      
      <style>
        {`
        .terminal-container {
          backdrop-filter: blur(16px);
          transition: all 0.3s ease;
        }
        
        .terminal-content {
          min-height: 250px;
          max-height: 50vh;
          background-color: rgba(0, 0, 0, 0.85);
        }
        
        @media (max-width: 768px) {
          .terminal-content {
            min-height: 200px;
          }
        }
        `}
      </style>
    </div>
  );
};

export default Terminal;
