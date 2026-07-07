"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, ArrowUpRight, Eye, Zap } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, items } = useWishlistStore();
  const isWishlisted = items.some((i) => i.id === product.id);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0]?.url ?? "",
      metal: product.metal,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  // Calculate discount percentage
  const discountPct =
    product.salePrice && product.salePrice < product.price
      ? Math.round(((product.price - product.salePrice) / product.price) * 100)
      : null;

  // Badge logic
  const badge = product.isExclusive
    ? { label: "Exclusive", color: "bg-[#8B1A1A]" }
    : product.isBridal
    ? { label: "Bridal", color: "bg-[#B76E79]" }
    : product.isTrending
    ? { label: "Trending", color: "bg-[#C5A880]" }
    : product.isLatest
    ? { label: "New", color: "bg-[#3A7D44]" }
    : null;

  return (
    <>
      <article className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#EFECE7] hover:shadow-xl hover:border-[#C5A880]/30 transition-all duration-500">
        {/* Image */}
        <Link href={`/product/${product.slug}`} className="block relative">
          <div className="relative aspect-[3/4] overflow-hidden bg-[#FAF8F5]">
            <Image
              src={product.images[0]?.url ?? ""}
              alt={product.images[0]?.altText ?? product.name}
              fill
              priority={priority}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Badges top-left */}
            <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
              {badge && (
                <span className={cn("px-2 py-0.5 text-[9px] md:text-[10px] uppercase tracking-wider text-white font-medium rounded-full", badge.color)}>
                  {badge.label}
                </span>
              )}
              {discountPct && (
                <span className="px-2 py-0.5 text-[9px] md:text-[10px] uppercase tracking-wider text-white font-medium rounded-full bg-[#E05252]">
                  -{discountPct}%
                </span>
              )}
            </div>

            {/* Wishlist top-right */}
            <button
              onClick={handleToggleWishlist}
              className={cn(
                "absolute top-2 right-2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm",
                isWishlisted
                  ? "bg-white text-[#C5A880] opacity-100"
                  : "bg-white/80 text-[#6B6560] opacity-0 group-hover:opacity-100"
              )}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={cn("w-3.5 h-3.5", isWishlisted && "fill-[#C5A880]")} />
            </button>

            {/* Quick View hover overlay */}
            <div className="absolute inset-x-0 bottom-0 p-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 flex gap-1.5">
              <button
                onClick={handleQuickView}
                className="flex-1 flex items-center justify-center gap-1 py-2 bg-white/90 backdrop-blur-sm text-[#121212] text-[9px] md:text-[10px] uppercase tracking-wider rounded-lg hover:bg-white transition-colors font-medium"
              >
                <Eye className="w-3 h-3" /> Quick View
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-1 py-2 bg-[#121212]/90 backdrop-blur-sm text-white text-[9px] md:text-[10px] uppercase tracking-wider rounded-lg hover:bg-[#121212] transition-colors font-medium"
              >
                <ShoppingBag className="w-3 h-3" /> Add Bag
              </button>
            </div>
          </div>
        </Link>

        {/* Info */}
        <div className="p-3 md:p-4 flex flex-col flex-1">
          {/* Category */}
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-[#C5A880] mb-1 truncate">
            {product.category?.name ?? product.metal}
          </p>

          {/* Name */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-serif text-sm md:text-base font-light leading-snug mb-2 text-[#121212] group-hover:text-[#C5A880] transition-colors duration-300 line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Pricing */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-sm md:text-base font-semibold text-[#121212]">
              {product.salePrice ? formatPrice(product.salePrice) : formatPrice(product.price)}
            </span>
            {product.salePrice && (
              <span className="text-xs text-[#9a948f] line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-auto flex flex-col gap-1.5">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-1.5 py-2 md:py-2.5 border border-[#121212] text-[#121212] text-[9px] md:text-[10px] uppercase tracking-wider rounded-lg hover:bg-[#121212] hover:text-white transition-all duration-300 font-medium"
            >
              <ShoppingBag className="w-3 h-3" />
              Add to Cart
            </button>
            <Link
              href={`/product/${product.slug}`}
              className="w-full flex items-center justify-center gap-1.5 py-2 md:py-2.5 bg-[#C5A880] text-white text-[9px] md:text-[10px] uppercase tracking-wider rounded-lg hover:bg-[#b8966f] transition-all duration-300 font-medium"
            >
              <Zap className="w-3 h-3" />
              Buy Now
            </Link>
          </div>
        </div>
      </article>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
            onClick={() => setQuickViewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-square md:aspect-[3/4] md:w-1/2 bg-[#FAF8F5]">
                <Image
                  src={product.images[0]?.url ?? ""}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:w-1/2 flex flex-col">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] mb-2">{product.category?.name}</p>
                <h3 className="font-serif text-xl font-light mb-2">{product.name}</h3>
                <p className="text-sm text-[#6B6560] leading-relaxed mb-4 flex-1 line-clamp-4">{product.shortDesc}</p>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-lg font-semibold">
                    {product.salePrice ? formatPrice(product.salePrice) : formatPrice(product.price)}
                  </span>
                  {product.salePrice && (
                    <span className="text-sm text-[#9a948f] line-through">{formatPrice(product.price)}</span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={(e) => { handleAddToCart(e); setQuickViewOpen(false); }}
                    className="w-full py-3 border border-[#121212] text-[#121212] text-xs uppercase tracking-wider rounded-lg hover:bg-[#121212] hover:text-white transition-all duration-300 font-medium"
                  >
                    Add to Cart
                  </button>
                  <Link
                    href={`/product/${product.slug}`}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#C5A880] text-white text-xs uppercase tracking-wider rounded-lg hover:bg-[#b8966f] transition-all duration-300 font-medium"
                  >
                    View Full Details <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function CollectionCard({
  name,
  slug,
  description = "",
  image = "",
  tagline = "",
}: {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  tagline?: string;
}) {
  return (
    <Link href={`/collections/${slug}`} className="group block">
      <article className="relative aspect-[4/5] rounded-3xl overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-luxury-black/20 to-transparent" />
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <p className="label-luxury text-luxury-gold-light mb-2">{tagline}</p>
          <h3 className="font-serif text-2xl md:text-3xl font-light text-white mb-2">
            {name}
          </h3>
          <p className="text-sm text-white/70 mb-4 line-clamp-2">{description}</p>
          <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.15em] text-white group-hover:text-luxury-gold-light transition-colors">
            Explore Collection
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </article>
    </Link>
  );
}
