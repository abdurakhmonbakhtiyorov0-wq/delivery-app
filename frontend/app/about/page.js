import React from 'react';
import Link from 'next/link';
import { 
  Flame, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Heart, 
  Award, 
  Leaf, 
  ArrowRight 
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#090B0E] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF5A1F] text-xs font-black uppercase tracking-wider">
            Our Culinary Philosophy
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mt-4 leading-tight">
            The Art of Fine Dining, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A1F] to-amber-400">
              Delivered To Your Door.
            </span>
          </h1>
          <p className="text-base text-zinc-400 mt-4 leading-relaxed">
            FoodRush was founded with a singular conviction: home delivery should taste every bit as fresh, vibrant, and hot as dining right at the chef's counter.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { value: '500+', label: 'Artisan Kitchens', desc: 'Curated by Michelin judges' },
            { value: '2M+', label: 'Dishes Delivered', desc: 'Across metropolitan areas' },
            { value: '24 min', label: 'Average Arrival', desc: 'Real-time thermal dispatch' },
            { value: '4.9 ★', label: 'Customer Rating', desc: '45,000+ verified foodies' },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-3xl bg-[#111622] border border-white/[0.08] text-center">
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A1F] to-amber-400 font-mono">
                {stat.value}
              </div>
              <div className="font-extrabold text-white text-sm mt-1">{stat.label}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* 4 Core Pillars */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white">Why FoodRush is Different</h2>
            <p className="text-xs text-zinc-400 mt-1">Built without compromises on quality or courier care.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-[#111622] border border-white/[0.06] space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-[#FF5A1F] flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base">Thermal Pods</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Our custom heat-sealed bags maintain 70°C temperature retention from kitchen pass to doorstep.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#111622] border border-white/[0.06] space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base">100% Eco-Packaging</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Zero single-use plastics. All boxes, bowls, and cutlery are biodegradable sugarcane and cornstarch.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#111622] border border-white/[0.06] space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base">Chef First Economics</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We charge restaurants fair, sustainable commissions, keeping independent kitchens thriving.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#111622] border border-white/[0.06] space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base">Fair Courier Living Wage</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Couriers receive full tipping pass-through, healthcare stipends, and accident insurance coverage.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-orange-600 to-amber-500 text-white text-center shadow-2xl flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl font-black max-w-xl">
            Taste the FoodRush Difference Today
          </h2>
          <p className="text-sm text-white/80 max-w-md mt-2 mb-6">
            Get 30% off your inaugural order with coupon code RUSH30.
          </p>
          <Link
            href="/menu"
            className="px-8 py-3.5 rounded-2xl bg-black text-white font-extrabold text-sm hover:bg-zinc-900 transition-colors shadow-2xl flex items-center gap-2"
          >
            <span>Explore The Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}