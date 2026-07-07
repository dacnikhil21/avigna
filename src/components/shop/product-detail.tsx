"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Share2,
  Shield,
  Truck,
  RotateCcw,
  Minus,
  Plus,
  Check,
} from "lucide-react";
import type { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { ProductCard } from "@/components/shop/product-card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/motion";
import { Separator } from "@/components/ui/separator";

interface ProductDetailProps {
  product: Product;
  related: Product[];
}

export function ProductDetail({ product, related }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, items } = useWishlistStore();
  const isWishlisted = items.some((i) => i.id === product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.images[0]?.url ?? "",
        metal: product.metal,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const specs = [
    { label: "Metal", value: product.metal },
    { label: "Purity", value: product.purity },
    { label: "Weight", value: product.weight },
    { label: "Stones", value: product.stones },
    { label: "SKU", value: product.sku },
  ].filter((s) => s.value);

  return (
    <div className="section-padding pt-32 md:pt-36 pb-20">
      {/* Breadcrumb */}
      <nav className="text-xs text-luxury-muted mb-8 uppercase tracking-wider">
        <Link href="/" className="hover:text-luxury-gold transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-luxury-gold transition-colors">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/shop?category=${product.category.slug}`}
          className="hover:text-luxury-gold transition-colors"
        >
          {product.category.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-luxury-black">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <FadeIn direction="left">
          <div className="sticky top-32">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-luxury-cream mb-4">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full"
              >
                <Image
                  src={product.images[selectedImage]?.url ?? ""}
                  alt={product.images[selectedImage]?.altText ?? product.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === i
                        ? "border-luxury-gold shadow-gold"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.altText ?? `${product.name} view ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </FadeIn>

        {/* Details */}
        <FadeIn direction="right" delay={0.1}>
          <div>
            <p className="label-luxury mb-3">{product.category.name}</p>
            <h1 className="heading-md mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-light">{formatPrice(product.price)}</span>
              {product.salePrice && (
                <span className="text-lg text-luxury-muted line-through">
                  {formatPrice(product.salePrice)}
                </span>
              )}
            </div>

            <p className="body-lg mb-8">{product.description}</p>

            {/* Specs */}
            <div className="bg-luxury-cream/50 rounded-3xl p-6 mb-8">
              <h3 className="text-xs uppercase tracking-[0.2em] text-luxury-gold mb-4">
                Specifications
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {specs.map((spec) => (
                  <div key={spec.label}>
                    <p className="text-xs text-luxury-muted">{spec.label}</p>
                    <p className="text-sm font-medium mt-0.5">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-3 border border-luxury-beige/50 rounded-full px-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-luxury-cream rounded-full transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-luxury-cream rounded-full transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                variant="gold"
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    Added to Bag
                  </>
                ) : (
                  "Add to Bag"
                )}
              </Button>
            </div>

            <div className="flex gap-3 mb-8">
              <Button 
                variant="outline" 
                size="sm" 
                className={cn("flex-1 rounded-none", isWishlisted && "border-[#C5A880] text-[#C5A880] bg-[#C5A880]/5 hover:bg-[#C5A880]/10")}
                onClick={() => toggleItem(product)}
              >
                <Heart className={cn("w-4 h-4 mr-2 transition-transform active:scale-95", isWishlisted && "fill-[#C5A880]")} />
                {isWishlisted ? "In Wishlist" : "Wishlist"}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 rounded-none"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Product link copied to clipboard!");
                }}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            <Separator className="mb-8" />

            {/* Trust signals */}
            <div className="space-y-4">
              {[
                { icon: Shield, text: "BIS Hallmarked & Certificate of Authenticity included" },
                { icon: Truck, text: "Complimentary insured shipping on orders above ₹50,000" },
                { icon: RotateCcw, text: "Lifetime exchange & 15-day return policy" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-luxury-muted">
                  <Icon className="w-4 h-4 text-luxury-gold shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-24 md:mt-32">
          <FadeIn>
            <p className="label-luxury mb-4">You May Also Like</p>
            <h2 className="heading-md mb-10">Related Pieces</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
