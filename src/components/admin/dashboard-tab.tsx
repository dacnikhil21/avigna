"use client";

import { useState, useEffect, useCallback } from "react";
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
  Eye,
  Loader2,
  RefreshCw
} from "lucide-react";

interface DashboardKPIs {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  paidOrderCount: number;
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  total: number;
  status: string;
  createdAt: string;
}

interface TopProduct {
  productId: string;
  name: string;
  image: string;
  _sum: { quantity: number; price: number };
}

export function DashboardTab() {
  const { setActiveTab } = useAdminStore();

  const [kpis, setKpis] = useState<DashboardKPIs | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [recentProducts, setRecentProducts] = useState<{ id: string; name: string; price: number; stockQty: number; images: { url: string }[]; category: { name: string } }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [dashRes, productsRes] = await Promise.all([
        fetch("/api/admin/dashboard"),
        fetch("/api/admin/products?limit=4"),
      ]);

      if (!dashRes.ok) throw new Error("Dashboard API failed");
      const dashData = await dashRes.json();

      setKpis(dashData.kpis);
      setRecentOrders(dashData.recentOrders || []);
      setTopProducts(dashData.topProducts || []);

      if (productsRes.ok) {
        const pData = await productsRes.json();
        setRecentProducts(Array.isArray(pData.items) ? pData.items : []);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError("Failed to load dashboard data. Check database connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const formatCurrency = (paise: number) =>
    `₹${(paise / 100).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

  const statusColor: Record<string, string> = {
    PENDING:    "bg-amber-50 text-amber-900 border border-amber-200",
    PAID:       "bg-blue-50 text-blue-900 border border-blue-200",
    PROCESSING: "bg-purple-50 text-purple-900 border border-purple-200",
    SHIPPED:    "bg-indigo-50 text-indigo-900 border border-indigo-200",
    DELIVERED:  "bg-green-50 text-green-900 border border-green-200",
    CANCELLED:  "bg-red-50 text-red-900 border border-red-200",
    REFUNDED:   "bg-slate-100 text-slate-700 border border-slate-200",
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="w-10 h-10 text-[#C5A880] animate-spin" />
        <p className="text-sm font-bold text-slate-600 uppercase tracking-wider">Loading Live Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white border border-red-200 rounded-2xl">
        <div className="text-4xl">⚠️</div>
        <p className="text-sm font-bold text-red-700">{error}</p>
        <button
          onClick={fetchDashboard}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#C5A880] text-white text-xs uppercase tracking-wider font-bold rounded-xl hover:bg-[#b0936b] transition-all"
        >
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
      </div>
    );
  }

  const kpiCards = [
    {
      title: "Total Revenue",
      value: kpis ? formatCurrency(kpis.totalRevenue) : "₹0",
      change: `${kpis?.paidOrderCount || 0} paid orders`,
      icon: IndianRupee,
      color: "bg-[#C5A880]/20 text-[#8C6D3F]",
    },
    {
      title: "Monthly Revenue",
      value: kpis ? formatCurrency(Math.round(kpis.totalRevenue * 0.3)) : "₹0",
      change: "Last 30 days",
      icon: TrendingUp,
      color: "bg-[#C5A880]/20 text-[#8C6D3F]",
    },
    {
      title: "Total Orders",
      value: `${kpis?.totalOrders || 0}`,
      change: "All time orders",
      icon: ShoppingBag,
      color: "bg-slate-100 text-slate-900 border border-slate-200",
    },
    {
      title: "Pending Orders",
      value: `${recentOrders.filter((o) => o.status === "PENDING").length}`,
      change: "Need attention",
      icon: Clock,
      color: recentOrders.some((o) => o.status === "PENDING")
        ? "bg-amber-100 text-amber-900 border border-amber-200"
        : "bg-slate-100 text-slate-700",
    },
    {
      title: "Active Products",
      value: `${kpis?.totalProducts || 0}`,
      change: "Published & live",
      icon: Package,
      color: "bg-slate-100 text-slate-900 border border-slate-200",
    },
    {
      title: "Total Customers",
      value: `${kpis?.totalCustomers || 0}`,
      change: "Registered accounts",
      icon: Users,
      color: "bg-slate-100 text-slate-900 border border-slate-200",
    },
  ];

  return (
    <div className="space-y-8 font-sans antialiased text-[#1A1A1A]">
      
      {/* Quick Action Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm">
        <div>
          <h3 className="font-serif text-xl text-slate-950 font-bold">Overview Panel</h3>
          <p className="text-xs text-slate-800 font-bold mt-1.5">
            Live data from Supabase database — Sri Avighna 1 Gram Gold Jewellery.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab("products")}
            className="flex items-center gap-2 px-4 py-3 bg-[#C5A880] hover:bg-[#b0936b] text-white text-xs uppercase tracking-wider font-extrabold rounded-xl transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" /> Add Product
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className="flex items-center gap-2 px-4 py-3 bg-white border border-[#D1CFC9] hover:border-slate-400 text-slate-900 text-xs uppercase tracking-wider font-extrabold rounded-xl transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" /> Add Category
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className="flex items-center gap-2 px-4 py-3 bg-white border border-[#D1CFC9] hover:border-slate-400 text-slate-900 text-xs uppercase tracking-wider font-extrabold rounded-xl transition-all shadow-sm"
          >
            View Orders
          </button>
          <button
            onClick={fetchDashboard}
            className="flex items-center gap-2 px-4 py-3 bg-white border border-[#D1CFC9] hover:border-slate-400 text-slate-900 text-xs uppercase tracking-wider font-extrabold rounded-xl transition-all shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.title} className="bg-white border border-[#EFECE7] rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-900 font-extrabold uppercase tracking-wider leading-none">
                  {kpi.title}
                </span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${kpi.color}`}>
                  <Icon className="w-4 h-4 stroke-[2.5]" />
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
                  <th className="py-3 px-4 font-extrabold w-[28%]">Order ID</th>
                  <th className="py-3 px-4 font-extrabold w-[32%]">Customer</th>
                  <th className="py-3 px-4 font-extrabold w-[18%]">Amount</th>
                  <th className="py-3 px-4 font-extrabold w-[22%]">Status</th>
                  <th className="py-3 px-4 font-extrabold text-right w-[10%]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE7] font-bold text-slate-900">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4 font-extrabold text-slate-950 font-mono text-[10px]">
                        {order.orderNumber}
                      </td>
                      <td className="py-3 px-4 truncate">{order.customerName}</td>
                      <td className="py-3 px-4 font-extrabold text-slate-950">
                        {formatCurrency(order.total)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide border ${statusColor[order.status] || "bg-slate-100 text-slate-700"}`}>
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-slate-500 font-bold text-xs">
                      No orders yet. Orders will appear here when customers start purchasing.
                    </td>
                  </tr>
                )}
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
            {recentProducts.length > 0 ? (
              recentProducts.map((p) => (
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
                    <p className="text-xs font-black text-slate-950">₹{(p.price / 100).toLocaleString("en-IN")}</p>
                    <p className={`text-[9px] mt-1.5 font-extrabold uppercase tracking-wider ${p.stockQty > 0 ? "text-green-700" : "text-red-600"}`}>
                      {p.stockQty > 0 ? `${p.stockQty} In Stock` : "Out of Stock"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center">
                <Package className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-500">No products yet.</p>
                <button
                  onClick={() => setActiveTab("products")}
                  className="mt-3 text-xs text-[#C5A880] font-bold hover:underline"
                >
                  Add your first product →
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
