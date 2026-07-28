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
  return (
    <div>
      <h3 className="font-display font-bold text-lg text-ink mb-4">
        Browse by category
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
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
      className={`relative shrink-0 w-28 h-24 rounded-xl overflow-hidden group ${
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
      <span className="relative h-full flex items-end p-2 font-mono text-[11px] leading-tight text-paper text-left">
        {label}
      </span>
    </button>
  );
}
