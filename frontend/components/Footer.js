import React from 'react';
import Link from 'next/link';
import { Flame, Heart, Shield, Clock, Award, Smartphone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#07090D] border-t border-white/[0.06] text-zinc-400 text-sm">
      {/* Top Features Strip */}
      <div className="border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF5A1F] shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Lightning Delivery</h4>
                <p className="text-xs text-zinc-500 mt-0.5">Average 25 min to doorstep</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Sanitary Assured</h4>
                <p className="text-xs text-zinc-500 mt-0.5">Strict hygiene & tamper seal</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Top Rated Chefs</h4>
                <p className="text-xs text-zinc-500 mt-0.5">Curated culinary masters</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Live GPS Tracking</h4>
                <p className="text-xs text-zinc-500 mt-0.5">Real-time driver updates</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF5A1F] to-amber-400 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                <Flame className="w-5 h-5 fill-white" />
              </div>
              <span className="text-2xl font-black text-white">
                Food<span className="text-[#FF5A1F]">Rush</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              FoodRush is the next-generation food delivery experience connecting food lovers with premier local restaurants, cloud kitchens, and artisan chefs.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-zinc-300">
                iOS 4.9 ★ Rating
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-zinc-300">
                Android 4.8 ★
              </div>
            </div>
          </div>

          {/* Column 1 */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/menu" className="hover:text-white transition-colors">Popular Dishes</Link></li>
              <li><Link href="/restaurants" className="hover:text-white transition-colors">Featured Kitchens</Link></li>
              <li><Link href="/track" className="hover:text-white transition-colors">Live Order Tracker</Link></li>
              <li><Link href="/menu" className="hover:text-white transition-colors">Daily Deals & Promos</Link></li>
              <li><Link href="/menu" className="hover:text-white transition-colors">Healthy & Keto Bowls</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Restaurant Partners</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Become a Courier</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Careers & Press</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Sustainability Pledge</Link></li>
            </ul>
          </div>

          {/* Column 3: App Store Buttons */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              Download App
            </h4>
            <div className="space-y-2.5">
              <a
                href="#"
                className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.2] transition-colors group"
              >
                <Smartphone className="w-5 h-5 text-white" />
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase font-bold">Download for</div>
                  <div className="text-xs font-bold text-white group-hover:text-[#FF5A1F] transition-colors">Apple App Store</div>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.2] transition-colors group"
              >
                <Smartphone className="w-5 h-5 text-white" />
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase font-bold">Get it on</div>
                  <div className="text-xs font-bold text-white group-hover:text-[#FF5A1F] transition-colors">Google Play Store</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-12 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© 2026 FoodRush Inc. Pure Frontend Demo UI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Cookie Preferences</span>
          </div>
        </div>
      </div>
    </footer>
  );
}