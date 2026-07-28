const CATEGORIES = [
  { name: "Restaurants & Cafes", count: "1,240" },
  { name: "Electricians & Plumbers", count: "990" },
  { name: "Doctors & Clinics", count: "920" },
  { name: "Home Repair", count: "860" },
  { name: "Grocery & Daily Needs", count: "710" },
  { name: "Salons & Spas", count: "610" },
  { name: "Real Estate", count: "540" },
  { name: "Education & Tutors", count: "430" },
  { name: "Automotive", count: "380" },
  { name: "Fitness & Gyms", count: "330" },
  { name: "Event Planners", count: "275" },
  { name: "Legal & Finance", count: "190" },
];

export default function Categories() {
  return (
    <section id="categories" className="px-6 lg:px-12 py-20 lg:py-28 bg-mist/40">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="font-mono text-xs tracking-[0.2em] text-tez-orange uppercase mb-4">
            Browse
          </p>
          <h2 className="font-display font-extrabold text-4xl lg:text-5xl tracking-tight text-ink">
            Every category, covered.
          </h2>
        </div>
        <a
          href="#businesses"
          className="text-sm font-semibold text-ink hover:text-tez-orange transition-colors underline underline-offset-4"
        >
          See all categories
        </a>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 rounded-2xl overflow-hidden">
        {CATEGORIES.map((c) => (
          <a
            key={c.name}
            href="#businesses"
            className="group bg-paper p-6 flex items-center justify-between hover:bg-ink transition-colors"
          >
            <span className="font-display font-bold text-lg text-ink group-hover:text-paper transition-colors">
              {c.name}
            </span>
            <span className="font-mono text-xs text-ink/40 group-hover:text-tez-gold transition-colors">
              {c.count}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
