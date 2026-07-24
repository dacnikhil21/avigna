"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Lock,
  ShieldCheck,
  Truck,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
  } = useCartStore();

  const [removingId, setRemovingId] = useState<string | null>(null);

  const total = subtotal();
  const totalItemCount = items.reduce((acc, i) => acc + (i.quantity || 1), 0);

  const handleRemove = (productId: string) => {
    setRemovingId(productId);
    setTimeout(() => {
      removeItem(productId);
      setRemovingId(null);
    }, 150);
  };

  const categoryChips = [
    { label: "Earrings", slug: "earrings" },
    { label: "Necklace", slug: "necklace" },
    { label: "Long Haram", slug: "long-haram" },
    { label: "Bangles", slug: "bangles" },
    { label: "Bridal", slug: "bridal-collection" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-[#121212]/50 backdrop-blur-md"
            onClick={closeCart}
          />

          {/* Drawer Body */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 z-[80] w-full max-w-md bg-white shadow-2xl flex flex-col font-sans"
          >
            {/* Compact Header */}
            <div className="p-4 sm:p-5 border-b border-[#EFECE7] bg-white sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#EFECE7] flex items-center justify-center text-[#8A6B29]">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-serif text-base sm:text-lg font-bold text-[#121212]">
                      Your Shopping Bag
                    </h2>
                    <p className="text-[11px] text-[#7A7A7A]">
                      {totalItemCount} {totalItemCount === 1 ? "item" : "items"} selected
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeCart}
                  className="p-1.5 hover:bg-[#FAF8F5] rounded-full text-[#7A7A7A] hover:text-[#121212] transition-colors border border-transparent hover:border-[#EFECE7]"
                  aria-label="Close shopping bag"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sleek 1-Line Free Shipping Banner */}
              {items.length > 0 && (
                <div className="mt-3 px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#8A6B29]/30 flex items-center gap-2 text-[11px] font-medium text-[#121212]">
                  <Truck className="w-3.5 h-3.5 text-[#8A6B29] shrink-0" />
                  <span>
                    🎉 <strong className="font-semibold">FREE Express Delivery & Insured Transit</strong> Unlocked
                  </span>
                </div>
              )}
            </div>

            {/* Scrollable Content Area - Maximized Height for Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
              {items.length === 0 ? (
                /* Empty Cart State */
                <div className="flex flex-col items-center justify-center h-full text-center py-12 px-4">
                  <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#EFECE7] flex items-center justify-center mb-4 text-[#8A6B29]">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#121212] mb-1">
                    Your Shopping Bag is Empty
                  </h3>
                  <p className="text-xs text-[#7A7A7A] max-w-xs mb-5 leading-relaxed">
                    Explore our handcrafted 1 Gram Gold replica collections and elevate your style.
                  </p>

                  <div className="w-full mb-5">
                    <p className="text-[10px] uppercase tracking-wider font-bold text-[#7A7A7A] mb-2.5">
                      Popular Categories
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-1.5">
                      {categoryChips.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/shop?category=${cat.slug}`}
                          onClick={closeCart}
                          className="text-[11px] font-medium text-[#4A4A4A] bg-[#FAF8F5] border border-[#EFECE7] hover:border-[#8A6B29] hover:text-[#8A6B29] px-3 py-1 rounded-full transition-all"
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="gold"
                    onClick={closeCart}
                    asChild
                    className="w-full py-5 rounded-xl text-xs uppercase tracking-widest font-bold shadow-md"
                  >
                    <Link href="/shop" className="flex items-center justify-center gap-2">
                      <span>Explore Shop</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              ) : (
                /* Product Items List */
                <div className="divide-y divide-[#EFECE7]">
                  {items.map((item) => (
                    <motion.div
                      key={item.productId}
                      animate={{ opacity: removingId === item.productId ? 0.2 : 1 }}
                      className="py-3 first:pt-0 last:pb-0 flex gap-3.5 items-start"
                    >
                      {/* Compact Thumbnail Image */}
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="relative w-16 h-20 rounded-lg overflow-hidden bg-[#FAF8F5] border border-[#EFECE7] shrink-0 group"
                      >
                        <Image
                          src={item.image || "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80"}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </Link>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <Link
                            href={`/product/${item.slug}`}
                            onClick={closeCart}
                            className="font-serif text-xs sm:text-sm font-semibold text-[#121212] hover:text-[#8A6B29] transition-colors line-clamp-1 leading-snug"
                          >
                            {item.name}
                          </Link>

                          <button
                            onClick={() => handleRemove(item.productId)}
                            className="p-1 text-[#7A7A7A] hover:text-red-600 hover:bg-red-50 rounded transition-colors shrink-0"
                            aria-label="Remove item"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-[9px] text-[#7A7A7A] uppercase tracking-wider mt-0.5 font-medium">
                          1 Gram Gold Replica
                        </p>

                        {/* Controls & Price */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-[#EFECE7] rounded-md bg-[#FAF8F5]">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-[#EFECE7] text-[#121212] transition-colors rounded-l-md"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="w-7 text-center text-xs font-bold text-[#121212]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              disabled={!!item.stockQty && item.quantity >= item.stockQty}
                              className="w-6 h-6 flex items-center justify-center hover:bg-[#EFECE7] text-[#121212] transition-colors rounded-r-md disabled:opacity-30 disabled:cursor-not-allowed"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-xs sm:text-sm font-bold text-[#121212]">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                            {item.quantity > 1 && (
                              <span className="block text-[9px] text-[#7A7A7A]">
                                ({formatPrice(item.price)} each)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Compact Footer / Summary Section */}
            {items.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-[#EFECE7] bg-white space-y-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#4A4A4A]">
                    <span>Items Subtotal</span>
                    <span className="font-semibold text-[#121212]">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-[#4A4A4A]">
                    <span>Insured Delivery</span>
                    <span className="text-[#8A6B29] font-bold">FREE</span>
                  </div>

                  <Separator className="my-1.5 bg-[#EFECE7]" />

                  <div className="flex justify-between items-baseline pt-0.5">
                    <span className="font-serif font-bold text-sm text-[#121212]">
                      Total Amount
                    </span>
                    <span className="font-serif text-lg font-bold text-[#8A6B29]">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* Checkout CTA Button */}
                <Button
                  variant="gold"
                  className="w-full py-5 text-xs uppercase tracking-[0.18em] font-bold rounded-xl shadow-md transition-all active:scale-[0.98]"
                  asChild
                  onClick={closeCart}
                >
                  <Link href="/checkout" className="flex items-center justify-center gap-2">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Proceed to Guided Checkout</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>

                {/* Trust Badges */}
                <div className="pt-1 flex items-center justify-center gap-4 text-[9px] text-[#7A7A7A] uppercase tracking-wider">
                  <span className="flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3 h-3 text-[#8A6B29]" /> 256-Bit SSL
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <RotateCcw className="w-3 h-3 text-[#8A6B29]" /> 15-Day Exchange
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

