"use client";

import { useEffect, useState, useCallback } from "react";

const SLIDES = [
  {
    title: "Find any business, instantly.",
    subtitle:
      "TezDial puts 12,400+ verified local businesses one search away.",
    image: "https://picsum.photos/seed/tezdial-slide-1/1600/700",
  },
  {
    title: "Verified listings. Real reviews.",
    subtitle: "Every business phone-verified before it ever goes live.",
    image: "https://picsum.photos/seed/tezdial-slide-2/1600/700",
  },
  {
    title: "48 cities and growing.",
    subtitle: "From Chandrapur to Mumbai, TezDial is expanding every month.",
    image: "https://picsum.photos/seed/tezdial-slide-3/1600/700",
  },
  {
    title: "List your business, free.",
    subtitle: "Get discovered by customers actively searching near you.",
    image: "https://picsum.photos/seed/tezdial-slide-4/1600/700",
  },
];

const AUTOPLAY_MS = 5500;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  const goTo = useCallback((i: number) => {
    setIndex((i + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-95 sm:h-110 lg:h-130 overflow-hidden rounded-3xl">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.title}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={i !== index}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/40 to-ink/10" />
          <div
            aria-hidden
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-12deg, #F6F1E7 0px, #F6F1E7 1px, transparent 1px, transparent 64px)",
            }}
          />
          <div className="relative h-full flex flex-col justify-end px-6 sm:px-10 lg:px-14 pb-10 sm:pb-14 max-w-xl">
            <p className="font-mono text-xs tracking-[0.2em] text-tez-gold uppercase mb-3">
              TezDial
            </p>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-paper leading-tight">
              {slide.title}
            </h2>
            <p className="mt-3 text-paper/70 text-sm sm:text-base max-w-md">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* Nav buttons */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-paper/90 text-ink flex items-center justify-center hover:bg-tez-orange hover:text-paper transition-colors"
      >
        <ChevronIcon direction="left" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-paper/90 text-ink flex items-center justify-center hover:bg-tez-orange hover:text-paper transition-colors"
      >
        <ChevronIcon direction="right" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 right-6 sm:right-10 lg:right-14 flex gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.title}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index
                ? "w-6 bg-tez-orange"
                : "w-1.5 bg-paper/50 hover:bg-paper/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      {direction === "left" ? (
        <path d="m15 18-6-6 6-6" />
      ) : (
        <path d="m9 18 6-6-6-6" />
      )}
    </svg>
  );
}
