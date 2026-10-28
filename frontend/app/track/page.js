'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Navigation, 
  ChevronRight, 
  RotateCcw,
  Sparkles,
  Store,
  Home,
  Flame,
  Check
} from 'lucide-react';

const orderSteps = [
  { id: 'placed', label: 'Order Confirmed', time: '12:42 PM', desc: 'Kitchen received your ticket' },
  { id: 'preparing', label: 'Kitchen Preparing', time: '12:48 PM', desc: 'Freshly baked & tamper-sealed' },
  { id: 'on_the_way', label: 'Courier on the Way', time: '1:02 PM', desc: 'Marco is on route to you' },
  { id: 'delivered', label: 'Delivered', time: 'Est. 1:18 PM', desc: 'Handed over at doorstep' },
];

export default function TrackPage() {
  const { activeOrder, deliveryAddress } = useCart();
  const [currentStepIndex, setCurrentStepIndex] = useState(0); // 0: placed, 1: preparing, 2: on_the_way, 3: delivered
  const [countdown, setCountdown] = useState(25);
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    // Dynamic countdown based on active step
    if (currentStepIndex === 0) setCountdown(30);
    else if (currentStepIndex === 1) setCountdown(22);
    else if (currentStepIndex === 2) setCountdown(12);
    else setCountdown(0);
  }, [currentStepIndex]);

  const advanceStep = () => {
    setCurrentStepIndex((prev) => (prev < 3 ? prev + 1 : 0));
  };

  const handleCall = () => {
    alert('Calling Courier: +1 (555) 234-8910 (Marco Rossi)...');
  };

  const handleMessage = () => {
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 2500);
  };

  // State checks for synchronized animations
  const isRestaurantActive = currentStepIndex === 0 || currentStepIndex === 1;
  const isCourierActive = currentStepIndex === 2;
  const isHomeActive = currentStepIndex === 3;

  return (
    <div className="min-h-screen bg-[#090B0E] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2.5">
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                isHomeActive
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                  : 'bg-orange-500/10 border border-orange-500/30 text-[#FF5A1F]'
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  isHomeActive ? 'bg-emerald-400' : 'bg-[#FF5A1F] animate-pulse'
                }`} />
                {isRestaurantActive && (currentStepIndex === 0 ? 'Order Placed' : 'Cooking in Kitchen')}
                {isCourierActive && 'Courier In Transit'}
                {isHomeActive && 'Order Delivered ✓'}
              </span>
              <span className="text-xs font-mono font-bold text-zinc-400">
                Order #{activeOrder?.orderId || 'FR-88291'}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-2">
              Live Order Tracker
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={advanceStep}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 hover:from-orange-500/30 hover:to-amber-500/30 text-orange-400 text-xs font-bold border border-orange-500/30 transition-all flex items-center gap-2 shadow-lg"
              title="Click to cycle between: Order Confirmed -> Kitchen -> Courier -> Delivered"
            >
              <RotateCcw className="w-4 h-4 text-[#FF5A1F]" />
              <span>Next Status Stage ({currentStepIndex + 1}/4)</span>
            </button>
            <Link
              href="/menu"
              className="px-4 py-2.5 rounded-xl bg-[#FF5A1F] hover:bg-[#e04810] text-white text-xs font-bold shadow-lg shadow-orange-500/20 transition-all"
            >
              Menu
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left 7 Columns: ETA, Interactive Stepper & Synchronized Map */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* ETA Banner */}
            <div className="p-6 rounded-3xl bg-[#111622] border border-white/[0.08] shadow-xl flex items-center justify-between">
              <div>
                <div className="text-xs text-zinc-400 font-medium">
                  {currentStepIndex === 3 ? 'Status' : 'Estimated Time of Arrival'}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white font-mono mt-1 flex items-baseline gap-2">
                  {currentStepIndex === 3 ? (
                    <span className="text-emerald-400">Delivered! 🎉</span>
                  ) : (
                    <>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A1F] to-amber-400">
                        {countdown} mins
                      </span>
                      <span className="text-xs text-zinc-400 font-sans font-normal">
                        {currentStepIndex === 0 && 'Awaiting Kitchen Pass'}
                        {currentStepIndex === 1 && 'Fresh in Oven'}
                        {currentStepIndex === 2 && 'Marco on Route'}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black shadow-inner ${
                isRestaurantActive ? 'bg-amber-500/15 text-amber-400' :
                isCourierActive ? 'bg-orange-500/15 text-[#FF5A1F]' :
                'bg-emerald-500/15 text-emerald-400'
              }`}>
                {isRestaurantActive && (currentStepIndex === 0 ? '📋' : '👨‍🍳')}
                {isCourierActive && '🛵'}
                {isHomeActive && '🏠'}
              </div>
            </div>

            {/* Stepper Timeline - Clickable to test each stage */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#111622] border border-white/[0.08] shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-400">
                  Delivery Timeline
                </h3>
                <span className="text-[11px] text-zinc-500">
                  (Click any stage to test animation)
                </span>
              </div>

              <div className="space-y-6 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-white/[0.06]">
                {orderSteps.map((step, idx) => {
                  const isDone = idx < currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div 
                      key={step.id} 
                      onClick={() => setCurrentStepIndex(idx)}
                      className="relative flex items-start gap-4 cursor-pointer group"
                    >
                      {/* Step Dot */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 z-10 transition-all ${
                        isDone
                          ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                          : isCurrent
                          ? 'bg-[#FF5A1F] text-white ring-4 ring-[#FF5A1F]/25 shadow-lg shadow-orange-500/30 scale-110'
                          : 'bg-[#171E2E] text-zinc-500 border border-white/[0.08] group-hover:border-white/20'
                      }`}>
                        {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-bold transition-colors ${
                            isCurrent 
                              ? 'text-[#FF5A1F]' 
                              : isDone 
                              ? 'text-white' 
                              : 'text-zinc-500 group-hover:text-zinc-300'
                          }`}>
                            {step.label}
                            {isCurrent && (
                              <span className="ml-2 text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#FF5A1F]/20 text-[#FF5A1F]">
                                ACTIVE
                              </span>
                            )}
                          </h4>
                          <span className="text-xs font-mono text-zinc-400">{step.time}</span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ================= MAP WITH SYNCHRONIZED ANIMATIONS ================= */}
            <div className="relative rounded-3xl overflow-hidden bg-[#0D121B] border border-white/[0.08] shadow-2xl aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center select-none">
              
              {/* Map grid lines simulation */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
              
              {/* Simulated streets vector */}
              <svg className="absolute inset-0 w-full h-full stroke-white/[0.08]" xmlns="http://www.w3.org/2000/svg">
                <path d="M 50 150 Q 200 80 350 200 T 700 180" fill="none" strokeWidth="12" />
                <path d="M 120 300 Q 250 220 450 260 T 650 100" fill="none" strokeWidth="8" />
                <path d="M 300 50 L 300 350" fill="none" strokeWidth="6" />
                <path d="M 520 20 L 520 380" fill="none" strokeWidth="6" />
              </svg>

              {/* Delivery Route Path */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M 180 120 Q 260 160 360 210 T 520 230" 
                  fill="none" 
                  stroke={isCourierActive ? '#FF5A1F' : 'rgba(255,255,255,0.15)'} 
                  strokeWidth={isCourierActive ? '4' : '2'}
                  strokeDasharray={isCourierActive ? '6 6' : 'none'}
                  className={isCourierActive ? 'animate-pulse' : ''}
                />
              </svg>

              {/* ---------------- 1. RESTAURANT PIN ---------------- */}
              {/* Animated when: Order Confirmed (step 0) OR Kitchen Preparing (step 1) */}
              <div className="absolute top-[28%] left-[22%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                <div className="relative">
                  {isRestaurantActive && (
                    <>
                      {/* Pulsing glow ring when restaurant is active */}
                      <div className="absolute -inset-3 bg-amber-500/40 rounded-full animate-ping" />
                      <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl opacity-60 blur-md animate-pulse" />
                    </>
                  )}
                  
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 ${
                    isRestaurantActive
                      ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-black shadow-amber-500/50 scale-110 animate-bounce'
                      : 'bg-amber-500/40 text-white border border-amber-500/30'
                  }`}>
                    {currentStepIndex === 1 ? (
                      <Flame className={`w-6 h-6 ${isRestaurantActive ? 'fill-black' : ''}`} />
                    ) : (
                      <Store className="w-5 h-5" />
                    )}
                  </div>
                </div>

                <span className={`mt-2 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wide border shadow-xl transition-all ${
                  isRestaurantActive
                    ? 'bg-black text-amber-400 border-amber-400/50 scale-105'
                    : 'bg-black/75 text-zinc-400 border-white/10'
                }`}>
                  {isRestaurantActive 
                    ? (currentStepIndex === 0 ? 'Osteria Napoli (Confirmed!)' : 'Kitchen Baking 🔥') 
                    : 'Osteria Napoli 1924'}
                </span>
              </div>

              {/* ---------------- 2. COURIER / BICYCLE PIN ---------------- */}
              {/* Animated ONLY when: Courier on the Way (step 2) */}
              {/* If step 0 or 1, stationed at restaurant. If step 2, moving in middle. If step 3, arrived at customer. */}
              <div 
                className={`absolute transition-all duration-700 ease-out z-30 flex flex-col items-center ${
                  isRestaurantActive 
                    ? 'top-[36%] left-[28%]' 
                    : isCourierActive 
                    ? 'top-[50%] left-[50%]' 
                    : 'top-[52%] left-[70%]'
                }`}
                style={{ transform: 'translate(-50%, -50%)' }}
              >
                <div className="relative">
                  {isCourierActive && (
                    <>
                      {/* Active pulse ring around bike/scooter ONLY when on the way */}
                      <div className="absolute -inset-3 bg-orange-500/40 rounded-full animate-ping" />
                      <div className="absolute -inset-2 bg-gradient-to-r from-[#FF5A1F] to-amber-400 rounded-2xl opacity-60 blur-md animate-pulse" />
                    </>
                  )}

                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 ${
                    isCourierActive
                      ? 'bg-gradient-to-tr from-[#FF5A1F] via-orange-500 to-amber-400 text-white shadow-orange-500/60 scale-110 animate-bounce text-xl'
                      : 'bg-[#171E2E] text-zinc-400 border border-white/10 opacity-70 text-base'
                  }`}>
                    🛵
                  </div>
                </div>

                <span className={`mt-1.5 px-2.5 py-1 rounded-full text-[10px] font-black border shadow-xl transition-all ${
                  isCourierActive
                    ? 'bg-black text-[#FF5A1F] border-[#FF5A1F]/50 shadow-orange-500/20 scale-105'
                    : 'bg-black/80 text-zinc-400 border-white/10'
                }`}>
                  {isCourierActive 
                    ? 'Marco In Transit 🛵 (12 min)' 
                    : isRestaurantActive 
                    ? 'Marco (Waiting at kitchen)' 
                    : 'Marco (Arrived ✓)'}
                </span>
              </div>

              {/* ---------------- 3. CUSTOMER HOME PIN ---------------- */}
              {/* Animated ONLY when: Delivered (step 3) */}
              <div className="absolute top-[58%] left-[78%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                <div className="relative">
                  {isHomeActive && (
                    <>
                      {/* Green celebratory pulsing rings when delivered! */}
                      <div className="absolute -inset-3 bg-emerald-500/50 rounded-full animate-ping" />
                      <div className="absolute -inset-2 bg-emerald-400 rounded-2xl opacity-70 blur-md animate-pulse" />
                    </>
                  )}

                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300 ${
                    isHomeActive
                      ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-black shadow-emerald-500/60 scale-110 animate-bounce'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    <Home className={`w-5 h-5 ${isHomeActive ? 'stroke-[2.5]' : ''}`} />
                  </div>
                </div>

                <span className={`mt-2 px-2.5 py-1 rounded-full text-[10px] font-black border shadow-xl transition-all ${
                  isHomeActive
                    ? 'bg-emerald-500 text-black border-emerald-400 shadow-emerald-500/30 scale-105'
                    : 'bg-black/75 text-zinc-400 border-white/10'
                }`}>
                  {isHomeActive ? '🎉 Delivered to Your Door!' : 'Your Address'}
                </span>
              </div>

              {/* Status Badge in bottom corner */}
              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 text-xs text-zinc-300 flex items-center gap-2">
                <Navigation className="w-3.5 h-3.5 text-[#FF5A1F]" />
                <span className="font-medium">
                  {isRestaurantActive && (currentStepIndex === 0 ? 'Order registered at restaurant' : 'Kitchen actively cooking')}
                  {isCourierActive && 'Courier speed: 32 km/h • On route'}
                  {isHomeActive && 'Order successfully delivered to customer'}
                </span>
              </div>
            </div>

          </div>

          {/* Right 5 Columns: Courier Card & Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Courier Card */}
            <div className="p-6 rounded-3xl bg-[#111622] border border-white/[0.08] shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF5A1F]">
                  Assigned Courier
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black">
                  VERIFIED PRO
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 p-0.5">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                    alt="Marco Rossi"
                    className="w-full h-full rounded-[14px] object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-lg">Marco Rossi</h3>
                  <p className="text-xs text-zinc-400">Yamaha NMAX 155 • Black</p>
                  <div className="text-xs text-amber-400 font-bold mt-1">
                    ★ 4.96 <span className="text-zinc-500 font-normal">(1,420 trips)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleCall}
                  className="py-3 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-white/[0.06]"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  Call Courier
                </button>
                <button
                  onClick={handleMessage}
                  className="py-3 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-white/[0.06]"
                >
                  <MessageSquare className="w-4 h-4 text-[#FF5A1F]" />
                  {messageSent ? 'Message Sent!' : 'Message'}
                </button>
              </div>
            </div>

            {/* Delivery Details Card */}
            <div className="p-6 rounded-3xl bg-[#111622] border border-white/[0.08] shadow-xl space-y-4 text-xs">
              <h3 className="font-extrabold uppercase tracking-widest text-zinc-400 text-xs">
                Drop-off & Recipient Details
              </h3>
              
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-1">
                <div className="text-zinc-400 text-[11px]">Recipient Contact</div>
                <div className="text-white font-semibold flex items-center justify-between">
                  <span>{activeOrder?.customerName || 'Alex Morgan'}</span>
                  <span className="text-[#FF5A1F] font-mono font-bold text-[11px]">{activeOrder?.customerPhone || '+1 (555) 382-9012'}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-1">
                <div className="text-zinc-400 text-[11px]">Delivery Location</div>
                <div className="text-white font-semibold flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#FF5A1F] shrink-0" />
                  <span>{activeOrder?.deliveryAddress || deliveryAddress}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04] space-y-1">
                <div className="text-zinc-400 text-[11px]">Special Instructions</div>
                <div className="text-zinc-300 font-medium">
                  "Leave at front porch door. Ring the bell twice. Thank you!"
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-zinc-400 border-t border-white/[0.04]">
                <span>Contactless Delivery</span>
                <span className="text-emerald-400 font-bold">Confirmed ✓</span>
              </div>
            </div>

            {/* Order Receipt */}
            <div className="p-6 rounded-3xl bg-[#111622] border border-white/[0.08] shadow-xl text-xs space-y-3">
              <h3 className="font-extrabold uppercase tracking-widest text-zinc-400">
                Order Items ({activeOrder?.itemsCount || 3})
              </h3>

              <div className="space-y-2 py-1">
                <div className="flex justify-between text-zinc-300">
                  <span>1x Truffle Burrata Margherita</span>
                  <span className="font-mono text-white">$18.50</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>2x Double Wagyu Truffle Smash</span>
                  <span className="font-mono text-white">$33.80</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-sm font-bold text-white">
                <span>Total Paid</span>
                <span className="font-mono text-[#FF5A1F] text-base font-black">
                  ${(activeOrder?.total || 52.30).toFixed(2)}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}