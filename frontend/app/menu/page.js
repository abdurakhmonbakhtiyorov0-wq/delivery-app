"use client";

import React, { useState, useMemo } from "react";
import { dishes, categories } from "@/data/foodData";
import DishCard from "@/components/DishCard";
import SortDropdown from "@/components/SortDropdown";
import {
  Search,
  Sparkles,
  SlidersHorizontal,
  Flame,
  Leaf,
  DollarSign,
  RotateCcw,
} from "lucide-react";

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [onlyVegetarian, setOnlyVegetarian] = useState(false);
  const [onlySpicy, setOnlySpicy] = useState(false);
  const [underFifteen, setUnderFifteen] = useState(false);

  const filteredDishes = useMemo(() => {
    return dishes
      .filter((dish) => {
        const matchesCategory =
          selectedCategory === "all" || dish.category === selectedCategory;
        const matchesSearch =
          dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dish.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dish.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesSpicy = !onlySpicy || dish.spicy;
        const matchesVeg = !onlyVegetarian || dish.vegetarian;
        const matchesUnder15 = !underFifteen || dish.price <= 15;

        return (
          matchesCategory &&
          matchesSearch &&
          matchesSpicy &&
          matchesUnder15 &&
          matchesVeg
        );
      })

      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        return 0;
      });
  }, [
    searchQuery,
    selectedCategory,
    onlySpicy,
    onlyVegetarian,
    underFifteen,
    sortBy,
  ]);

  const activeFiltersCount =
    (onlySpicy ? 1 : 0) +
    (onlyVegetarian ? 1 : 0) +
    (underFifteen ? 1 : 0) +
    (selectedCategory !== "all" ? 1 : 0);

  const resetFilters = () => {
    setOnlySpicy(false);
    setOnlyVegetarian(false);
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("recommended");
    setUnderFifteen(false);
  };

  return (
    <div className="min-h-screen bg-[#090B0E] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-left mb-10">
          <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF5A1F] text-xs font-black uppercase tracking-wider">
            Explore 120+ Gourmet Dishes
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-3">
            Our Culinary Menu
          </h1>
          <p className="text-sm text-zinc-400 mt-2 max-w-xl">
            Freshly prepared, heat-sealed, and delivered fast. Filter by
            craving, dietary preferences, or price.
          </p>
        </div>

        {/* Search & Top Filter Bar */}
        <div className="bg-[#111622] rounded-3xl border border-white/[0.08] p-5 mb-8 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dish, ingredient, or kitchen..."
                className="w-full bg-[#171E2E] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF5A1F]"
              />
            </div>

            {/* Quick Dietary Toggles & Sort */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-start md:justify-end">
              <button
                onClick={() => setOnlyVegetarian(!onlyVegetarian)}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                  onlyVegetarian
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                    : "bg-[#171E2E] border-white/[0.08] text-zinc-400 hover:text-white"
                }`}
              >
                <Leaf className="w-3.5 h-3.5" />
                Vegetarian
              </button>

              <button
                onClick={() => setOnlySpicy(!onlySpicy)}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                  onlySpicy
                    ? "bg-rose-500/20 border-rose-500 text-rose-300"
                    : "bg-[#171E2E] border-white/[0.08] text-zinc-400 hover:text-white"
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                Spicy
              </button>

              <button
                onClick={() => setUnderFifteen(!underFifteen)}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                  underFifteen
                    ? "bg-amber-500/20 border-amber-500 text-amber-300"
                    : "bg-[#171E2E] border-white/[0.08] text-zinc-400 hover:text-white"
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                Under $15
              </button>

              {/* Sort Selector */}
              <SortDropdown value={sortBy} onChange={setSortBy} />

              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="p-2 rounded-xl bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Categories Pill Scroller */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-3 border-t border-white/[0.04]">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                    isSelected
                      ? "bg-[#FF5A1F] text-white shadow-md shadow-orange-500/20"
                      : "bg-[#171E2E] text-zinc-400 hover:text-white hover:bg-[#1f283d]"
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-6 px-1">
          <span>
            Showing{" "}
            <strong className="text-white">{filteredDishes.length}</strong>{" "}
            delicious dishes
          </span>
          {activeFiltersCount > 0 && (
            <span className="text-[#FF5A1F] font-bold">
              {activeFiltersCount} active filters
            </span>
          )}
        </div>

        {/* Dish Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-24 bg-[#111622] rounded-3xl border border-white/[0.06]">
            <p className="text-xl font-bold text-white mb-2">
              No matching dishes
            </p>
            <p className="text-xs text-zinc-400 mb-6 max-w-sm mx-auto">
              We couldn't find anything matching your specific filters. Try
              resetting to view all options.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-xl bg-[#FF5A1F] text-white text-xs font-bold shadow-lg shadow-orange-500/25"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
