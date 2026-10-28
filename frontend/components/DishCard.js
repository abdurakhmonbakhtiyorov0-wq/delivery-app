"use client";

import React, { useState } from "react";
import { useCartStore } from "@/context/CartContext";
import {
  Star,
  Clock,
  Flame,
  Plus,
  Heart,
  Check,
  Sparkles,
  Eye,
} from "lucide-react";

export default function DishCard(props) {
  const dish = props.dish || props;
  // const { addToCart, setSelectedDish } = useCart();

  const addToCart = useCartStore((state) => state.addToCart);
  const setSelectedDish = useCartStore((state) => state.setSelectedDish);

  const [liked, setLiked] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  if (!dish || !dish.name) return null;

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(dish, 1);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1200);
  };

  const price =
    typeof dish.price === "number" ? dish.price : parseFloat(dish.price) || 0;
  const oldPrice = dish.oldPrice
    ? typeof dish.oldPrice === "number"
      ? dish.oldPrice
      : parseFloat(dish.oldPrice)
    : null;
  const hasDiscount = oldPrice && oldPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  return (
    <div
      onClick={() => setSelectedDish(dish)}
      className="group relative bg-[#111622] rounded-3xl border border-white/[0.06] hover:border-white/[0.16] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 cursor-pointer flex flex-col justify-between"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#171E2E]">
        <img
          src={
            dish.image ||
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
          }
          alt={dish.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111622] via-transparent to-black/40 opacity-90" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {dish.tag && (
            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-extrabold text-white flex items-center gap-1 shadow-lg">
              {dish.tag === "Bestseller" || dish.tag === "Trending" ? (
                <Flame className="w-3 h-3 text-[#FF5A1F] fill-[#FF5A1F]" />
              ) : (
                <Sparkles className="w-3 h-3 text-amber-400" />
              )}
              {dish.tag}
            </span>
          )}
          {hasDiscount && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-black uppercase tracking-wider shadow-lg">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all z-10 ${
            liked
              ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
              : "bg-black/50 border border-white/10 text-white/80 hover:text-white hover:bg-black/70"
          }`}
          title="Save to favorites"
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-white" : ""}`} />
        </button>

        {/* Quick View Tag on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
          <span className="px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold flex items-center gap-1.5 shadow-xl">
            <Eye className="w-3.5 h-3.5" /> Quick Customize
          </span>
        </div>

        {/* Prep Time & Rating in image corner */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-zinc-300 z-10">
          <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 font-medium">
            <Clock className="w-3 h-3 text-[#FF5A1F]" />
            {dish.prepTime || "20 min"}
          </span>
          <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 font-bold text-white">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            {dish.rating || "4.9"}
            {dish.reviews && (
              <span className="text-[10px] text-zinc-400 font-normal">
                ({dish.reviews})
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#FF5A1F] mb-1">
            {dish.restaurant || "FoodRush Kitchen"}
          </div>
          <h3 className="font-extrabold text-white text-base leading-snug group-hover:text-orange-400 transition-colors line-clamp-1 mb-1.5">
            {dish.name}
          </h3>
          <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed mb-4">
            {dish.description}
          </p>
        </div>

        {/* Price & Add button */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] mt-auto">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-white font-mono tracking-tight">
                ${price.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-zinc-500 line-through font-mono">
                  ${oldPrice.toFixed(2)}
                </span>
              )}
            </div>
            <div className="text-[10px] text-zinc-400">
              {dish.calories || "650 kcal"}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all transform active:scale-95 shadow-md ${
              addedAnim
                ? "bg-emerald-500 text-black shadow-emerald-500/20"
                : "bg-white/[0.08] hover:bg-[#FF5A1F] text-white hover:shadow-orange-500/25"
            }`}
          >
            {addedAnim ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" /> Added!
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
