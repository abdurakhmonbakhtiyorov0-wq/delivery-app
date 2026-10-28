'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  SlidersHorizontal, 
  ChevronDown, 
  Check, 
  Star, 
  Sparkles, 
  ArrowDownNarrowWide, 
  ArrowUpWideNarrow 
} from 'lucide-react';

const sortOptions = [
  { id: 'recommended', label: 'Recommended', icon: Sparkles },
  { id: 'rating', label: 'Top Rated (★)', icon: Star },
  { id: 'price-low', label: 'Price: Low to High', icon: ArrowDownNarrowWide },
  { id: 'price-high', label: 'Price: High to Low', icon: ArrowUpWideNarrow },
];

export default function SortDropdown({ value, onChange, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const selectedOption = sortOptions.find((opt) => opt.id === value) || sortOptions[0];
  const SelectedIcon = selectedOption.icon;

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
          isOpen
            ? 'bg-[#171E2E] border border-[#FF5A1F]/50 ring-2 ring-[#FF5A1F]/20 text-white shadow-lg shadow-black/40'
            : 'bg-[#111622] hover:bg-[#151C2A] border border-white/[0.08] hover:border-white/[0.18] text-zinc-300 hover:text-white shadow-sm'
        }`}
      >
        <SlidersHorizontal className={`w-3.5 h-3.5 transition-colors ${
          isOpen ? 'text-[#FF5A1F]' : 'text-zinc-400 group-hover:text-zinc-300'
        }`} />
        
        <span className="font-medium tracking-tight">
          {selectedOption.label}
        </span>

        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#FF5A1F]' : 'text-zinc-400 group-hover:text-zinc-300'
          }`}
        />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div 
          role="listbox"
          className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-[#111622]/95 backdrop-blur-2xl border border-white/[0.1] shadow-2xl shadow-black/80 p-1.5 z-50 animate-in fade-in-0 zoom-in-95 duration-150 origin-top-right focus:outline-none"
        >
          <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 border-b border-white/[0.04] mb-1">
            Sort Dishes By
          </div>

          <div className="space-y-0.5">
            {sortOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = option.id === value;

              return (
                <button
                  key={option.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 text-left ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#FF5A1F]/15 to-amber-500/10 text-[#FF5A1F] border border-[#FF5A1F]/30 shadow-sm'
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-3.5 h-3.5 ${
                      isSelected ? 'text-[#FF5A1F]' : 'text-zinc-400'
                    }`} />
                    <span>{option.label}</span>
                  </div>

                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-[#FF5A1F] stroke-[2.5]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}