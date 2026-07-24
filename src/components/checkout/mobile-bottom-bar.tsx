"use client";

import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2, Lock } from "lucide-react";

interface MobileBottomBarProps {
  grandTotal: number;
  itemCount: number;
  paymentMethod: "online" | "cod";
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  shippingForm: object | null;
}

export function MobileBottomBar({
  grandTotal,
  itemCount,
  paymentMethod,
  loading,
  onSubmit,
  shippingForm,
}: MobileBottomBarProps) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#EFECE7] p-3.5 sm:p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Total preview */}
        <div>
          <span className="text-[10px] text-[#7A7A7A] uppercase tracking-wider font-semibold block">
            Total ({itemCount} {itemCount === 1 ? "item" : "items"})
          </span>
          <span className="font-serif text-lg font-bold text-[#C5A880] leading-none">
            {formatPrice(grandTotal)}
          </span>
        </div>

        {/* Right: Primary CTA button */}
        <Button
          type="button"
          onClick={onSubmit}
          disabled={loading || !shippingForm}
          className="flex-1 max-w-[240px] py-3.5 bg-[#121212] hover:bg-[#C5A880] text-white text-xs uppercase tracking-widest font-bold rounded-xl shadow-md transition-all active:scale-95"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin mx-auto" />
          ) : paymentMethod === "cod" ? (
            "Place COD Order"
          ) : (
            <span className="flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
              Pay {formatPrice(grandTotal)}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
