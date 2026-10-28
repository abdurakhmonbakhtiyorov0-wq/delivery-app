'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/context/CartContext';
import { 
  MapPin, 
  X, 
  Search, 
  Navigation, 
  Check, 
  Home, 
  Briefcase, 
  TreePine,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function AddressModal() {
  // const { 
  //   isAddressModalOpen, 
  //   setIsAddressModalOpen, 
  //   deliveryAddress, 
  //   savedAddresses, 
  //   selectAddress,
  //   addNewAddress
  // } = useCart();
    const isAddressModalOpen = useCartStore((state) => state.isAddressModalOpen)
    const setIsAddressModalOpen = useCartStore((state) => state.setIsAddressModalOpen)
    const deliveryAddress = useCartStore((state) => state.deliveryAddress)
    const savedAddresses = useCartStore((state) => state.savedAddresses)
    const selectAddress = useCartStore((state) => state.selectAddress)
    const addNewAddress = useCartStore((state) => state.addNewAddress)

  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  if (!isAddressModalOpen) return null;

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setTimeout(() => {
            const loc = '770 Broadway (Current Location), NY';
            addNewAddress({
              title: 'Current Location',
              street: '770 Broadway',
              city: 'New York, NY',
              icon: '📍',
            });
            setIsLocating(false);
            setIsAddressModalOpen(false);
          }, 600);
        },
        () => {
          setTimeout(() => {
            selectAddress('Current Location (Manhattan, NY)');
            setIsLocating(false);
          }, 500);
        }
      );
    } else {
      selectAddress('Current Location (Manhattan, NY)');
      setIsLocating(false);
    }
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addNewAddress({
        title: 'Entered Address',
        street: searchQuery.trim(),
        city: 'New York, NY',
        icon: '📍',
      });
      setSearchQuery('');
      setIsAddressModalOpen(false);
    }
  };

  const getAddressIcon = (title) => {
    const lower = title.toLowerCase();
    if (lower.includes('home')) return <Home className="w-4 h-4 text-[#FF5A1F]" />;
    if (lower.includes('work') || lower.includes('office')) return <Briefcase className="w-4 h-4 text-blue-400" />;
    return <TreePine className="w-4 h-4 text-emerald-400" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        onClick={() => setIsAddressModalOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-[#0C0F15] border border-white/[0.08] rounded-3xl shadow-2xl shadow-black/80 overflow-hidden z-10 animate-fade-up">
        {/* Header glow */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600" />

        {/* Modal Header */}
        <div className="p-6 pb-4 flex items-center justify-between border-b border-white/[0.06]">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#FF5A1F]" />
              Select Delivery Address
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Choose a saved location or enter a new delivery address
            </p>
          </div>
          <button
            onClick={() => setIsAddressModalOpen(false)}
            className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.1] transition-colors"
            aria-label="Close address modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Search Form */}
          <form onSubmit={handleCustomSubmit} className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search street, building, apartment or zip code..."
              className="w-full bg-[#141822] border border-white/[0.08] rounded-2xl pl-11 pr-24 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF5A1F]/50 focus:ring-1 focus:ring-[#FF5A1F]/50 transition-all"
            />
            {searchQuery ? (
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FF5A1F] hover:bg-orange-600 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 transition-all"
              >
                Set <ArrowRight className="w-3 h-3" />
              </button>
            ) : null}
          </form>

          {/* Use Current GPS Location Button */}
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={isLocating}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-orange-500/10 to-amber-500/5 border border-orange-500/20 hover:border-orange-500/40 text-white transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#FF5A1F]/20 flex items-center justify-center text-[#FF5A1F] group-hover:scale-110 transition-transform">
                <Navigation className={`w-5 h-5 ${isLocating ? 'animate-spin' : ''}`} />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white group-hover:text-[#FF5A1F] transition-colors flex items-center gap-2">
                  {isLocating ? 'Detecting location...' : 'Use current location'}
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-xs text-zinc-400">
                  Using your device GPS for instant pin
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </button>

          {/* Saved Addresses Section */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 px-1">
              Saved Locations
            </div>
            <div className="space-y-2.5">
              {savedAddresses?.map((addr) => {
                const formatted = `${addr.street}, ${addr.city}`;
                const isSelected = deliveryAddress.includes(addr.street) || deliveryAddress === formatted;

                return (
                  <div
                    key={addr.id}
                    onClick={() => selectAddress(addr)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white/[0.08] border-[#FF5A1F]/60 shadow-lg shadow-orange-500/5'
                        : 'bg-[#141822]/60 hover:bg-[#141822] border-white/[0.06] hover:border-white/[0.12]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-base shrink-0 ${
                        isSelected ? 'bg-orange-500/20 text-[#FF5A1F]' : 'bg-white/[0.04] text-zinc-300'
                      }`}>
                        {getAddressIcon(addr.title)}
                      </div>
                      <div className="text-left truncate">
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          {addr.title}
                          {isSelected && (
                            <span className="text-[10px] uppercase font-black bg-[#FF5A1F] text-white px-2 py-0.5 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-zinc-300 truncate">
                          {addr.street}, {addr.city}
                        </div>
                        {addr.details && (
                          <div className="text-[11px] text-zinc-500 truncate">
                            {addr.details}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 ml-3">
                      {isSelected ? (
                        <div className="w-6 h-6 rounded-full bg-[#FF5A1F] flex items-center justify-center text-white shadow-md shadow-orange-500/30">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border border-white/20 hover:border-white/40 transition-colors" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-black/40 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
          <span>Current: <strong className="text-zinc-200">{deliveryAddress}</strong></span>
          <button 
            type="button"
            onClick={() => setIsAddressModalOpen(false)}
            className="text-zinc-400 hover:text-white transition-colors underline underline-offset-4"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
