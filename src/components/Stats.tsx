"use client";

import { motion, Variants } from "framer-motion";

const STATS = [
  { value: "12,400+", label: "Businesses listed" },
  { value: "48", label: "Cities covered" },
  { value: "3.8L+", label: "Verified reviews" },
  { value: "99.2%", label: "Search uptime" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const statVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Stats() {
  return (
    <section className="bg-ink text-paper px-6 lg:px-12 py-16 lg:py-20 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-10"
      >
        {STATS.map((s) => (
          <motion.div
            key={s.label}
            variants={statVariants}
            className="text-center lg:text-left"
          >
            <div className="font-display font-extrabold text-4xl lg:text-5xl text-tez-gold">
              {s.value}
            </div>
            <div className="mt-2 text-sm text-paper/60 font-mono">
              {s.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}