import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Package, ArrowRight, Clock } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/");

  const orders = await prisma.order.findMany({
    where: { customerId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div>
      <h2 className="text-xl font-serif mb-6">Order History</h2>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <Package className="w-8 h-8 mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No orders yet</h3>
          <p className="text-sm text-gray-500 mb-4">When you place an order, it will appear here.</p>
          <Link href="/shop" className="inline-block bg-luxury-gold text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-luxury-gold-dark transition-colors">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
              <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <p className="text-gray-500 mb-0.5">Order Placed</p>
                    <p className="font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-0.5">Total Amount</p>
                    <p className="font-medium text-gray-900">{formatPrice(order.total)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-0.5">Order Number</p>
                    <p className="font-medium text-gray-900">#{order.orderNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                    order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status}
                  </span>
                  <Link href={`/account/orders/${order.id}`} className="text-sm text-luxury-gold font-medium hover:underline">
                    View Details
                  </Link>
                </div>
              </div>
              
              <div className="p-4 md:p-6 divide-y divide-gray-100">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0 relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-luxury-black text-sm truncate mb-1">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium mt-1">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
