const TESTIMONIALS = [
  {
    quote:
      "Found a plumber in Chandrapur within four minutes flat. No calling five different shops and hoping one picks up.",
    name: "Aarti K.",
    city: "Chandrapur",
    category: "Home Repair",
  },
  {
    quote:
      "I listed my clinic on a Tuesday and had three new patients by the weekend. The verified badge actually builds trust.",
    name: "Dr. Milind R.",
    city: "Nagpur",
    category: "Healthcare",
  },
  {
    quote:
      "The category filters actually work. I searched 'tiffin service' and got real, active vendors — not dead listings.",
    name: "Sanika P.",
    city: "Pune",
    category: "Food & Catering",
  },
  {
    quote:
      "My salon's bookings doubled in a month. People message on WhatsApp straight from the listing — no back and forth.",
    name: "Rutuja D.",
    city: "Nashik",
    category: "Salon & Spa",
  },
  {
    quote:
      "Compared three electricians side by side, ratings and all, before calling anyone. Took less time than making chai.",
    name: "Vikram S.",
    city: "Mumbai",
    category: "Electrician",
  },
  {
    quote:
      "As a small tutor with no website, TezDial is basically my entire online presence now. Free listing, real leads.",
    name: "Neha J.",
    city: "Aurangabad",
    category: "Education",
  },
  {
    quote:
      "Needed a mover on short notice on a Sunday. Found one, verified, in the same city, within the hour.",
    name: "Faisal A.",
    city: "Amravati",
    category: "Movers & Packers",
  },
  {
    quote:
      "The rating system feels honest. Not five stars across the board — you can tell people actually leave real feedback.",
    name: "Priya M.",
    city: "Kolhapur",
    category: "Real Estate",
  },
  {
    quote:
      "Our gym gets walk-ins now who say they found us on TezDial first, before even seeing the signage outside.",
    name: "Om T.",
    city: "Nagpur",
    category: "Fitness & Gyms",
  },
];

const ROW_1 = TESTIMONIALS.slice(0, 5);
const ROW_2 = TESTIMONIALS.slice(4).concat(TESTIMONIALS.slice(0, 1));

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 overflow-hidden">
      <div className="px-6 lg:px-12">
        <p className="font-mono text-xs tracking-[0.2em] text-tez-orange uppercase mb-4">
          Word on the street
        </p>
        <h2 className="font-display font-extrabold text-4xl lg:text-5xl tracking-tight text-ink max-w-xl">
          People actually use this.
        </h2>
      </div>

      <div className="mt-14 space-y-5">
        <MarqueeRow items={ROW_1} direction="left" />
        <MarqueeRow items={ROW_2} direction="right" />
      </div>
    </section>
  );
}

function MarqueeRow({
  items,
  direction,
}: {
  items: typeof TESTIMONIALS;
  direction: "left" | "right";
}) {
  const doubled = [...items, ...items];

  return (
    <div
      className="relative"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className={`flex gap-5 w-max ${
          direction === "left"
            ? "tez-marquee-track"
            : "tez-marquee-track-reverse"
        }`}
      >
        {doubled.map((t, i) => (
          <figure
            key={`${t.name}-${i}`}
            className="w-80 shrink-0 bg-mist/40 rounded-2xl p-6 flex flex-col justify-between hover:bg-mist/70 transition-colors"
          >
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wide text-tez-orange">
                {t.category}
              </span>
              <blockquote className="mt-2 text-ink/80 text-sm leading-relaxed">
                "{t.quote}"
              </blockquote>
            </div>
            <figcaption className="mt-6 flex items-center gap-2 font-mono text-xs text-ink/50">
              <span className="w-7 h-7 rounded-full bg-tez-orange/15 text-tez-orange flex items-center justify-center font-display font-bold text-[11px] shrink-0">
                {t.name.charAt(0)}
              </span>
              {t.name} · {t.city}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}