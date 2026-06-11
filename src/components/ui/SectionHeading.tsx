import { motion } from "framer-motion";

interface SectionHeadingProps {
  chip: string;
  title: string;
  description?: string;
}

const SectionHeading = ({ chip, title, description }: SectionHeadingProps) => {
  const words = title.split(" ");

  return (
    <div className="text-center mb-16">
      <motion.span
        className="chip mb-4"
        initial={{ opacity: 0, scale: 0.7, y: 12 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      >
        {chip}
      </motion.span>

      <h2 className="text-3xl md:text-4xl font-bold relative inline-block w-full">
        <span className="sr-only">{title}</span>
        <motion.span
          aria-hidden
          className="inline-flex flex-wrap justify-center gap-x-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
        >
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 24, rotateX: 60, filter: "blur(6px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.span>
      </h2>

      <motion.div
        className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-sky-400 via-rifkhan to-indigo-500"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      {description && (
        <motion.p
          className="max-w-2xl mx-auto text-foreground/70 mt-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
