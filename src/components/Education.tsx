
import AnimatedCard from "@/components/ui/AnimatedCard";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

const Education = () => {
  return (
    <section
      id="education"
      className="py-20 md:py-28 relative bg-accent/50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="chip mb-4">My Academic Background</span>
          <h2 className="section-title">Education</h2>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <AnimatedCard className="glass-card rounded-2xl p-8 lg:p-10">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-shrink-0 flex items-center justify-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-accent flex items-center justify-center">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/en/1/1d/University_of_Sunderland_Logo.svg" 
                    alt="University of Sunderland" 
                    className="w-20 h-20 md:w-28 md:h-28 object-contain"
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2 text-foreground">BSc (Hons) Network Systems Engineering</h3>
                <div className="flex items-center text-rifkhan mb-2">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  <span className="font-medium">University of Sunderland, UK</span>
                </div>
                
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-foreground/70">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    <span>Sep 2019 - Oct 2022</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1.5" />
                    <span>Sunderland, United Kingdom</span>
                  </div>
                </div>
                
                <div className="space-y-3 text-foreground/80">
                  <p>
                    Specialized in network architecture, systems design, and IT infrastructure management. 
                    The program provided a strong foundation in networking technologies, cybersecurity, 
                    and cloud computing.
                  </p>
                  <p>
                    Key areas of study included: Network protocols and architecture, Cisco networking, 
                    server administration, virtualization technologies, and cloud infrastructure.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
};

export default Education;
