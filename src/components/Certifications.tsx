import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedCard from "@/components/ui/AnimatedCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { Award, BadgeCheck, CalendarDays, ExternalLink } from "lucide-react";

interface Certification {
  id: string;
  title: string;
  organization: string;
  badge: string;
  issued: string;
  expires?: string;
  credlyUrl?: string;
  skills: string[];
}

const certifications: Certification[] = [
  {
    id: "cka",
    title: "CKA: Certified Kubernetes Administrator",
    organization: "The Linux Foundation",
    badge: "https://images.credly.com/size/340x340/images/8b8ed108-e77d-4396-ac59-2504583b9d54/cka_from_cncfsite__281_29.png",
    issued: "Jan 2026",
    expires: "Jan 2028",
    credlyUrl: "https://www.credly.com/badges/676f737a-643d-4960-ae4a-ac36f056f2ea/public_url",
    skills: ["Kubernetes", "Helm", "Ingress", "Troubleshooting"]
  },
  {
    id: "aws-saa",
    title: "AWS Certified Solutions Architect – Associate",
    organization: "Amazon Web Services",
    badge: "https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
    issued: "Nov 2025",
    expires: "Nov 2028",
    credlyUrl: "https://www.credly.com/badges/298a3cd7-6b25-46ee-ad01-054109518830/public_url",
    skills: ["Cloud Architecture", "AWS", "Cloud Infrastructure"]
  },
  {
    id: "gitops-scale",
    title: "GitOps at Scale",
    organization: "Codefresh",
    badge: "https://images.credly.com/size/340x340/images/89046afe-b82b-4dc1-9c20-384ea505fd01/blob",
    issued: "Jun 2024",
    credlyUrl: "https://www.credly.com/badges/d0e48162-335b-4ae1-b601-312eab833e66/public_url",
    skills: ["Argo CD", "Application Sets", "Progressive Delivery"]
  },
  {
    id: "terraform-associate",
    title: "HashiCorp Certified: Terraform Associate (003)",
    organization: "HashiCorp",
    badge: "https://images.credly.com/size/340x340/images/0dc62494-dc94-469a-83af-e35309f27356/blob",
    issued: "2024",
    credlyUrl: "https://www.credly.com/badges/8ac7b190-6d9c-47b2-8dc3-5eccab6ff8e6/public_url",
    skills: ["Terraform", "IaC", "HCL"]
  },
  {
    id: "gitops-fundamentals",
    title: "GitOps Fundamentals",
    organization: "Codefresh",
    badge: "https://images.credly.com/size/340x340/images/fbd71e9c-07f7-4a8b-a874-2bf5001a6dbf/blob",
    issued: "Nov 2023",
    credlyUrl: "https://www.credly.com/badges/509f54a6-8820-4182-a7ad-449a4c686eaa/public_url",
    skills: ["GitOps", "Argo CD", "Kubernetes"]
  },
  {
    id: "apisec",
    title: "API Security Fundamentals",
    organization: "APIsec University",
    badge: "https://apisec.ai/wp-content/uploads/2021/07/logo.svg",
    issued: "2023",
    skills: ["API Security", "OWASP", "Best Practices"]
  },
  {
    id: "aws-ccp",
    title: "AWS Certified Cloud Practitioner",
    organization: "Amazon Web Services",
    badge: "https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png",
    issued: "2022",
    skills: ["AWS Cloud", "Security", "Cost Management"]
  },
  {
    id: "palo-alto",
    title: "Kubernetes Network Security Administrator",
    organization: "Palo Alto Networks",
    badge: "https://www.paloaltonetworks.com/content/dam/pan/en_US/images/logos/brand/primary-company-logo/Parent-logo.png",
    issued: "2022",
    skills: ["Kubernetes Security", "Network Security"]
  },
  {
    id: "azure-fundamentals",
    title: "Microsoft Certified: Azure Fundamentals",
    organization: "Microsoft",
    badge: "https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png",
    issued: "Nov 2021",
    credlyUrl: "https://www.credly.com/badges/f0f9ce73-eda0-4877-a26a-0c180815b2f6/public_url",
    skills: ["Azure", "Cloud Security", "Virtualization"]
  },
  {
    id: "google-it-automation",
    title: "Google IT Automation with Python",
    organization: "Google / Coursera",
    badge: "https://images.credly.com/size/340x340/images/efbdc0d6-b46e-4e3c-8cf8-2314d8a5b971/GCC_badge_python_1000x1000.png",
    issued: "Jul 2021",
    credlyUrl: "https://www.credly.com/badges/00bada7a-424f-45a2-acbd-532af0c5e8c0/public_url",
    skills: ["Python", "Automation", "System Administration"]
  },
  {
    id: "wso2-api",
    title: "WSO2 Certified API Manager Practitioner",
    organization: "WSO2",
    badge: "https://wso2.cachefly.net/wso2/sites/all/images/wso2-logo.svg",
    issued: "2021",
    skills: ["API Management", "Integration"]
  }
];

const BadgeImage = ({ cert }: { cert: Certification }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative w-28 h-28 mx-auto">
      {/* Pulsing glow behind the badge */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400/40 to-indigo-500/40 blur-2xl"
        animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Floating badge */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {failed ? (
          <div className="w-24 h-24 rounded-full bg-rifkhan/10 flex items-center justify-center text-rifkhan">
            <Award className="w-12 h-12" />
          </div>
        ) : (
          <img
            src={cert.badge}
            alt={`${cert.title} badge`}
            className="max-w-full max-h-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            onError={() => setFailed(true)}
          />
        )}
      </motion.div>
    </div>
  );
};

const Certifications = () => {
  return (
    <section
      id="certifications"
      className="py-20 md:py-28 relative bg-accent/50"
    >
      <div className="container mx-auto px-4">
        <SectionHeading
          chip="Achievements"
          title="Certifications"
          description="Industry-recognized credentials in cloud, Kubernetes, GitOps, and automation — verified on Credly."
        />

        <Stagger className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <StaggerItem key={cert.id} className="h-full">
              <AnimatedCard
                intensity={6}
                className="group glass-card glass-card-hover rounded-2xl p-6 h-full flex flex-col text-center"
              >
                {/* Shine sweep on hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] animate-shimmer" />
                </div>

                <BadgeImage cert={cert} />

                <h3 className="font-bold text-lg text-foreground mt-4 leading-snug">
                  {cert.title}
                </h3>
                <p className="text-rifkhan text-sm font-medium mt-1 flex items-center justify-center gap-1">
                  <BadgeCheck className="w-4 h-4" />
                  {cert.organization}
                </p>

                <p className="text-xs text-foreground/60 mt-2 flex items-center justify-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5" />
                  Issued {cert.issued}
                  {cert.expires && <span>• Expires {cert.expires}</span>}
                </p>

                <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-rifkhan/10 text-rifkhan border border-rifkhan/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-5">
                  {cert.credlyUrl ? (
                    <motion.a
                      href={cert.credlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-rifkhan hover:text-rifkhan-dark transition-colors"
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Verify on Credly
                      <ExternalLink className="w-3.5 h-3.5" />
                    </motion.a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-sm text-foreground/50">
                      <BadgeCheck className="w-4 h-4" />
                      Certified
                    </span>
                  )}
                </div>
              </AnimatedCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default Certifications;
