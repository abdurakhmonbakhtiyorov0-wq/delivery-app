"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/context/CartContext";
import {
  Navigation,
  ArrowRight,
  X,
  Clock,
  MapPin,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function LiveTrackingBar() {
  const pathname = usePathname();
  // const { activeOrder, deliveryAddress } = useCart();

  const activeOrder = useCartStore((state) => state.activeOrder);
  const deliveryAddress = useCartStore((state) => state.deliveryAddress);

  const [isDismissed, setIsDismissed] = useState(false);

  // Hide on track page itself, or if no active order, or if user dismissed
  if (!activeOrder || pathname === "/track" || isDismissed) {
    return null;
  }

  const isDelivered = activeOrder.status === "delivered";

  return (
    <div className="fixed bottom-6 inset-x-0 z-40 px-4 sm:px-6 pointer-events-none flex justify-center animate-fade-up">
      <div className="pointer-events-auto max-w-xl w-full bg-[#0F1420]/95 backdrop-blur-xl border border-white/[0.12] rounded-3xl p-3.5 sm:p-4 shadow-2xl shadow-black/80 flex items-center justify-between gap-3 text-white">
        {/* Left: Animated Status Icon */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#FF5A1F] to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/25">
              {isDelivered ? (
                <CheckCircle2 className="w-5 h-5 text-white" />
              ) : (
                <span className="text-xl">🛵</span>
              )}
            </div>
            {!isDelivered && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
            )}
          </div>

          {/* Details */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-tight text-white flex items-center gap-1.5">
                {isDelivered ? "Order Delivered!" : `Courier is on the way`}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.08] text-zinc-300 font-bold">
                {activeOrder.orderId}
              </span>
            </div>
            <div className="text-[11px] text-zinc-400 truncate flex items-center gap-1.5 mt-0.5">
              <Clock className="w-3 h-3 text-[#FF5A1F] shrink-0" />
              <span>
                {isDelivered
                  ? "Enjoy your meal!"
                  : `ETA: ~${activeOrder.etaMinutes || 14} min`}
              </span>
              <span>•</span>
              <span className="truncate">
                {activeOrder.deliveryAddress || deliveryAddress}
              </span>
            </div>
          </div>
        </div>

        {/* Right: CTA & Dismiss */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/track"
            className="px-3.5 py-2 rounded-xl bg-[#FF5A1F] hover:bg-orange-600 text-white font-extrabold text-xs shadow-md shadow-orange-500/20 flex items-center gap-1.5 transition-all transform hover:scale-105 active:scale-95"
          >
            <span>Track</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1.5 rounded-xl hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors"
            aria-label="Dismiss tracking bar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
