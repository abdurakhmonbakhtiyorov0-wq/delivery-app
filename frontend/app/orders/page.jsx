'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { 
  ReceiptText, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  RotateCcw, 
  ArrowRight, 
  ShoppingBag, 
  Flame, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export default function OrdersPage() {
  const router = useRouter();
  const { orderHistory, reorderItems } = useCart();
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'active', 'delivered'

  const filteredOrders = orderHistory.filter((order) => {
    if (activeFilter === 'active') {
      return order.status !== 'delivered' && order.status !== 'cancelled';
    }
    if (activeFilter === 'delivered') {
      return order.status === 'delivered';
    }
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'on_the_way':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-[#FF5A1F] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-ping" />
            Courier on the Way
          </span>
        );
      case 'preparing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Kitchen Preparing
          </span>
        );
      case 'placed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            Order Confirmed
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Delivered
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full bg-zinc-500/15 text-zinc-400 text-xs font-bold">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#090B0E] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF5A1F] text-xs font-black uppercase tracking-wider">
              My Account
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-2 flex items-center gap-3">
              <ReceiptText className="w-7 h-7 text-[#FF5A1F]" />
              Order History
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Review your past meals, track active deliveries in real time, or reorder in one click.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center bg-[#111622] p-1.5 rounded-2xl border border-white/[0.08] text-xs font-bold shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#FF5A1F] text-white shadow-md shadow-orange-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All ({orderHistory.length})
            </button>
            <button
              onClick={() => setActiveFilter('active')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                activeFilter === 'active'
                  ? 'bg-[#FF5A1F] text-white shadow-md shadow-orange-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveFilter('delivered')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                activeFilter === 'delivered'
                  ? 'bg-[#FF5A1F] text-white shadow-md shadow-orange-500/20'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Past
            </button>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-[#111622] rounded-3xl border border-white/[0.06] p-8 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] text-zinc-500 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">No orders found</h3>
            <p className="text-xs text-zinc-400 mb-6">
              {activeFilter === 'active' 
                ? "You don't have any orders currently in transit."
                : "You haven't placed any orders yet. Discover our gourmet dishes!"}
            </p>
            <Link
              href="/menu"
              className="px-6 py-2.5 rounded-xl bg-[#FF5A1F] text-white text-xs font-bold shadow-lg shadow-orange-500/25 inline-flex items-center gap-1.5"
            >
              <span>Explore Menus</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const isActive = order.status !== 'delivered' && order.status !== 'cancelled';

              return (
                <div
                  key={order.orderId}
                  className="bg-[#111622] rounded-3xl border border-white/[0.08] hover:border-white/[0.14] transition-all p-6 sm:p-7 shadow-xl overflow-hidden relative"
                >
                  {/* Top card bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-white/[0.06] gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500/20 to-amber-500/10 text-[#FF5A1F] flex items-center justify-center font-bold text-base border border-orange-500/20">
                        {order.items?.[0]?.name?.includes('Pizza') ? '🍕' : order.items?.[0]?.name?.includes('Wagyu') ? '🍔' : '🍣'}
                      </div>
                      <div>
                        <div className="text-base font-black text-white flex items-center gap-2">
                          <span>Order {order.orderId}</span>
                        </div>
                        <div className="text-xs text-zinc-400 flex items-center gap-2 mt-0.5">
                          <Calendar className="w-3 h-3 text-zinc-500" />
                          <span>{order.createdAt || 'Recent'}</span>
                          <span>•</span>
                          <span>{order.itemsCount || order.items?.length || 1} items</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-start sm:self-auto">
                      {getStatusBadge(order.status)}
                      <span className="text-lg font-black text-white font-mono">
                        ${typeof order.total === 'number' ? order.total.toFixed(2) : order.total}
                      </span>
                    </div>
                  </div>

                  {/* Items list preview */}
                  <div className="py-4 space-y-3">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 rounded-xl object-cover bg-zinc-800 shrink-0"
                            />
                          )}
                          <div>
                            <div className="font-bold text-white flex items-center gap-1.5">
                              <span>{item.quantity}x</span>
                              <span>{item.name}</span>
                            </div>
                            {item.restaurant && (
                              <div className="text-[11px] text-zinc-400">{item.restaurant}</div>
                            )}
                          </div>
                        </div>
                        <span className="font-mono font-semibold text-zinc-300">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom details & action buttons */}
                  <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-2 text-zinc-400 truncate max-w-md">
                      <MapPin className="w-3.5 h-3.5 text-[#FF5A1F] shrink-0" />
                      <span className="truncate">Delivered to: <strong className="text-zinc-200">{order.deliveryAddress}</strong></span>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {isActive ? (
                        <Link
                          href="/track"
                          className="px-4 py-2.5 rounded-xl bg-[#FF5A1F] hover:bg-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/25 flex items-center gap-1.5 transition-all transform hover:scale-105 active:scale-95"
                        >
                          <span>Live Track</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => reorderItems(order.items)}
                          className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-bold text-xs border border-white/[0.08] hover:border-white/[0.2] flex items-center gap-1.5 transition-all"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-[#FF5A1F]" />
                          <span>Reorder All</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}