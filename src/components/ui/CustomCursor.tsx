import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Gradient cursor glow: a dot that tracks the pointer 1:1 and a spring-lagged
 * ring that expands over interactive elements. Desktop (fine pointer) only.
 */
const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 250, damping: 25, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 250, damping: 25, mass: 0.6 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as Element | null;
      setHovering(!!target?.closest("a, button, [role='button'], input, textarea, select"));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 z-[100] pointer-events-none rounded-full border border-rifkhan/60"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 52 : 32,
          height: hovering ? 52 : 32,
          opacity: hovering ? 0.9 : 0.5,
          backgroundColor: hovering ? "rgba(14, 165, 233, 0.08)" : "rgba(14, 165, 233, 0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
      {/* Core dot */}
      <motion.div
        className="fixed top-0 left-0 z-[100] pointer-events-none w-2 h-2 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 shadow-[0_0_12px_rgba(14,165,233,0.8)]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
};

export default CustomCursor;
