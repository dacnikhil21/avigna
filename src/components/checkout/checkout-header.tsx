"use client";

import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

interface CheckoutHeaderProps {
  currentStep: number;
}

export function CheckoutHeader({ currentStep }: CheckoutHeaderProps) {
  const steps = [
    { number: 1, label: "Delivery Address" },
    { number: 2, label: "Shipping & Delivery" },
    { number: 3, label: "Payment" },
  ];

  return (
    <header className="w-full bg-white border-b border-[#EFECE7] sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
        {/* Left: Brand & Back to Shop */}
        <div className="flex items-center gap-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-medium uppercase tracking-wider text-[#7A7A7A] hover:text-[#121212] transition-colors py-2 pr-3 border-r border-[#EFECE7]"
          >
            <ArrowLeft className="w-4 h-4 text-[#C5A880]" />
            <span className="hidden sm:inline">Back to Shop</span>
          </Link>
          <Link href="/" className="flex flex-col">
            <span className="font-serif text-base md:text-lg font-bold text-[#121212] tracking-wider leading-none">
              Sri Avighna
            </span>
            <span className="text-[8px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold mt-0.5">
              1 Gram Gold Jewellery
            </span>
          </Link>
        </div>

        {/* Center: Step Indicator (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          {steps.map((step, idx) => {
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            return (
              <div key={step.number} className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    isCompleted
                      ? "bg-[#C5A880] text-white"
                      : isActive
                      ? "bg-[#121212] text-white ring-4 ring-[#C5A880]/20"
                      : "bg-[#FAF8F5] text-[#7A7A7A] border border-[#EFECE7]"
                  }`}
                >
                  {isCompleted ? "✓" : step.number}
                </div>
                <span
                  className={`text-xs uppercase tracking-wider font-medium ${
                    isActive
                      ? "text-[#121212] font-semibold"
                      : isCompleted
                      ? "text-[#C5A880]"
                      : "text-[#7A7A7A]"
                  }`}
                >
                  {step.label}
                </span>
                {idx < steps.length - 1 && (
                  <div className="w-8 h-[1px] bg-[#EFECE7] ml-2" />
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Security Badge */}
        <div className="flex items-center gap-2 bg-[#FAF8F5] border border-[#EFECE7] px-3 py-1.5 rounded-full">
          <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
          <div className="flex flex-col text-[9px] uppercase tracking-wider leading-tight">
            <span className="font-bold text-[#121212]">256-Bit SSL</span>
            <span className="text-[#7A7A7A]">Encrypted Checkout</span>
          </div>
        </div>
      </div>
    </header>
  );
}
