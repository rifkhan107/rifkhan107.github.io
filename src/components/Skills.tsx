import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

interface Skill {
  name: string;
  icon: string;
  proficiency: number;
  category: string;
}

const skills: Skill[] = [
  { name: "AWS", icon: "/icons/aws.svg", proficiency: 90, category: "Cloud" },
  { name: "Azure", icon: "/icons/azure.svg", proficiency: 85, category: "Cloud" },
  { name: "GCP", icon: "/icons/gcp.svg", proficiency: 75, category: "Cloud" },
  { name: "Terraform", icon: "/icons/terraform.svg", proficiency: 90, category: "IaC" },
  { name: "Kubernetes", icon: "/icons/kubernetes.svg", proficiency: 85, category: "Container Orchestration" },
  { name: "Docker", icon: "/icons/docker.svg", proficiency: 90, category: "Containerization" },
  { name: "Helm", icon: "/icons/helm.svg", proficiency: 80, category: "Container Orchestration" },
  { name: "Jenkins", icon: "/icons/jenkins.svg", proficiency: 80, category: "CI/CD" },
  { name: "GitHub Actions", icon: "/icons/github-actions.svg", proficiency: 85, category: "CI/CD" },
  { name: "GitLab CI/CD", icon: "/icons/gitlab.svg", proficiency: 80, category: "CI/CD" },
  { name: "Ansible", icon: "/icons/ansible.svg", proficiency: 75, category: "Configuration Management" },
  { name: "Git", icon: "/icons/git.svg", proficiency: 90, category: "Version Control" },
  { name: "Linux", icon: "/icons/linux.svg", proficiency: 90, category: "Operating System" },
  { name: "Python", icon: "/icons/python.svg", proficiency: 80, category: "Programming" },
  { name: "Bash", icon: "/icons/bash.svg", proficiency: 85, category: "Programming" },
  { name: "AWS CloudFormation", icon: "/icons/aws.svg", proficiency: 85, category: "IaC" },
  { name: "Azure DevOps", icon: "/icons/azure-devops.svg", proficiency: 85, category: "CI/CD" },
  { name: "Prometheus", icon: "/icons/prometheus.svg", proficiency: 80, category: "Monitoring" },
  { name: "Grafana", icon: "/icons/grafana.svg", proficiency: 80, category: "Monitoring" },
  { name: "Datadog", icon: "/icons/datadog.svg", proficiency: 75, category: "Monitoring" },
  { name: "ELK Stack", icon: "/icons/elastic.svg", proficiency: 75, category: "Monitoring" },
  { name: "Bitbucket", icon: "/icons/bitbucket.svg", proficiency: 85, category: "Version Control" },
  { name: "JumpCloud", icon: "https://www.google.com/s2/favicons?domain=jumpcloud.com&sz=128", proficiency: 75, category: "Configuration Management" }
];

const categories = Array.from(new Set(skills.map(skill => skill.category)));

/** Skill logo with a gradient letter-tile fallback if the image fails. */
const SkillIcon = ({ skill }: { skill: Skill }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="w-8 h-8 rounded-md bg-gradient-to-br from-sky-400 to-indigo-500 text-white text-sm font-bold flex items-center justify-center">
        {skill.name.charAt(0)}
      </span>
    );
  }

  return (
    <img
      src={skill.icon}
      alt={skill.name}
      className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
};

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSkills = selectedCategory === "All"
    ? skills
    : skills.filter(skill => skill.category === selectedCategory);

  const handleSpotlight = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--sx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--sy", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="skills"
      className="py-20 md:py-28 relative"
    >
      <div className="container mx-auto px-4">
        <SectionHeading chip="My Expertise" title="Technical Skills" />

        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          {["All", ...categories].map(category => (
            <motion.button
              key={category}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "text-white"
                  : "bg-accent text-accent-foreground hover:bg-accent/80"
              }`}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
            >
              {selectedCategory === category && (
                <motion.span
                  layoutId="skill-category-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 shadow-lg shadow-rifkhan/30"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.85, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -16 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.03,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ y: -6 }}
                onMouseMove={handleSpotlight}
                className="relative glass-card glass-card-hover rounded-xl p-6 group overflow-hidden"
              >
                {/* Cursor spotlight */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(220px circle at var(--sx, 50%) var(--sy, 50%), rgba(14,165,233,0.16), transparent 70%)"
                  }}
                />

                <div className="relative flex items-center space-x-4 mb-4">
                  <motion.div
                    className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-sm"
                    whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
                  >
                    <SkillIcon skill={skill} />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-foreground">{skill.name}</h3>
                    <p className="text-xs text-foreground/60">{skill.category}</p>
                  </div>
                </div>

                <div className="relative w-full bg-muted rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="relative h-2 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 overflow-hidden"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
                  </motion.div>
                </div>
                <p className="relative text-right text-sm text-foreground/70 mt-1">
                  {skill.proficiency}%
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
