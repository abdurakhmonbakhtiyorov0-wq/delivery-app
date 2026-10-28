"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { restaurants } from "@/data/foodData";
import {
  Search,
  Star,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Filter,
} from "lucide-react";

export default function RestaurantsPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  // filter by name, cuisine && by filterType

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((res) => {
      const matchesSearch =
        res.name.toLowerCase().includes(search.toLowerCase()) ||
        res.cuisine.toLowerCase().includes(search.toLowerCase());

      let matchesType = true;

      if (filterType === "free-delivery") {
        matchesType = res.deliveryFee === "Free";
      }
      if (filterType === "top-rated") {
        matchesType = res.rating >= 4.85;
      }
      if (filterType === "fast") {
        matchesType = res.deliveryTime?.includes("15") || res.deliveryTime?.includes("20");
      }

      return matchesSearch && matchesType;
    });
  }, [search, filterType]);

  return (
    <div className="min-h-screen bg-[#090B0E] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-left mb-10">
          <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF5A1F] text-xs font-black uppercase tracking-wider">
            Verified Culinary Partners
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-3">
            Top Restaurants Near You
          </h1>
          <p className="text-sm text-zinc-400 mt-2 max-w-xl">
            Inspected for hygiene, culinary excellence, and speed. From cozy
            neighbourhood trattorias to premier Michelin-recognized kitchens.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#111622] rounded-3xl border border-white/[0.08] p-5 mb-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by kitchen name or cuisine..."
              className="w-full bg-[#171E2E] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF5A1F]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: "all", label: "All Kitchens" },
              { id: "free-delivery", label: "Free Delivery" },
              { id: "top-rated", label: "Top Rated (4.85+)" },
              { id: "fast", label: "Fast Delivery (<25m)" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filterType === f.id
                    ? "bg-[#FF5A1F] text-white shadow-md shadow-orange-500/20"
                    : "bg-[#171E2E] text-zinc-400 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants?.map((res) => (
            <div
              key={res.id}
              className="group bg-[#111622] rounded-3xl border border-white/[0.06] hover:border-white/[0.16] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#171E2E]">
                <img
                  src={res.image}
                  alt={res.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111622] via-transparent to-black/30" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-extrabold uppercase tracking-wider text-white">
                    {res.tag}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    {res.rating} ({res.reviews})
                  </span>
                  <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 font-medium">
                    {res.deliveryTime}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-black text-white text-lg group-hover:text-[#FF5A1F] transition-colors">
                      {res.name}
                    </h3>
                    <span className="text-xs font-mono font-bold text-zinc-400">
                      {res.priceRange}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mb-4">{res.cuisine}</p>

                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] mb-4">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-orange-400 mb-0.5">
                      Signature Specialty
                    </div>
                    <div className="text-xs font-bold text-zinc-200 truncate">
                      {res.featuredDish}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="text-xs">
                    <div className="text-emerald-400 font-bold">
                      {res.deliveryFee} delivery
                    </div>
                    <div className="text-[10px] text-zinc-500">
                      Min order: ${res.minOrder}
                    </div>
                  </div>

                  <Link
                    href="/menu"
                    className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-[#FF5A1F] text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <span>View Menu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
