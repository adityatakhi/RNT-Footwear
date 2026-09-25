'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, Product, ProductColor, ProductSize } from '@/types';
import { formatPrice } from '@/lib/data/products';

const SHIPPING_THRESHOLD = 999; // free shipping above ₹999
const SHIPPING_COST = 99;

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (product: Product, color: ProductColor, size: ProductSize, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed
  totalItems: () => number;
  subtotal: () => number;
  shippingCost: () => number;
  total: () => number;
  formattedSubtotal: () => string;
  formattedTotal: () => string;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, color, size, quantity = 1) => {
        const id = `${product.id}-${color.slug}-${size.uk}`;
        set(state => {
          const existing = state.items.find(item => item.id === id);
          if (existing) {
            return {
              items: state.items.map(item =>
                item.id === id
                  ? { ...item, quantity: Math.min(item.quantity + quantity, 10) }
                  : item
              ),
            };
          }
          const newItem: CartItem = {
            id,
            productId: product.id,
            productName: product.name,
            productSlug: product.slug,
            price: product.price,
            currency: product.currency,
            quantity,
            image: product.images[0],
            color,
            size,
          };
          return { items: [...state.items, newItem] };
        });
        // Auto-open cart
        set({ isOpen: true });
      },

      removeItem: (id) => {
        set(state => ({ items: state.items.filter(item => item.id !== id) }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeItem(id);
          return;
        }
        set(state => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity: Math.min(quantity, 10) } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),

      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      shippingCost: () => {
        const sub = get().subtotal();
        return sub >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
      },

      total: () => get().subtotal() + get().shippingCost(),

      formattedSubtotal: () => formatPrice(get().subtotal()),
      formattedTotal: () => formatPrice(get().total()),
    }),
    {
      name: 'rnt-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({ items: state.items }),
    }
  )
);
