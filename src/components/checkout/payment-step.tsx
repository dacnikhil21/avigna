"use client";

import { CreditCard, Banknote, Shield, Lock, CheckCircle2, Zap } from "lucide-react";

interface PaymentStepProps {
  paymentMethod: "online" | "cod";
  setPaymentMethod: (method: "online" | "cod") => void;
}

export function PaymentStep({ paymentMethod, setPaymentMethod }: PaymentStepProps) {
  return (
    <div className="bg-white rounded-2xl border-2 border-[#121212]/10 p-5 sm:p-6 md:p-8 shadow-sm transition-all duration-300">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#EFECE7]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#121212] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            3
          </div>
          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#121212] flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#121212]" />
              Payment Method
            </h2>
            <p className="text-xs text-[#5A544E] font-medium mt-0.5">
              Choose your preferred secure payment option
            </p>
          </div>
        </div>
        <div className="self-start sm:self-center flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-white bg-[#121212] px-3 py-1.5 rounded-lg shadow-2xs">
          <Shield className="w-3.5 h-3.5 text-white" />
          Razorpay Secured
        </div>
      </div>

      {/* Payment Selection Cards */}
      <div className="space-y-4">
        {/* Online Payment (Razorpay) Card */}
        <label
          onClick={() => setPaymentMethod("online")}
          className={`group flex flex-col p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
            paymentMethod === "online"
              ? "border-2 border-[#121212] bg-[#F9F9F9] shadow-sm"
              : "border-[#EFECE7] bg-white hover:border-[#121212]/50"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  paymentMethod === "online"
                    ? "border-[#121212] bg-[#121212]"
                    : "border-gray-300"
                }`}
              >
                {paymentMethod === "online" && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm sm:text-base text-[#121212]">
                    Online Payment (UPI / Cards / NetBanking)
                  </span>
                  <span className="text-[9px] uppercase tracking-widest font-bold bg-[#121212] text-white px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5" /> Fast
                  </span>
                </div>
                <p className="text-xs text-[#5A544E] font-medium mt-0.5">
                  Instant order confirmation via Google Pay, PhonePe, Paytm, UPI, Cards, NetBanking
                </p>
              </div>
            </div>
            {paymentMethod === "online" && (
              <CheckCircle2 className="w-5 h-5 text-[#121212] shrink-0" />
            )}
          </div>

          {/* Supported Methods Badges */}
          <div className="mt-4 pt-3 border-t border-[#EFECE7]/60 flex flex-wrap items-center gap-2">
            {["GPay", "PhonePe", "Paytm", "BHIM UPI", "Visa", "Mastercard", "RuPay", "NetBanking"].map(
              (brand) => (
                <span
                  key={brand}
                  className="text-[10px] font-bold text-[#121212] bg-white px-2.5 py-1 rounded-md border border-[#121212]/20 shadow-2xs"
                >
                  {brand}
                </span>
              )
            )}
          </div>
        </label>

        {/* Cash on Delivery Card */}
        <label
          onClick={() => setPaymentMethod("cod")}
          className={`group flex items-start justify-between p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
            paymentMethod === "cod"
              ? "border-2 border-[#121212] bg-[#F9F9F9] shadow-sm"
              : "border-[#EFECE7] bg-white hover:border-[#121212]/50"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                paymentMethod === "cod"
                  ? "border-[#121212] bg-[#121212]"
                  : "border-gray-300"
              }`}
            >
              {paymentMethod === "cod" && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-[#121212]">
                  Cash on Delivery (COD)
                </span>
                <span className="text-[9px] uppercase tracking-widest font-bold bg-[#121212] text-white px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Banknote className="w-2.5 h-2.5" /> Doorstep
                </span>
              </div>
              <p className="text-xs text-[#5A544E] font-medium mt-0.5">
                Pay cash to the courier representative when your parcel is delivered
              </p>
            </div>
          </div>
          {paymentMethod === "cod" && (
            <CheckCircle2 className="w-5 h-5 text-[#121212] shrink-0" />
          )}
        </label>
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="mt-6 p-4 rounded-xl bg-[#F9F9F9] border border-[#E5E5E5] flex items-center justify-between text-xs text-[#121212]">
        <div className="flex items-center gap-2 font-bold">
          <Lock className="w-4 h-4 text-[#121212]" />
          <span>PCI-DSS Level 1 Encrypted • 100% Safe Checkout</span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#121212] px-2.5 py-1 rounded-md">
          Verified Gateway
        </span>
      </div>
    </div>
  );
}
