"use client";

import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import { useWishlistStore } from "@/lib/store/wishlist";
import { ProductCard } from "./product-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";

export function WishlistContent() {
  const { items, clearWishlist } = useWishlistStore();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FAF8F5] flex flex-col items-center justify-center px-6 py-40 text-center">
        <Heart className="w-12 h-12 text-[#C5A880] mb-6 stroke-[1.5]" />
        <p className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#C5A880] mb-4">
          Your Wishlist
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-light text-[#121212] italic mb-6">
          Your Saved Pieces
        </h1>
        <p className="font-sans font-light text-sm text-[#6B6560] leading-relaxed max-w-sm mb-10">
          Pieces you admire will appear here. Browse our collections and save the ones that speak to you.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center px-8 py-4 bg-[#121212] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C5A880] transition-all duration-500 rounded-none"
        >
          Explore the Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="section-padding py-32 md:py-36 min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <FadeIn className="text-center max-w-2xl mx-auto mb-16">
        <p className="label-luxury mb-4">Saved Discoveries</p>
        <h1 className="heading-lg mb-4">My Curated Chest</h1>
        <p className="body-lg">
          Your personal collection of handcrafted masterpieces and timeless elegance.
        </p>
      </FadeIn>

      <div className="flex justify-between items-center mb-8 pb-4 border-b border-luxury-beige/30">
        <p className="text-sm text-luxury-muted">
          {items.length} {items.length === 1 ? "piece" : "pieces"} saved
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearWishlist}
          className="text-xs uppercase tracking-[0.08em] font-medium hover:text-red-600 hover:bg-transparent rounded-none p-0 h-auto flex items-center gap-1.5"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear All
        </Button>
      </div>

      {/* Grid */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {items.map((product) => (
          <StaggerItem key={product.id}>
            <ProductCard product={product} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
