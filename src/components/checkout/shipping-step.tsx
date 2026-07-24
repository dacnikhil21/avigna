"use client";

import { Truck, ShieldCheck, Sparkles, Clock, CheckCircle2 } from "lucide-react";

export function ShippingStep() {
  // Calculate dynamic delivery date range (3 to 5 days from today)
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 3);
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 5);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="bg-white rounded-2xl border border-[#EFECE7] p-5 sm:p-6 md:p-8 shadow-sm transition-all duration-300">
      {/* Step Header */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#EFECE7]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#121212] text-white flex items-center justify-center font-bold text-xs">
            2
          </div>
          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#121212] flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#C5A880]" />
              Shipping & Delivery
            </h2>
            <p className="text-xs text-[#7A7A7A] mt-0.5">
              Complimentary insured express courier transit across India
            </p>
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-widest font-bold bg-[#C5A880]/15 text-[#C5A880] px-3 py-1 rounded-full border border-[#C5A880]/30">
          FREE Express Delivery
        </span>
      </div>

      {/* Delivery Estimate Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Estimated Date Card */}
        <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#EFECE7] flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-[#C5A880]/10 flex items-center justify-center shrink-0 border border-[#C5A880]/20">
            <Clock className="w-4 h-4 text-[#C5A880]" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-[#7A7A7A]">
              Estimated Delivery Date
            </p>
            <p className="text-sm font-bold text-[#121212] mt-0.5">
              {formatDate(minDate)} – {formatDate(maxDate)}
            </p>
            <p className="text-[11px] text-[#4A4A4A] mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Dispatched within 24 hours
            </p>
          </div>
        </div>

        {/* Transit Security Card */}
        <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#EFECE7] flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-[#C5A880]/10 flex items-center justify-center shrink-0 border border-[#C5A880]/20">
            <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-[#7A7A7A]">
              100% Insured Transit
            </p>
            <p className="text-sm font-bold text-[#121212] mt-0.5">
              BlueDart & Delhivery Express
            </p>
            <p className="text-[11px] text-[#4A4A4A] mt-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C5A880]" />
              Sandalwood box with wax seal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
