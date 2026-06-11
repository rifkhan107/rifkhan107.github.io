import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

/** Fades content in with a blur + rise as it scrolls into view. */
export const Reveal = ({ children, className, delay = 0, y = 32, once = true }: RevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y, filter: "blur(8px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once, margin: "-80px" }}
    transition={{ duration: 0.8, delay, ease: easeOutExpo }}
  >
    {children}
  </motion.div>
);

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

interface StaggerProps {
  children: ReactNode;
  className?: string;
  once?: boolean;
}

/** Container that reveals its <StaggerItem> children one after another. */
export const Stagger = ({ children, className, once = true }: StaggerProps) => (
  <motion.div
    className={className}
    variants={staggerContainer}
    initial="hidden"
    whileInView="visible"
    viewport={{ once, margin: "-80px" }}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className }: { children: ReactNode; className?: string }) => (
  <motion.div className={className} variants={staggerItem}>
    {children}
  </motion.div>
);
