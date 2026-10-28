"use client";

import React, { useState } from "react";
import { useCartStore } from "@/context/CartContext";
import {
  X,
  Star,
  Clock,
  Flame,
  Plus,
  Minus,
  Check,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const extraOptions = [
  { name: "Extra Truffle Aioli Glaze", price: 1.5 },
  { name: "Melted Double Aged Cheddar", price: 2.0 },
  { name: "Fresh Hass Avocado Slices", price: 2.5 },
  { name: "Artisan Chili Garlic Crunch", price: 1.0 },
];

export default function DishModal() {
  // const { selectedDish, setSelectedDish, addToCart } = useCart();

  const setSelectedDish = useCartStore((state) => state.setSelectedDish);
  const selectedDish = useCartStore((state) => state.selectedDish);
  const addToCart = useCartStore((state) => state.addToCart);

  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [specialNote, setSpecialNote] = useState("");

  if (!selectedDish) return null;

  const toggleExtra = (name) => {
    setSelectedExtras((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name],
    );
  };

  const extrasTotal = selectedExtras.reduce((sum, name) => {
    const found = extraOptions.find((o) => o.name === name);
    return sum + (found ? found.price : 0);
  }, 0);

  const unitPrice = selectedDish.price + extrasTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(selectedDish, quantity, selectedExtras);
    setSelectedDish(null);
    setQuantity(1);
    setSelectedExtras([]);
    setSpecialNote("");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setSelectedDish(null)}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-[#111622] rounded-3xl border border-white/[0.1] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            onClick={() => setSelectedDish(null)}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-zinc-300 hover:text-white flex items-center justify-center border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image */}
          <div className="relative h-64 w-full overflow-hidden bg-[#171E2E]">
            <img
              src={selectedDish.image}
              alt={selectedDish.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111622] via-transparent to-black/30" />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {selectedDish.restaurant}
              </span>
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-bold text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {selectedDish.rating} ({selectedDish.reviews} reviews)
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 space-y-5">
            <div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <h2 className="text-xl font-black text-white">
                  {selectedDish.name}
                </h2>
                <span className="text-xl font-black text-[#FF5A1F] font-mono">
                  ${selectedDish.price.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {selectedDish.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-zinc-400 mt-3 pt-3 border-t border-white/[0.06]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#FF5A1F]" />
                  {selectedDish.prepTime}
                </span>
                <span>•</span>
                <span>{selectedDish.calories}</span>
                {selectedDish.spicy && (
                  <>
                    <span>•</span>
                    <span className="text-rose-400 font-semibold flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-rose-400" /> Spicy
                    </span>
                  </>
                )}
                {selectedDish.vegetarian && (
                  <>
                    <span>•</span>
                    <span className="text-emerald-400 font-semibold">
                      Vegetarian
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Custom Extras */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Customize Your Order
              </h4>
              <div className="space-y-1.5">
                {extraOptions.map((opt) => {
                  const isChecked = selectedExtras.includes(opt.name);
                  return (
                    <label
                      key={opt.name}
                      onClick={() => toggleExtra(opt.name)}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? "bg-orange-500/10 border-[#FF5A1F]/50 text-white"
                          : "bg-white/[0.02] border-white/[0.06] text-zinc-300 hover:border-white/[0.12]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                            isChecked
                              ? "bg-[#FF5A1F] border-[#FF5A1F] text-white"
                              : "border-zinc-500"
                          }`}
                        >
                          {isChecked && (
                            <Check className="w-3 h-3 stroke-[3]" />
                          )}
                        </div>
                        <span className="text-xs font-medium">{opt.name}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-zinc-400">
                        +${opt.price.toFixed(2)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Quantity and Add Button */}
            <div className="flex items-center gap-4 pt-3 border-t border-white/[0.06]">
              {/* Counter */}
              <div className="flex items-center gap-2 bg-[#171E2E] rounded-xl border border-white/[0.08] p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold text-white min-w-[24px] text-center font-mono">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to order button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-[#FF5A1F] to-[#FF7A00] hover:from-[#e04810] hover:to-[#eb6c00] text-white font-extrabold text-sm shadow-xl shadow-orange-500/25 flex items-center justify-between transition-all transform active:scale-98"
              >
                <span>Add to Basket</span>
                <span className="bg-black/25 px-2.5 py-1 rounded-lg text-xs font-mono">
                  ${totalPrice.toFixed(2)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
