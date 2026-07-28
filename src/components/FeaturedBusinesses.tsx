const BUSINESSES = [
  { name: "Sharma Electricals", category: "Electrician", city: "Nagpur", rating: "4.8" },
  { name: "Glow & Grace Salon", category: "Salon & Spa", city: "Pune", rating: "4.7" },
  { name: "City Care Clinic", category: "Healthcare", city: "Chandrapur", rating: "4.9" },
  { name: "Annapurna Tiffins", category: "Food & Catering", city: "Nashik", rating: "4.6" },
  { name: "Patil Real Estate", category: "Real Estate", city: "Mumbai", rating: "4.5" },
  { name: "FitZone Gym", category: "Fitness", city: "Aurangabad", rating: "4.7" },
];

export default function FeaturedBusinesses() {
  return (
    <section id="businesses" className="px-6 lg:px-12 py-20 lg:py-28 bg-mist/40">
      <p className="font-mono text-xs tracking-[0.2em] text-tez-orange uppercase mb-4">
        On TezDial
      </p>
      <h2 className="font-display font-extrabold text-4xl lg:text-5xl tracking-tight text-ink max-w-xl">
        Featured local businesses.
      </h2>

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {BUSINESSES.map((b) => (
          <div
            key={b.name}
            className="bg-paper rounded-2xl p-6 hover:-translate-y-1 transition-transform shadow-sm hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-tez-orange/15 text-tez-orange flex items-center justify-center font-display font-bold text-lg">
                {b.name.charAt(0)}
              </div>
              <span className="font-mono text-xs text-tez-forest bg-tez-forest/10 px-2.5 py-1 rounded-full">
                Verified
              </span>
            </div>
            <h3 className="mt-4 font-display font-bold text-lg text-ink">
              {b.name}
            </h3>
            <p className="text-sm text-ink/50">{b.category}</p>
            <div className="mt-4 flex items-center justify-between font-mono text-xs pt-4 border-t border-ink/10">
              <span className="text-tez-gold font-medium">★ {b.rating}</span>
              <span className="text-ink/40">{b.city}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
