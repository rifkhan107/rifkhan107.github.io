
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
}

const certifications: Certification[] = [
  {
    id: "aws-ccp",
    title: "AWS Certified Cloud Practitioner",
    organization: "Amazon Web Services",
    logo: "https://media.licdn.com/dms/image/v2/C560BAQE0fp2sCqnVLg/company-logo_400_400/company-logo_400_400/0/1738855736997/amazon_web_services_logo?e=1747872000&v=beta&t=dRgdvz2IxhXQ1E7-YcPcbs6NQjMgyGA5iJPBnVva2Go",
    date: "2022",
    description: "Fundamental understanding of AWS Cloud services, architecture, security, and cost management."
  },
  {
    id: "azure-fundamentals",
    title: "Microsoft Certified: Azure Fundamentals",
    organization: "Microsoft",
    logo: "https://media.licdn.com/dms/image/v2/C560BAQE88xCsONDULQ/company-logo_400_400/company-logo_400_400/0/1630652622688/microsoft_logo?e=1747872000&v=beta&t=ha3UxF4odT1qORIUw3dJQnwtivbJzsUzweaRuY2gLiA",
    date: "2022",
    description: "Foundational knowledge of cloud concepts, Azure services, security, privacy, compliance, and trust."
  },
  {
    id: "wso2-api",
    title: "WSO2 Certified API Manager Practitioner",
    organization: "WSO2",
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQFchI_Xw-FFhQ/company-logo_400_400/company-logo_400_400/0/1630476267944/wso2_logo?e=1747872000&v=beta&t=CQx1oqeaazLs7hk4XK-cZJM3SYvZSbUoSIM9RYjp87Y",
    date: "2021",
    description: "Expertise in designing, implementing, and managing API solutions using WSO2 API Manager."
  },
  {
    id: "palo-alto",
    title: "Palo Alto Networks Micro-Credential for Kubernetes Network Security Administrator",
    organization: "Palo Alto Networks",
    logo: "https://media.licdn.com/dms/image/v2/C560BAQFZg72Sfni4SA/company-logo_400_400/company-logo_400_400/0/1657225156841/palo_alto_networks_logo?e=1747872000&v=beta&t=99DiAMEAtx7YYyt1OTnMRBieDDUFaa0Ov4Qb0UB0zl8",
    date: "2022",
    description: "Specialized knowledge in securing Kubernetes clusters and containerized applications."
  },
  {
    id: "apisec",
    title: "API Security Fundamentals - Certificate of Completion",
    organization: "APIsec University",
    logo: "https://media.licdn.com/dms/image/v2/C560BAQF-zpLF3d6kEQ/company-logo_400_400/company-logo_400_400/0/1678078423861/apisec_university_logo?e=1747872000&v=beta&t=8EBqHQiNvz0WqdrMgiw4KvNKMX-7M_fmwsRen4JYtkI",
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
              className={`glass-card rounded-xl p-6 transition-all duration-300 ${
                activeCert === cert.id ? "shadow-lg" : ""
              }`}
              onClick={() => toggleCert(cert.id)}
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-white flex items-center justify-center p-2 shadow-sm">
                  <img
                    src={cert.logo}
                    alt={cert.organization}
                    className="w-full h-full object-contain"
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
