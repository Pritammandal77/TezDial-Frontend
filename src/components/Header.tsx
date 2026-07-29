"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Phone, Menu, X, PlusCircle, Compass } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/business/all/#categories" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "For Business", href: "/#for-business" },
];

const menuVariants: Variants = {
  closed: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      when: "afterChildren",
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  closed: { opacity: 0, y: -8 },
  open: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="hidden sm:flex items-center justify-between bg-ink text-mist/80 px-6 lg:px-12 py-2 font-mono text-xs tracking-wide">
        <div className="flex items-center gap-6">
          <a
            href="tel:+919881228004"
            className="flex items-center gap-2 hover:text-tez-gold transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-tez-orange" />
            +91 98812 28004
          </a>
        </div>
        <span className="text-mist/50">
          Chandrapur, Maharashtra &middot; Serving 48 cities
        </span>
      </div>

      {/* Main nav container needs relative for the absolute dropdown */}
      <header className="relative bg-paper/95 backdrop-blur border-b border-ink/10">
        <div className="flex items-center justify-between px-6 lg:px-12 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display font-extrabold text-2xl tracking-tight text-ink">
              Tez<span className="text-tez-orange">Dial</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-ink/80">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-tez-orange transition-colors"
              >
                {link.label}
              </a>
            ))}

            <Link
              href="/business/all"
              className="flex items-center gap-1.5 hover:text-tez-orange transition-colors"
            >
              <Compass className="w-4 h-4 text-tez-orange" />
              Explore
            </Link>
          </nav>

          <div className="hidden md:block">
            <Link
              href="/business/new"
              className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-tez-orange transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              List Your Business
            </Link>
          </div>

          {/* Animated Hamburger Toggle */}
          <button
            className="md:hidden p-2 text-ink rounded-lg focus:outline-none focus:ring-2 focus:ring-tez-orange/40"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <motion.div
              animate={{ rotate: menuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-tez-orange" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.div>
          </button>
        </div>

        {/* Floating Mobile Navigation Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="absolute top-full left-0 right-0 md:hidden bg-paper/98 backdrop-blur-md border-b border-ink/10 px-6 py-4 font-medium text-sm text-ink/80 shadow-xl"
            >
              <div className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <motion.div key={link.href} variants={itemVariants}>
                    <a
                      href={link.href}
                      className="block py-2.5 border-b border-ink/5 hover:text-tez-orange transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  </motion.div>
                ))}

                <motion.div variants={itemVariants}>
                  <Link
                    href="/business/all"
                    className="flex items-center gap-2 py-2.5 border-b border-ink/5 hover:text-tez-orange transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Compass className="w-4 h-4 text-tez-orange" />
                    Explore
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-3 pb-2">
                  <Link
                    href="/business/new"
                    className="w-full inline-flex justify-center items-center gap-2 bg-ink text-paper px-5 py-3 rounded-xl text-sm font-semibold hover:bg-tez-orange transition-colors shadow-sm"
                    onClick={() => setMenuOpen(false)}
                  >
                    <PlusCircle className="w-4 h-4" />
                    List Your Business
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}