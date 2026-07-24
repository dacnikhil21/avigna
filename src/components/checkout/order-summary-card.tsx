"use client";

import { useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Lock,
  ShieldCheck,
  RotateCcw,
  Tag,
  Check,
  X,
  Minus,
  Plus,
  Loader2,
  Sparkles,
} from "lucide-react";
import type { CartItem } from "@/types";

interface OrderSummaryCardProps {
  items: CartItem[];
  subtotal: number;
  paymentMethod: "online" | "cod";
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  shippingForm: object | null;
  appliedCoupon: string | null;
  discountAmount: number;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
}

export function OrderSummaryCard({
  items,
  subtotal,
  paymentMethod,
  loading,
  onSubmit,
  shippingForm,
  appliedCoupon,
  discountAmount,
  onApplyCoupon,
  onRemoveCoupon,
}: OrderSummaryCardProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);

  const availableOffers = [
    { code: "WELCOME500", label: "₹500 OFF on first purchase" },
    { code: "AVIGHNA10", label: "10% OFF Special Festival Code" },
  ];

  const handleApplyClick = () => {
    if (!couponInput.trim()) return;
    const code = couponInput.trim().toUpperCase();
    const validCodes = ["WELCOME500", "AVIGHNA10", "GOLD1000"];
    if (validCodes.includes(code)) {
      onApplyCoupon(code);
      setCouponError(null);
      setCouponInput("");
    } else {
      setCouponError("Invalid coupon code. Try WELCOME500");
    }
  };

  const grandTotal = Math.max(0, subtotal - discountAmount);

  return (
    <div className="bg-white rounded-2xl border border-[#EFECE7] shadow-luxury p-5 sm:p-6 md:p-8 sticky top-28 transition-all duration-300">
      {/* Title & Item Count */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#EFECE7]">
        <h2 className="font-serif text-xl font-bold text-[#121212]">
          Order Summary
        </h2>
        <span className="text-xs font-sans font-bold bg-[#121212] text-white px-3 py-1 rounded-full shadow-2xs">
          {items.reduce((acc, i) => acc + i.quantity, 0)} Items
        </span>
      </div>

      {/* Product List */}
      <div className="space-y-4 mb-6 max-h-72 overflow-y-auto pr-1 divide-y divide-[#EFECE7]/60">
        {items.map((item) => (
          <div key={item.productId} className="pt-3 first:pt-0 flex gap-3.5 items-center">
            {/* Thumbnail */}
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#F9F9F9] shrink-0 border border-[#EFECE7]">
              <Image
                src={item.image || "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80"}
                alt={item.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-bold text-[#121212] line-clamp-1">
                {item.name}
              </p>
              <p className="text-[10px] text-[#555555] uppercase tracking-wider font-semibold">
                1 Gram Gold Replica
              </p>

              {/* Quantity controls */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center border border-[#121212]/20 rounded-lg bg-[#F9F9F9]">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="p-1 hover:bg-[#EFECE7] text-[#121212] transition-colors rounded-l-lg"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-2.5 text-xs font-bold text-[#121212]">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="p-1 hover:bg-[#EFECE7] text-[#121212] transition-colors rounded-r-lg"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-xs sm:text-sm font-bold text-[#121212]">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coupon Code Section */}
      <div className="mb-6 pt-4 border-t border-[#EFECE7]">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#121212] mb-2">
          <Tag className="w-3.5 h-3.5 text-[#121212]" />
          <span>Apply Promo Code</span>
        </div>

        {appliedCoupon ? (
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 p-3 rounded-xl">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-700" />
              <div>
                <p className="text-xs font-bold text-emerald-900">{appliedCoupon}</p>
                <p className="text-[10px] text-emerald-800 font-bold">{formatPrice(discountAmount)} Instant Savings Applied</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onRemoveCoupon}
              className="p-1 hover:bg-emerald-100 rounded-full text-emerald-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Enter coupon code (e.g. WELCOME500)"
                value={couponInput}
                onChange={(e) => {
                  setCouponInput(e.target.value);
                  setCouponError(null);
                }}
                className="text-xs uppercase rounded-xl border-[#121212]/30 focus:border-[#121212] bg-white text-[#121212] font-semibold"
              />
              <Button
                type="button"
                onClick={handleApplyClick}
                className="bg-[#121212] hover:bg-black text-white text-xs uppercase font-bold px-4 rounded-xl transition-colors shrink-0"
              >
                Apply
              </Button>
            </div>

            {couponError && (
              <p className="text-[11px] text-red-600 font-bold pl-1">{couponError}</p>
            )}

            {/* Quick Offer Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {availableOffers.map((off) => (
                <button
                  key={off.code}
                  type="button"
                  onClick={() => {
                    onApplyCoupon(off.code);
                    setCouponError(null);
                  }}
                  className="text-[10px] uppercase font-bold text-[#121212] bg-[#F9F9F9] border border-[#121212] hover:bg-[#121212] hover:text-white px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 shadow-2xs"
                >
                  <Sparkles className="w-2.5 h-2.5 text-[#121212]" />
                  {off.code}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <Separator className="mb-4 bg-[#EFECE7]" />

      {/* Price Breakdown */}
      <div className="space-y-2.5 text-xs sm:text-sm mb-6">
        <div className="flex justify-between text-[#121212] font-medium">
          <span>Items Subtotal</span>
          <span className="font-bold text-[#121212]">{formatPrice(subtotal)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-700 font-bold">
            <span>Promo Code Savings</span>
            <span>- {formatPrice(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between text-[#121212] font-medium">
          <span>Insured Express Shipping</span>
          <span className="text-[#121212] font-bold">FREE</span>
        </div>

        <div className="flex justify-between text-[#555555] text-[11px] font-medium">
          <span>GST & All Taxes</span>
          <span>Included</span>
        </div>

        <Separator className="my-3 bg-[#EFECE7]" />

        <div className="flex justify-between items-baseline">
          <span className="font-serif font-bold text-base text-[#121212]">
            Total Amount
          </span>
          <span className="font-serif text-xl sm:text-2xl font-bold text-[#121212]">
            {formatPrice(grandTotal)}
          </span>
        </div>
      </div>

      {/* Place Order CTA Button */}
      <Button
        type="button"
        onClick={onSubmit}
        disabled={loading || !shippingForm}
        className="w-full py-6 bg-[#121212] hover:bg-black text-white text-xs sm:text-sm uppercase tracking-[0.15em] font-bold rounded-xl shadow-lg transition-all duration-300 transform-gpu active:scale-95"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Processing Order...</span>
          </div>
        ) : paymentMethod === "cod" ? (
          "Place Cash on Delivery Order"
        ) : (
          `Pay ${formatPrice(grandTotal)} via Razorpay`
        )}
      </Button>

      {/* Security & Guarantee Pills */}
      <div className="mt-5 pt-4 border-t border-[#EFECE7] space-y-2">
        <div className="flex items-center gap-2 text-[11px] text-[#121212] font-semibold">
          <Lock className="w-3.5 h-3.5 text-[#121212] shrink-0" />
          <span>256-Bit SSL Encrypted & PCI-DSS Compliant</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[#121212] font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#121212] shrink-0" />
          <span>Certified 1 Gram Gold Guarantee</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[#121212] font-semibold">
          <RotateCcw className="w-3.5 h-3.5 text-[#121212] shrink-0" />
          <span>15-Day Money-Back & Easy Replacement</span>
        </div>
      </div>
    </div>
  );
}
