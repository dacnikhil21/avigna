"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ArrowUpRight } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { ScaleOnHover } from "@/components/shared/motion";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, items } = useWishlistStore();
  const isWishlisted = items.some((i) => i.id === product.id);

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

  return (
    <ScaleOnHover scale={1.02}>
      <Link href={`/product/${product.slug}`} className="group block">
        <article className="card-luxury">
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-luxury-cream">
            <Image
              src={product.images[0]?.url ?? ""}
              alt={product.images[0]?.altText ?? product.name}
              fill
              priority={priority}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />

            {/* Overlay actions */}
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className={cn(
              "absolute top-4 right-4 flex flex-col gap-2 transition-all duration-500 z-10",
              isWishlisted 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
            )}>
              <button
                onClick={handleToggleWishlist}
                className={cn(
                  "w-10 h-10 rounded-full glass flex items-center justify-center transition-colors shadow-sm",
                  isWishlisted ? "bg-white text-[#C5A880]" : "hover:bg-white text-luxury-black"
                )}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={cn("w-4 h-4 transition-transform active:scale-90", isWishlisted && "fill-[#C5A880] text-[#C5A880]")} />
              </button>
            </div>

            {product.salePrice && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-luxury-gold text-white text-[10px] uppercase tracking-wider rounded-full">
                Exclusive
              </span>
            )}

            {/* Quick add */}
            <motion.button
              onClick={handleAddToCart}
              initial={false}
              className="absolute bottom-4 left-4 right-4 py-3 bg-white/90 backdrop-blur-sm text-luxury-black text-xs uppercase tracking-[0.15em] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 hover:bg-white"
            >
              Add to Bag
            </motion.button>
          </div>

          {/* Info */}
          <div className="p-5 md:p-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-gold mb-2">
              {product.metal}
            </p>
            <h3 className="font-serif text-lg font-light leading-snug mb-2 group-hover:text-luxury-gold transition-colors duration-300">
              {product.name}
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">{formatPrice(product.price)}</span>
              {product.salePrice && (
                <span className="text-xs text-luxury-muted line-through">
                  {formatPrice(product.salePrice)}
                </span>
              )}
            </div>
          </div>
        </article>
      </Link>
    </ScaleOnHover>
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
