import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Circle, Truck, Package } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const TIMELINE_STEPS = ["PAID", "PROCESSING", "SHIPPED", "DELIVERED"];

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect("/");

  const order = await prisma.order.findUnique({
    where: { 
      id: id,
      customerId: session.user.id,
    },
    include: { items: true },
  });

  if (!order) redirect("/account/orders");

  const currentStepIndex = TIMELINE_STEPS.indexOf(order.status);
  const isCancelled = order.status === "CANCELLED";

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/account/orders" className="inline-flex items-center gap-2 text-sm text-luxury-muted hover:text-luxury-black mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Orders
      </Link>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-serif mb-1">Order #{order.orderNumber}</h1>
          <p className="text-sm text-gray-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <span className={`px-4 py-1 text-xs font-semibold uppercase tracking-wider rounded-full border ${
          order.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
          isCancelled ? 'bg-red-50 text-red-700 border-red-200' :
          order.status === 'SHIPPED' ? 'bg-indigo-50 text-indigo-800 border-indigo-200' :
          'bg-[#C5A880]/15 text-[#8B6B38] border-[#C5A880]/30'
        }`}>
          {order.status === 'DELIVERED' ? 'Delivered' : isCancelled ? 'Cancelled' : order.status === 'SHIPPED' ? 'Out for Delivery' : 'Confirmed & Processing'}
        </span>
      </div>

      {/* Timeline */}
      {!isCancelled && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-10 mb-8">
          <h3 className="font-medium text-lg mb-8">Order Status</h3>
          <div className="relative flex justify-between items-center w-full">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 z-0 rounded-full" />
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-luxury-gold z-0 rounded-full transition-all" 
              style={{ width: `${(Math.max(0, currentStepIndex) / (TIMELINE_STEPS.length - 1)) * 100}%` }}
            />
            
            {TIMELINE_STEPS.map((step, idx) => {
              const isCompleted = currentStepIndex >= idx;
              
              return (
                <div key={step} className="relative z-10 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white border-2 transition-colors ${
                    isCompleted ? "border-luxury-gold text-luxury-gold" : "border-gray-200 text-gray-300"
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-3 h-3" />}
                  </div>
                  <span className={`absolute top-10 text-[10px] md:text-xs font-medium uppercase tracking-wider ${
                    isCompleted ? "text-luxury-black" : "text-gray-400"
                  }`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Left Col: Items */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <h3 className="font-medium">Items in this order</h3>
            </div>
            <div className="p-4 md:p-6 divide-y divide-gray-100">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0 relative">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-luxury-black text-sm truncate mb-1">{item.name}</h4>
                    <p className="text-sm text-gray-500 mb-1">Qty: {item.quantity}</p>
                    <p className="text-sm font-medium">{formatPrice(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Details */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-medium mb-4">Payment Summary</h3>
            <div className="space-y-3 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
            </div>
            <div className="pt-4 border-t border-gray-100 flex justify-between font-medium">
              <span>Grand Total</span>
              <span className="text-luxury-gold">{formatPrice(order.total)}</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-medium mb-4">Shipping Address</h3>
            <p className="text-sm text-gray-900 font-medium mb-1">{order.customerName}</p>
            <p className="text-sm text-gray-600">{order.customerPhone}</p>
            <p className="text-sm text-gray-600 mt-2">{order.shippingAddress}</p>
            <p className="text-sm text-gray-600">{order.city}, {order.state} {order.pincode}</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-medium mb-4">Payment Method</h3>
            <p className="text-sm text-gray-600">Razorpay Secure Payment</p>
            {order.razorpayPaymentId && (
              <p className="text-xs text-gray-400 mt-1 break-all">ID: {order.razorpayPaymentId}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
