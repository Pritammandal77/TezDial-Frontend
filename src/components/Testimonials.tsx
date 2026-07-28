const TESTIMONIALS = [
  {
    quote:
      "Found a plumber in Chandrapur within four minutes flat. No calling five different shops and hoping one picks up.",
    name: "Aarti K.",
    city: "Chandrapur",
  },
  {
    quote:
      "I listed my clinic on a Tuesday and had three new patients by the weekend. The verified badge actually builds trust.",
    name: "Dr. Milind R.",
    city: "Nagpur",
  },
  {
    quote:
      "The category filters actually work. I searched 'tiffin service' and got real, active vendors — not dead listings.",
    name: "Sanika P.",
    city: "Pune",
  },
];

export default function Testimonials() {
  return (
    <section className="px-6 lg:px-12 py-20 lg:py-28">
      <p className="font-mono text-xs tracking-[0.2em] text-tez-orange uppercase mb-4">
        Word on the street
      </p>
      <h2 className="font-display font-extrabold text-4xl lg:text-5xl tracking-tight text-ink max-w-xl">
        People actually use this.
      </h2>

      <div className="mt-14 grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            className="bg-mist/40 rounded-2xl p-7 flex flex-col justify-between"
          >
            <blockquote className="text-ink/80 leading-relaxed">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 font-mono text-xs text-ink/50">
              {t.name} · {t.city}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
