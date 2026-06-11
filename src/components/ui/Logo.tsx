import { motion } from "framer-motion";

interface LogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

const draw = (delay: number) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay, duration: 1.2, ease: [0.65, 0, 0.35, 1] },
      opacity: { delay, duration: 0.2 },
    },
  },
});

const Logo = ({ size = 44, animated = true, className }: LogoProps) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={animated ? "hidden" : "visible"}
      animate="visible"
      whileHover={{ scale: 1.08, rotate: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="0.5" stopColor="#0EA5E9" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>
        <linearGradient id="logo-gradient-soft" x1="8" y1="56" x2="56" y2="8" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" stopOpacity="0.25" />
          <stop offset="1" stopColor="#6366F1" stopOpacity="0.25" />
        </linearGradient>
      </defs>

      {/* Soft inner hexagon fill */}
      <motion.path
        d="M32 7 L53.6 19.5 V44.5 L32 57 L10.4 44.5 V19.5 Z"
        fill="url(#logo-gradient-soft)"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { delay: 0.6, duration: 0.6, ease: "easeOut" },
          },
        }}
        style={{ transformOrigin: "32px 32px" }}
      />

      {/* Hexagon outline */}
      <motion.path
        d="M32 4 L56.25 18 V46 L32 60 L7.75 46 V18 Z"
        stroke="url(#logo-gradient)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={draw(0)}
      />

      {/* R monogram — stem + bowl */}
      <motion.path
        d="M25 45 V19 H34 C39.5 19 43 22.6 43 27 C43 31.4 39.5 35 34 35 H25"
        stroke="url(#logo-gradient)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={draw(0.4)}
      />

      {/* R leg */}
      <motion.path
        d="M34 35 L43 45"
        stroke="url(#logo-gradient)"
        strokeWidth="4"
        strokeLinecap="round"
        variants={draw(0.9)}
      />

      {/* Orbiting node — nods to cloud/devops */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "32px 32px" }}
      >
        <motion.circle
          cx="56.25"
          cy="18"
          r="3"
          fill="#0EA5E9"
          variants={{
            hidden: { opacity: 0, scale: 0 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { delay: 1.2, type: "spring", stiffness: 400, damping: 12 },
            },
          }}
        />
      </motion.g>
    </motion.svg>
  );
};

export default Logo;
