"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  isGift: boolean;
  giftMessage: string;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
  setGiftOptions: (isGift: boolean, message: string) => void;
  setItems: (items: CartItem[]) => void;
}

// Utility helper to clean and deduplicate item lists
function deduplicateItems(items: CartItem[]): CartItem[] {
  const map = new Map<string, CartItem>();
  for (const item of items) {
    if (!item || !item.productId) continue;
    const existing = map.get(item.productId);
    if (existing) {
      const maxStock = item.stockQty ?? existing.stockQty ?? 999;
      const combinedQty = (existing.quantity || 0) + (item.quantity || 1);
      map.set(item.productId, {
        ...existing,
        ...item,
        quantity: Math.min(combinedQty, maxStock),
      });
    } else {
      map.set(item.productId, {
        ...item,
        quantity: item.quantity || 1,
      });
    }
  }
  return Array.from(map.values());
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isGift: false,
      giftMessage: "",

      setItems: (items) => set({ items: deduplicateItems(items) }),
      setGiftOptions: (isGift, giftMessage) => set({ isGift, giftMessage }),

      addItem: (item, quantity = 1) => {
        const addQty = Math.max(1, quantity);
        set((state) => {
          const deduplicated = deduplicateItems(state.items);
          const existingIndex = deduplicated.findIndex(
            (i) => i.productId === item.productId
          );
          const maxStock = item.stockQty ?? 999;

          if (existingIndex > -1) {
            const updatedItems = [...deduplicated];
            const currentItem = updatedItems[existingIndex];
            const newQty = Math.min(currentItem.quantity + addQty, maxStock);
            updatedItems[existingIndex] = {
              ...currentItem,
              ...item,
              quantity: newQty,
            };
            return { items: updatedItems, isOpen: true };
          }

          const initialQty = Math.min(addQty, maxStock);
          return {
            items: [...deduplicated, { ...item, quantity: initialQty }],
            isOpen: true,
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) => {
            if (i.productId === productId) {
              const maxStock = i.stockQty ?? 999;
              return { ...i, quantity: Math.min(quantity, maxStock) };
            }
            return i;
          }),
        }));
      },

      clearCart: () => set({ items: [], isGift: false, giftMessage: "" }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      totalItems: () =>
        get().items.reduce((sum, i) => sum + (Number(i.quantity) || 0), 0),

      subtotal: () =>
        get().items.reduce(
          (sum, i) => sum + (Number(i.price) || 0) * (Number(i.quantity) || 0),
          0
        ),
    }),
    { name: "avighna-cart" }
  )
);
