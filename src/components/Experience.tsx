
import { useState } from "react";
import AnimatedCard from "@/components/ui/AnimatedCard";
import InteractiveTimeline from "@/components/effects/InteractiveTimeline";
import DynamicTextEffect from "@/components/effects/DynamicTextEffect";

const experiences = [
  {
    id: "ceylon",
    title: "DevOps Engineer - AWS",
    company: "Ceylon Solutions",
    logo: "https://media.licdn.com/dms/image/v2/C560BAQFa05jN20KuDA/company-logo_400_400/company-logo_400_400/0/1630651612654/ceylon_solutions_logo?e=1747872000&v=beta&t=CxSzntGxyfCWCGR4tYTP8otPaZAPZBjxEOEeT-Rn-ks",
    period: "2023 - Present",
    location: "Colombo District, Sri Lanka",
    description: [
      "Leading AWS cloud infrastructure implementation and optimization",
      "Designing and implementing CI/CD pipelines using AWS services",
      "Managing cloud security and compliance requirements",
      "Automating infrastructure deployment using Terraform and AWS CloudFormation",
      "Monitoring and optimizing cloud resources for cost efficiency"
    ]
  },
  {
    id: "tech-venturas",
    title: "DevOps Engineer - Azure",
    company: "Tech Venturas",
    logo: "https://media.licdn.com/dms/image/v2/C560BAQFKdBktaLZF_A/company-logo_400_400/company-logo_400_400/0/1648031425806/tech_venturas_logo?e=1747872000&v=beta&t=Av-ecImcfsjvan_AnRxrxI8IUTiE13IovAMgNz6bD2U",
    period: "2022 - 2023",
    location: "Colombo, Sri Lanka",
    description: [
      "Implemented and managed Azure DevOps pipelines for continuous integration and deployment",
      "Configured and maintained Azure Kubernetes Service (AKS) clusters",
      "Automated infrastructure provisioning using Terraform and Azure Resource Manager templates",
      "Implemented monitoring and alerting solutions using Azure Monitor and Application Insights",
      "Collaborated with development teams to improve application performance and reliability"
    ]
  },
  {
    id: "hsenid",
    title: "Trainee DevOps Engineer",
    company: "hSenid Mobile Solutions",
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQFiIq28ZK5wdw/company-logo_400_400/company-logo_400_400/0/1631369941555?e=1747872000&v=beta&t=y8poGrUQHBZngyiF6En16PDFaV99xn8vDf-6It0sLxY",
    period: "2021 - 2022",
    location: "Colombo, Sri Lanka",
    description: [
      "Assisted in setting up and maintaining CI/CD pipelines using Jenkins",
      "Learned and implemented Docker containerization for applications",
      "Supported the team in cloud infrastructure management",
      "Participated in code reviews and testing processes",
      "Gained hands-on experience with version control systems and deployment strategies"
    ]
  }
];

const Experience = () => {
  const [activeExperience, setActiveExperience] = useState(experiences[0].id);

  const handleTabClick = (id: string) => {
    setActiveExperience(id);
  };

  return (
    <section
      id="experience"
      className="py-20 md:py-28 relative bg-accent/50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="chip mb-4">My Journey</span>
          <DynamicTextEffect
            text="Professional Experience"
            tag="h2"
            className="section-title"
          />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Interactive Timeline */}
          <InteractiveTimeline 
            items={experiences}
            activeItem={activeExperience}
            onItemChange={handleTabClick}
          />
        </div>
      </div>
    </section>
  );
};

export default Experience;
