import { useEffect, useRef } from "react";
import { useTheme } from "@/components/ui/ThemeProvider";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const LINK_DISTANCE = 130;
const MOUSE_RADIUS = 180;

/**
 * Interactive constellation background: drifting nodes connected by lines,
 * with gentle repulsion and brighter links near the cursor.
 */
const ParticleNetwork = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;

    const isDark = theme === "dark";
    const dotColor = isDark ? "148, 197, 255" : "14, 116, 200";
    const linkColor = isDark ? "125, 165, 240" : "14, 165, 233";

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.floor((width * height) / 16000), 110);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: 1 + Math.random() * 1.8,
      }));
    };

    const onPointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onPointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // Gentle repulsion from the cursor
        const dxm = p.x - mouse.x;
        const dym = p.y - mouse.y;
        const distM = Math.hypot(dxm, dym);
        if (distM < MOUSE_RADIUS && distM > 0.01) {
          const force = (MOUSE_RADIUS - distM) / MOUSE_RADIUS;
          p.vx += (dxm / distM) * force * 0.06;
          p.vy += (dym / distM) * force * 0.06;
        }

        // Drift + soft speed cap
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;
        const speed = Math.hypot(p.vx, p.vy);
        if (speed < 0.15) {
          p.vx += (Math.random() - 0.5) * 0.04;
          p.vy += (Math.random() - 0.5) * 0.04;
        }

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotColor}, ${isDark ? 0.55 : 0.45})`;
        ctx.fill();
      }

      // Links between nearby particles, brighter near the cursor
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            const midX = (a.x + b.x) / 2;
            const midY = (a.y + b.y) / 2;
            const mouseDist = Math.hypot(midX - mouse.x, midY - mouse.y);
            const nearMouse = Math.max(0, 1 - mouseDist / (MOUSE_RADIUS * 1.6));
            const alpha = (1 - dist / LINK_DISTANCE) * (isDark ? 0.16 : 0.12) + nearMouse * 0.25;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${linkColor}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-0 ${className ?? ""}`}
      aria-hidden
    />
  );
};

export default ParticleNetwork;
