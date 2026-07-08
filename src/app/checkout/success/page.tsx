import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Package, MapPin, ArrowRight, Home } from "lucide-react";
import { getOrderByNumber } from "@/lib/db/orders";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ order?: string }>;
}

export const metadata: Metadata = {
  title: "Order Confirmed | Sri Avighna 1 Gram Gold Jewellery",
  description: "Your order has been placed successfully. Thank you for shopping with Sri Avighna 1 Gram Gold Jewellery.",
};

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { order: orderNumber } = await searchParams;

  // Attempt to load the order from the database
  const order = orderNumber ? await getOrderByNumber(orderNumber).catch(() => null) : null;

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center px-6 py-32">
      <div className="w-full max-w-lg text-center">

        {/* Success icon */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 stroke-[1.5]" />
          </div>
        </div>

        {/* Eyebrow */}
        <p className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#C5A880] mb-3">
          Order Confirmed
        </p>

        {/* Headline */}
        <h1 className="font-serif text-3xl md:text-4xl font-light text-[#121212] italic mb-4">
          Thank You for Your Order
        </h1>

        {/* Subtitle */}
        <p className="font-sans font-light text-sm text-[#6B6560] leading-relaxed mb-10 max-w-md mx-auto">
          Your payment has been received and your order is being prepared. You will receive updates on your registered phone number and email.
        </p>

        {/* Order summary card */}
        {order ? (
          <div className="bg-white border border-[#EFECE7] rounded-2xl p-6 mb-8 text-left shadow-sm">

            {/* Order number + status */}
            <div className="flex items-center justify-between mb-5 pb-5 border-b border-[#EFECE7]">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#C5A880] font-medium mb-1">Order Number</p>
                <p className="font-mono text-sm font-bold text-[#121212]">{order.orderNumber}</p>
              </div>
              <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] uppercase tracking-wider font-bold rounded-full border border-emerald-200">
                {order.status}
              </span>
            </div>

            {/* Order items */}
            <div className="space-y-3 mb-5">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  {item.image && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#FAF8F5] border border-[#EFECE7] shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-xs font-medium text-[#121212] truncate">{item.name}</p>
                    <p className="text-[10px] text-[#6B6560]">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-sans text-xs font-bold text-[#121212]">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-[#EFECE7] pt-4 space-y-1.5">
              <div className="flex justify-between text-xs text-[#6B6560]">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#6B6560]">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? <span className="text-[#C5A880]">Complimentary</span> : formatPrice(order.shipping)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#121212] pt-1 border-t border-[#EFECE7] mt-1">
                <span>Total Paid</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>

            {/* Shipping address */}
            <div className="mt-5 pt-4 border-t border-[#EFECE7]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#C5A880] font-medium mb-1">Delivering To</p>
                  <p className="text-xs text-[#6B6560] font-sans">
                    <span className="font-bold text-[#121212]">{order.customerName}</span><br />
                    {order.shippingAddress}, {order.city}, {order.state} – {order.pincode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Fallback when order number not found or not provided */
          <div className="bg-white border border-[#EFECE7] rounded-2xl p-6 mb-8 flex items-center gap-3 shadow-sm">
            <Package className="w-6 h-6 text-[#C5A880] shrink-0" />
            <p className="text-sm font-sans text-[#6B6560] font-light">
              {orderNumber
                ? `Order ${orderNumber} placed. Check your email or WhatsApp for confirmation.`
                : "Your order has been placed. Check your email for confirmation."}
            </p>
          </div>
        )}

        {/* WhatsApp note */}
        <div className="bg-[#121212] rounded-2xl p-4 mb-8 text-left">
          <p className="text-[10px] uppercase tracking-widest text-[#C5A880] font-medium mb-1.5">📦 What Happens Next?</p>
          <p className="text-xs text-white/70 font-sans font-light leading-relaxed">
            Your jewellery is being hand-packed in our signature silk tissue and wax-sealed box. You will receive a shipping update on WhatsApp within 24 hours. For queries, message us on{" "}
            <a
              href="https://wa.me/917013004127"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C5A880] underline hover:text-white transition-colors"
            >
              +91 70130 04127
            </a>.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#121212] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C5A880] transition-all duration-500"
          >
            Continue Shopping <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#121212] text-[#121212] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#121212] hover:text-white transition-all duration-500"
          >
            <Home className="w-3.5 h-3.5" /> Return Home
          </Link>
        </div>

      </div>
    </div>
  );
}
