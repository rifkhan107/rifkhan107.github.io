import { Heart, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "./ui/Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-accent">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rifkhan to-transparent" />

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Logo size={48} animated={false} />
            <div className="ml-3">
              <span className="text-lg font-bold tracking-tight text-gradient">
                Mohamed Rifkhan
              </span>
              <p className="text-sm text-foreground/60 mt-0.5">
                DevOps Engineer • Cloud Specialist
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-6 text-foreground/70"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-sm">
              © {currentYear} • Crafted with
              <Heart className="inline-block w-4 h-4 mx-1 text-rifkhan animate-pulse-slow" />
              in Sri Lanka 🇱🇰
            </p>

            <motion.button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-3 rounded-full bg-rifkhan text-white shadow-lg shadow-rifkhan/30"
              whileHover={{ y: -4, scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
