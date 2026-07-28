const QUICK_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Categories", href: "#categories" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Featured Businesses", href: "#businesses" },
  { label: "For Business", href: "#for-business" },
];

const POPULAR_CATEGORIES = [
  "Restaurants",
  "Electricians",
  "Salons & Spas",
  "Doctors & Clinics",
  "Real Estate",
  "Fitness & Gyms",
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper px-6 lg:px-12 pt-16 pb-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <span className="font-display font-extrabold text-2xl tracking-tight">
            Tez<span className="text-tez-orange">Dial</span>
          </span>
          <p className="mt-4 text-sm text-paper/60 leading-relaxed max-w-xs">
            One search for every local business. Verified listings, real
            reviews, instant connections.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-wide text-paper/40 mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm text-paper/70">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-tez-orange transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-wide text-paper/40 mb-4">
            Popular Categories
          </h4>
          <ul className="space-y-2.5 text-sm text-paper/70">
            {POPULAR_CATEGORIES.map((c) => (
              <li key={c}>
                <a href="#categories" className="hover:text-tez-orange transition-colors">
                  {c}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-wide text-paper/40 mb-4">
            Contact
          </h4>
          <ul className="space-y-2.5 text-sm text-paper/70 font-mono">
            <li>Chandrapur, Maharashtra</li>
            <li>
              <a href="tel:+919876543210" className="hover:text-tez-orange transition-colors">
                +91 98765 43210
              </a>
            </li>
            <li>
              <a href="mailto:hello@tezdial.in" className="hover:text-tez-orange transition-colors">
                hello@tezdial.in
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-14 pt-6 border-t border-paper/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-paper/40 font-mono">
        <span>© 2026 TezDial. All rights reserved.</span>
        <span>Built for finding things, fast.</span>
      </div>
    </footer>
  );
}
