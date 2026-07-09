"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  User,
  Mail,
  Phone,
  ShoppingBag,
  Loader2,
  RefreshCw,
  IndianRupee
} from "lucide-react";

interface CustomerRow {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  city: string | null;
  state: string | null;
  orderCount: number;
  totalPurchase: number;
  createdAt: string;
}

export function CustomersTab() {
  const [customers, setCustomers] = useState<CustomerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [total, setTotal] = useState(0);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ limit: "250" });
      if (searchTerm.trim()) params.set("search", searchTerm.trim());

      const res = await fetch(`/api/admin/customers?${params}`);
      if (!res.ok) throw new Error("Failed to fetch customers");

      const data = await res.json();
      setCustomers(Array.isArray(data.items) ? data.items : []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error(err);
      setError("Could not load customers. Check database connection.");
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => fetchCustomers(), searchTerm ? 400 : 0);
    return () => clearTimeout(timer);
  }, [fetchCustomers, searchTerm]);

  const formatCurrency = (paise: number) =>
    `₹${(paise / 100).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

  return (
    <div className="space-y-6 font-sans antialiased text-[#1A1A1A]">
      
      {/* Control Banner */}
      <div className="sticky top-0 z-20 bg-[#FAF8F5]/95 backdrop-blur-md pb-4 pt-1 border-b border-[#EFECE7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 stroke-[2]" />
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            className="w-full bg-white border border-[#D1CFC9] text-slate-800 hover:border-slate-400 focus:border-[#C5A880] text-xs pl-10 pr-4 py-3 rounded-xl outline-none transition-all placeholder-slate-500 font-medium shadow-inner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3">
          {/* Summary tag */}
          <div className="text-xs text-slate-900 font-bold uppercase tracking-wider bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl">
            Total: <strong className="text-[#1A1A1A] font-extrabold">{total} Customers</strong>
          </div>
          
          {/* Refresh */}
          <button
            onClick={fetchCustomers}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#D1CFC9] hover:border-slate-400 text-slate-900 text-xs uppercase tracking-wider font-bold rounded-xl transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="w-8 h-8 text-[#C5A880] animate-spin" />
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Loading Customers...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-16 gap-4 bg-red-50 border border-red-200 rounded-2xl">
          <p className="text-sm font-bold text-red-700">{error}</p>
          <button
            onClick={fetchCustomers}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#C5A880] text-white text-xs uppercase tracking-wider font-bold rounded-xl hover:bg-[#b0936b] transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      )}

      {/* Customers Table */}
      {!loading && !error && (
        <div className="bg-white border border-[#EFECE7] rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto max-h-[68vh] overflow-y-auto relative">
            <table className="w-full text-left border-collapse text-xs table-fixed">
              <thead className="sticky top-0 z-10 bg-slate-100/95 backdrop-blur-sm border-b border-[#EFECE7] shadow-sm select-none">
                <tr className="text-slate-900 uppercase tracking-wider text-[10px] font-bold">
                  <th className="py-3.5 px-6 w-[28%] font-bold">Customer Name</th>
                  <th className="py-3.5 px-4 w-[25%] font-bold">Email Address</th>
                  <th className="py-3.5 px-4 w-[18%] font-bold">Phone Number</th>
                  <th className="py-3.5 px-4 w-[14%] font-bold">Location</th>
                  <th className="py-3.5 px-4 w-[10%] font-bold text-center">Orders</th>
                  <th className="py-3.5 px-6 w-[15%] font-bold text-right">Total Spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE7] font-medium text-slate-700">
                {customers.length > 0 ? (
                  customers.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                      
                      {/* Name & Initial Icon */}
                      <td className="py-3 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#C5A880]/10 flex items-center justify-center shrink-0 border border-[#C5A880]/20">
                            <span className="text-xs font-black text-[#C5A880]">
                              {c.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="font-serif text-sm font-bold text-slate-950 tracking-wide">
                            {c.name}
                          </span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-3 px-4 text-xs font-bold text-slate-900">
                        {c.email ? (
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span className="truncate">{c.email}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">Not provided</span>
                        )}
                      </td>

                      {/* Phone */}
                      <td className="py-3 px-4 font-mono text-xs font-bold text-slate-900">
                        {c.phone ? (
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>{c.phone}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">—</span>
                        )}
                      </td>

                      {/* Location */}
                      <td className="py-3 px-4 text-xs font-bold text-slate-700">
                        {c.city || c.state
                          ? `${c.city || ""}${c.city && c.state ? ", " : ""}${c.state || ""}`
                          : <span className="text-slate-400 italic">—</span>
                        }
                      </td>

                      {/* Orders */}
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-900 border border-slate-200 text-[10px] font-bold">
                          <ShoppingBag className="w-3 h-3 text-slate-500" />
                          <span>{c.orderCount}</span>
                        </div>
                      </td>

                      {/* Total Purchase */}
                      <td className="py-3 px-6 text-right font-bold text-slate-950 text-sm">
                        <div className="flex items-center justify-end gap-1">
                          <IndianRupee className="w-3 h-3 text-slate-500" />
                          <span>{(c.totalPurchase / 100).toLocaleString("en-IN")}</span>
                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-16 text-center">
                      <User className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                      <p className="text-slate-700 font-bold text-sm">No customers found.</p>
                      <p className="text-slate-500 text-xs mt-1">Customers will appear here after placing orders.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
