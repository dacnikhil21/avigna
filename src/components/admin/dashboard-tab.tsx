"use client";

import { useAdminStore } from "@/lib/store/admin-store";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  Clock,
  IndianRupee,
  Plus,
  ArrowUpRight,
  Eye
} from "lucide-react";

export function DashboardTab() {
  const { products, orders, customers, setActiveTab } = useAdminStore();

  // Compute metrics dynamically
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const recentOrders = orders.slice(0, 4);
  const recentProducts = products.slice(0, 4);

  // Dynamic calculations
  const totalRevenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.amount, 0);

  const kpis = [
    {
      title: "Today's Revenue",
      value: `₹${(totalRevenue * 0.15).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
      change: "+12.5% from yesterday",
      isPositive: true,
      icon: IndianRupee,
      color: "bg-[#C5A880]/20 text-[#8C6D3F]"
    },
    {
      title: "Monthly Revenue",
      value: `₹${(124000 + totalRevenue).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
      change: "+8.2% from last month",
      isPositive: true,
      icon: TrendingUp,
      color: "bg-[#C5A880]/20 text-[#8C6D3F]"
    },
    {
      title: "Total Orders",
      value: `${128 + orders.length}`,
      change: "+4.3% from last week",
      isPositive: true,
      icon: ShoppingBag,
      color: "bg-slate-100 text-slate-900 border border-slate-200"
    },
    {
      title: "Pending Orders",
      value: `${pendingOrders}`,
      change: "Needs immediate action",
      isPositive: false,
      icon: Clock,
      color: pendingOrders > 0 ? "bg-amber-100 text-amber-900 border border-amber-200" : "bg-slate-100 text-slate-700"
    },
    {
      title: "Active Products",
      value: `${products.length}`,
      change: "100% published status",
      isPositive: true,
      icon: Package,
      color: "bg-slate-100 text-slate-900 border border-slate-200"
    },
    {
      title: "Total Customers",
      value: `${840 + customers.length}`,
      change: "+15 new registration",
      isPositive: true,
      icon: Users,
      color: "bg-slate-100 text-slate-900 border border-slate-200"
    }
  ];

  return (
    <div className="space-y-8 font-sans antialiased text-[#1A1A1A]">
      
      {/* Quick Action Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm">
        <div>
          <h3 className="font-serif text-xl text-slate-950 font-bold">Overview Panel</h3>
          <p className="text-xs text-slate-800 font-bold mt-1.5">
            Quick summary of Sri Avighna 1 Gram Gold Jewellery business performance.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab("products")}
            className="flex items-center gap-2 px-4.5 py-3 bg-[#C5A880] hover:bg-[#b0936b] text-white text-xs uppercase tracking-wider font-extrabold rounded-xl transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Add Product
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className="flex items-center gap-2 px-4.5 py-3 bg-white border border-[#D1CFC9] hover:border-slate-400 text-slate-900 text-xs uppercase tracking-wider font-extrabold rounded-xl transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Add Category
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className="flex items-center gap-2 px-4.5 py-3 bg-white border border-[#D1CFC9] hover:border-slate-400 text-slate-900 text-xs uppercase tracking-wider font-extrabold rounded-xl transition-all shadow-sm"
          >
            View Orders
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.title} className="bg-white border border-[#EFECE7] rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-900 font-extrabold uppercase tracking-wider leading-none">
                  {kpi.title}
                </span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${kpi.color}`}>
                  <Icon className="w-4.5 h-4.5 stroke-[2.5]" />
                </div>
              </div>
              <div>
                <h4 className="font-sans text-3xl font-black text-slate-950 tracking-tight leading-none">
                  {kpi.value}
                </h4>
                <p className="text-[11px] text-slate-800 font-extrabold mt-2 leading-none">
                  {kpi.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Lists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Orders - Col Span 8 */}
        <div className="bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm lg:col-span-8 space-y-5">
          <div className="flex items-center justify-between border-b border-[#EFECE7] pb-3.5">
            <h3 className="font-serif text-lg text-slate-950 font-bold">Recent Orders</h3>
            <button
              onClick={() => setActiveTab("orders")}
              className="text-xs text-[#C5A880] hover:text-[#b0936b] flex items-center gap-1 transition-colors font-extrabold uppercase tracking-wider"
            >
              All Orders
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          <div className="overflow-x-auto border border-[#EFECE7] rounded-xl">
            <table className="w-full text-left border-collapse text-xs table-fixed">
              <thead>
                <tr className="bg-slate-100 text-slate-950 uppercase tracking-wider text-[10px] border-b border-[#EFECE7]">
                  <th className="py-3 px-4 font-extrabold w-[25%]">Order ID</th>
                  <th className="py-3 px-4 font-extrabold w-[35%]">Customer</th>
                  <th className="py-3 px-4 font-extrabold w-[20%]">Amount</th>
                  <th className="py-3 px-4 font-extrabold w-[20%]">Status</th>
                  <th className="py-3 px-4 font-extrabold text-right w-[15%]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE7] font-bold text-slate-900">
                {recentOrders.map((order) => {
                  const statusColors = {
                    Pending: "bg-amber-50 text-amber-900 border border-amber-200",
                    Accepted: "bg-blue-50 text-blue-900 border border-blue-200",
                    Processing: "bg-purple-50 text-purple-900 border border-purple-200",
                    Delivered: "bg-green-50 text-green-900 border border-green-200",
                    Cancelled: "bg-red-50 text-red-900 border border-red-200",
                  };

                  return (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4 font-extrabold text-slate-950 font-mono">{order.id}</td>
                      <td className="py-3 px-4 truncate">{order.customer}</td>
                      <td className="py-3 px-4 font-extrabold text-slate-950">₹{order.amount.toLocaleString("en-IN")}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide border ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setActiveTab("orders")}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-700 hover:text-slate-950 border border-transparent hover:border-slate-200"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Products - Col Span 4 */}
        <div className="bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm lg:col-span-4 space-y-5">
          <div className="flex items-center justify-between border-b border-[#EFECE7] pb-3.5">
            <h3 className="font-serif text-lg text-slate-950 font-bold">New Products</h3>
            <button
              onClick={() => setActiveTab("products")}
              className="text-xs text-[#C5A880] hover:text-[#b0936b] flex items-center gap-1 transition-colors font-extrabold uppercase tracking-wider"
            >
              All Products
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          <div className="space-y-4">
            {recentProducts.map((p) => (
              <div key={p.id} className="flex items-center gap-3.5 p-2.5 hover:bg-slate-50 rounded-xl transition-all duration-200 border border-transparent hover:border-[#EFECE7]">
                <div className="w-11 h-11 rounded-lg overflow-hidden border border-slate-200 shrink-0 relative bg-slate-50 flex items-center justify-center">
                  {p.images[0] ? (
                    <img
                      src={p.images[0].url}
                      alt={p.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Package className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="text-xs font-bold text-slate-950 truncate leading-snug">{p.name}</h4>
                  <p className="text-[10px] text-slate-800 font-extrabold mt-1.5 uppercase tracking-wider bg-slate-100 px-1.5 py-0.5 rounded inline-block">
                    {p.category.name}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-black text-slate-950">₹{p.price.toLocaleString("en-IN")}</p>
                  <p className={`text-[9px] mt-1.5 font-extrabold uppercase tracking-wider ${p.stockQty > 0 ? "text-green-700" : "text-red-600"}`}>
                    {p.stockQty > 0 ? `${p.stockQty} In Stock` : "Out of Stock"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
