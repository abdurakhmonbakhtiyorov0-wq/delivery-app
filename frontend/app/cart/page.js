'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  CreditCard, 
  MapPin, 
  Tag, 
  ShieldCheck, 
  Clock, 
  Sparkles 
} from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    deliveryFee, 
    serviceFee, 
    discountAmount, 
    total, 
    promoCode, 
    applyPromoCode, 
    promoMessage, 
    deliveryAddress, 
    setDeliveryAddress,
    deliveryMode,
    selectedTip,
    setSelectedTip,
    setActiveOrder 
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (inputCode) applyPromoCode(inputCode);
  };

  const finalTotal = total;

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    router.push('/checkout');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#090B0E] py-24 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-orange-500/20 border-t-[#FF5A1F] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090B0E] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF5A1F] text-xs font-black uppercase tracking-wider">
            Checkout Review
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-2">
            Your Order Basket
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-24 bg-[#111622] rounded-3xl border border-white/[0.06] max-w-lg mx-auto p-8">
            <div className="w-20 h-20 rounded-3xl bg-white/[0.03] flex items-center justify-center text-zinc-500 mx-auto mb-4">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Your basket is empty</h2>
            <p className="text-xs text-zinc-400 mb-6">
              Looks like you haven't chosen any delicious dishes yet.
            </p>
            <Link
              href="/menu"
              className="px-6 py-3 rounded-xl bg-[#FF5A1F] text-white text-xs font-bold shadow-lg shadow-orange-500/25"
            >
              Browse Gourmet Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 7 Columns: Items & Address */}
            <div className="lg:col-span-7 space-y-6">
              {/* Items Card */}
              <div className="p-6 rounded-3xl bg-[#111622] border border-white/[0.08] shadow-xl space-y-4">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-400">
                  Dishes in Basket ({cartItems.length})
                </h3>

                <div className="divide-y divide-white/[0.04]">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-white/[0.08]"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h4 className="font-bold text-white text-sm">{item.name}</h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-zinc-500 hover:text-rose-400 p-1 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-zinc-400">{item.restaurant}</p>
                          {item.selectedOptions && item.selectedOptions.length > 0 && (
                            <p className="text-[11px] text-amber-400/80 mt-1">
                              {item.selectedOptions.join(', ')}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <span className="font-extrabold text-white text-base font-mono">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>

                          <div className="flex items-center gap-2 bg-[#171E2E] rounded-xl border border-white/[0.08] px-2 py-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-bold text-white min-w-[20px] text-center font-mono">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Details Card */}
              <div className="p-6 rounded-3xl bg-[#111622] border border-white/[0.08] shadow-xl space-y-4">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-400">
                  Delivery Details
                </h3>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Street Address</label>
                  <div className="flex items-center gap-2 bg-[#171E2E] border border-white/[0.08] rounded-xl px-3 py-2.5">
                    <MapPin className="w-4 h-4 text-[#FF5A1F] shrink-0" />
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="bg-transparent text-xs text-white outline-none w-full font-medium"
                    />
                  </div>
                </div>

                {/* Courier Tip Selector */}
                <div>
                  <label className="text-xs text-zinc-400 block mb-2">Courier Tip</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: '$2.00', value: 2.00 },
                      { label: '$3.00', value: 3.00 },
                      { label: '$5.00', value: 5.00 },
                      { label: 'Custom', value: 0.00 },
                    ].map((tip) => (
                      <button
                        key={tip.label}
                        type="button"
                        onClick={() => setSelectedTip(tip.value)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          selectedTip === tip.value
                            ? 'bg-[#FF5A1F] border-[#FF5A1F] text-white shadow-md'
                            : 'bg-[#171E2E] border-white/[0.06] text-zinc-400 hover:text-white'
                        }`}
                      >
                        {tip.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="p-6 rounded-3xl bg-[#111622] border border-white/[0.08] shadow-xl space-y-4">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-400">
                  Payment Method
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'card', name: 'Credit Card', sub: '•••• 4242' },
                    { id: 'apple', name: 'Apple Pay', sub: '1-touch instant' },
                    { id: 'cash', name: 'Cash', sub: 'On delivery' },
                  ].map((pm) => (
                    <div
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        paymentMethod === pm.id
                          ? 'bg-orange-500/10 border-[#FF5A1F] text-white shadow-lg'
                          : 'bg-[#171E2E] border-white/[0.06] text-zinc-400 hover:border-white/[0.12]'
                      }`}
                    >
                      <div className="font-bold text-xs text-white">{pm.name}</div>
                      <div className="text-[10px] text-zinc-500 mt-0.5">{pm.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Summary & Pay Button */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#111622] border border-white/[0.08] shadow-xl space-y-6 sticky top-28">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-400">
                  Order Summary
                </h3>

                {/* Promo form */}
                <form onSubmit={handleApplyPromo} className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="Promo code (RUSH30)"
                      className="flex-1 bg-[#171E2E] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white uppercase font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-white/[0.08] hover:bg-white/[0.12] text-white rounded-xl text-xs font-bold"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <p className={`text-[11px] font-medium ${
                      promoMessage.type === 'success' ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {promoMessage.text}
                    </p>
                  )}
                </form>

                {/* Fee list */}
                <div className="space-y-2.5 text-xs border-t border-white/[0.06] pt-4">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span className="text-zinc-200 font-mono">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Delivery fee</span>
                    <span className="text-zinc-200 font-mono">
                      {deliveryFee === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Service fee</span>
                    <span className="text-zinc-200 font-mono">${serviceFee.toFixed(2)}</span>
                  </div>
                  {selectedTip > 0 && (
                    <div className="flex justify-between text-zinc-400">
                      <span>Courier Tip</span>
                      <span className="text-zinc-200 font-mono">${selectedTip.toFixed(2)}</span>
                    </div>
                  )}
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>Discount ({promoCode})</span>
                      <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-black text-white pt-3 border-t border-white/[0.06]">
                    <span>Total</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A1F] to-amber-400 font-mono text-xl">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Place order button */}
                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FF5A1F] via-[#FF7A00] to-amber-500 hover:from-[#e04810] hover:to-[#eb6c00] text-white font-black text-sm shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <span>Proceed to Delivery & Details (${finalTotal.toFixed(2)})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-[11px] text-zinc-500 text-center flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>256-bit Encrypted Frontend Checkout</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}