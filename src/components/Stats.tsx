const STATS = [
  { value: "12,400+", label: "Businesses listed" },
  { value: "48", label: "Cities covered" },
  { value: "3.8L+", label: "Verified reviews" },
  { value: "99.2%", label: "Search uptime" },
];

export default function Stats() {
  return (
    <section className="bg-ink text-paper px-6 lg:px-12 py-16 lg:py-20">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
        {STATS.map((s) => (
          <div key={s.label} className="text-center lg:text-left">
            <div className="font-display font-extrabold text-4xl lg:text-5xl text-tez-gold">
              {s.value}
            </div>
            <div className="mt-2 text-sm text-paper/60 font-mono">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
