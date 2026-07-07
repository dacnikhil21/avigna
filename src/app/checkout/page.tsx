"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Shield, Lock } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FadeIn } from "@/components/shared/motion";

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
  const { items, subtotal, clearCart, isGift, giftMessage, setGiftOptions } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [shippingForm, setShippingForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const total = subtotal();
  const shipping = total > 5000000 ? 0 : 50000;
  const grandTotal = total + shipping;

  if (items.length === 0) {
    return (
      <div className="section-padding pt-32 pb-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="heading-md mb-4">Your bag is empty</h1>
        <p className="body-lg mb-8">Add some exquisite pieces before checking out.</p>
        <Button variant="gold" asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: grandTotal,
          customer: shippingForm,
          items: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            price: i.price,
            name: i.name,
            image: i.image,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to create order");

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const rzp = new window.Razorpay({
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
          amount: data.amount,
          currency: "INR",
          name: "Sri Avighna Collections",
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
          theme: { color: "#C9A962" },
        });
        rzp.open();
      };
      document.body.appendChild(script);
    } catch (err) {
      console.error(err);
      alert("Payment initialization failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding pt-32 md:pt-36 pb-20">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm text-luxury-muted hover:text-luxury-black transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Continue Shopping
      </Link>

      <h1 className="heading-md mb-10">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form */}
        <FadeIn className="lg:col-span-3 space-y-8">
          <div className="bg-luxury-cream/30 rounded-3xl p-6 md:p-8">
            <h2 className="font-serif text-xl font-light mb-6">Shipping Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  required
                  value={shippingForm.name}
                  onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={shippingForm.email}
                  onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={shippingForm.phone}
                  onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  required
                  value={shippingForm.address}
                  onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  required
                  value={shippingForm.city}
                  onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  required
                  value={shippingForm.state}
                  onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  required
                  value={shippingForm.pincode}
                  onChange={(e) => setShippingForm({ ...shippingForm, pincode: e.target.value })}
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>

          <div className="bg-luxury-cream/30 rounded-3xl p-6 md:p-8">
            <h2 className="font-serif text-xl font-light mb-4">Gifting Options</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="gift-note-toggle"
                  checked={isGift}
                  onChange={(e) => setGiftOptions(e.target.checked, e.target.checked ? giftMessage : "")}
                  className="mt-1 border-gray-300 text-[#C5A880] focus:ring-[#C5A880] rounded-none"
                />
                <label htmlFor="gift-note-toggle" className="text-sm font-serif text-[#121212] select-none cursor-pointer">
                  Add a complimentary handwritten gift card
                </label>
              </div>
              {isGift && (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="giftMessage">Your Calligraphy Message</Label>
                  <textarea
                    id="giftMessage"
                    placeholder="Write your personal message here..."
                    value={giftMessage}
                    onChange={(e) => setGiftOptions(isGift, e.target.value)}
                    rows={3}
                    className="w-full text-sm font-sans border border-[#EFECE7] p-3 focus:outline-none focus:border-[#C5A880] resize-none bg-white rounded-none"
                  />
                </div>
              )}
              <p className="text-xs text-luxury-muted font-sans leading-relaxed">
                ✨ Every order is shipped in our signature sandalwood-scented hard-shell box, wrapped in silk tissue, and secured with a custom wax seal.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Order summary */}
        <FadeIn delay={0.1} className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-luxury p-6 md:p-8 sticky top-32">
            <h2 className="font-serif text-xl font-light mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-luxury-cream shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-light line-clamp-1">{item.name}</p>
                    <p className="text-xs text-luxury-muted">Qty: {item.quantity}</p>
                    <p className="text-sm font-medium mt-0.5">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="mb-4" />

            <div className="space-y-2 mb-6">
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
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <Button
              type="submit"
              variant="gold"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? "Processing..." : `Pay ${formatPrice(grandTotal)}`}
            </Button>

            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-luxury-muted">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3" /> Secure
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" /> Encrypted
              </span>
            </div>
          </div>
        </FadeIn>
      </form>
    </div>
  );
}
