"use client";

import { motion, Variants } from "framer-motion";

const VALUES = [
  {
    title: "Verified Listings",
    body: "Every business is phone-verified before it goes live. No ghost listings, no dead numbers.",
  },
  {
    title: "Real Reviews",
    body: "Ratings come from real customers who've actually used the service — never paid placements.",
  },
  {
    title: "Instant Connect",
    body: "Call, message on WhatsApp, or pull up directions — all in one tap, no middleman.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function About() {
  return (
    <section className="px-6 lg:px-12 py-20 lg:py-28 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-2xl"
      >
        <p className="font-mono text-xs tracking-[0.2em] text-tez-orange uppercase mb-4">
          Why TezDial
        </p>
        <h2 className="font-display font-extrabold text-4xl lg:text-5xl tracking-tight text-ink">
          One search. Every local business.
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-50px" }}
        className="mt-14 grid sm:grid-cols-3 gap-8"
      >
        {VALUES.map((v) => (
          <motion.div key={v.title} variants={itemVariants}>
            <div className="tez-speedline w-10 mb-4" />
            <h3 className="font-display font-bold text-xl text-ink">
              {v.title}
            </h3>
            <p className="mt-2 text-ink/60 text-sm leading-relaxed">
              {v.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}