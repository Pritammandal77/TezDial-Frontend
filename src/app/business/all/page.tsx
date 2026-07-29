"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import HeroSlider from "@/components/explore/HeroSlider";
import CategoryStrip from "@/components/explore/CategoryStrip";
import CityStrip from "@/components/explore/CityStrip";
import BusinessCard from "@/components/explore/BusinessCard";
import { axiosInstance } from "@/lib/axiosInstance";
import { Business, BusinessListResponse } from "@/lib/config";
import { Search } from "lucide-react";

function BusinessAllContent() {
  const searchParams = useSearchParams();

  // Read params from URL query bar (supports search, category, and city)
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialCity = searchParams.get("city") || "";

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [city, setCity] = useState(initialCity);

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Sync local state if URL search parameters change
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    setSearchInput(urlSearch);
    setDebouncedSearch(urlSearch);
    setCategory(searchParams.get("category") || "");
    setCity(searchParams.get("city") || "");
  }, [searchParams]);

  // Debounce typed input in the local search bar
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchInput.trim()), 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Fetch businesses whenever filters or search terms change
  useEffect(() => {
    const controller = new AbortController();

    async function fetchBusinesses() {
      setLoading(true);
      setError("");

      try {
        const params: Record<string, string> = {};
        if (category) params.category = category;
        if (city) params.city = city;
        if (debouncedSearch) params.search = debouncedSearch;

        const res = await axiosInstance.get<BusinessListResponse>(
          "/api/business/all",
          {
            params,
            signal: controller.signal,
          }
        );

        setBusinesses(res.data.businesses || []);
        setCount(res.data.count || 0);
      } catch (err) {
        if (axios.isCancel(err)) return;

        if (err instanceof AxiosError) {
          setError(err.response?.data?.message || "Failed to load businesses.");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchBusinesses();
    return () => controller.abort();
  }, [category, city, debouncedSearch]);

  const hasActiveFilters = category || city || debouncedSearch;

  const clearAllFilters = () => {
    setCategory("");
    setCity("");
    setSearchInput("");
  };

  return (
    <main className="min-h-screen bg-paper px-6 lg:px-12 py-10 lg:py-14">
      <div className="max-w-6xl mx-auto">
        <HeroSlider />

        {/* Category & City Filters */}
        <div className="mt-10 space-y-8" id="categories">
          <CategoryStrip active={category} onSelect={setCategory} />
          <CityStrip active={city} onSelect={setCity} />
        </div>

        {/* Search bar */}
        <div className="mt-8 bg-ink rounded-2xl p-2.5 flex items-center gap-2"  id="listings">
          <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-paper/10">
            <Search size={20} className="text-gray-400"/>
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by business name, keywords, or service..."
              className="w-full bg-transparent text-paper placeholder:text-paper/40 text-sm outline-none font-body"
            />
          </div>
          {searchInput && (
            <button
              onClick={() => setSearchInput("")}
              className="px-4 py-3 text-paper/60 hover:text-tez-orange text-xs font-mono cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Results header */}
        <div className="mt-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-display font-extrabold text-2xl lg:text-3xl tracking-tight text-ink">
              {hasActiveFilters ? "Search results" : "All businesses"}
            </h2>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-mono text-tez-orange hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>

          {!loading && !error && (
            <span className="font-mono text-xs text-ink/50">
              {count} {count === 1 ? "result" : "results"}
            </span>
          )}
        </div>

        {/* Listings Grid */}
        <div className="mt-6" >
          {loading && (
            <div className="grid sm:grid-cols-2 gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-72 rounded-2xl bg-mist/50 animate-pulse"
                />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="bg-tez-orange/10 text-tez-orange-dim rounded-xl px-5 py-4 text-sm font-medium">
              {error}
            </div>
          )}

          {!loading && !error && businesses.length === 0 && (
            <div className="text-center py-16">
              <p className="font-display font-bold text-xl text-ink">
                No businesses found.
              </p>
              <p className="mt-2 text-sm text-ink/50">
                Try a different search term or clear your filters.
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="mt-4 px-4 py-2 bg-ink text-paper rounded-xl text-xs font-mono hover:bg-tez-orange transition-colors"
                >
                  Reset Filters
                </button>
              )}
            </div>
          )}

          {!loading && !error && businesses.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-5">
              {businesses.map((b) => (
                <BusinessCard key={b._id} business={b} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function BusinessAllPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-paper flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-tez-orange border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <BusinessAllContent />
    </Suspense>
  );
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="text-paper/50 shrink-0"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}






// working code , but without the home page query feature
// "use client";

// import { useEffect, useState } from "react";
// import axios, { AxiosError } from "axios";
// import HeroSlider from "@/components/explore/HeroSlider";
// import CategoryStrip from "@/components/explore/CategoryStrip";
// import CityStrip from "@/components/explore/CityStrip";
// import BusinessCard from "@/components/explore/BusinessCard";
// import { axiosInstance } from "@/lib/axiosInstance"; // Adjust import path if needed
// import { Business, BusinessListResponse } from "@/lib/config";

// export default function ExplorePage() {
//   const [searchInput, setSearchInput] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [city, setCity] = useState("");

//   const [businesses, setBusinesses] = useState<Business[]>([]);
//   const [count, setCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // debounce search input
//   useEffect(() => {
//     const t = setTimeout(() => setDebouncedSearch(searchInput.trim()), 400);
//     return () => clearTimeout(t);
//   }, [searchInput]);

//   // fetch businesses whenever filters change
//   useEffect(() => {
//     const controller = new AbortController();

//     async function fetchBusinesses() {
//       setLoading(true);
//       setError("");

//       try {
//         // Construct clean query params object for Axios
//         const params: Record<string, string> = {};
//         if (category) params.category = category;
//         if (city) params.city = city;
//         if (debouncedSearch) params.search = debouncedSearch;

//         const res = await axiosInstance.get<BusinessListResponse>(
//           "/api/business/all",
//           {
//             params,
//             signal: controller.signal,
//           },
//         );
//         console.log(res.data)
//         setBusinesses(res.data.businesses || []);
//         setCount(res.data.count || 0);
//       } catch (err) {
//         // Ignore request cancellations on unmount or fast filter typing
//         if (axios.isCancel(err)) return;

//         if (err instanceof AxiosError) {
//           setError(err.response?.data?.message || "Failed to load businesses.");
//         } else if (err instanceof Error) {
//           setError(err.message);
//         } else {
//           setError("An unexpected error occurred.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchBusinesses();
//     return () => controller.abort();
//   }, [category, city, debouncedSearch]);

//   const hasActiveFilters = category || city || debouncedSearch;

//   return (
//     <main className="min-h-screen bg-paper px-6 lg:px-12 py-10 lg:py-14">
//       <div className="max-w-6xl mx-auto">
//         <HeroSlider />

//         {/* Filters */}
//         <div className="mt-10 space-y-8">
//           <CategoryStrip active={category} onSelect={setCategory} />
//           <CityStrip active={city} onSelect={setCity} />
//         </div>

//         {/* Search bar */}
//         <div className="mt-8 bg-ink rounded-2xl p-2.5 flex items-center gap-2">
//           <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-paper/10">
//             <SearchIcon />
//             <input
//               value={searchInput}
//               onChange={(e) => setSearchInput(e.target.value)}
//               placeholder="Search businesses, categories, keywords..."
//               className="w-full bg-transparent text-paper placeholder:text-paper/40 text-sm outline-none font-body"
//             />
//           </div>
//           {searchInput && (
//             <button
//               onClick={() => setSearchInput("")}
//               className="px-4 py-3 text-paper/60 hover:text-tez-orange text-xs font-mono"
//             >
//               Clear
//             </button>
//           )}
//         </div>

//         {/* Results header */}
//         <div className="mt-10 flex items-center justify-between">
//           <h2 className="font-display font-extrabold text-2xl lg:text-3xl tracking-tight text-ink">
//             {hasActiveFilters ? "Search results" : "All businesses"}
//           </h2>
//           {!loading && !error && (
//             <span className="font-mono text-xs text-ink/50">
//               {count} {count === 1 ? "result" : "results"}
//             </span>
//           )}
//         </div>

//         {/* Listings */}
//         <div className="mt-6" id="listings">
//           {loading && (
//             <div className="grid sm:grid-cols-2 gap-5">
//               {Array.from({ length: 4 }).map((_, i) => (
//                 <div
//                   key={i}
//                   className="h-72 rounded-2xl bg-mist/50 animate-pulse"
//                 />
//               ))}
//             </div>
//           )}

//           {!loading && error && (
//             <div className="bg-tez-orange/10 text-tez-orange-dim rounded-xl px-5 py-4 text-sm font-medium">
//               {error}
//             </div>
//           )}

//           {!loading && !error && businesses.length === 0 && (
//             <div className="text-center py-16">
//               <p className="font-display font-bold text-xl text-ink">
//                 No businesses found.
//               </p>
//               <p className="mt-2 text-sm text-ink/50">
//                 Try a different search term or clear your filters.
//               </p>
//             </div>
//           )}

//           {!loading && !error && businesses.length > 0 && (
//             <div className="grid sm:grid-cols-2 gap-5">
//               {businesses.map((b) => (
//                 <BusinessCard key={b._id} business={b} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }

// function SearchIcon() {
//   return (
//     <svg
//       width="16"
//       height="16"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       className="text-paper/50 shrink-0"
//     >
//       <circle cx="11" cy="11" r="8" />
//       <path d="m21 21-4.3-4.3" />
//     </svg>
//   );
// }
