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

  // Hardcoded baselines + dynamic calculation
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
      color: "bg-[#C5A880]/10 text-[#C5A880]"
    },
    {
      title: "Monthly Revenue",
      value: `₹${(124000 + totalRevenue).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
      change: "+8.2% from last month",
      isPositive: true,
      icon: TrendingUp,
      color: "bg-[#C5A880]/10 text-[#C5A880]"
    },
    {
      title: "Total Orders",
      value: `${128 + orders.length}`,
      change: "+4.3% from last week",
      isPositive: true,
      icon: ShoppingBag,
      color: "bg-gray-100 text-gray-800"
    },
    {
      title: "Pending Orders",
      value: `${pendingOrders}`,
      change: "Needs immediate action",
      isPositive: false,
      icon: Clock,
      color: pendingOrders > 0 ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-500"
    },
    {
      title: "Active Products",
      value: `${products.length}`,
      change: "100% published status",
      isPositive: true,
      icon: Package,
      color: "bg-gray-100 text-gray-800"
    },
    {
      title: "Total Customers",
      value: `${840 + customers.length}`,
      change: "+15 new registration",
      isPositive: true,
      icon: Users,
      color: "bg-gray-100 text-gray-800"
    }
  ];

  return (
    <div className="space-y-8 font-sans">
      
      {/* Quick Action Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm">
        <div>
          <h3 className="font-serif text-lg text-[#121212] font-light">Overview Panel</h3>
          <p className="text-xs text-luxury-muted mt-1">Quick summary of Sri Avighna 1 Gram Gold Jewellery business performance.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              setActiveTab("products");
              // Note: we can pass state, but standard tab switch is fine.
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#121212] hover:bg-[#C5A880] text-white text-xs uppercase tracking-wider font-medium rounded-xl transition-all duration-300 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Product
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#EFECE7] hover:border-gray-400 text-[#121212] text-xs uppercase tracking-wider font-medium rounded-xl transition-all duration-300"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Category
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#EFECE7] hover:border-gray-400 text-[#121212] text-xs uppercase tracking-wider font-medium rounded-xl transition-all duration-300"
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
            <div key={kpi.title} className="bg-white border border-[#EFECE7] rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-luxury-muted font-light">{kpi.title}</span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${kpi.color}`}>
                  <Icon className="w-4 h-4 stroke-[1.5]" />
                </div>
              </div>
              <div>
                <h4 className="font-serif text-2xl font-normal text-[#121212] tracking-wide">{kpi.value}</h4>
                <p className="text-[10px] text-luxury-muted font-light mt-1.5">{kpi.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Custom Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Revenue Line Chart - Stripe Style SVG */}
        <div className="bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif text-base text-[#121212] font-light">Revenue Trend</h3>
              <p className="text-[10px] text-luxury-muted font-light mt-0.5">Monthly overview of sales earnings</p>
            </div>
            <span className="text-xs font-medium text-[#C5A880] bg-[#C5A880]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Year 2026
            </span>
          </div>
          
          <div className="h-64 relative flex items-end">
            {/* SVG Line Chart */}
            <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C5A880" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#C5A880" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1="50" x2="500" y2="50" stroke="#F1EFEA" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="#F1EFEA" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="#F1EFEA" strokeWidth="1" strokeDasharray="4 4" />
              
              {/* Gradient Path under the line */}
              <path
                d="M 0,200 L 0,160 Q 80,120 100,130 T 200,90 T 300,80 T 400,60 T 500,40 L 500,200 Z"
                fill="url(#chartGradient)"
              />
              
              {/* Clean Line */}
              <path
                d="M 0,160 Q 80,120 100,130 T 200,90 T 300,80 T 400,60 T 500,40"
                fill="none"
                stroke="#C5A880"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              
              {/* Dots on points */}
              <circle cx="100" cy="130" r="4.5" fill="#C5A880" stroke="white" strokeWidth="1.5" />
              <circle cx="200" cy="90" r="4.5" fill="#C5A880" stroke="white" strokeWidth="1.5" />
              <circle cx="300" cy="80" r="4.5" fill="#C5A880" stroke="white" strokeWidth="1.5" />
              <circle cx="400" cy="60" r="4.5" fill="#C5A880" stroke="white" strokeWidth="1.5" />
              <circle cx="500" cy="40" r="4.5" fill="#C5A880" stroke="white" strokeWidth="1.5" />
            </svg>
            
            {/* Chart X Labels */}
            <div className="absolute bottom-0 w-full flex justify-between px-1 text-[9px] text-luxury-muted uppercase tracking-wider font-light transform translate-y-6">
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul (Current)</span>
            </div>
          </div>
        </div>

        {/* Orders Bar Chart - Stripe Style SVG */}
        <div className="bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif text-base text-[#121212] font-light">Order Volume</h3>
              <p className="text-[10px] text-luxury-muted font-light mt-0.5">Weekly volume of checkout transactions</p>
            </div>
            <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Last 4 Weeks
            </span>
          </div>

          <div className="h-64 relative flex items-end">
            {/* Bar Chart using grid columns and CSS bars */}
            <div className="w-full h-full flex justify-around items-end pt-10">
              {[
                { label: "Week 24", value: 38, height: "45%" },
                { label: "Week 25", value: 45, height: "55%" },
                { label: "Week 26", value: 58, height: "70%" },
                { label: "Week 27", value: 72, height: "88%" }
              ].map((bar) => (
                <div key={bar.label} className="flex flex-col items-center gap-3 w-1/5 group cursor-pointer">
                  <div className="text-[10px] font-medium text-[#121212] opacity-0 group-hover:opacity-100 transition-opacity bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md -translate-y-1">
                    {bar.value} orders
                  </div>
                  <div
                    style={{ height: bar.height }}
                    className="w-full bg-[#121212]/10 group-hover:bg-[#C5A880] rounded-t-lg transition-all duration-500 ease-out"
                  />
                  <span className="text-[9px] text-luxury-muted uppercase tracking-wider font-light">
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Recent Lists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        
        {/* Recent Orders - Col Span 8 */}
        <div className="bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm lg:col-span-8 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base text-[#121212] font-light">Recent Orders</h3>
            <button
              onClick={() => setActiveTab("orders")}
              className="text-xs text-[#C5A880] hover:text-[#121212] flex items-center gap-1.5 transition-colors font-light"
            >
              All Orders
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto border border-gray-100 rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF8F5] text-luxury-muted uppercase tracking-wider text-[10px] border-b border-gray-100">
                  <th className="py-3.5 px-4 font-medium">Order ID</th>
                  <th className="py-3.5 px-4 font-medium">Customer</th>
                  <th className="py-3.5 px-4 font-medium">Amount</th>
                  <th className="py-3.5 px-4 font-medium">Status</th>
                  <th className="py-3.5 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-light">
                {recentOrders.map((order) => {
                  const statusColors = {
                    Pending: "bg-amber-50 text-amber-700 border border-amber-200/50",
                    Accepted: "bg-blue-50 text-blue-700 border border-blue-200/50",
                    Processing: "bg-purple-50 text-purple-700 border border-purple-200/50",
                    Delivered: "bg-green-50 text-green-700 border border-green-200/50",
                    Cancelled: "bg-red-50 text-red-700 border border-red-200/50",
                  };

                  return (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-[#121212]">{order.id}</td>
                      <td className="py-3.5 px-4">{order.customer}</td>
                      <td className="py-3.5 px-4 font-medium text-[#121212]">₹{order.amount.toLocaleString("en-IN")}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-wide ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setActiveTab("orders")}
                          className="p-1 hover:bg-gray-100 rounded-md transition-colors text-gray-500 hover:text-[#121212]"
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
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base text-[#121212] font-light">New Products</h3>
            <button
              onClick={() => setActiveTab("products")}
              className="text-xs text-[#C5A880] hover:text-[#121212] flex items-center gap-1.5 transition-colors font-light"
            >
              All Products
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {recentProducts.map((p) => (
              <div key={p.id} className="flex items-center gap-3.5 p-2 hover:bg-gray-50 rounded-xl transition-all duration-300">
                <div className="w-11 h-11 rounded-lg overflow-hidden border border-gray-100 shrink-0 relative bg-gray-50">
                  {p.images[0] ? (
                    <img
                      src={p.images[0].url}
                      alt={p.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                      <Package className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="text-xs font-medium text-[#121212] truncate">{p.name}</h4>
                  <p className="text-[10px] text-luxury-muted mt-1 uppercase tracking-wider">{p.category.name}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-semibold text-[#121212]">₹{p.price.toLocaleString("en-IN")}</p>
                  <p className={`text-[9px] mt-1 font-medium ${p.stockQty > 0 ? "text-green-600" : "text-red-500"}`}>
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
