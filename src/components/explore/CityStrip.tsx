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
  return (
    <div>
      <h3 className="font-display font-bold text-lg text-ink mb-4">
        Browse by city
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
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
