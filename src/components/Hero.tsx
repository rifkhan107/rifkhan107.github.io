import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import AnimatedCard from "@/components/ui/AnimatedCard";
import Magnetic from "@/components/ui/Magnetic";

const typewriterTexts = [
  "DevOps Engineer",
  "Cloud Infrastructure Expert",
  "AWS Community Builder",
  "Cybersecurity Enthusiast"
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const orbitIcons = [
  { name: "AWS", icon: "/icons/aws.svg" },
  { name: "Kubernetes", icon: "/icons/kubernetes.svg" },
  { name: "Terraform", icon: "/icons/terraform.svg" },
  { name: "Docker", icon: "/icons/docker.svg" }
];

const orbitPositions = [
  { top: "0%", left: "50%", translate: "-50% -50%" },
  { top: "50%", left: "100%", translate: "-50% -50%" },
  { top: "100%", left: "50%", translate: "-50% -50%" },
  { top: "50%", left: "0%", translate: "-50% -50%" }
];

const stats = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 11, suffix: "", label: "Certifications" },
  { value: 3, suffix: "", label: "Cloud Platforms" },
  { value: 20, suffix: "+", label: "Tools & Tech" }
];

const CountUp = ({ to, suffix }: { to: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}`;
      }
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span className="text-gradient text-3xl md:text-4xl font-bold tabular-nums">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
};

const Hero = () => {
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [typewriterText, setTypewriterText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const text = typewriterTexts[typewriterIndex];
    let timer: NodeJS.Timeout;

    if (isTyping) {
      if (typewriterText.length < text.length) {
        timer = setTimeout(() => {
          setTypewriterText(text.substring(0, typewriterText.length + 1));
        }, 100);
      } else {
        setIsTyping(false);
        timer = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (typewriterText.length > 0) {
        timer = setTimeout(() => {
          setTypewriterText(typewriterText.substring(0, typewriterText.length - 1));
        }, 50);
      } else {
        setIsTyping(true);
        setTypewriterIndex((typewriterIndex + 1) % typewriterTexts.length);
      }
    }

    return () => clearTimeout(timer);
  }, [typewriterText, typewriterIndex, isTyping]);

  return (
    <section
      id="home"
      className="min-h-screen relative flex flex-col justify-center items-center pt-16 overflow-hidden"
    >
      {/* Aurora gradient blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-sky-400/30 dark:bg-sky-500/20 blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-32 w-[26rem] h-[26rem] rounded-full bg-indigo-400/25 dark:bg-indigo-500/15 blur-3xl animate-blob [animation-delay:-6s]" />
        <div className="absolute -bottom-40 left-1/3 w-[30rem] h-[30rem] rounded-full bg-cyan-300/25 dark:bg-cyan-500/15 blur-3xl animate-blob [animation-delay:-12s]" />
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.04)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center">
        <AnimatedCard className="glass-card rounded-3xl p-8 md:p-12 max-w-4xl mx-auto text-center" intensity={4}>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* Avatar with rotating gradient ring + orbiting tech icons */}
            <motion.div variants={itemVariants} className="mb-10 relative inline-block">
              <div className="relative w-36 h-36 md:w-44 md:h-44 mx-auto">
                <div className="absolute -inset-1.5 rounded-full bg-[conic-gradient(from_0deg,#38BDF8,#6366F1,#22D3EE,#38BDF8)] animate-spin-slow" />
                <div className="absolute -inset-1.5 rounded-full bg-[conic-gradient(from_0deg,#38BDF8,#6366F1,#22D3EE,#38BDF8)] blur-md opacity-60 animate-spin-slow" />
                <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-background shadow-xl">
                  <img
                    src="https://github.com/rifkhan107.png"
                    alt="Mohamed Rifkhan"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://avatars.githubusercontent.com/u/44481068?v=4";
                    }}
                  />
                </div>

                {/* Orbiting tech icons */}
                <motion.div
                  className="absolute -inset-8 md:-inset-10 rounded-full border border-dashed border-rifkhan/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                >
                  {orbitIcons.map((tech, i) => (
                    <div
                      key={tech.name}
                      className="absolute"
                      style={{ ...orbitPositions[i] }}
                    >
                      <motion.div
                        className="flex w-9 h-9 md:w-10 md:h-10 items-center justify-center rounded-full bg-white shadow-lg shadow-rifkhan/20 border border-rifkhan/10 p-1.5"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                      >
                        <img src={tech.icon} alt={tech.name} className="w-full h-full object-contain" />
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
                {/* Status badge */}
                <motion.div
                  className="absolute bottom-1 right-1 flex items-center justify-center w-8 h-8 rounded-full bg-background shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, type: "spring", stiffness: 400, damping: 12 }}
                >
                  <span className="relative flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500" />
                  </span>
                </motion.div>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-rockybilly mb-4 text-gradient pb-4"
            >
              Mohamed Rifkhan
            </motion.h1>

            <motion.div variants={itemVariants} className="h-10 mb-6">
              <span className="text-xl md:text-2xl text-rifkhan font-medium inline-flex items-center">
                {typewriterText}
                <span className="w-0.5 h-6 bg-rifkhan ml-1 animate-pulse-slow" />
              </span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-8"
            >
              Transforming cloud infrastructure with innovative DevOps solutions.
              Specializing in AWS, Azure, Terraform, and Kubernetes.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center space-x-4 mb-8"
            >
              <Magnetic>
                <motion.a
                  href="#about"
                  className="btn-shine inline-block px-6 py-3 rounded-xl text-white font-medium shadow-lg shadow-rifkhan/30 bg-gradient-to-r from-sky-500 via-rifkhan to-indigo-500 bg-[length:200%_auto] animate-gradient-x"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Discover More
                </motion.a>
              </Magnetic>
              <Magnetic>
                <motion.a
                  href="#contact"
                  className="inline-block px-6 py-3 bg-transparent border border-rifkhan text-rifkhan rounded-xl font-medium hover:bg-rifkhan/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Get in Touch
                </motion.a>
              </Magnetic>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center space-x-6"
            >
              {[
                {
                  href: "https://github.com/rifkhan107",
                  label: "GitHub",
                  path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                },
                {
                  href: "https://www.linkedin.com/in/rifkhan107/",
                  label: "LinkedIn",
                  path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                },
                {
                  href: "https://x.com/rifkhan107",
                  label: "Twitter",
                  path: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                }
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-rifkhan transition-colors"
                  aria-label={social.label}
                  whileHover={{ scale: 1.25, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 12 }}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d={social.path} />
                  </svg>
                </motion.a>
              ))}
            </motion.div>

            {/* Animated stat counters */}
            <motion.div
              variants={itemVariants}
              className="mt-10 pt-8 border-t border-foreground/10 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                  <span className="text-xs md:text-sm text-foreground/60 mt-1 font-medium uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatedCard>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-0 right-0 flex justify-center"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <a
          href="#about"
          className="flex flex-col items-center text-foreground/60 hover:text-rifkhan transition-colors"
          aria-label="Scroll down"
        >
          <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-current animate-scroll-wheel" />
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
