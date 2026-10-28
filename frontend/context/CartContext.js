import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Fallback storage for SSR environment where localStorage is not defined
const dummyStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

const safeStorage = createJSONStorage(() =>
  typeof window !== "undefined" ? window.localStorage : dummyStorage,
);

// Helper to compute all financial totals consistently
const computeTotals = (
  items = [],
  discountPercent = 0,
  deliveryMode = "Delivery",
  selectedTip = 3.0,
) => {
  const totalCount = items.reduce(
    (sum, item) => sum + (Number(item.quantity) || 1),
    0,
  );
  const subtotal = items.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0,
  );
  const isPickup = (deliveryMode || "").toLowerCase() === "pickup";
  const deliveryFee =
    subtotal === 0 || isPickup || subtotal >= 45 ? 0 : 2.99;
  const serviceFee = subtotal === 0 ? 0 : 1.99;
  const discountAmount = (subtotal * Number(discountPercent || 0)) / 100;
  const tipAmount = subtotal === 0 ? 0 : Number(selectedTip) || 0;
  const total =
    subtotal === 0
      ? 0
      : Math.max(
          0,
          subtotal +
            deliveryFee +
            serviceFee +
            tipAmount -
            discountAmount,
        );

  return {
    totalCount,
    subtotal,
    deliveryFee,
    serviceFee,
    discountAmount,
    total,
  };
};

const initialAddresses = [
  {
    id: "addr-1",
    title: "Home (Default)",
    street: "742 Evergreen Terrace, Apt 4B",
    city: "New York, NY 10001",
    icon: "🏠",
    details: "Ring buzzer #42",
  },
  {
    id: "addr-2",
    title: "Office / Co-working",
    street: "350 5th Avenue, Suite 2100",
    city: "New York, NY 10118",
    icon: "💼",
    details: "Leave with lobby security desk",
  },
  {
    id: "addr-3",
    title: "Central Park North",
    street: "110th St & Lenox Ave",
    city: "New York, NY 10026",
    icon: "🌲",
    details: "Meet at park entrance bench",
  },
];

