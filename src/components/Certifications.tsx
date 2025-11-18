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
    logo: "https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-Cloud-Practitioner_badge.634f8a21af2e0e956ed8905a72366146ba22b74c.png",
    date: "2022",
    description: "Fundamental understanding of AWS Cloud services, architecture, security, and cost management.",
    logoClassName: "scale-110"
  },
  {
    id: "azure-fundamentals",
    title: "Microsoft Certified: Azure Fundamentals",
    organization: "Microsoft",
    logo: "https://images.credly.com/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png",
    date: "2022",
    description: "Foundational knowledge of cloud concepts, Azure services, security, privacy, compliance, and trust."
  },
  {
    id: "wso2-api",
    title: "WSO2 Certified API Manager Practitioner",
    organization: "WSO2",
    logo: "https://wso2.cachefly.net/wso2/sites/all/images/wso2-logo.svg",
    date: "2021",
    description: "Expertise in designing, implementing, and managing API solutions using WSO2 API Manager.",
    logoClassName: "scale-125"
  },
  {
    id: "palo-alto",
    title: "Palo Alto Networks Micro-Credential for Kubernetes Network Security Administrator",
    organization: "Palo Alto Networks",
    logo: "https://www.paloaltonetworks.com/content/dam/pan/en_US/images/logos/brand/primary-company-logo/Parent-logo.png",
    date: "2022",
    description: "Specialized knowledge in securing Kubernetes clusters and containerized applications.",
    logoClassName: "scale-90"
  },
  {
    id: "apisec",
    title: "API Security Fundamentals - Certificate of Completion",
    organization: "APIsec University",
    logo: "https://apisec.ai/wp-content/uploads/2021/07/logo.svg",
    date: "2023",
    description: "Comprehensive understanding of API security principles, threats, and best practices for protection.",
    logoClassName: "scale-110"
  },
  {
    id: "terraform-associate",
    title: "HashiCorp Certified: Terraform Associate",
    organization: "HashiCorp",
    logo: "https://images.credly.com/images/85b9cfc4-257a-4742-878c-4f7ab4a2631b/image.png",
    date: "2024",
    description: "Demonstrates knowledge of basic concepts and skills associated with open source HashiCorp Terraform.",
    logoClassName: "scale-100"
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
