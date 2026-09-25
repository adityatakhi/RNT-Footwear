'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface WishlistState {
  ids: string[];
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  toggleItem: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  count: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],

      addItem: (id) => {
        if (!get().ids.includes(id)) {
          set(state => ({ ids: [...state.ids, id] }));
        }
      },

      removeItem: (id) => {
        set(state => ({ ids: state.ids.filter(wid => wid !== id) }));
      },

      clear: () => {
        set({ ids: [] });
      },

      toggleItem: (id) => {
        if (get().ids.includes(id)) {
          get().removeItem(id);
        } else {
          get().addItem(id);
        }
      },

      isWishlisted: (id) => get().ids.includes(id),

      count: () => get().ids.length,
    }),
    {
      name: 'rnt-wishlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
