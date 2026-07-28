"use client";

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import HeroSlider from "@/components/explore/HeroSlider";
import CategoryStrip from "@/components/explore/CategoryStrip";
import CityStrip from "@/components/explore/CityStrip";
import BusinessCard from "@/components/explore/BusinessCard";
import { axiosInstance } from "@/lib/axiosInstance"; // Adjust import path if needed
import { Business, BusinessListResponse } from "@/lib/config";

export default function ExplorePage() {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchInput.trim()), 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  // fetch businesses whenever filters change
  useEffect(() => {
    const controller = new AbortController();

    async function fetchBusinesses() {
      setLoading(true);
      setError("");

      try {
        // Construct clean query params object for Axios
        const params: Record<string, string> = {};
        if (category) params.category = category;
        if (city) params.city = city;
        if (debouncedSearch) params.search = debouncedSearch;

        const res = await axiosInstance.get<BusinessListResponse>(
          "/api/business/all",
          {
            params,
            signal: controller.signal,
          },
        );

        setBusinesses(res.data.businesses || []);
        setCount(res.data.count || 0);
      } catch (err) {
        // Ignore request cancellations on unmount or fast filter typing
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

  return (
    <main className="min-h-screen bg-paper px-6 lg:px-12 py-10 lg:py-14">
      <div className="max-w-6xl mx-auto">
        <HeroSlider />

        {/* Filters */}
        <div className="mt-10 space-y-8">
          <CategoryStrip active={category} onSelect={setCategory} />
          <CityStrip active={city} onSelect={setCity} />
        </div>

        {/* Search bar */}
        <div className="mt-8 bg-ink rounded-2xl p-2.5 flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-paper/10">
            <SearchIcon />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search businesses, categories, keywords..."
              className="w-full bg-transparent text-paper placeholder:text-paper/40 text-sm outline-none font-body"
            />
          </div>
          {searchInput && (
            <button
              onClick={() => setSearchInput("")}
              className="px-4 py-3 text-paper/60 hover:text-tez-orange text-xs font-mono"
            >
              Clear
            </button>
          )}
        </div>

        {/* Results header */}
        <div className="mt-10 flex items-center justify-between">
          <h2 className="font-display font-extrabold text-2xl lg:text-3xl tracking-tight text-ink">
            {hasActiveFilters ? "Search results" : "All businesses"}
          </h2>
          {!loading && !error && (
            <span className="font-mono text-xs text-ink/50">
              {count} {count === 1 ? "result" : "results"}
            </span>
          )}
        </div>

        {/* Listings */}
        <div className="mt-6">
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
