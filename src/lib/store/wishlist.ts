"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";

interface WishlistStore {
  items: Product[];
  toggleItem: (product: Product) => void;
  hasItem: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggleItem: (product) => {
        set((state) => {
          const exists = state.items.some((i) => i.id === product.id);
          if (exists) {
            return { items: state.items.filter((i) => i.id !== product.id) };
          }
          return { items: [...state.items, product] };
        });
      },

      hasItem: (productId) => {
        return get().items.some((i) => i.id === productId);
      },

      clearWishlist: () => set({ items: [] }),
    }),
    { name: "avighna-wishlist" }
  )
);
