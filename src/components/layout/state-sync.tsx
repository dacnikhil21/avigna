"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";

export function StateSync() {
  const { data: session, status } = useSession();
  const cartItems = useCartStore((s) => s.items);
  const setCartItems = useCartStore((s) => s.setItems);
  const wishlistItems = useWishlistStore((s) => s.items);
  const setWishlistItems = useWishlistStore((s) => s.setItems);
  const lastSyncedUserRef = useRef<string | null>(null);

  useEffect(() => {
    const userId = session?.user?.id;

    if (status === "unauthenticated") {
      lastSyncedUserRef.current = null;
      return;
    }

    if (status === "authenticated" && userId && lastSyncedUserRef.current !== userId) {
      lastSyncedUserRef.current = userId;

      const syncData = async () => {
        try {
          const res = await fetch("/api/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              cartItems,
              wishlistItems: wishlistItems.map(
                (w: { id?: string; productId?: string }) => w.id || w.productId
              ),
            }),
          });

          if (res.ok) {
            const data = await res.json();

            // Override local Zustand states with the unified state from DB
            if (data.cartItems && Array.isArray(data.cartItems)) {
              setCartItems(data.cartItems);
            }
            if (data.wishlistItems && Array.isArray(data.wishlistItems)) {
              setWishlistItems(data.wishlistItems);
            }
          }
        } catch (error) {
          console.error("Failed to sync state:", error);
        }
      };

      syncData();
    }
  }, [status, session?.user?.id]); // Track only status and userId to avoid re-triggering loop

  return null;
}
