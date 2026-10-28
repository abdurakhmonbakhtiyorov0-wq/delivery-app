"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/context/CartContext";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Flame,
  Sparkles,
  Tag,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from "lucide-react";

export default function CartDrawer() {
  const router = useRouter();
  // const {
  //   isCartOpen,
  //   setIsCartOpen,
  //   cartItems,
  //   updateQuantity,
  //   removeFromCart,
  //   clearCart,
  //   subtotal,
  //   deliveryFee,
  //   serviceFee,
  //   discountAmount,
  //   total,
  //   promoCode,
  //   promoMessage,
  //   applyPromoCode,
  //   deliveryMode,
  //   setActiveOrder,
  // } = useCart();

  const applyPromoCode = useCartStore((state) => state.applyPromoCode);
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);
  const cartItems = useCartStore((state) => state.cartItems);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = useCartStore((state) => state.subtotal);
  const deliveryFee = useCartStore((state) => state.deliveryFee);
  const serviceFee = useCartStore((state) => state.serviceFee);
  const discountAmount = useCartStore((state) => state.discountAmount);
  const total = useCartStore((state) => state.total);
  const promoCode = useCartStore((state) => state.promoCode);
  const promoMessage = useCartStore((state) => state.promoMessage);
  const deliveryMode = useCartStore((state) => state.deliveryMode);
  const setActiveOrder = useCartStore((state) => state.setActiveOrder);

  const [inputCode, setInputCode] = useState("");
  const [isOrdering, setIsOrdering] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setIsCartOpen(false);
    router.push("/checkout");
  };

  const freeDeliveryThreshold = 45;
  const amountToFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(
    100,
    (subtotal / freeDeliveryThreshold) * 100,
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F131C] border-l border-white/[0.08] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF5A1F]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Your Basket</h2>
                <p className="text-xs text-zinc-400">
                  {cartItems.length}{" "}
                  {cartItems.length === 1 ? "dish" : "dishes"} selected
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-zinc-400 hover:text-rose-400 transition-colors px-2 py-1"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Free Delivery Bar */}
          <div className="px-6 py-3 bg-[#131926] border-b border-white/[0.06]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-zinc-300 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {amountToFreeDelivery > 0 ? (
                  <>
                    Add{" "}
                    <span className="text-[#FF5A1F] font-bold">
                      ${amountToFreeDelivery.toFixed(2)}
                    </span>{" "}
                    more for Free Delivery
                  </>
                ) : (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> You unlocked Free
                    Delivery!
                  </span>
                )}
              </span>
              <span className="text-zinc-400 font-mono text-[11px]">
                {Math.round(freeDeliveryProgress)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-zinc-500 mb-4">
                  <ShoppingBag className="w-9 h-9" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Your cart is empty
                </h3>
                <p className="text-sm text-zinc-400 max-w-xs mb-6">
                  Explore our mouth-watering dishes and add your favorites to
                  get started!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#FF5A1F] text-white font-bold text-sm shadow-lg shadow-orange-500/20 hover:bg-[#e04810] transition-all"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 border border-white/[0.08]"
                  />

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-white text-sm truncate leading-snug">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-zinc-500 hover:text-rose-400 p-1 transition-colors shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-zinc-400 truncate -mt-0.5">
                        {item.restaurant}
                      </p>
                      {item.selectedOptions &&
                        item.selectedOptions.length > 0 && (
                          <p className="text-[10px] text-amber-400/80 truncate mt-0.5">
                            {item.selectedOptions.join(", ")}
                          </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/[0.04]">
                      <span className="font-extrabold text-white text-sm tracking-tight">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>

                      <div className="flex items-center gap-2 bg-[#171D2B] rounded-lg border border-white/[0.08] px-1.5 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-white min-w-[16px] text-center font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Checkout Section */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-[#111520] border-t border-white/[0.08] space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="Promo code (try: RUSH30)"
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF5A1F] uppercase font-mono tracking-wider"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white/[0.08] hover:bg-white/[0.12] text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {promoMessage && (
                  <p
                    className={`text-[11px] font-medium flex items-center gap-1 ${
                      promoMessage.type === "success"
                        ? "text-emerald-400"
                        : "text-rose-400"
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs pt-2 border-t border-white/[0.04]">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-zinc-200 font-mono">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Delivery fee ({deliveryMode})</span>
                  <span className="text-zinc-200 font-mono">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-400 font-bold">FREE</span>
                    ) : (
                      `$${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Service & platform fee</span>
                  <span className="text-zinc-200 font-mono">
                    ${serviceFee.toFixed(2)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount ({promoCode})</span>
                    <span className="font-mono">
                      -${discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/[0.06]">
                  <span>Total</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A1F] to-amber-400 font-mono text-lg">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isOrdering}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FF5A1F] via-[#FF7A00] to-amber-500 hover:from-[#e04810] hover:to-[#eb6c00] text-white font-extrabold text-sm shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {isOrdering ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-zinc-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />{" "}
                  Secure Checkout
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#FF5A1F]" /> 25 min
                  Delivery
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
