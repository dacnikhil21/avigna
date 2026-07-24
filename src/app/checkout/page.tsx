"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/lib/store/cart";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/motion";
import { CheckoutHeader } from "@/components/checkout/checkout-header";
import { AddressStep, type AddressForm } from "@/components/checkout/address-step";
import { ShippingStep } from "@/components/checkout/shipping-step";
import { PaymentStep } from "@/components/checkout/payment-step";
import { GiftingStep } from "@/components/checkout/gifting-step";
import { OrderSummaryCard } from "@/components/checkout/order-summary-card";
import { MobileBottomBar } from "@/components/checkout/mobile-bottom-bar";
import { ArrowLeft, Loader2, ShoppingBag } from "lucide-react";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { items, subtotal, clearCart, isGift, giftMessage, setGiftOptions } = useCartStore();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online");
  const [shippingForm, setShippingForm] = useState<AddressForm | null>(null);
  const [savedAddresses, setSavedAddresses] = useState<Array<{
    id: string;
    fullName: string;
    mobile: string;
    houseFlat: string;
    street: string;
    area?: string | null;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
  }>>([]);
  const [addressLoading, setAddressLoading] = useState(true);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [saveAddressLoading, setSaveAddressLoading] = useState(false);

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  const total = subtotal();

  const handleApplyCoupon = (code: string) => {
    setAppliedCoupon(code);
    if (code === "WELCOME500") {
      setDiscountAmount(50000); // ₹500 in PAISE
    } else if (code === "AVIGHNA10") {
      setDiscountAmount(Math.round(total * 0.1)); // total is in PAISE
    } else if (code === "GOLD1000") {
      setDiscountAmount(100000); // ₹1,000 in PAISE
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
  };

  const grandTotal = Math.max(0, total - discountAmount);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/checkout");
    } else if (status === "authenticated") {
      fetch("/api/account/addresses")
        .then((res) => res.json())
        .then((data) => {
          if (data && Array.isArray(data.addresses)) {
            setSavedAddresses(data.addresses);
            const defaultAddr =
              data.addresses.find((a: { isDefault: boolean }) => a.isDefault) || data.addresses[0];
            if (defaultAddr) {
              setShippingForm({
                name: defaultAddr.fullName,
                email: session.user?.email || "",
                phone: defaultAddr.mobile,
                address: `${defaultAddr.houseFlat}, ${defaultAddr.street}${
                  defaultAddr.area ? `, ${defaultAddr.area}` : ""
                }`,
                city: defaultAddr.city,
                state: defaultAddr.state,
                pincode: defaultAddr.pincode,
              });
            }
          }
          setAddressLoading(false);
        })
        .catch(() => setAddressLoading(false));
    }
  }, [status, router, session]);

  const handleSaveNewAddress = async (newAddr: {
    fullName: string;
    mobile: string;
    houseFlat: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  }) => {
    setSaveAddressLoading(true);
    try {
      const res = await fetch("/api/account/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: newAddr.fullName,
          mobile: newAddr.mobile,
          houseFlat: newAddr.houseFlat,
          street: newAddr.street,
          city: newAddr.city,
          state: newAddr.state,
          pincode: newAddr.pincode,
          isDefault: savedAddresses.length === 0,
        }),
      });

      if (res.ok) {
        const fullAddr = `${newAddr.houseFlat}, ${newAddr.street}`;
        const createdForm: AddressForm = {
          name: newAddr.fullName,
          email: session?.user?.email || "",
          phone: newAddr.mobile,
          address: fullAddr,
          city: newAddr.city,
          state: newAddr.state,
          pincode: newAddr.pincode,
        };
        setShippingForm(createdForm);
        setIsAddingAddress(false);

        // Refresh addresses list
        const refreshRes = await fetch("/api/account/addresses");
        const refreshData = await refreshRes.json();
        if (refreshData && Array.isArray(refreshData.addresses)) {
          setSavedAddresses(refreshData.addresses);
        }
      } else {
        throw new Error("Failed to save address");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to save address. Please try again.");
      setTimeout(() => setErrorMsg(null), 4000);
    } finally {
      setSaveAddressLoading(false);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingForm) {
      setErrorMsg("Please add or select a shipping address before proceeding to payment.");
      setTimeout(() => setErrorMsg(null), 4000);
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: grandTotal,
          appliedCoupon,
          customer: shippingForm,
          paymentMethod,
          items: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to create order");

      if (data.isMock || !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
        clearCart();
        window.location.href = `/checkout/success?order=${data.orderNumber}`;
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const rzp = new window.Razorpay({
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
          amount: data.amount,
          currency: "INR",
          name: "Sri Avighna 1 Gram Gold Jewellery",
          description: "Luxury Jewellery Purchase",
          order_id: data.orderId,
          handler: async (response) => {
            await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                dbOrderId: data.dbOrderId,
              }),
            });
            clearCart();
            window.location.href = `/checkout/success?order=${data.orderNumber}`;
          },
          prefill: {
            name: shippingForm.name,
            email: shippingForm.email,
            contact: shippingForm.phone,
          },
          theme: { color: "#C5A880" },
        });
        rzp.open();
      };
      document.body.appendChild(script);
    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : "Payment initialization failed. Please try again.");
      setTimeout(() => setErrorMsg(null), 4000);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || addressLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#C5A880] animate-spin mb-4" />
        <p className="text-xs uppercase tracking-widest font-semibold text-[#7A7A7A]">
          Loading Your Guided Checkout...
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] bg-[#FAF8F5] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/20 flex items-center justify-center mb-5">
          <ShoppingBag className="w-8 h-8 text-[#C5A880]" />
        </div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#121212] mb-2">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-xs sm:text-sm text-[#7A7A7A] max-w-md mb-8">
          Add some exquisite handcrafted 1 gram gold pieces to your cart before proceeding to checkout.
        </p>
        <Button variant="gold" asChild className="px-8 py-6 rounded-xl text-xs uppercase tracking-widest font-bold">
          <Link href="/shop" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Explore Our Collections
          </Link>
        </Button>
      </div>
    );
  }

  // Calculate step status for header progress
  const currentStep = !shippingForm ? 1 : paymentMethod ? 3 : 2;

  return (
    <div className="min-h-screen bg-white pb-24 lg:pb-16 font-sans">
      {/* Header */}
      <CheckoutHeader currentStep={currentStep} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 md:pt-10">
        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
            {/* Left 7 Columns: Guided Checkout Steps */}
            <FadeIn className="lg:col-span-7 space-y-6">
              {/* Step 1: Delivery Address */}
              <AddressStep
                shippingForm={shippingForm}
                savedAddresses={savedAddresses}
                onSelectAddress={(form) => setShippingForm(form)}
                onSaveNewAddress={handleSaveNewAddress}
                isAddingAddress={isAddingAddress}
                setIsAddingAddress={setIsAddingAddress}
                saveAddressLoading={saveAddressLoading}
                errorMsg={errorMsg}
                setErrorMsg={setErrorMsg}
                userEmail={session?.user?.email || ""}
              />

              {/* Step 2: Shipping & Delivery Estimate */}
              <ShippingStep />

              {/* Step 3: Payment Method */}
              <PaymentStep
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />

              {/* Step 4: Gifting & Packaging Notes */}
              <GiftingStep
                isGift={isGift}
                giftMessage={giftMessage}
                setGiftOptions={setGiftOptions}
              />
            </FadeIn>

            {/* Right 5 Columns: Sticky Order Summary & Checkout CTA */}
            <FadeIn delay={0.15} className="lg:col-span-5">
              <OrderSummaryCard
                items={items}
                subtotal={total}
                paymentMethod={paymentMethod}
                loading={loading}
                onSubmit={handlePlaceOrder}
                shippingForm={shippingForm}
                appliedCoupon={appliedCoupon}
                discountAmount={discountAmount}
                onApplyCoupon={handleApplyCoupon}
                onRemoveCoupon={handleRemoveCoupon}
              />
            </FadeIn>
          </div>
        </form>
      </main>

      {/* Sticky Mobile Bottom Bar */}
      <MobileBottomBar
        grandTotal={grandTotal}
        itemCount={items.reduce((acc, i) => acc + i.quantity, 0)}
        paymentMethod={paymentMethod}
        loading={loading}
        onSubmit={handlePlaceOrder}
        shippingForm={shippingForm}
      />

      {/* Floating Toast Notification for errors */}
      {errorMsg && (
        <div className="fixed bottom-20 lg:bottom-8 right-4 sm:right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border text-xs uppercase tracking-wider font-semibold bg-red-600 text-white border-red-700 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {errorMsg}
        </div>
      )}
    </div>
  );
}
