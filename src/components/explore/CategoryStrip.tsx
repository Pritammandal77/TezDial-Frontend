"use client";

import { useRef } from "react";

export const CATEGORIES = [
  "Restaurants & Cafes",
  "Electricians & Plumbers",
  "Doctors & Clinics",
  "Home Repair",
  "Grocery & Daily Needs",
  "Salons & Spas",
  "Real Estate",
  "Education & Tutors",
  "Automotive",
  "Fitness & Gyms",
  "Event Planners",
  "Legal & Finance",
];

export default function CategoryStrip({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (category: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-lg text-ink">
          Browse by category
        </h3>

        {/* Navigation Buttons (Visible on mobile/tablet, hidden on XL grid) */}
        <div className="flex items-center gap-1.5 xl:hidden">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="p-1.5 rounded-full bg-mist/60 hover:bg-mist text-ink/70 hover:text-ink transition-colors"
          >
            <ChevronLeftIcon />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="p-1.5 rounded-full bg-mist/60 hover:bg-mist text-ink/70 hover:text-ink transition-colors"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      {/* Scrollable Container (Hidden scrollbar via utility classes) */}
      <div
        ref={scrollRef}
        className="flex xl:grid xl:grid-cols-7 gap-3 overflow-x-auto xl:overflow-visible scroll-smooth scrollbar-none [&::-webkit-scrollbar]:hidden -mx-1 px-1 xl:mx-0 xl:px-0"
      >
        <FilterBox
          label="All Categories"
          image="https://picsum.photos/seed/tezdial-cat-all/200/200"
          active={active === ""}
          onClick={() => onSelect("")}
        />
        {CATEGORIES.map((c) => (
          <FilterBox
            key={c}
            label={c}
            image={`https://picsum.photos/seed/tezdial-cat-${encodeURIComponent(
              c
            )}/200/200`}
            active={active === c}
            onClick={() => onSelect(active === c ? "" : c)}
          />
        ))}
      </div>
    </div>
  );
}

function FilterBox({
  label,
  image,
  active,
  onClick,
}: {
  label: string;
  image: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative shrink-0 xl:shrink w-28 xl:w-auto h-24 rounded-xl overflow-hidden group transition-all ${
        active ? "ring-2 ring-tez-orange" : ""
      }`}
    >
      <img
        src={image}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className={`absolute inset-0 transition-colors ${
          active ? "bg-tez-orange/60" : "bg-ink/55 group-hover:bg-ink/65"
        }`}
      />
      <span className="relative h-full flex items-end p-2.5 font-mono text-[11px] leading-tight text-paper text-left">
        {label}
      </span>
    </button>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}