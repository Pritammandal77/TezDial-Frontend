"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

export const CITIES = [
  "Nagpur",
  "Pune",
  "Mumbai",
  "Chandrapur",
  "Nashik",
  "Aurangabad",
  "Amravati",
  "Kolhapur",
];

export default function CityStrip({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (city: string) => void;
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
          Browse by city
        </h3>

        {/* Navigation Buttons (Visible on mobile/tablet/desktop, hidden on XL grid) */}
        <div className="flex items-center gap-1.5 xl:hidden">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="p-1.5 rounded-full bg-mist/60 hover:bg-mist text-ink/70 hover:text-ink transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="p-1.5 rounded-full bg-mist/60 hover:bg-mist text-ink/70 hover:text-ink transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Scrollable Container (Hidden scrollbar via utility classes, 9-col grid on XL) */}
      <div
        ref={scrollRef}
        className="flex xl:grid xl:grid-cols-9 gap-3 overflow-x-auto xl:overflow-visible scroll-smooth scrollbar-none [&::-webkit-scrollbar]:hidden -mx-1 px-1 xl:mx-0 xl:px-0"
      >
        <FilterBox
          label="All Cities"
          image="https://picsum.photos/seed/tezdial-city-all/200/200"
          active={active === ""}
          onClick={() => onSelect("")}
        />
        {CITIES.map((c) => (
          <FilterBox
            key={c}
            label={c}
            image={`https://picsum.photos/seed/tezdial-city-${encodeURIComponent(
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