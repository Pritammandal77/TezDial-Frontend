"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Categories", href: "#categories" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Businesses", href: "#businesses" },
  { label: "For Business", href: "#for-business" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="hidden sm:flex items-center justify-between bg-ink text-mist/80 px-6 lg:px-12 py-2 font-mono text-xs tracking-wide">
        <div className="flex items-center gap-6">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 hover:text-tez-gold transition-colors"
          >
            <PhoneIcon />
            +91 98765 43210
          </a>
          <a
            href="mailto:hello@tezdial.in"
            className="flex items-center gap-2 hover:text-tez-gold transition-colors"
          >
            <MailIcon />
            hello@tezdial.in
          </a>
        </div>
        <span className="text-mist/50">
          Chandrapur, Maharashtra &middot; Serving 48 cities
        </span>
      </div>

      {/* Main nav */}
      <header className="bg-paper/95 backdrop-blur border-b border-ink/10">
        <div className="flex items-center justify-between px-6 lg:px-12 py-4">
          <a href="#hero" className="flex items-center gap-2">
            <span className="font-display font-extrabold text-2xl tracking-tight text-ink">
              Tez<span className="text-tez-orange">Dial</span>
            </span>
          </a>

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
          </nav>

          <div className="hidden md:block">
            <Link href="/business/new"
              className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-tez-orange transition-colors"
            >
              List Your Business
            </Link>
          </div>

          <button
            className="md:hidden text-ink"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden flex flex-col gap-1 px-6 pb-5 font-medium text-sm text-ink/80">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-2 border-b border-ink/10 last:border-0"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/business/new"
              className="mt-3 inline-flex justify-center items-center gap-2 bg-ink text-paper px-5 py-2.5 rounded-full text-sm font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              List Your Business
            </Link>
          </nav>
        )}
      </header>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16v16H4z" opacity="0" />
      <path d="M22 6 12 13 2 6" />
      <path d="M2 6h20v12H2z" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  );
}
