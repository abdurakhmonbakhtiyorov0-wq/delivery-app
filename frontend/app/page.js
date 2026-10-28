"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { dishes, categories, restaurants } from "@/data/foodData";
import DishCard from "@/components/DishCard";
import SortDropdown from "@/components/SortDropdown";

import {
  Search,
  MapPin,
  Flame,
  Clock,
  Star,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  SlidersHorizontal,
  Navigation,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";
import { useCartStore } from "@/context/CartContext";

export default function HomePage() {
  // const { applyPromoCode, setDeliveryAddress, deliveryAddress } = useCart();
  const applyPromoCode = useCartStore((state) => state.applyPromoCode)
  const setDeliveryAddress = useCartStore((state) => state.setDeliveryAddress)
  const deliveryAddress = useCartStore((state) => state.deliveryAddress)

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");

  const filteredDishes = useMemo(() => {
    return dishes
      .filter((d) => {
        const matchesCategory =
          selectedCategory === "all" || d.category === selectedCategory;
        const matchesSearch =
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        return 0;
      });
  }, [searchQuery, selectedCategory, sortBy]);

  const handleCopyCode = (code) => {
    applyPromoCode(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#090B0E]">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-125 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & Controls */}
            <div className="lg:col-span-7 space-y-8 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-300">
                  ⚡ 20–30 min average delivery
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-xs font-bold text-[#FF5A1F]">
                  500+ Kitchens
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05]">
                Craving gourmet? <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A1F] via-[#FF8A00] to-amber-400">
                  Delivered hot
                </span>{" "}
                <br />
                to your door.
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl">
                Order artisan woodfired pizzas, wagyu truffle burgers, fresh
                sashimi platters, and authentic street eats from premier chefs
                near you.
              </p>

              {/* Hero Search Bar */}
              <div className="bg-[#111622] p-2 sm:p-2.5 rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/60 max-w-xl">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="flex items-center gap-3 px-3 py-2 w-full flex-1">
                    <MapPin className="w-5 h-5 text-[#FF5A1F] shrink-0" />
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Enter your delivery address..."
                      className="bg-transparent text-sm text-white placeholder-zinc-500 outline-none w-full font-medium"
                    />
                  </div>

                  <Link
                    href="/menu"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FF5A1F] to-[#FF7A00] hover:from-[#e04810] hover:to-[#eb6c00] text-white text-sm font-extrabold shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shrink-0"
                  >
                    <span>Explore Menus</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Stats & Trust */}
              <div className="flex flex-wrap items-center gap-8 pt-4 border-t border-white/[0.06]">
                <div>
                  <div className="text-2xl font-black text-white font-mono">
                    4.9/5
                  </div>
                  <div className="flex items-center gap-1 text-[#FF5A1F] text-xs mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <span className="text-zinc-400 ml-1 font-sans">
                      45k+ reviews
                    </span>
                  </div>
                </div>

                <div className="h-8 w-px bg-white/[0.08] hidden sm:block" />

                <div>
                  <div className="text-2xl font-black text-white font-mono">
                    15-30m
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    Express delivery speed
                  </div>
                </div>

                <div className="h-8 w-px bg-white/[0.08] hidden sm:block" />

                <div>
                  <div className="text-2xl font-black text-white font-mono">
                    100%
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    Tamper-sealed bags
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Card */}
                <div className="relative rounded-3xl overflow-hidden bg-[#111622] border border-white/[0.1] shadow-2xl group">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#171E2E] relative">
                    <img
                      src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80"
                      alt="Double Wagyu Truffle Smash"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111622] via-transparent to-black/30" />

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-black text-white flex items-center gap-1.5 shadow-xl">
                        <Flame className="w-3.5 h-3.5 text-[#FF5A1F] fill-[#FF5A1F]" />
                        #1 TRENDING DISH
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                      <div>
                        <div className="text-xs text-orange-400 font-bold uppercase tracking-wider">
                          The Beast & Bun
                        </div>
                        <div className="text-xl font-black">
                          Double Wagyu Truffle Smash
                        </div>
                      </div>
                      <span className="text-2xl font-black font-mono text-white">
                        $16.90
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex items-center justify-between bg-[#131926] border-t border-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF5A1F]">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">
                          Guaranteed Hot
                        </div>
                        <div className="text-[11px] text-zinc-400">
                          Insulated thermal courier pods
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/menu"
                      className="px-4 py-2 rounded-xl bg-[#FF5A1F] hover:bg-[#e04810] text-white text-xs font-bold transition-all"
                    >
                      Order Dish
                    </Link>
                  </div>
                </div>

                {/* Floating Live Courier Notification Card */}
                <div className="absolute -bottom-6 -left-6 bg-[#0E131E]/95 backdrop-blur-xl border border-white/[0.1] rounded-2xl p-4 shadow-2xl flex items-center gap-3.5 z-20 max-w-xs animate-in slide-in-from-bottom-4 duration-500">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-black font-black text-lg shrink-0 shadow-lg shadow-emerald-500/20">
                    🛵
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">
                        Marco is nearby
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-black">
                        6 MIN
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      En route to 452 Broadway
                    </div>
                  </div>
                </div>

                {/* Floating Discount Tag */}
                <div className="absolute -top-5 -right-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl p-3 shadow-2xl z-20 border border-white/20 hidden sm:block">
                  <div className="text-[10px] font-black uppercase tracking-wider text-black/75">
                    PROMO CODE
                  </div>
                  <div className="text-sm font-black tracking-widest font-mono">
                    RUSH30
                  </div>
                  <div className="text-[10px] text-white/90 font-medium">
                    30% Off First Feast
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORY CAROUSEL ================= */}
      <section className="py-8 border-y border-white/[0.04] bg-[#0C0F16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-400">
              Browse Categories
            </h3>
            <span className="text-xs text-[#FF5A1F] font-bold">
              120+ Curated Dishes
            </span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-3 rounded-2xl flex items-center gap-3 shrink-0 transition-all text-xs font-bold ${
                    isSelected
                      ? "bg-gradient-to-r from-[#FF5A1F] to-[#FF7A00] text-white shadow-lg shadow-orange-500/25 scale-[1.02]"
                      : "bg-[#131722] text-zinc-300 hover:text-white hover:bg-[#182030] border border-white/[0.04]"
                  }`}
                >
                  <span className="text-sm">{cat.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-black/25 text-white"
                        : "bg-black/40 text-zinc-400"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= PROMO DEALS STRIP ================= */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: 30% OFF */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 p-7 sm:p-9 text-white shadow-xl shadow-orange-500/15 flex flex-col justify-between">
            <div className="relative z-10 space-y-2">
              <span className="px-3 py-1 rounded-full bg-black/20 text-xs font-black uppercase tracking-wider backdrop-blur-sm">
                New Customer Special
              </span>
              <h3 className="text-2xl sm:text-3xl font-black leading-tight pt-1">
                Get 30% OFF Your <br />
                First Gourmet Feast
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-sm pt-1">
                Valid on all top restaurants and bakeries. Use code at checkout.
              </p>
            </div>

            <div className="relative z-10 pt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleCopyCode("RUSH30")}
                className="px-4 py-2.5 rounded-xl bg-black text-white text-xs font-mono font-bold flex items-center gap-2 hover:bg-zinc-900 transition-colors shadow-lg"
              >
                {copiedCode ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 text-[#FF5A1F]" />
                )}
                <span>{copiedCode ? "CODE APPLIED!" : "CODE: RUSH30"}</span>
              </button>
              <Link
                href="/menu"
                className="px-5 py-2.5 rounded-xl bg-white text-black text-xs font-black hover:bg-zinc-100 transition-colors shadow-lg"
              >
                Claim Deal
              </Link>
            </div>

            {/* Background art */}
            <div className="absolute -bottom-8 -right-8 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute right-4 bottom-4 text-7xl font-black text-black/10 select-none pointer-events-none">
              30%
            </div>
          </div>

          {/* Card 2: Free Delivery */}
          <div className="relative overflow-hidden rounded-3xl bg-[#111622] border border-white/[0.08] p-7 sm:p-9 text-white shadow-xl flex flex-col justify-between">
            <div className="relative z-10 space-y-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-black uppercase tracking-wider">
                Unlimited Perk
              </span>
              <h3 className="text-2xl sm:text-3xl font-black leading-tight pt-1">
                Free Delivery Over $45 <br />
                On Every Order
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-sm pt-1">
                No subscription required. Save $2.99 on every eligible kitchen
                order.
              </p>
            </div>

            <div className="relative z-10 pt-6 flex items-center gap-3">
              <Link
                href="/menu"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-black text-xs font-black hover:opacity-95 transition-opacity shadow-lg shadow-emerald-500/20 flex items-center gap-2"
              >
                <span>Order Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-xs text-zinc-500 font-medium">
                Automatic at checkout
              </span>
            </div>

            <div className="absolute right-4 bottom-4 text-7xl font-black text-white/[0.03] select-none pointer-events-none">
              $0
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE DISH GRID ================= */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#FF5A1F] mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Chef Picks & Specialties
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Popular Dishes Today
            </h2>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes or cuisines..."
                className="w-full bg-[#111622] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF5A1F]"
              />
            </div>

            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        {/* Dish Grid */}
        {filteredDishes?.length === 0 ? (
          <div className="text-center py-20 bg-[#111622] rounded-3xl border border-white/[0.06]">
            <p className="text-lg font-bold text-white mb-2">No dishes found</p>
            <p className="text-xs text-zinc-400 mb-6">
              Try searching for "pizza", "burger", or "truffle"
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="px-5 py-2.5 rounded-xl bg-[#FF5A1F] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDishes?.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        )}
      </section>

      {/* ================= TOP RESTAURANTS ================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/[0.04]">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#FF5A1F] mb-1.5">
              Curated Kitchens
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Top Rated Restaurants
            </h2>
          </div>
          <Link
            href="/restaurants"
            className="text-xs font-bold text-[#FF5A1F] hover:text-orange-400 flex items-center gap-1 group"
          >
            <span>View All (500+)</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {restaurants.slice(0, 3).map((res) => (
            <Link
              key={res.id}
              href="/menu"
              className="group rounded-3xl overflow-hidden bg-[#111622] border border-white/[0.06] hover:border-white/[0.16] transition-all hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
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
                  <span className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    {res.rating} ({res.reviews})
                  </span>
                  <span className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 font-medium">
                    {res.deliveryTime}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-extrabold text-white text-lg group-hover:text-[#FF5A1F] transition-colors mb-1">
                  {res.name}
                </h3>
                <p className="text-xs text-zinc-400 mb-3">{res.cuisine}</p>

                <div className="flex items-center justify-between text-xs text-zinc-400 pt-3 border-t border-white/[0.04]">
                  <span className="text-emerald-400 font-semibold">
                    Delivery: {res.deliveryFee}
                  </span>
                  <span>Min order: ${res.minOrder}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 bg-[#0C0F16] border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#FF5A1F] mb-2">
              Pure Simplicity
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              How FoodRush Works
            </h2>
            <p className="text-zinc-400 text-sm mt-3">
              From culinary chef to your dining table in 3 seamless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="p-8 rounded-3xl bg-[#111622] border border-white/[0.06] relative group hover:border-[#FF5A1F]/30 transition-all">
              <div className="text-5xl font-black text-white/[0.05] absolute top-6 right-6 font-mono">
                01
              </div>
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-[#FF5A1F] flex items-center justify-center text-2xl font-black mb-6">
                📍
              </div>
              <h3 className="text-lg font-black text-white mb-2">
                Choose Your Craving
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Enter your location, explore 500+ curated kitchens, and
                customize dishes with gourmet add-ons.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#111622] border border-white/[0.06] relative group hover:border-[#FF5A1F]/30 transition-all">
              <div className="text-5xl font-black text-white/[0.05] absolute top-6 right-6 font-mono">
                02
              </div>
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-2xl font-black mb-6">
                👨‍🍳
              </div>
              <h3 className="text-lg font-black text-white mb-2">
                Artisan Kitchen Prep
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Chefs prepare your meal fresh to order, packed inside
                tamper-evident thermal heat pouches.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#111622] border border-white/[0.06] relative group hover:border-[#FF5A1F]/30 transition-all">
              <div className="text-5xl font-black text-white/[0.05] absolute top-6 right-6 font-mono">
                03
              </div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-2xl font-black mb-6">
                🛵
              </div>
              <h3 className="text-lg font-black text-white mb-2">
                Live GPS Express Run
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Track your courier live on the interactive map with real-time
                minute countdown to arrival.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MOBILE APP CTA ================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#141A26] via-[#101520] to-[#0A0D14] border border-white/[0.08] p-8 sm:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF5A1F] text-xs font-black uppercase tracking-wider">
                Mobile Experience
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Order Faster With <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A1F] to-amber-400">
                  FoodRush Mobile App
                </span>
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
                Get real-time delivery push notifications, 1-tap reorders,
                exclusive secret menu items, and live courier chat.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#"
                  className="px-6 py-3 rounded-2xl bg-white text-black font-extrabold text-xs hover:bg-zinc-100 transition-colors shadow-xl"
                >
                  Download on iOS
                </a>
                <a
                  href="#"
                  className="px-6 py-3 rounded-2xl bg-white/[0.06] border border-white/[0.1] text-white font-extrabold text-xs hover:bg-white/[0.1] transition-colors"
                >
                  Get on Android
                </a>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative w-64 h-80 rounded-3xl bg-[#171E2E] border-2 border-white/[0.1] p-4 shadow-2xl flex flex-col justify-between">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <span className="text-xs font-bold text-white">
                    FoodRush Live
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                    ACTIVE
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] text-xs">
                    <div className="text-zinc-400 text-[10px]">
                      Your Courier
                    </div>
                    <div className="text-white font-bold">Marco Rossi 🛵</div>
                    <div className="text-emerald-400 text-[10px] font-bold mt-1">
                      Arriving in 6 mins
                    </div>
                  </div>
                </div>
                <div className="w-full py-2.5 rounded-xl bg-[#FF5A1F] text-center text-xs font-bold text-white shadow-lg">
                  Track On Map
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
