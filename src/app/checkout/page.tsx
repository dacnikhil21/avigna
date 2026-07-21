"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Shield, Lock, MapPin } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FadeIn } from "@/components/shared/motion";
import { useSession } from "next-auth/react";

import { Input } from "@/components/ui/input";

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
  const [shippingForm, setShippingForm] = useState<{name: string, email: string, phone: string, address: string, city: string, state: string, pincode: string} | null>(null);
  const [addressLoading, setAddressLoading] = useState(true);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [saveAddressLoading, setSaveAddressLoading] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: "",
    mobile: "",
    houseFlat: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleSaveInlineAddress = async () => {
    if (!newAddr.fullName || !newAddr.mobile || !newAddr.houseFlat || !newAddr.street || !newAddr.city || !newAddr.state || !newAddr.pincode) {
      setErrorMsg("Please fill in all required address fields.");
      setTimeout(() => setErrorMsg(null), 4000);
      return;
    }
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
          isDefault: true,
        }),
      });

      if (res.ok) {
        const fullAddr = `${newAddr.houseFlat}, ${newAddr.street}`;
        const createdForm = {
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

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/checkout");
    } else if (status === "authenticated") {
      // Fetch default address
      fetch("/api/account/addresses")
        .then(res => res.json())
        .then(data => {
          const defaultAddr = data.addresses?.find((a: { isDefault: boolean }) => a.isDefault) || data.addresses?.[0];
          if (defaultAddr) {
            setShippingForm({
              name: defaultAddr.fullName,
              email: session.user?.email || "",
              phone: defaultAddr.mobile,
              address: `${defaultAddr.houseFlat}, ${defaultAddr.street}${defaultAddr.area ? `, ${defaultAddr.area}` : ''}`,
              city: defaultAddr.city,
              state: defaultAddr.state,
              pincode: defaultAddr.pincode,
            });
          }
          setAddressLoading(false);
        })
        .catch(() => setAddressLoading(false));
    }
  }, [status, router, session]);

  const total = subtotal();
  const shipping = 0; // Free delivery on all orders per store policy
  const grandTotal = total + shipping;

  if (status === "loading" || addressLoading) {
    return (
      <div className="section-padding pt-32 pb-20 min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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
    if (!shippingForm) {
      setErrorMsg("Please add a shipping address before proceeding to payment.");
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
          theme: { color: "#C9A962" },
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

  const handleDetectLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser.");
      setTimeout(() => setErrorMsg(null), 4000);
      return;
    }
    setSaveAddressLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await res.json();
          if (data && data.address) {
            const addr = data.address;
            setNewAddr((prev) => ({
              ...prev,
              city: addr.city || addr.town || addr.village || addr.county || prev.city,
              state: addr.state || prev.state,
              pincode: addr.postcode || prev.pincode,
              street: addr.suburb || addr.neighbourhood || addr.road || prev.street,
            }));
          }
        } catch (err) {
          console.error("Geocoding error:", err);
        } finally {
          setSaveAddressLoading(false);
        }
      },
      () => {
        setSaveAddressLoading(false);
        setErrorMsg("Unable to retrieve location. Please fill manually.");
        setTimeout(() => setErrorMsg(null), 4000);
      }
    );
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

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#121212] mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Form */}
        <FadeIn className="lg:col-span-3 space-y-8">
          <div className="bg-luxury-cream/30 rounded-3xl p-6 md:p-8 border border-gray-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#121212] mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-[#C5A880]" />
              Shipping Address
            </h2>
            {!shippingForm || isAddingAddress ? (
              <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-2">
                  <h3 className="font-bold text-base text-[#121212]">
                    Add Shipping Details
                  </h3>
                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    className="text-xs text-[#C5A880] hover:bg-[#C5A880]/20 flex items-center gap-1.5 font-semibold bg-[#C5A880]/10 px-3 py-1.5 rounded-full border border-[#C5A880]/30 transition-colors"
                  >
                    📍 Auto-Detect Location
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="new-name" className="text-xs font-semibold text-gray-700">Full Name *</Label>
                    <Input
                      id="new-name"
                      required
                      placeholder="e.g. Ananya Sharma"
                      value={newAddr.fullName}
                      onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                      className="mt-1 text-sm rounded-xl border-gray-200 focus:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-mobile" className="text-xs font-semibold text-gray-700">Mobile Number *</Label>
                    <Input
                      id="new-mobile"
                      required
                      placeholder="10-digit mobile number"
                      value={newAddr.mobile}
                      onChange={(e) => setNewAddr({ ...newAddr, mobile: e.target.value })}
                      className="mt-1 text-sm rounded-xl border-gray-200 focus:border-[#C5A880]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="new-flat" className="text-xs font-semibold text-gray-700">Flat / House No. / Building *</Label>
                    <Input
                      id="new-flat"
                      required
                      placeholder="e.g. Flat 402, Royal Residency"
                      value={newAddr.houseFlat}
                      onChange={(e) => setNewAddr({ ...newAddr, houseFlat: e.target.value })}
                      className="mt-1 text-sm rounded-xl border-gray-200 focus:border-[#C5A880]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="new-street" className="text-xs font-semibold text-gray-700">Street / Area / Landmark *</Label>
                    <Input
                      id="new-street"
                      required
                      placeholder="e.g. Jubilee Hills, Road No. 36"
                      value={newAddr.street}
                      onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                      className="mt-1 text-sm rounded-xl border-gray-200 focus:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-city" className="text-xs font-semibold text-gray-700">City *</Label>
                    <Input
                      id="new-city"
                      required
                      placeholder="e.g. Hyderabad"
                      value={newAddr.city}
                      onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                      className="mt-1 text-sm rounded-xl border-gray-200 focus:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-state" className="text-xs font-semibold text-gray-700">State *</Label>
                    <Input
                      id="new-state"
                      required
                      placeholder="e.g. Telangana"
                      value={newAddr.state}
                      onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                      className="mt-1 text-sm rounded-xl border-gray-200 focus:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-pincode" className="text-xs font-semibold text-gray-700">Pincode *</Label>
                    <Input
                      id="new-pincode"
                      required
                      placeholder="6-digit pincode"
                      value={newAddr.pincode}
                      onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                      className="mt-1 text-sm rounded-xl border-gray-200 focus:border-[#C5A880]"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="gold"
                    size="sm"
                    disabled={saveAddressLoading}
                    onClick={handleSaveInlineAddress}
                    className="text-xs rounded-xl"
                  >
                    {saveAddressLoading ? "Saving..." : "Save & Use Address"}
                  </Button>
                  {shippingForm && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsAddingAddress(false)}
                      className="text-xs rounded-xl"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg text-[#121212]">{shippingForm.name}</h3>
                  <button
                    type="button"
                    onClick={() => setIsAddingAddress(true)}
                    className="text-xs text-[#C5A880] hover:underline font-semibold bg-[#C5A880]/10 px-3 py-1 rounded-full"
                  >
                    + Add New / Change
                  </button>
                </div>
                <p className="text-gray-600 text-sm font-medium">{shippingForm.phone}</p>
                <p className="text-gray-500 text-sm">{shippingForm.email}</p>
                <p className="text-gray-700 text-sm mt-3 font-medium">{shippingForm.address}</p>
                <p className="text-gray-600 text-sm">{shippingForm.city}, {shippingForm.state} {shippingForm.pincode}</p>
              </div>
            )}
          </div>

          {/* Payment Method Card Block */}
          <div className="bg-luxury-cream/30 rounded-3xl p-6 md:p-8 border border-gray-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#121212] mb-6">Payment Method</h2>
            <div className="space-y-3">
              <label
                onClick={() => setPaymentMethod("online")}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === "online"
                    ? "border-[#C5A880] bg-white shadow-sm ring-1 ring-[#C5A880]"
                    : "border-gray-200 bg-white/50 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                  className="w-4 h-4 text-[#C5A880] focus:ring-[#C5A880]"
                />
                <div className="flex-1">
                  <p className="font-bold text-sm text-[#121212]">Online Payment (Razorpay)</p>
                  <p className="text-xs text-gray-500">Instant approval via UPI, Credit/Debit Card, or Netbanking</p>
                </div>
              </label>

              <label
                onClick={() => setPaymentMethod("cod")}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === "cod"
                    ? "border-[#C5A880] bg-white shadow-sm ring-1 ring-[#C5A880]"
                    : "border-gray-200 bg-white/50 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="w-4 h-4 text-[#C5A880] focus:ring-[#C5A880]"
                />
                <div className="flex-1">
                  <p className="font-bold text-sm text-[#121212]">Cash on Delivery (COD)</p>
                  <p className="text-xs text-gray-500">Pay cash upon delivery at your doorstep</p>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-luxury-cream/30 rounded-3xl p-6 md:p-8 border border-gray-100">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#121212] mb-4">Gifting Options</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="gift-note-toggle"
                  checked={isGift}
                  onChange={(e) => setGiftOptions(e.target.checked, e.target.checked ? giftMessage : "")}
                  className="mt-1 border-gray-300 text-[#C5A880] focus:ring-[#C5A880] rounded"
                />
                <label htmlFor="gift-note-toggle" className="text-sm font-serif font-medium text-[#121212] select-none cursor-pointer">
                  Add a complimentary handwritten gift card
                </label>
              </div>
              {isGift && (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="giftMessage" className="text-xs font-semibold">Your Calligraphy Message</Label>
                  <textarea
                    id="giftMessage"
                    placeholder="Write your personal message here..."
                    value={giftMessage}
                    onChange={(e) => setGiftOptions(isGift, e.target.value)}
                    rows={3}
                    className="w-full text-sm font-sans border border-[#EFECE7] p-3 focus:outline-none focus:border-[#C5A880] resize-none bg-white rounded-xl"
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
          <div className="bg-white rounded-3xl border border-gray-100 shadow-luxury p-6 md:p-8 sticky top-32">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#121212] mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-1">
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
                    <p className="text-sm font-medium text-[#121212] line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    <p className="text-sm font-bold text-[#121212] mt-0.5">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="mb-4" />

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">Subtotal</span>
                <span className="font-bold text-[#121212]">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">Delivery Charge</span>
                <span className="text-[#C5A880] font-semibold">Complimentary</span>
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between font-bold text-lg text-[#121212]">
                <span>Total Amount</span>
                <span className="text-[#C5A880]">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <Button
              type="submit"
              variant="gold"
              className="w-full py-4 text-base font-bold rounded-2xl shadow-lg"
              size="lg"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : paymentMethod === "cod"
                ? "Place Order"
                : `Pay ${formatPrice(grandTotal)}`}
            </Button>

            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-luxury-muted">
              <span className="flex items-center gap-1 font-medium">
                <Lock className="w-3.5 h-3.5" /> Secure Checkout
              </span>
              <span className="flex items-center gap-1 font-medium">
                <Shield className="w-3.5 h-3.5" /> 100% Encrypted
              </span>
            </div>
          </div>
        </FadeIn>
      </form>
      {/* Floating Error Toast */}
      {errorMsg && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg border text-xs uppercase tracking-wider font-semibold bg-red-600 text-white border-red-700 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {errorMsg}
        </div>
      )}
    </div>
  );
}
