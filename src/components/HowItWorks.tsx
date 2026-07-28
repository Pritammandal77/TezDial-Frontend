const STEPS = [
  {
    step: "01",
    title: "Search your need",
    body: "Type what you're looking for and your city. TezDial narrows it down instantly.",
  },
  {
    step: "02",
    title: "Compare verified options",
    body: "See ratings, distance, and pricing hints side by side — all phone-verified.",
  },
  {
    step: "03",
    title: "Connect instantly",
    body: "Call, WhatsApp, or get directions in one tap. No forms, no waiting.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 lg:px-12 py-20 lg:py-28">
      <p className="font-mono text-xs tracking-[0.2em] text-tez-orange uppercase mb-4">
        The process
      </p>
      <h2 className="font-display font-extrabold text-4xl lg:text-5xl tracking-tight text-ink max-w-xl">
        Three steps. That's it.
      </h2>

      <div className="mt-14 grid md:grid-cols-3 gap-0 md:divide-x divide-ink/10">
        {STEPS.map((s) => (
          <div key={s.step} className="md:px-8 first:pl-0 py-6 md:py-0">
            <span className="font-mono text-5xl font-medium text-tez-orange/25">
              {s.step}
            </span>
            <h3 className="mt-4 font-display font-bold text-xl text-ink">
              {s.title}
            </h3>
            <p className="mt-2 text-ink/60 text-sm leading-relaxed max-w-xs">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
