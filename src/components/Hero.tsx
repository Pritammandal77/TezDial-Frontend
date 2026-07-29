"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { Search, MapPin, Star, CheckCircle2 } from "lucide-react";

const CATEGORIES = [
  "Restaurants",
  "Electricians",
  "Salons & Spas",
  "Doctors & Clinics",
  "Real Estate",
  "Tutors",
  "Movers & Packers",
  "Event Planners",
  "Car Repair",
  "Grocery Delivery",
  "Gyms",
  "Photographers",
];

const STATS = [
  { value: "12,400+", label: "Businesses" },
  { value: "48", label: "Cities" },
  { value: "2.1L+", label: "Monthly Searches" },
  { value: "4.6★", label: "Avg. Rating" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Hero() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");

  const handleSearch = (e?: FormEvent, selectedCategory?: string) => {
    if (e) e.preventDefault();

    const queryTerm = selectedCategory ?? category;
    const params = new URLSearchParams();

    if (queryTerm.trim()) params.set("search", queryTerm.trim());
    if (city.trim()) params.set("city", city.trim());

    const queryString = params.toString();

    const destination = queryString
      ? `/business/all?${queryString}#listings`
      : `/business/all#listings`;

    router.push(destination);
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-ink text-paper">
      {/* ambient speed lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-12deg, #F6F1E7 0px, #F6F1E7 1px, transparent 1px, transparent 64px)",
        }}
      />

      <div className="relative px-6 lg:px-12 pt-16 pb-14 lg:pt-24 lg:pb-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
        >
          <motion.p
            variants={itemVariants}
            className="font-mono text-xs tracking-[0.2em] text-tez-gold uppercase mb-5"
          >
            Local search, reimagined
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
          >
            Find it.
            <br />
            <span className="text-tez-orange">Fast.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg text-paper/70 max-w-md"
          >
            TezDial connects you to verified local businesses — electricians,
            salons, doctors, and everything in between — in seconds, not
            scrolls.
          </motion.p>

          {/* Search form */}
          <motion.form
            variants={itemVariants}
            className="mt-9 bg-paper rounded-2xl p-2.5 flex flex-col sm:flex-row gap-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
            onSubmit={handleSearch}
          >
            <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-mist/50">
              <Search className="w-4 h-4 text-ink/40 shrink-0" />
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="What are you looking for?"
                className="w-full bg-transparent text-ink placeholder:text-ink/40 text-sm outline-none font-body"
              />
            </div>
            <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-mist/50 sm:max-w-45">
              <MapPin className="w-4 h-4 text-ink/40 shrink-0" />
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="w-full bg-transparent text-ink placeholder:text-ink/40 text-sm outline-none font-body"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-buttons text-paper font-semibold text-sm px-7 py-3 rounded-xl hover:bg-tez-orange-dim transition-colors cursor-pointer"
            >
              Search Now
            </motion.button>
          </motion.form>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-lg"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-mono text-2xl font-medium text-tez-gold">
                  {s.value}
                </div>
                <div className="text-xs text-paper/50 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right visual mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="hidden lg:block relative h-105"
        >
          <BusinessCardMock
            className="absolute top-0 right-6"
            initialRotation={4}
            floatDelay={0}
            name="Sharma Electricals"
            category="Electrician"
            rating="4.8"
            city="Nagpur"
          />
          <BusinessCardMock
            className="absolute top-28 right-24"
            initialRotation={-6}
            floatDelay={0.5}
            name="Glow & Grace Salon"
            category="Salon & Spa"
            rating="4.7"
            city="Pune"
          />
          <BusinessCardMock
            className="absolute top-56 right-0"
            initialRotation={2}
            floatDelay={1}
            name="City Care Clinic"
            category="Healthcare"
            rating="4.9"
            city="Chandrapur"
          />
        </motion.div>
      </div>

      {/* Category marquee — click to search */}
      <div className="relative border-t border-paper/10 overflow-hidden py-5">
        <div className="tez-marquee-track flex gap-3 w-max">
          {[...CATEGORIES, ...CATEGORIES].map((c, i) => (
            <motion.button
              key={`${c}-${i}`}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSearch(undefined, c)}
              className="font-mono text-xs uppercase tracking-wide px-4 py-2 rounded-full border border-paper/15 text-paper/70 hover:text-paper hover:border-tez-orange transition-colors whitespace-nowrap cursor-pointer"
            >
              {c}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function BusinessCardMock({
  className,
  initialRotation,
  floatDelay,
  name,
  category,
  rating,
  city,
}: {
  className?: string;
  initialRotation: number;
  floatDelay: number;
  name: string;
  category: string;
  rating: string;
  city: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: initialRotation }}
      whileInView={{
        opacity: 1,
        y: [0, -8, 0],
        rotate: initialRotation,
      }}
      viewport={{ once: false }}
      transition={{
        opacity: { duration: 0.6, delay: floatDelay * 0.2 },
        y: {
          duration: 4,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: floatDelay,
        },
      }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
      className={`w-64 bg-paper text-ink rounded-2xl p-4 shadow-2xl cursor-pointer ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-lg bg-tez-orange/15 text-tez-orange flex items-center justify-center font-display font-bold">
          {name.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-sm leading-tight">{name}</div>
          <div className="text-xs text-ink/50">{category}</div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between font-mono text-xs">
        <span className="text-tez-gold font-medium flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-tez-gold text-tez-gold" />
          {rating}
        </span>
        <span className="text-ink/50">{city}</span>
        <span className="text-tez-forest font-medium flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Verified
        </span>
      </div>
    </motion.div>
  );
}




// working code , but without the home page query feature
// "use client";

// import { useState } from "react";

// const CATEGORIES = [
//   "Restaurants",
//   "Electricians",
//   "Salons & Spas",
//   "Doctors & Clinics",
//   "Real Estate",
//   "Tutors",
//   "Movers & Packers",
//   "Event Planners",
//   "Car Repair",
//   "Grocery Delivery",
//   "Gyms",
//   "Photographers",
// ];

// const STATS = [
//   { value: "12,400+", label: "Businesses" },
//   { value: "48", label: "Cities" },
//   { value: "2.1L+", label: "Monthly Searches" },
//   { value: "4.6★", label: "Avg. Rating" },
// ];

// export default function Hero() {
//   const [category, setCategory] = useState("");
//   const [city, setCity] = useState("");

//   return (
//     <section id="hero" className="relative overflow-hidden bg-ink text-paper">
//       {/* ambient speed lines */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute inset-0 opacity-[0.07]"
//         style={{
//           backgroundImage:
//             "repeating-linear-gradient(-12deg, #F6F1E7 0px, #F6F1E7 1px, transparent 1px, transparent 64px)",
//         }}
//       />

//       <div className="relative px-6 lg:px-12 pt-16 pb-14 lg:pt-24 lg:pb-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
//         <div>
//           <p className="font-mono text-xs tracking-[0.2em] text-tez-gold uppercase mb-5">
//             Local search, reimagined
//           </p>
//           <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
//             Find it.
//             <br />
//             <span className="text-tez-orange">Fast.</span>
//           </h1>
//           <p className="mt-6 text-lg text-paper/70 max-w-md">
//             TezDial connects you to verified local businesses — electricians,
//             salons, doctors, and everything in between — in seconds, not
//             scrolls.
//           </p>

//           {/* Search card */}
//           <form
//             className="mt-9 bg-paper rounded-2xl p-2.5 flex flex-col sm:flex-row gap-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
//             onSubmit={(e) => e.preventDefault()}
//           >
//             <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-mist/50">
//               <SearchIcon />
//               <input
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 placeholder="What are you looking for?"
//                 className="w-full bg-transparent text-ink placeholder:text-ink/40 text-sm outline-none font-body"
//               />
//             </div>
//             <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-mist/50 sm:max-w-[180px]">
//               <PinIcon />
//               <input
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 placeholder="City"
//                 className="w-full bg-transparent text-ink placeholder:text-ink/40 text-sm outline-none font-body"
//               />
//             </div>
//             <button
//               type="submit"
//               className="bg-tez-orange text-paper font-semibold text-sm px-7 py-3 rounded-xl hover:bg-tez-orange-dim transition-colors"
//             >
//               Search Now
//             </button>
//           </form>

//           {/* Stats row */}
//           <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-lg">
//             {STATS.map((s) => (
//               <div key={s.label}>
//                 <div className="font-mono text-2xl font-medium text-tez-gold">
//                   {s.value}
//                 </div>
//                 <div className="text-xs text-paper/50 mt-1">{s.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right visual: stacked business card mockups */}
//         <div className="hidden lg:block relative h-[420px]">
//           <BusinessCardMock
//             className="absolute top-0 right-6 rotate-[4deg]"
//             name="Sharma Electricals"
//             category="Electrician"
//             rating="4.8"
//             city="Nagpur"
//           />
//           <BusinessCardMock
//             className="absolute top-28 right-24 -rotate-[6deg]"
//             name="Glow & Grace Salon"
//             category="Salon & Spa"
//             rating="4.7"
//             city="Pune"
//           />
//           <BusinessCardMock
//             className="absolute top-56 right-0 rotate-[2deg]"
//             name="City Care Clinic"
//             category="Healthcare"
//             rating="4.9"
//             city="Chandrapur"
//           />
//         </div>
//       </div>

//       {/* Category marquee — signature element */}
//       <div className="relative border-t border-paper/10 overflow-hidden py-5">
//         <div className="tez-marquee-track flex gap-3 w-max">
//           {[...CATEGORIES, ...CATEGORIES].map((c, i) => (
//             <span
//               key={`${c}-${i}`}
//               className="font-mono text-xs uppercase tracking-wide px-4 py-2 rounded-full border border-paper/15 text-paper/70 whitespace-nowrap"
//             >
//               {c}
//             </span>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function BusinessCardMock({
//   className,
//   name,
//   category,
//   rating,
//   city,
// }: {
//   className?: string;
//   name: string;
//   category: string;
//   rating: string;
//   city: string;
// }) {
//   return (
//     <div
//       className={`w-64 bg-paper text-ink rounded-2xl p-4 shadow-2xl ${className}`}
//     >
//       <div className="flex items-center gap-3">
//         <div className="w-11 h-11 rounded-lg bg-tez-orange/15 text-tez-orange flex items-center justify-center font-display font-bold">
//           {name.charAt(0)}
//         </div>
//         <div>
//           <div className="font-semibold text-sm leading-tight">{name}</div>
//           <div className="text-xs text-ink/50">{category}</div>
//         </div>
//       </div>
//       <div className="mt-3 flex items-center justify-between font-mono text-xs">
//         <span className="text-tez-gold font-medium">★ {rating}</span>
//         <span className="text-ink/50">{city}</span>
//         <span className="text-tez-forest font-medium">Verified</span>
//       </div>
//     </div>
//   );
// }

// function SearchIcon() {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink/40 shrink-0">
//       <circle cx="11" cy="11" r="8" />
//       <path d="m21 21-4.3-4.3" />
//     </svg>
//   );
// }

// function PinIcon() {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink/40 shrink-0">
//       <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
//       <circle cx="12" cy="10" r="3" />
//     </svg>
//   );
// }
