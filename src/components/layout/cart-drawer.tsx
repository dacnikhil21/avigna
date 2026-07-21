"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, isGift, giftMessage, setGiftOptions } =
    useCartStore();

  const total = subtotal();
  const shipping = total > 5000000 ? 0 : 50000;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-luxury-black/40 backdrop-blur-sm"
            onClick={closeCart}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[80] w-full max-w-md bg-luxury-white shadow-luxury-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-luxury-beige/30">
              <div>
                <h2 className="font-serif text-xl font-light">Your Bag</h2>
                <p className="text-xs text-luxury-muted mt-0.5">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-luxury-cream rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-12 h-12 text-luxury-beige mb-4" />
                  <p className="font-serif text-lg font-light mb-2">Your bag is empty</p>
                  <p className="text-sm text-luxury-muted mb-6">
                    Discover our exquisite collections
                  </p>
                  <Button variant="outline" onClick={closeCart} asChild>
                    <Link href="/shop">Explore Shop</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-4">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="relative w-24 h-28 rounded-2xl overflow-hidden bg-luxury-cream shrink-0"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="font-serif text-sm font-light hover:text-luxury-gold transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-luxury-muted mt-1">{item.metal}</p>
                        <p className="text-sm font-medium mt-2">
                          {formatPrice(item.price)}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 border border-luxury-beige/50 rounded-full">
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity - 1)
                              }
                              className="p-1.5 hover:bg-luxury-cream rounded-full transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity + 1)
                              }
                              disabled={!!item.stockQty && item.quantity >= item.stockQty}
                              className="p-1.5 hover:bg-luxury-cream rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="text-xs text-luxury-muted hover:text-luxury-black transition-colors underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-luxury-beige/30 bg-luxury-cream/30">
                {/* Gift Option */}
                <div className="mb-6 p-4 border border-luxury-beige/30 bg-white text-left space-y-3">
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="gift-note-toggle"
                      checked={isGift}
                      onChange={(e) => setGiftOptions(e.target.checked, e.target.checked ? giftMessage : "")}
                      className="mt-1 border-gray-300 text-[#C5A880] focus:ring-[#C5A880]"
                    />
                    <label htmlFor="gift-note-toggle" className="text-xs font-serif text-[#121212] select-none cursor-pointer">
                      Add a complimentary handwritten gift card
                    </label>
                  </div>
                  {isGift && (
                    <textarea
                      placeholder="Write your personal message here (written by hand in calligraphy)..."
                      value={giftMessage}
                      onChange={(e) => setGiftOptions(isGift, e.target.value)}
                      rows={2}
                      className="w-full text-xs font-sans border-0 border-b border-[#EFECE7] py-2 bg-transparent focus:outline-none focus:border-[#C5A880] resize-none"
                    />
                  )}
                  <p className="text-[10px] text-luxury-muted font-sans leading-relaxed">
                    ✨ Every order is scented with sandalwood, wrapped in silk tissue, and secured with a custom wax seal.
                  </p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-luxury-muted">Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-luxury-muted">Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-luxury-gold">Complimentary</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatPrice(total + shipping)}</span>
                  </div>
                </div>
                <Button variant="gold" className="w-full rounded-none" asChild onClick={closeCart}>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                <p className="text-[10px] text-center text-luxury-muted mt-3 uppercase tracking-wider">
                  Secure checkout with Razorpay
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
