
import { useState } from "react";
import AnimatedCard from "@/components/ui/AnimatedCard";
import InteractiveSkills from "@/components/effects/InteractiveSkills";
import DynamicTextEffect from "@/components/effects/DynamicTextEffect";

interface Skill {
  name: string;
  icon: string;
  proficiency: number;
  category: string;
}

const skills: Skill[] = [
  {
    name: "AWS",
    icon: "https://www.svgrepo.com/show/448266/aws.svg", 
    proficiency: 90,
    category: "Cloud"
  },
  {
    name: "Azure",
    icon: "https://www.svgrepo.com/show/452062/microsoft.svg",
    proficiency: 85,
    category: "Cloud"
  },
  {
    name: "GCP",
    icon: "https://www.svgrepo.com/show/448223/gcp.svg",
    proficiency: 75,
    category: "Cloud"
  },
  {
    name: "Terraform",
    icon: "https://www.svgrepo.com/show/354447/terraform-icon.svg",
    proficiency: 90,
    category: "IaC"
  },
  {
    name: "Kubernetes",
    icon: "https://www.svgrepo.com/show/448233/kubernetes.svg",
    proficiency: 85,
    category: "Container Orchestration"
  },
  {
    name: "Docker",
    icon: "https://www.svgrepo.com/show/452192/docker.svg",
    proficiency: 90,
    category: "Containerization"
  },
  {
    name: "Helm",
    icon: "https://www.svgrepo.com/show/448231/helm.svg",
    proficiency: 80,
    category: "Container Orchestration"
  },
  {
    name: "Jenkins",
    icon: "https://www.svgrepo.com/show/373699/jenkins.svg",
    proficiency: 80,
    category: "CI/CD"
  },
  {
    name: "GitHub Actions",
    icon: "https://www.svgrepo.com/show/512317/github-142.svg",
    proficiency: 85,
    category: "CI/CD"
  },
  {
    name: "GitLab CI/CD",
    icon: "https://www.svgrepo.com/show/353785/gitlab.svg", 
    proficiency: 80,
    category: "CI/CD"
  },
  {
    name: "Ansible",
    icon: "https://www.svgrepo.com/show/373429/ansible.svg",
    proficiency: 75,
    category: "Configuration Management"
  },
  {
    name: "Git",
    icon: "https://www.svgrepo.com/show/452210/git.svg",
    proficiency: 90,
    category: "Version Control"
  },
  {
    name: "Linux",
    icon: "https://www.svgrepo.com/show/448236/linux.svg",
    proficiency: 90,
    category: "Operating System"
  },
  {
    name: "Python",
    icon: "https://www.svgrepo.com/show/452091/python.svg",
    proficiency: 80,
    category: "Programming"
  },
  {
    name: "Bash",
    icon: "https://www.svgrepo.com/show/353478/bash-icon.svg",
    proficiency: 85,
    category: "Programming"
  },
  {
    name: "AWS CloudFormation",
    icon: "https://images.seeklogo.com/logo-png/43/2/aws-cloudformation-logo-png_seeklogo-430935.png",
    proficiency: 85,
    category: "IaC"
  },
  {
    name: "Azure DevOps",
    icon: "https://www.svgrepo.com/show/448271/azure-devops.svg",
    proficiency: 85,
    category: "CI/CD"
  },
  {
    name: "Prometheus",
    icon: "https://www.svgrepo.com/show/354219/prometheus.svg",
    proficiency: 80,
    category: "Monitoring"
  },
  {
    name: "Grafana",
    icon: "https://www.svgrepo.com/show/448228/grafana.svg",
    proficiency: 80,
    category: "Monitoring"
  },
  {
    name: "Datadog",
    icon: "https://www.svgrepo.com/show/448219/datadog.svg",
    proficiency: 75,
    category: "Monitoring"
  },
  {
    name: "ELK Stack",
    icon: "https://www.svgrepo.com/show/373575/elastic.svg",
    proficiency: 75,
    category: "Monitoring"
  }
];

const categories = Array.from(new Set(skills.map(skill => skill.category)));

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  return (
    <section
      id="skills"
      className="py-20 md:py-28 relative"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="chip mb-4">My Expertise</span>
          <DynamicTextEffect
            text="Technical Skills"
            tag="h2"
            className="section-title"
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === "All"
                ? "bg-rifkhan text-white"
                : "bg-accent text-accent-foreground hover:bg-accent/80"
            }`}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </button>
          
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-rifkhan text-white"
                  : "bg-accent text-accent-foreground hover:bg-accent/80"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Interactive Skills Grid */}
        <InteractiveSkills
          skills={skills}
          selectedCategory={selectedCategory}
          className="max-w-6xl mx-auto"
        />
      </div>
    </section>
  );
};

export default Skills;
