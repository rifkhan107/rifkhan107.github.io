
import { useState } from "react";
import AnimatedCard from "@/components/ui/AnimatedCard";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

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

  const activeExp = experiences.find(exp => exp.id === activeExperience) || experiences[0];

  return (
    <section
      id="experience"
      className="py-20 md:py-28 relative bg-accent/50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="chip mb-4">My Journey</span>
          <h2 className="section-title">Professional Experience</h2>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Timeline on wider screens - vertical */}
          <div className="hidden md:block mb-12">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-rifkhan/20 rounded-full"></div>
              
              {experiences.map((exp, index) => (
                <motion.div 
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative ${index % 2 === 0 ? 'left-0 pr-8 text-right' : 'left-1/2 pl-8'} w-1/2 mb-10`}
                >
                  {/* Timeline node */}
                  <div 
                    className={`absolute ${index % 2 === 0 ? 'right-0' : 'left-0'} top-5 w-4 h-4 rounded-full bg-rifkhan transform translate-x-${index % 2 === 0 ? '1/2' : '-1/2'}`}
                  ></div>
                  
                  <AnimatedCard 
                    className={`glass-card p-6 rounded-lg cursor-pointer ${activeExperience === exp.id ? 'border-l-4 border-rifkhan' : ''}`}
                    onClick={() => handleTabClick(exp.id)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <img src={exp.logo} alt={exp.company} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h3 className="font-bold text-lg">{exp.company}</h3>
                        <p className="text-rifkhan font-medium">{exp.title}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-foreground/60 mt-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{exp.period}</span>
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{exp.location}</span>
                    </div>
                  </AnimatedCard>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Experience tabs - Mobile version as scrolling horizontal list */}
            <div className="md:hidden w-full overflow-x-auto pb-4">
              <div className="flex space-x-4 min-w-max">
                {experiences.map((exp, index) => (
                  <motion.button
                    key={exp.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-4 text-left rounded-lg transition-all flex-shrink-0 flex items-center space-x-3 min-w-[200px] ${
                      activeExperience === exp.id
                        ? "bg-white dark:bg-black/20 shadow-md border-l-4 border-rifkhan"
                        : "hover:bg-white/50 dark:hover:bg-white/5"
                    }`}
                    onClick={() => handleTabClick(exp.id)}
                  >
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className={`font-medium truncate ${
                        activeExperience === exp.id
                          ? "text-rifkhan"
                          : "text-foreground/70"
                      }`}>
                        {exp.company}
                      </h3>
                      <p className="text-sm text-foreground/60 truncate">{exp.period}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Experience tabs - Desktop version */}
            <div className="hidden md:col-span-4 md:flex md:flex-col md:space-y-2">
              {experiences.map((exp, index) => (
                <motion.button
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`p-4 text-left rounded-lg transition-all flex items-center space-x-3 ${
                    activeExperience === exp.id
                      ? "bg-white dark:bg-black/20 shadow-md border-l-4 border-rifkhan"
                      : "hover:bg-white/50 dark:hover:bg-white/5"
                  }`}
                  onClick={() => handleTabClick(exp.id)}
                >
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className={`font-medium truncate ${
                      activeExperience === exp.id
                        ? "text-rifkhan"
                        : "text-foreground/70"
                    }`}>
                      {exp.company}
                    </h3>
                    <p className="text-sm text-foreground/60 truncate">{exp.period}</p>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Experience details */}
            <div className="md:col-span-8">
              <motion.div
                key={activeExperience}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatedCard className="glass-card rounded-2xl p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{activeExp.title}</h3>
                      <p className="text-rifkhan">{activeExp.company}</p>
                      <p className="text-sm text-foreground/60 mt-1">{activeExp.period} • {activeExp.location}</p>
                    </div>
                    <img
                      src={activeExp.logo}
                      alt={activeExp.company}
                      className="w-16 h-16 rounded-lg object-cover hidden sm:block"
                    />
                  </div>

                  <ul className="space-y-3">
                    {activeExp.description.map((item, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <span className="text-rifkhan mr-3">•</span>
                        <span className="text-foreground/80">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </AnimatedCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
