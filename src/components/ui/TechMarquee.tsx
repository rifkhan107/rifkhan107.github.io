import { motion } from "framer-motion";

const stack = [
  { name: "AWS", icon: "/icons/aws.svg" },
  { name: "Azure", icon: "/icons/azure.svg" },
  { name: "GCP", icon: "/icons/gcp.svg" },
  { name: "Terraform", icon: "/icons/terraform.svg" },
  { name: "Kubernetes", icon: "/icons/kubernetes.svg" },
  { name: "Docker", icon: "/icons/docker.svg" },
  { name: "Helm", icon: "/icons/helm.svg" },
  { name: "Jenkins", icon: "/icons/jenkins.svg" },
  { name: "GitHub Actions", icon: "/icons/github-actions.svg" },
  { name: "GitLab", icon: "/icons/gitlab.svg" },
  { name: "Ansible", icon: "/icons/ansible.svg" },
  { name: "Python", icon: "/icons/python.svg" },
  { name: "Prometheus", icon: "/icons/prometheus.svg" },
  { name: "Grafana", icon: "/icons/grafana.svg" },
  { name: "Linux", icon: "/icons/linux.svg" },
];

/** Infinite glass-chip ticker of the tech stack; pauses on hover. */
const TechMarquee = () => {
  return (
    <motion.div
      className="relative w-full overflow-hidden py-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {/* Edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />

      <div className="group flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-4 pr-4" aria-hidden={copy === 1}>
            {stack.map((tech) => (
              <div
                key={`${copy}-${tech.name}`}
                className="flex items-center gap-2.5 glass-card rounded-full px-5 py-2.5 transition-all duration-300 hover:border-rifkhan/40 hover:shadow-lg hover:shadow-rifkhan/20 hover:-translate-y-0.5"
              >
                <span className="flex w-6 h-6 items-center justify-center rounded-full bg-white p-0.5">
                  <img src={tech.icon} alt="" className="w-5 h-5 object-contain" loading="lazy" />
                </span>
                <span className="text-sm font-medium text-foreground/80 whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TechMarquee;
