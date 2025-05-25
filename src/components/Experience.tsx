import { useState } from "react";
import AnimatedCard from "@/components/ui/AnimatedCard";
import { motion } from "framer-motion";
import { Calendar, Clock, Briefcase, Star } from "lucide-react";

const experiences = [
  {
    id: "ceylon",
    title: "DevOps Engineer - AWS",
    company: "Ceylon Solutions",
    logo: "https://media.licdn.com/dms/image/v2/C560BAQFa05jN20KuDA/company-logo_400_400/company-logo_400_400/0/1630651612654/ceylon_solutions_logo?e=1748476800&v=beta&t=0W3MELlbCNnW24EjZbJoWnz46Lw1KvjQXaUGxN8TwpI",
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
    logo: "https://media.licdn.com/dms/image/v2/C560BAQFKdBktaLZF_A/company-logo_400_400/company-logo_400_400/0/1648031425806/tech_venturas_logo?e=1748476800&v=beta&t=Av-ecImcfsjvan_AnRxrxI8IUTiE13IovAMgNz6bD2U",
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
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQFiIq28ZK5wdw/company-logo_400_400/company-logo_400_400/0/1631369941555?e=1748476800&v=beta&t=y8poGrUQHBZngyiF6En16PDFaV99xn8vDf-6It0sLxY",
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

  // Animation variants for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const floatingIconVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

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

        <div className="max-w-6xl mx-auto">
          {/* 3D Cards Layout */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-12 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Experience cards - Mobile version as scrolling horizontal list */}
            <div className="md:hidden w-full overflow-x-auto pb-4">
              <div className="flex space-x-4 min-w-max">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
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
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Experience selection - Desktop version */}
            <div className="hidden md:col-span-4 md:flex md:flex-col md:space-y-2">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, x: 5 }}
                  className={`p-5 text-left rounded-lg transition-all flex items-center space-x-3 cursor-pointer ${
                    activeExperience === exp.id
                      ? "glass-card shadow-lg border-l-4 border-rifkhan transform -translate-x-2"
                      : "hover:bg-white/50 dark:hover:bg-white/5"
                  }`}
                  onClick={() => handleTabClick(exp.id)}
                >
                  <div className="relative">
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-white/30"
                    />
                    {activeExperience === exp.id && (
                      <motion.div 
                        className="absolute -right-1 -top-1 bg-rifkhan rounded-full p-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      >
                        <Star className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className={`font-bold truncate ${
                      activeExperience === exp.id
                        ? "text-rifkhan"
                        : "text-foreground/80"
                    }`}>
                      {exp.company}
                    </h3>
                    <p className="text-sm font-medium truncate">{exp.title}</p>
                    <p className="text-xs text-foreground/60 truncate">{exp.period}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Experience details with cool animation */}
            <div className="md:col-span-8">
              <motion.div
                key={activeExperience}
                initial={{ opacity: 0, y: 20, rotateY: -10 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                exit={{ opacity: 0, y: -20, rotateY: 10 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 15,
                  duration: 0.5 
                }}
                style={{ perspective: 1000 }}
              >
                <AnimatedCard className="glass-card rounded-2xl p-8 relative overflow-visible">
                  {/* Floating icon */}
                  <motion.div 
                    className="absolute -top-8 -right-8 bg-rifkhan text-white p-4 rounded-full shadow-lg z-10"
                    variants={floatingIconVariants}
                    animate="animate"
                  >
                    <Briefcase className="w-6 h-6" />
                  </motion.div>
                  
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{activeExp.title}</h3>
                      <p className="text-rifkhan font-medium">{activeExp.company}</p>
                      <div className="flex items-center text-sm text-foreground/60 mt-2">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{activeExp.period}</span>
                        <span className="mx-2">•</span>
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{activeExp.location}</span>
                      </div>
                    </div>
                    <img
                      src={activeExp.logo}
                      alt={activeExp.company}
                      className="w-16 h-16 rounded-lg object-cover hidden sm:block border-2 border-white/30 shadow-lg"
                    />
                  </div>

                  <motion.ul 
                    className="space-y-3 mt-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {activeExp.description.map((item, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start bg-white/20 dark:bg-black/10 p-3 rounded-lg"
                        variants={itemVariants}
                        whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.3)" }}
                      >
                        <span className="text-rifkhan font-bold mr-3 mt-0.5">•</span>
                        <span className="text-foreground/80">{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </AnimatedCard>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
