"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/context/CartContext";
import {
  ShoppingBag,
  MapPin,
  Menu as MenuIcon,
  X,
  Flame,
  ChevronDown,
  Clock,
  Sparkles,
  Compass,
  Store,
  Navigation,
  ReceiptText,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  // const {
  //   totalCount,
  //   total,
  //   setIsCartOpen,
  //   deliveryMode,
  //   setDeliveryMode,
  //   deliveryAddress,
  //   setIsAddressModalOpen,
  // } = useCart();

  const totalCount = useCartStore((state) => state.totalCount);
  const setDeliveryMode = useCartStore((state) => state.setDeliveryMode);
  const deliveryMode = useCartStore((state) => state.deliveryMode);
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);
  const total = useCartStore((state) => state.total);
  const deliveryAddress = useCartStore((state) => state.deliveryAddress);
  const setIsAddressModalOpen = useCartStore(
    (state) => state.setIsAddressModalOpen,
  );

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Explore Menu", href: "/menu", icon: Compass },
    { name: "Restaurants", href: "/restaurants", icon: Store },
    { name: "Orders", href: "/orders", icon: ReceiptText },
    { name: "Live Track", href: "/track", icon: Navigation },
    { name: "About Us", href: "/about", icon: Sparkles },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#090B0E]/95 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/50"
            : "bg-[#090B0E]/90 backdrop-blur-md border-b border-white/[0.04]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
            {/* Left: Logo & Delivery Toggle */}
            <div className="flex items-center gap-4 lg:gap-6 shrink-0">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF5A1F] via-[#FF7A00] to-amber-400 flex items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
                  <Flame className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center">
                    Food
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A1F] to-amber-400">
                      Rush
                    </span>
                  </div>
                </div>
              </Link>

              {/* Delivery / Pickup Compact Pill */}
              <div className="hidden 2xl:flex items-center bg-[#111622] p-1 rounded-xl border border-white/[0.06] text-xs font-semibold">
                <button
                  onClick={() => setDeliveryMode("delivery")}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                    deliveryMode === "delivery"
                      ? "bg-[#FF5A1F] text-white font-bold shadow"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  Delivery
                </button>
                <button
                  onClick={() => setDeliveryMode("pickup")}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    deliveryMode === "pickup"
                      ? "bg-[#FF5A1F] text-white font-bold shadow"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Pickup
                </button>
              </div>

              {/* Location Selector */}
              <button
                type="button"
                onClick={() => setIsAddressModalOpen(true)}
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-[#FF5A1F]/40 text-xs text-zinc-300 transition-all cursor-pointer group text-left max-w-[210px]"
              >
                <MapPin className="w-3.5 h-3.5 text-[#FF5A1F] shrink-0" />
                <div className="truncate">
                  <span className="font-semibold text-white text-xs truncate group-hover:text-[#FF5A1F] transition-colors block">
                    {mounted ? deliveryAddress || "Select address" : "Select address"}
                  </span>
                </div>
                <ChevronDown className="w-3 h-3 text-zinc-500 group-hover:text-white shrink-0 transition-colors ml-auto" />
              </button>
            </div>

            {/* Middle: Clean Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "bg-white/[0.08] text-[#FF5A1F] font-bold border border-white/[0.08]"
                        : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 ${isActive ? "text-[#FF5A1F]" : "text-zinc-500"}`}
                    />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right: Cart & Mobile Trigger */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2.5 bg-gradient-to-r from-[#FF5A1F] to-[#FF7A00] hover:from-[#e04810] hover:to-[#eb6c00] text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4" />
                  {mounted && totalCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 bg-black text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white/20">
                      {totalCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline font-semibold">Cart</span>
                <span className="bg-black/25 px-1.5 py-0.5 rounded-md text-[11px] font-black font-mono">
                  ${mounted && total ? total.toFixed(2) : "0.00"}
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-white"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <MenuIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0C0F15] border-b border-white/[0.08] px-4 py-6 space-y-4">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAddressModalOpen(true);
              }}
              className="w-full flex items-center justify-between p-3 bg-white/[0.04] hover:bg-white/[0.08] active:scale-[0.99] rounded-xl border border-white/[0.08] text-xs text-zinc-300 transition-all text-left"
            >
              <div className="flex items-center gap-2 truncate">
                <MapPin className="w-4 h-4 text-[#FF5A1F] shrink-0" />
                <span className="truncate font-semibold text-white">
                  {deliveryAddress || "Select address"}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500 shrink-0 ml-2" />
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setDeliveryMode("delivery")}
                className={`py-2 rounded-lg text-xs font-bold text-center ${
                  deliveryMode === "delivery"
                    ? "bg-[#FF5A1F] text-white"
                    : "bg-white/[0.04] text-zinc-400"
                }`}
              >
                Delivery
              </button>
              <button
                onClick={() => setDeliveryMode("pickup")}
                className={`py-2 rounded-lg text-xs font-bold text-center ${
                  deliveryMode === "pickup"
                    ? "bg-[#FF5A1F] text-white"
                    : "bg-white/[0.04] text-zinc-400"
                }`}
              >
                Pickup
              </button>
            </div>

            <div className="space-y-1 pt-2 border-t border-white/[0.08]">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-zinc-300 hover:text-white hover:bg-white/[0.04]"
                  >
                    <Icon className="w-5 h-5 text-[#FF5A1F]" />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
