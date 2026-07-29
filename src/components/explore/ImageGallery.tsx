"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";

export default function ImageGallery({
  images,
  alt,
}: {
  images: (string | undefined)[];
  alt: string;
}) {
  const validImages = images.filter((img): img is string => Boolean(img));
  const [active, setActive] = useState(0);

  if (validImages.length === 0) {
    return (
      <div className="aspect-[4/3] rounded-2xl bg-mist/50 flex flex-col items-center justify-center text-ink/30 font-mono text-sm gap-2">
        <ImageOff className="w-8 h-8 opacity-40" />
        <span>No image available</span>
      </div>
    );
  }

  const handlePrev = () => {
    setActive((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActive((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div>
      {/* Main Image Container */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-mist/40 group">
        <img
          src={validImages[active]}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
        />

        {/* Previous / Next Lucide Navigation Buttons */}
        {validImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-paper/80 backdrop-blur-md text-ink hover:bg-paper hover:scale-105 transition-all flex items-center justify-center shadow-md focus:outline-none focus:ring-2 focus:ring-tez-orange"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-paper/80 backdrop-blur-md text-ink hover:bg-paper hover:scale-105 transition-all flex items-center justify-center shadow-md focus:outline-none focus:ring-2 focus:ring-tez-orange"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Floating Image Counter Badge */}
            <div className="absolute bottom-3 right-3 bg-ink/70 text-paper text-xs font-mono px-2.5 py-1 rounded-full backdrop-blur-sm pointer-events-none">
              {active + 1} / {validImages.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails list */}
      {validImages.length > 1 && (
        <div className="mt-3 flex gap-3">
          {validImages.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              className={`relative w-20 h-16 rounded-lg overflow-hidden transition-all ${
                active === i
                  ? "ring-2 ring-tez-orange opacity-100"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}