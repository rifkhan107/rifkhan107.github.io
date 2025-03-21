
import AnimatedCard from "@/components/ui/AnimatedCard";
import { Cloud, Globe, User } from "lucide-react";

const About = () => {
  return (
    <section
      id="about"
      className="py-20 md:py-28 relative"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="chip mb-4">About Me</span>
          <h2 className="section-title">Who I Am</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <AnimatedCard className="glass-card rounded-2xl p-8 lg:p-10 flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-6 text-foreground">My Background</h3>
            <div className="space-y-4 text-foreground/80">
              <p>
                I'm a DevOps Engineer specializing in AWS cloud services based in Sri Lanka 🇱🇰. 
                With expertise in cloud infrastructure, CI/CD pipelines, and DevSecOps practices,
                I help organizations build, deploy, and manage scalable applications in the cloud.
              </p>
              <p>
                My journey in technology began with a BSc (Hons) in Network Systems Engineering 
                from the University of Sunderland, where I developed a strong foundation in 
                network architecture and systems design.
              </p>
              <p>
                I'm passionate about sharing knowledge with the wider community as an AWS Community 
                Builder and active participant in cybersecurity initiatives through TryHackMe.
              </p>
            </div>
          </AnimatedCard>
          
          <div className="flex flex-col gap-6">
            <AnimatedCard className="glass-card rounded-2xl p-6 flex items-start space-x-4 transition-all hover:translate-x-1">
              <div className="rounded-full bg-rifkhan/10 p-3 text-rifkhan">
                <Cloud className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Cloud Expert</h4>
                <p className="text-foreground/70">
                  Specializing in AWS and Azure cloud platforms, with extensive experience designing
                  and implementing secure, scalable, and cost-effective cloud solutions.
                </p>
              </div>
            </AnimatedCard>
            
            <AnimatedCard className="glass-card rounded-2xl p-6 flex items-start space-x-4 transition-all hover:translate-x-1">
              <div className="rounded-full bg-rifkhan/10 p-3 text-rifkhan">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Community Builder</h4>
                <p className="text-foreground/70">
                  Actively contributing to the tech community as an AWS Community Builder and 
                  cybersecurity practitioner, sharing knowledge and best practices.
                </p>
              </div>
            </AnimatedCard>
            
            <AnimatedCard className="glass-card rounded-2xl p-6 flex items-start space-x-4 transition-all hover:translate-x-1">
              <div className="rounded-full bg-rifkhan/10 p-3 text-rifkhan">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Global Perspective</h4>
                <p className="text-foreground/70">
                  Working with international teams and clients to deliver DevOps solutions that
                  meet diverse business needs across different industries and regions.
                </p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
