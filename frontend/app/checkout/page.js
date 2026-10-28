'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { 
  User, 
  Phone, 
  Mail,
  MapPin, 
  Plus, 
  Check, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CreditCard, 
  ChevronRight, 
  Home, 
  Briefcase, 
  TreePine, 
  AlertCircle,
  Building,
  ArrowLeft
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { 
    cartItems, 
    clearCart,
    subtotal, 
    deliveryFee, 
    serviceFee, 
    discountAmount, 
    total, 
    promoCode, 
    deliveryAddress, 
    selectAddress,
    savedAddresses,
    addNewAddress,
    customerProfile,
    setCustomerProfile,
    selectedTip,
    setSelectedTip,
    recordOrder,
    setActiveOrder 
  } = useCart();

  const [mounted, setMounted] = useState(false);
  // Form states - initialized to empty strings so user enters their real details
  const [name, setName] = useState(customerProfile?.name || '');
  const [phone, setPhone] = useState(customerProfile?.phone || '');
  const [email, setEmail] = useState(customerProfile?.email || '');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Address Drawer / Inline Form state
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newDetails, setNewDetails] = useState('');
  const [newIconType, setNewIconType] = useState('home');

  React.useEffect(() => {
    setMounted(true);
    if (customerProfile) {
      if (customerProfile.name) setName(customerProfile.name);
      if (customerProfile.phone) setPhone(customerProfile.phone);
      if (customerProfile.email) setEmail(customerProfile.email);
    }
  }, [customerProfile]);

  const finalTotal = total;

  const handleSaveNewAddress = (e) => {
    e.preventDefault();
    if (!newStreet.trim()) {
      setErrorMsg('Please enter a street address.');
      return;
    }

    const iconsMap = {
      home: '🏠',
      work: '💼',
      park: '🌳',
      other: '📍',
    };

    const created = addNewAddress({
      title: newTitle.trim() || 'Custom Location',
      street: newStreet.trim(),
      city: newCity.trim() || 'New York, NY',
      details: newDetails.trim(),
      icon: iconsMap[newIconType] || '📍',
    });

    // Reset form
    setNewTitle('');
    setNewStreet('');
    setNewCity('');
    setNewDetails('');
    setShowAddAddress(false);
    setErrorMsg('');
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name for the order receipt.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter your phone number so the courier can contact you.');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Please enter your email address for the order confirmation & receipt.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address (e.g. name@example.com).');
      return;
    }
    if (!deliveryAddress) {
      setErrorMsg('Please select or add a delivery address.');
      return;
    }
    if (cartItems.length === 0) {
      setErrorMsg('Your cart is empty. Add some food first!');
      return;
    }

    setIsSubmitting(true);

    // Save profile locally
    setCustomerProfile({ name: name.trim(), phone: phone.trim(), email: email.trim() });

    // -------------------------------------------------------------------------
    // 💡 BACKEND INTEGRATION PLACEHOLDER:
    // When you're ready to write your backend endpoint (e.g. POST /api/orders),
    // the request payload is already neatly structured below to match your SQL:
    //
    // const payload = {
    //   customer_name: name.trim(),
    //   customer_phone: phone.trim(),
    //   customer_email: email.trim(),
    //   delivery_address: deliveryAddress,
    //   payment_method: paymentMethod,
    //   subtotal: subtotal,
    //   delivery_fee: deliveryFee,
    //   service_fee: serviceFee,
    //   discount_amount: discountAmount,
    //   promo_code: promoCode,
    //   tip: selectedTip,
    //   total: finalTotal,
    //   items: cartItems.map(item => ({
    //     dish_id: item.id,
    //     dish_name: item.name,
    //     price: item.price,
    //     quantity: item.quantity,
    //     selected_options: item.selectedOptions || []
    //   }))
    // };
    // const response = await fetch('/api/orders', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload)
    // });
    // const data = await response.json();
    // -------------------------------------------------------------------------

    setTimeout(() => {
      const orderData = {
        orderId: 'FR-' + Math.floor(10000 + Math.random() * 90000),
        status: 'placed',
        customerName: name.trim(),
        customerPhone: phone.trim(),
        customerEmail: email.trim(),
        deliveryAddress: deliveryAddress,
        driverName: 'Marco Rossi',
        driverPhone: '+1 (555) 234-8910',
        driverVehicle: 'Yamaha NMAX 155 (Black)',
        driverRating: 4.96,
        etaMinutes: 24,
        orderTime: 'Just now',
        createdAt: 'Just now',
        total: finalTotal,
        itemsCount: cartItems.reduce((sum, i) => sum + i.quantity, 0),
        items: [...cartItems],
      };

      recordOrder(orderData);
      clearCart();
      setIsSubmitting(false);
      router.push('/track');
    }, 1000);
  };

  const getAddressIcon = (title) => {
    const lower = title.toLowerCase();
    if (lower.includes('home')) return <Home className="w-4 h-4 text-[#FF5A1F]" />;
    if (lower.includes('work') || lower.includes('office')) return <Briefcase className="w-4 h-4 text-blue-400" />;
    return <TreePine className="w-4 h-4 text-emerald-400" />;
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#090B0E] py-24 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-orange-500/20 border-t-[#FF5A1F] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090B0E] py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center gap-3 text-xs text-zinc-400">
          <Link href="/cart" className="hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Basket
          </Link>
          <span>/</span>
          <span className="text-[#FF5A1F] font-semibold">Checkout & Delivery Details</span>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF5A1F] text-xs font-black uppercase tracking-wider">
            Order Confirmation
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-2">
            Who should we deliver to?
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Enter your contact details and select where our courier should drop off your feast.
          </p>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form & Address Selection (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Customer Contact Info */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#111622] border border-white/[0.08] shadow-xl space-y-5">
              <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
                <div className="w-9 h-9 rounded-xl bg-orange-500/15 text-[#FF5A1F] flex items-center justify-center font-black text-sm">
                  1
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Recipient Details</h2>
                  <p className="text-xs text-zinc-400">Used for courier notifications and gate contact</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#FF5A1F]" />
                    Full Name <span className="text-[#FF5A1F]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-[#171E2E] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF5A1F] focus:ring-1 focus:ring-[#FF5A1F] transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#FF5A1F]" />
                    Phone Number <span className="text-[#FF5A1F]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#171E2E] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF5A1F] focus:ring-1 focus:ring-[#FF5A1F] transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-zinc-300 block mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#FF5A1F]" />
                    Email Address <span className="text-[#FF5A1F]">*</span>
                    <span className="text-[10px] text-zinc-500 font-normal ml-auto">For order receipt & kitchen updates</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-[#171E2E] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF5A1F] focus:ring-1 focus:ring-[#FF5A1F] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Delivery Address Selection */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#111622] border border-white/[0.08] shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/15 text-[#FF5A1F] flex items-center justify-center font-black text-sm">
                    2
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">Select Delivery Address</h2>
                    <p className="text-xs text-zinc-400">Courier will deliver to the active address</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-[#FF5A1F] text-zinc-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 border border-white/[0.08] hover:border-[#FF5A1F]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {showAddAddress ? 'Hide Form' : 'Add New Address'}
                </button>
              </div>

              {/* Add New Address Collapsible Form */}
              {showAddAddress && (
                <form onSubmit={handleSaveNewAddress} className="p-5 rounded-2xl bg-[#151C2C] border border-[#FF5A1F]/30 space-y-4 animate-fade-up">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Add a New Location
                    </span>
                    <span className="text-[11px] text-zinc-400">Syncs across app</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-zinc-300 block mb-1">
                        Address Label
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Gym, Parents' House, Studio"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full bg-[#111622] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF5A1F]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-zinc-300 block mb-1">
                        Icon Style
                      </label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {[
                          { id: 'home', label: '🏠' },
                          { id: 'work', label: '💼' },
                          { id: 'park', label: '🌳' },
                          { id: 'other', label: '📍' },
                        ].map((ic) => (
                          <button
                            key={ic.id}
                            type="button"
                            onClick={() => setNewIconType(ic.id)}
                            className={`py-2 rounded-xl text-sm border transition-all ${
                              newIconType === ic.id 
                                ? 'bg-[#FF5A1F]/20 border-[#FF5A1F]' 
                                : 'bg-[#111622] border-white/[0.06] hover:border-white/20'
                            }`}
                          >
                            {ic.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-bold text-zinc-300 block mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 120 Mercer Street, Soho"
                        value={newStreet}
                        onChange={(e) => setNewStreet(e.target.value)}
                        className="w-full bg-[#111622] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF5A1F]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-zinc-300 block mb-1">
                        City & State
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. New York, NY 10012"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        className="w-full bg-[#111622] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF5A1F]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-zinc-300 block mb-1">
                        Apt / Suite / Instructions
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Apt 5B, Call 04 on intercom"
                        value={newDetails}
                        onChange={(e) => setNewDetails(e.target.value)}
                        className="w-full bg-[#111622] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF5A1F]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddAddress(false)}
                      className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF5A1F] to-amber-500 text-white font-bold text-xs shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      Save & Select Address
                    </button>
                  </div>
                </form>
              )}

              {/* Saved Addresses List */}
              <div className="space-y-3">
                {savedAddresses.map((addr) => {
                  const formatted = `${addr.street}, ${addr.city}`;
                  const isSelected = deliveryAddress.includes(addr.street) || deliveryAddress === formatted;

                  return (
                    <div
                      key={addr.id}
                      onClick={() => selectAddress(addr)}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#151D2D] border-[#FF5A1F] shadow-lg shadow-orange-500/10'
                          : 'bg-[#171E2E]/60 hover:bg-[#171E2E] border-white/[0.06] hover:border-white/[0.15]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-lg shrink-0 ${
                          isSelected ? 'bg-orange-500/20 text-[#FF5A1F]' : 'bg-white/[0.04] text-zinc-300'
                        }`}>
                          {getAddressIcon(addr.title)}
                        </div>

                        <div className="text-left truncate">
                          <div className="text-sm font-bold text-white flex items-center gap-2">
                            {addr.title}
                            {isSelected && (
                              <span className="text-[10px] uppercase font-black bg-[#FF5A1F] text-white px-2 py-0.5 rounded-full">
                                Deliver Here
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-zinc-300 truncate mt-0.5">
                            {addr.street}, {addr.city}
                          </div>
                          {addr.details && (
                            <div className="text-[11px] text-zinc-500 truncate mt-0.5">
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

            {/* Step 3: Payment Method */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#111622] border border-white/[0.08] shadow-xl space-y-4">
              <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
                <div className="w-9 h-9 rounded-xl bg-orange-500/15 text-[#FF5A1F] flex items-center justify-center font-black text-sm">
                  3
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Payment Method</h2>
                  <p className="text-xs text-zinc-400">Encrypted frontend checkout simulation</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'card', name: 'Credit Card', sub: '•••• 4242' },
                  { id: 'apple', name: 'Apple Pay', sub: 'Instant 1-Tap' },
                  { id: 'cash', name: 'Cash on Arrival', sub: 'Pay Courier' },
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
                    <div className="text-[10px] text-zinc-400 mt-0.5">{pm.sub}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & Submit Button (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#111622] border border-white/[0.08] shadow-xl space-y-5 sticky top-28">
              
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <h3 className="text-sm font-black text-white flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#FF5A1F]" />
                  Order Summary ({cartItems.length} items)
                </h3>
                <Link href="/cart" className="text-xs text-[#FF5A1F] font-bold hover:underline">
                  Edit
                </Link>
              </div>

              {/* Items preview */}
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs py-1.5">
                    <div className="flex items-center gap-2.5 truncate max-w-[220px]">
                      <div className="w-6 h-6 rounded-lg bg-white/[0.06] text-center leading-6 font-mono font-bold text-white shrink-0">
                        {item.quantity}x
                      </div>
                      <span className="text-zinc-300 truncate font-medium">{item.name}</span>
                    </div>
                    <span className="font-mono font-semibold text-white shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Courier Tip */}
              <div className="pt-2 border-t border-white/[0.06]">
                <label className="text-xs text-zinc-400 block mb-2 font-medium">Courier Tip</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: '$2.00', value: 2.00 },
                    { label: '$3.00', value: 3.00 },
                    { label: '$5.00', value: 5.00 },
                    { label: '$0', value: 0.00 },
                  ].map((tip) => (
                    <button
                      key={tip.label}
                      type="button"
                      onClick={() => setSelectedTip(tip.value)}
                      className={`py-1.5 rounded-xl text-xs font-bold border transition-all ${
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

              {/* Breakdown */}
              <div className="space-y-2 pt-3 border-t border-white/[0.06] text-xs">
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

              {/* Delivery Destination Snapshot */}
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs space-y-1">
                <div className="text-zinc-400 text-[11px] font-medium flex items-center justify-between">
                  <span>Delivering to:</span>
                  <span className={deliveryAddress ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                    {deliveryAddress ? "Address Selected ✓" : "Select Address"}
                  </span>
                </div>
                <div className="font-bold text-white truncate flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5A1F] shrink-0" />
                  <span className="truncate">{deliveryAddress || 'No address chosen'}</span>
                </div>
                <div className="text-[11px] text-zinc-400">
                  Recipient: <strong className="text-zinc-200">{name || '—'}</strong> ({phone || 'No phone'})
                </div>
                {email && (
                  <div className="text-[10px] text-zinc-500 truncate">
                    Receipt to: {email}
                  </div>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="button"
                onClick={handleSubmitOrder}
                disabled={isSubmitting || !name.trim() || !phone.trim() || !email.trim() || !deliveryAddress}
                className={`w-full py-4 px-6 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-2 transition-all transform ${
                  !name.trim() || !phone.trim() || !email.trim() || !deliveryAddress
                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5 opacity-70'
                    : 'bg-gradient-to-r from-[#FF5A1F] via-[#FF7A00] to-amber-500 hover:from-[#e04810] hover:to-[#eb6c00] text-white shadow-orange-500/30 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Dispatching Order...</span>
                  </>
                ) : !name.trim() || !phone.trim() || !email.trim() ? (
                  <span>Fill in Details to Order (${finalTotal.toFixed(2)})</span>
                ) : (
                  <>
                    <span>Confirm & Pay (${finalTotal.toFixed(2)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-[11px] text-zinc-500 text-center flex items-center justify-center gap-2 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>256-bit Secure Frontend Order Guarantee</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
