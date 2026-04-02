import { Heart, MapPin, SlidersHorizontal, Star, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { Page } from "../App";
import { professionals } from "../data/professionals";

interface SearchPageProps {
  navigate: (
    page: Page,
    options?: { profId?: number; category?: string },
  ) => void;
  initialCategory?: string;
}

const allCategories = [
  "Plumber",
  "Doctor",
  "Teacher",
  "Electrician",
  "Carpenter",
  "Driver",
  "Chef",
  "Painter",
];
const allLocations = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Pune",
  "Hyderabad",
  "Ahmedabad",
  "Kolkata",
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i <= Math.floor(rating) ? "fill-[#FBBF24] text-[#FBBF24]" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

export default function SearchPage({
  navigate,
  initialCategory = "",
}: SearchPageProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [minExp, setMinExp] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("rating");

  const filtered = useMemo(() => {
    let result = professionals.filter((p) => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (selectedLocation && p.location !== selectedLocation) return false;
      if (p.rating < minRating) return false;
      if (p.priceHourly > maxPrice) return false;
      if (p.experience < minExp) return false;
      return true;
    });
    if (sortBy === "rating")
      result = [...result].sort((a, b) => b.rating - a.rating);
    if (sortBy === "price_asc")
      result = [...result].sort((a, b) => a.priceHourly - b.priceHourly);
    if (sortBy === "price_desc")
      result = [...result].sort((a, b) => b.priceHourly - a.priceHourly);
    if (sortBy === "exp")
      result = [...result].sort((a, b) => b.experience - a.experience);
    return result;
  }, [selectedCategory, selectedLocation, minRating, maxPrice, minExp, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedLocation("");
    setMinRating(0);
    setMaxPrice(2000);
    setMinExp(0);
  };

  const FilterPanel = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-[#0F2F57]">Filters</h3>
        <button
          type="button"
          onClick={resetFilters}
          className="text-xs text-[#2F6FDB] hover:underline"
        >
          Reset All
        </button>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-[#0F2F57] mb-3">Category</h4>
        <div className="flex flex-col gap-2">
          {allCategories.map((c) => (
            <label key={c} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategory === c}
                onChange={() =>
                  setSelectedCategory(selectedCategory === c ? "" : c)
                }
                className="w-4 h-4 accent-[#2F6FDB]"
              />
              <span className="text-sm text-gray-600">{c}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label
          htmlFor="filter-location"
          className="text-sm font-medium text-[#0F2F57] mb-3 block"
        >
          Location
        </label>
        <select
          id="filter-location"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 outline-none focus:border-[#2F6FDB]"
        >
          <option value="">All Locations</option>
          {allLocations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium text-[#0F2F57] mb-3">
          Min Rating: {minRating === 0 ? "Any" : `${minRating}+`}
        </p>
        <input
          type="range"
          min={0}
          max={5}
          step={0.5}
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className="w-full accent-[#2F6FDB]"
        />
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium text-[#0F2F57] mb-3">
          Max Price/hr: &#8377;{maxPrice}
        </p>
        <input
          type="range"
          min={100}
          max={2000}
          step={50}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#2F6FDB]"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-[#0F2F57] mb-3">
          Min Experience: {minExp}+ yrs
        </p>
        <input
          type="range"
          min={0}
          max={15}
          step={1}
          value={minExp}
          onChange={(e) => setMinExp(Number(e.target.value))}
          className="w-full accent-[#2F6FDB]"
        />
      </div>
    </div>
  );

  return (
    <div className="bg-[#F5F8FF] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#0F2F57]">
              {selectedCategory ? `${selectedCategory}s` : "All Professionals"}
            </h1>
            <p className="text-sm text-gray-500">
              {filtered.length} professionals found
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-[#E5E7EB] rounded-lg px-3 py-2 bg-white outline-none focus:border-[#2F6FDB]"
            >
              <option value="rating">Sort: Top Rated</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="exp">Most Experienced</option>
            </select>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 bg-white border border-[#E5E7EB] text-sm px-3 py-2 rounded-lg"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterPanel />
          </aside>

          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/40">
              <button
                type="button"
                className="absolute inset-0 w-full h-full cursor-default"
                onClick={() => setShowFilters(false)}
                aria-label="Close filters"
              />
              <div className="absolute right-0 top-0 h-full w-72 bg-white overflow-y-auto p-5 z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-[#0F2F57]">Filters</h3>
                  <button type="button" onClick={() => setShowFilters(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterPanel />
              </div>
            </div>
          )}

          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg mb-2">
                  No professionals found
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-[#2F6FDB] text-sm hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="relative">
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="w-full h-44 object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center"
                        aria-label="Save to favourites"
                      >
                        <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
                      </button>
                      <span className="absolute bottom-3 left-3 bg-[#2F6FDB] text-white text-xs font-medium px-2.5 py-1 rounded-full">
                        {p.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-[#0F2F57] mb-1 group-hover:text-[#2F6FDB] transition-colors">
                        {p.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <StarRating rating={p.rating} />
                        <span className="text-sm font-medium">{p.rating}</span>
                        <span className="text-xs text-gray-400">
                          ({p.reviews} reviews)
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" /> {p.location}
                        </div>
                        <span className="text-xs text-gray-500">
                          {p.experience} yrs exp
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {p.skills.slice(0, 2).map((s) => (
                          <span
                            key={s}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-base font-bold text-[#2F6FDB]">
                          &#8377;{p.priceHourly}/hr
                        </span>
                        <span className="text-xs text-gray-400">
                          &#8377;{p.priceDaily}/day
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          navigate("professional", { profId: p.id })
                        }
                        className="w-full bg-[#2F6FDB] text-white text-sm font-medium py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