const initialOrderHistory = [
  {
    id: "FR-98231",
    orderId: "FR-98231",
    status: "delivered",
    createdAt: "Yesterday, 7:15 PM",
    customerName: "Alex Morgan",
    customerPhone: "+1 (555) 382-9012",
    customerEmail: "alex.morgan@example.com",
    deliveryAddress: "742 Evergreen Terrace, Apt 4B, New York, NY 10001",
    driverName: "Marco Rossi",
    driverPhone: "+1 (555) 234-8910",
    total: 48.97,
    itemsCount: 3,
    items: [
      {
        id: "d-1",
        name: "Truffle Burrata Margherita",
        restaurant: "Osteria Napoli 1924",
        price: 21.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "d-12",
        name: "Pistachio Espresso Tiramisu",
        restaurant: "Patisserie Lumiere",
        price: 11.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "d-14",
        name: "San Pellegrino Blood Orange",
        restaurant: "Drink Bar",
        price: 4.99,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
];

export const useCartStore = create(
  persist(
    (set, get) => {
      const initialTotals = computeTotals([], 0, "Delivery", 3.0);

      return {
        // ==========================================
        // Cart state (Persisted in localStorage)
        // ==========================================
        cartItems: [],
        ...initialTotals,

        deliveryAddress: "742 Evergreen Terrace, Apt 4B, New York, NY 10001",
        savedAddresses: initialAddresses,
        customerProfile: { name: "", phone: "", email: "" },

        promoCode: "",
        discountPercent: 0,
        selectedTip: 3.0,
        deliveryMode: "Delivery",

        activeOrder: null,
        orderHistory: initialOrderHistory,

        // ==========================================
        // Ephemeral UI state (NOT in localStorage)
        // ==========================================
        isCartOpen: false,
        isAddressModalOpen: false,
        selectedDish: null,
        promoMessage: "",
        isLoading: false,
        error: null,

        // ==========================================
        // UI Setters
        // ==========================================
        setIsCartOpen: (open) => set({ isCartOpen: open }),
        setCartIsOpen: (open) => set({ isCartOpen: open }),
        setIsAddressModalOpen: (open) => set({ isAddressModalOpen: open }),
        setSelectedDish: (dish) => set({ selectedDish: dish }),
        setCustomerProfile: (profile) => set({ customerProfile: profile }),
        setDeliveryAddress: (addr) => set({ deliveryAddress: addr }),
        setActiveOrder: (order) => set({ activeOrder: order }),

        setDeliveryMode: (mode) => {
          const { cartItems, discountPercent, selectedTip } = get();
          const totals = computeTotals(cartItems, discountPercent, mode, selectedTip);
          set({ deliveryMode: mode, ...totals });
        },

        setSelectedTip: (tip) => {
          const { cartItems, discountPercent, deliveryMode } = get();
          const totals = computeTotals(cartItems, discountPercent, deliveryMode, tip);
          set({ selectedTip: tip, ...totals });
        },

        // ==========================================
        // Cart Actions (Updates localStorage)
        // ==========================================
        addToCart: (dish, quantity = 1, options = []) => {
          const { cartItems, discountPercent, deliveryMode, selectedTip } = get();
          const exist = cartItems.find((i) => i.id === dish.id);

          let updated;
          if (exist) {
            updated = cartItems.map((i) =>
              i.id === dish.id ? { ...i, quantity: i.quantity + quantity } : i,
            );
          } else {
            updated = [
              ...cartItems,
              { ...dish, quantity, selectedOptions: options },
            ];
          }

          const totals = computeTotals(updated, discountPercent, deliveryMode, selectedTip);
          set({ cartItems: updated, isCartOpen: true, ...totals });
        },

        updateQuantity: (id, delta) => {
          const { cartItems, discountPercent, deliveryMode, selectedTip } = get();
          const target = cartItems.find((i) => i.id === id);
          if (!target) return;

          const newQty = target.quantity + delta;
          const updated =
            newQty <= 0
              ? cartItems.filter((i) => i.id !== id)
              : cartItems.map((i) => (i.id === id ? { ...i, quantity: newQty } : i));

          const totals = computeTotals(updated, discountPercent, deliveryMode, selectedTip);
          set({ cartItems: updated, ...totals });
        },

        removeFromCart: (itemId) => {
          const { cartItems, discountPercent, deliveryMode, selectedTip } = get();
          const updated = cartItems.filter((item) => item.id !== itemId);
          const totals = computeTotals(updated, discountPercent, deliveryMode, selectedTip);
          set({ cartItems: updated, ...totals });
        },

        clearCart: () => {
          const { deliveryMode, selectedTip } = get();
          const totals = computeTotals([], 0, deliveryMode, selectedTip);
          set({
            cartItems: [],
            promoCode: "",
            discountPercent: 0,
            promoMessage: "",
            ...totals,
          });
        },

        applyPromoCode: (code) => {
          const cleanCode = (code || "").trim().toUpperCase();
          if (cleanCode === "RUSH30") {
            const { cartItems, deliveryMode, selectedTip } = get();
            const totals = computeTotals(cartItems, 30, deliveryMode, selectedTip);
            set({
              promoCode: "RUSH30",
              discountPercent: 30,
              promoMessage: "30% discount applied!",
              ...totals,
            });
            return { success: true, message: "30% discount applied!" };
          }
          set({ promoMessage: "Invalid promo code" });
          return { success: false, message: "Invalid promo code" };
        },

        reorderItems: (items) => {
          if (!items || !items.length) return;
          const { discountPercent, deliveryMode, selectedTip } = get();
          const totals = computeTotals(items, discountPercent, deliveryMode, selectedTip);
          set({ cartItems: items, isCartOpen: true, ...totals });
        },

        reorderOrder: (items) => {
          get().reorderItems(items);
        },

        // ==========================================
        // Addresses & Backend Sync
        // ==========================================
        selectAddress: (addr) => {
          const formatted =
            typeof addr === "string" ? addr : `${addr.street}, ${addr.city}`;
          set({ deliveryAddress: formatted, isAddressModalOpen: false });
        },

        getAddress: async (phone) => {
          try {
            const userPhone = phone || get().customerProfile?.phone;
            if (!userPhone) return;

            const { data } = await axios.get(`${API_BASE_URL}/address`, {
              params: { phone: userPhone },
            });

            const addresses = data.addresses || [];
            const activeAddr = addresses.find((a) => a.is_default) || addresses[0];

            set({
              savedAddresses: addresses,
              ...(activeAddr && {
                deliveryAddress: `${activeAddr.street}, ${activeAddr.city}`,
              }),
            });
          } catch (error) {
            console.debug("Backend offline or error fetching addresses:", error.message);
          }
        },

        addNewAddress: async (newAddr) => {
          const userPhone = newAddr.phone || get().customerProfile?.phone;

          const tempAddr = {
            id: "addr-" + Date.now(),
            title: newAddr.title || "Other",
            icon: newAddr.icon || "📍",
            street: newAddr.street,
            city: newAddr.city || "New York, NY",
            details: newAddr.details || "",
          };

          try {
            const { data } = await axios.post(`${API_BASE_URL}/address`, {
              ...newAddr,
              phone: userPhone,
            });

            const saved = data?.address || tempAddr;

            set((state) => ({
              savedAddresses: [saved, ...state.savedAddresses.filter((a) => a.id !== saved.id)],
              deliveryAddress: `${saved.street}, ${saved.city}`,
              isAddressModalOpen: false,
            }));

            return saved;
          } catch (error) {
            console.debug("Backend offline, saving address to local storage:", error.message);

            set((state) => ({
              savedAddresses: [tempAddr, ...state.savedAddresses],
              deliveryAddress: `${tempAddr.street}, ${tempAddr.city}`,
              isAddressModalOpen: false,
            }));

            return tempAddr;
          }
        },

        // ==========================================
        // Orders & Backend Checkout
        // ==========================================
        createOrder: async (orderPayload) => {
          set({ isLoading: true, error: null });

          const state = get();
          const finalPayload = {
            id: "FR-" + Math.floor(10000 + Math.random() * 90000),
            customer_name: orderPayload.customerName || orderPayload.customer_name || state.customerProfile.name,
            customer_phone: orderPayload.customerPhone || orderPayload.customer_phone || state.customerProfile.phone,
            delivery_address: orderPayload.deliveryAddress || orderPayload.delivery_address || state.deliveryAddress,
            delivery_mode: state.deliveryMode.toLowerCase(),
            payment_method: orderPayload.paymentMethod || "card",
            subtotal: state.subtotal,
            delivery_fee: state.deliveryFee,
            service_fee: state.serviceFee,
            discount_amount: state.discountAmount,
            promo_code: state.promoCode || null,
            tip: state.selectedTip,
            total: state.total,
            items: [...state.cartItems],
            ...orderPayload,
          };

          try {
            // Send order to Express PostgreSQL backend
            const { data } = await axios.post(`${API_BASE_URL}/orders`, finalPayload);
            const savedOrder = data?.order || finalPayload;

            set((s) => ({
              activeOrder: savedOrder,
              orderHistory: [savedOrder, ...s.orderHistory],
              cartItems: [],
              isLoading: false,
              ...computeTotals([], 0, s.deliveryMode, s.selectedTip),
            }));

            return { success: true, order: savedOrder };
          } catch (error) {
            console.debug("Backend offline, saving order to local state:", error.message);

            set((s) => ({
              activeOrder: finalPayload,
              orderHistory: [finalPayload, ...s.orderHistory],
              cartItems: [],
              isLoading: false,
              ...computeTotals([], 0, s.deliveryMode, s.selectedTip),
            }));

            return { success: true, order: finalPayload };
          }
        },

        recordOrder: (orderData) => {
          const order = {
            id: orderData.orderId || "FR-" + Math.floor(10000 + Math.random() * 90000),
            createdAt: "Just now",
            ...orderData,
          };
          set((state) => ({
            activeOrder: order,
            orderHistory: [order, ...state.orderHistory],
          }));
        },

        // Getters for function calls
        getTotalCount: () => get().totalCount,
        getSubtotal: () => get().subtotal,
        getDeliveryFee: () => get().deliveryFee,
        getServiceFee: () => get().serviceFee,
        getDiscountAmount: () => get().discountAmount,
        getTotal: () => get().total,
      };
    },
    {
      name: "foodrush-cart-storage", // Key in localStorage
      storage: safeStorage,
      // Persist cart items, totals, and user preferences
      partialize: (state) => ({
        cartItems: state.cartItems,
        totalCount: state.totalCount,
        subtotal: state.subtotal,
        deliveryFee: state.deliveryFee,
        serviceFee: state.serviceFee,
        discountAmount: state.discountAmount,
        total: state.total,
        customerProfile: state.customerProfile,
        deliveryAddress: state.deliveryAddress,
        savedAddresses: state.savedAddresses,
        promoCode: state.promoCode,
        discountPercent: state.discountPercent,
        deliveryMode: state.deliveryMode,
        selectedTip: state.selectedTip,
        orderHistory: state.orderHistory,
        activeOrder: state.activeOrder,
      }),
      // Re-calculate live totals immediately and synchronously when rehydrating from localStorage
      merge: (persistedState, currentState) => {
        const merged = { ...currentState, ...(persistedState || {}) };
        const totals = computeTotals(
          merged.cartItems || [],
          merged.discountPercent || 0,
          merged.deliveryMode || "Delivery",
          merged.selectedTip ?? 3.0,
        );
        return {
          ...merged,
          ...totals,
        };
      },
    },
  ),
);

// Backward-compatible hook for components calling useCart()
export const useCart = (selector) => useCartStore(selector || ((s) => s));

export default useCartStore;
