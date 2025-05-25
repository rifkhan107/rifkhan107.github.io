import { useState } from "react";
import AnimatedCard from "@/components/ui/AnimatedCard";
import { Award } from "lucide-react";

interface Certification {
  id: string;
  title: string;
  organization: string;
  logo: string;
  date: string;
  description: string;
  logoClassName?: string;
}

const certifications: Certification[] = [
  {
    id: "aws-ccp",
    title: "AWS Certified Cloud Practitioner",
    organization: "Amazon Web Services",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/200px-Amazon_Web_Services_Logo.svg.png",
    date: "2022",
    description: "Fundamental understanding of AWS Cloud services, architecture, security, and cost management.",
    logoClassName: "scale-90 p-1"
  },
  {
    id: "azure-fundamentals",
    title: "Microsoft Certified: Azure Fundamentals",
    organization: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/200px-Microsoft_logo.svg.png",
    date: "2022",
    description: "Foundational knowledge of cloud concepts, Azure services, security, privacy, compliance, and trust."
  },
  {
    id: "wso2-api",
    title: "WSO2 Certified API Manager Practitioner",
    organization: "WSO2",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/WSO2_Software_Logo.svg/200px-WSO2_Software_Logo.svg.png",
    date: "2021",
    description: "Expertise in designing, implementing, and managing API solutions using WSO2 API Manager."
  },
  {
    id: "palo-alto",
    title: "Palo Alto Networks Micro-Credential for Kubernetes Network Security Administrator",
    organization: "Palo Alto Networks",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Palo_Alto_Networks_logo.svg/200px-Palo_Alto_Networks_logo.svg.png",
    date: "2022",
    description: "Specialized knowledge in securing Kubernetes clusters and containerized applications."
  },
  {
    id: "apisec",
    title: "API Security Fundamentals - Certificate of Completion",
    organization: "APIsec University",
    logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop",
    date: "2023",
    description: "Comprehensive understanding of API security principles, threats, and best practices for protection."
  }
];

const Certifications = () => {
  const [activeCert, setActiveCert] = useState<string | null>(null);

  const toggleCert = (id: string) => {
    setActiveCert(activeCert === id ? null : id);
  };

  return (
    <section
      id="certifications"
      className="py-20 md:py-28 relative bg-accent/50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="chip mb-4">Achievements</span>
          <h2 className="section-title">Certifications</h2>
        </div>
        
        <div className="max-w-4xl mx-auto grid gap-6">
          {certifications.map((cert) => (
            <AnimatedCard
              key={cert.id}
              className={`glass-card rounded-xl p-6 transition-all duration-300 cursor-pointer ${
                activeCert === cert.id ? "shadow-lg" : ""
              }`}
              onClick={() => toggleCert(cert.id)}
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-white flex items-center justify-center p-2 shadow-sm">
                  <img
                    src={cert.logo}
                    alt={cert.organization}
                    className={`w-full h-full object-contain ${cert.logoClassName || ""}`}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop";
                    }}
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-foreground">{cert.title}</h3>
                  <p className="text-rifkhan">{cert.organization}</p>
                  <p className="text-sm text-foreground/60">Issued {cert.date}</p>
                </div>
                
                <div className="text-rifkhan">
                  <Award className={`transition-transform duration-300 ${
                    activeCert === cert.id ? "rotate-180" : ""
                  }`} />
                </div>
              </div>
              
              {activeCert === cert.id && (
                <div className="mt-4 pt-4 border-t border-border/50 text-foreground/80 animate-fade-in">
                  {cert.description}
                </div>
              )}
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
