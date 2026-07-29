"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const PERKS = [
  "Free basic listing, always",
  "Verified badge builds customer trust",
  "Show up in local search results",
];

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export default function CTA() {
  return (
    <section id="for-business" className="px-6 lg:px-12 py-20 lg:py-28 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-tez-yellow rounded-3xl px-8 py-14 lg:px-16 lg:py-16 overflow-hidden"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-12deg, #16130F 0px, #16130F 1px, transparent 1px, transparent 48px)",
          }}
        />
        <div className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
          <div>
            <h2 className="font-display font-extrabold text-4xl lg:text-5xl tracking-tight text-ink">
              Grow your business with TezDial.
            </h2>
            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="mt-6 space-y-2"
            >
              {PERKS.map((p) => (
                <motion.li
                  key={p}
                  variants={itemVariants}
                  className="flex items-center gap-2 text-ink/80 font-medium text-sm"
                >
                  <CheckIcon />
                  {p}
                </motion.li>
              ))}
            </motion.ul>
          </div>
          <div className="flex lg:justify-end">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/business/new"
                className="inline-flex items-center justify-center gap-2 bg-ink text-paper px-8 py-4 rounded-full font-semibold text-sm hover:bg-paper hover:text-ink transition-colors shadow-lg"
              >
                List Your Business — It's Free
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0 text-ink">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}