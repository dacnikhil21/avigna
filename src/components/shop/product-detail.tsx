"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Share2,
  Shield,
  Truck,
  RotateCcw,
  Minus,
  Plus,
  Check,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import type { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { ProductCard } from "@/components/shop/product-card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/motion";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

interface ProductDetailProps {
  product: Product;
  related: Product[];
}

export function ProductDetail({ product, related }: ProductDetailProps) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, items } = useWishlistStore();
  const isWishlisted = items.some((i) => i.id === product.id);

  // Lightbox Modal state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxScale, setLightboxScale] = useState(1);

  // Hover zoom logic removed in favor of Lightbox

  const handleBuyNow = () => {
    // 1. Clear cart
    useCartStore.getState().clearCart();
    
    // 2. Add current item with quantity
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.salePrice ?? product.price,
        image: product.images[0]?.url ?? "",
        metal: product.metal,
      });
    }
    
    // 3. Close the slide-out cart slider immediately so it doesn't block screen
    useCartStore.getState().closeCart();
    
    // 4. Redirect to checkout
    router.push("/checkout");
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.salePrice ?? product.price,
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

      <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16">
        {/* Gallery */}
        <FadeIn direction="left">
          <div className="sticky top-32">
            <div 
              className="relative aspect-square rounded-xl overflow-hidden bg-luxury-cream mb-4 cursor-pointer touch-manipulation group"
              onClick={() => setLightboxOpen(true)}
            >
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full"
              >
                <Image
                  src={product.images && product.images.length > 0 && product.images[selectedImage]?.url ? product.images[selectedImage].url : "/images/hero-bridal-bride.jpg"}
                  alt={product.images && product.images.length > 0 && product.images[selectedImage]?.altText ? product.images[selectedImage].altText : product.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </motion.div>
              
              {/* Premium Zoom Overlay Trigger */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxOpen(true);
                }}
                className="absolute bottom-4 right-4 z-10 p-2.5 bg-white/90 hover:bg-white text-[#121212] rounded-full shadow-md hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center"
                aria-label="Zoom image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === i
                        ? "border-luxury-gold shadow-gold"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img.url || "/images/hero-bridal-bride.jpg"}
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
            <p className="label-luxury mb-2">{product.category.name}</p>
            <h1 className="heading-md mb-3">{product.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              {product.salePrice ? (
                <>
                  <span className="text-2xl font-medium text-red-700">{formatPrice(product.salePrice)}</span>
                  <span className="text-lg text-luxury-muted line-through font-light">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-light">{formatPrice(product.price)}</span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-4">
              {product.stockQty > 0 ? (
                <span className="text-emerald-700 text-sm font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  ✓ In Stock
                </span>
              ) : (
                <span className="text-red-600 text-sm font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                  Out of Stock
                </span>
              )}
            </div>

            {/* Delivery Info */}
            <div className="border-t border-b border-[#EFECE7] py-4 my-6 space-y-2">
              <p className="text-sm text-slate-800 flex items-center gap-2 font-medium">
                <span className="text-base">🚚</span> Free Delivery
              </p>
              <p className="text-xs text-luxury-muted ml-7">
                Delivery in 3–5 Business Days
              </p>
            </div>

            <p className="body-lg mb-6">{product.description}</p>

            {/* Specs */}
            <div className="bg-luxury-cream/50 rounded-xl p-6 mb-6">
              <h3 className="text-xs uppercase tracking-[0.2em] text-luxury-gold mb-3">
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
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-3 border border-luxury-beige/50 rounded-lg px-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-luxury-cream rounded-lg transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-luxury-cream rounded-lg transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                variant="outline"
                size="lg"
                className="flex-1 rounded-lg border-luxury-gold text-luxury-gold hover:bg-luxury-gold/5"
                onClick={handleAddToCart}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Added to Bag
                  </>
                ) : (
                  "Add to Bag"
                )}
              </Button>
            </div>

            <Button
              variant="gold"
              size="lg"
              className="w-full rounded-lg mb-6 py-6 text-sm font-semibold tracking-wider uppercase"
              onClick={handleBuyNow}
            >
              Buy It Now
            </Button>

            <div className="flex gap-3 mb-8">
              <Button 
                variant="outline" 
                size="sm" 
                className={cn("flex-1 rounded-lg", isWishlisted && "border-[#C5A880] text-[#C5A880] bg-[#C5A880]/5 hover:bg-[#C5A880]/10")}
                onClick={() => toggleItem(product)}
              >
                <Heart className={cn("w-4 h-4 mr-2 transition-transform active:scale-95", isWishlisted && "fill-[#C5A880]")} />
                {isWishlisted ? "In Wishlist" : "Wishlist"}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 rounded-lg"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
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
                { icon: Shield, text: "Premium 1 Gram Gold Plating & Certificate of Authenticity included" },
                { icon: Truck, text: "Complimentary insured shipping on orders above ₹999" },
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
      {/* Floating Custom Toast for Link Sharing */}
      {copied && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg border text-xs uppercase tracking-wider font-semibold bg-[#121212] text-white border-[#C5A880] animate-in fade-in slide-in-from-bottom-4 duration-300">
          Link copied to clipboard!
        </div>
      )}

      {/* Premium Lightbox Modal overlay */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[250] bg-black/95 backdrop-blur-md flex flex-col justify-between select-none"
          >
            {/* Top Bar info & close control */}
            <div className="flex items-center justify-between p-6 text-white z-10">
              <span className="text-xs uppercase tracking-[0.2em] font-light">
                {product.name} — Slide {selectedImage + 1} of {product.images.length}
              </span>
              <button
                onClick={() => {
                  setLightboxOpen(false);
                  setLightboxScale(1);
                }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors active:scale-95"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Center Area (Scalable Image + Nav Arrows) */}
            <div className="relative flex-1 flex items-center justify-center p-4">
              {/* Prev control */}
              {product.images.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
                    setLightboxScale(1);
                  }}
                  className="absolute left-6 p-3 bg-white/5 hover:bg-white/10 text-white rounded-full border border-white/10 hover:scale-105 transition-all duration-300 z-10 active:scale-95"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Central Box */}
              <motion.div
                animate={{ scale: lightboxScale }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative aspect-square w-full max-w-[85vw] md:max-w-[70vh] rounded-lg overflow-hidden bg-transparent cursor-zoom-out"
                onClick={() => setLightboxScale((prev) => (prev === 1 ? 1.6 : 1))}
              >
                <Image
                  src={product.images && product.images.length > 0 && product.images[selectedImage]?.url ? product.images[selectedImage].url : "/images/hero-bridal-bride.jpg"}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="85vw"
                />
              </motion.div>

              {/* Next control */}
              {product.images.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
                    setLightboxScale(1);
                  }}
                  className="absolute right-6 p-3 bg-white/5 hover:bg-white/10 text-white rounded-full border border-white/10 hover:scale-105 transition-all duration-300 z-10 active:scale-95"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Bottom Area (Scale multipliers) */}
            <div className="flex items-center justify-center gap-6 p-6 text-white z-10">
              <button
                onClick={() => setLightboxScale((prev) => Math.max(1, prev - 0.3))}
                className="flex items-center gap-1.5 px-4 py-2 border border-white/20 hover:border-white rounded-full text-xs uppercase tracking-wider font-medium hover:bg-white/5 transition-all disabled:opacity-30 disabled:pointer-events-none active:scale-95"
                disabled={lightboxScale <= 1}
              >
                <Minus className="w-4 h-4" /> Zoom Out
              </button>
              <span className="text-xs uppercase tracking-widest font-light bg-white/10 px-4 py-1.5 rounded-full min-w-[70px] text-center">
                {(lightboxScale * 100).toFixed(0)}%
              </span>
              <button
                onClick={() => setLightboxScale((prev) => Math.min(2.5, prev + 0.3))}
                className="flex items-center gap-1.5 px-4 py-2 border border-white/20 hover:border-white rounded-full text-xs uppercase tracking-wider font-medium hover:bg-white/5 transition-all disabled:opacity-30 disabled:pointer-events-none active:scale-95"
                disabled={lightboxScale >= 2.5}
              >
                <Plus className="w-4 h-4" /> Zoom In
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
