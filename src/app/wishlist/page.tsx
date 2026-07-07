import type { Metadata } from "next";
import { WishlistContent } from "@/components/shop/wishlist-content";

export const metadata: Metadata = {
  title: "My Curated Chest | Avighna Collections",
  description: "Explore your saved pieces of handcrafted luxury jewellery at Avighna Collections.",
};

export default function WishlistPage() {
  return <WishlistContent />;
}
