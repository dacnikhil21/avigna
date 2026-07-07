"use client";

import { useState } from "react";
import { useAdminStore } from "@/lib/store/admin-store";
import { Search, User, Mail, Phone, ShoppingBag } from "lucide-react";

export function CustomersTab() {
  const { customers } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = customers.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
    );
  });

  return (
    <div className="space-y-6 font-sans antialiased text-[#1A1A1A]">
      
      {/* Control Banner */}
      <div className="sticky top-0 z-20 bg-[#FAF8F5]/95 backdrop-blur-md pb-4 pt-1 border-b border-[#EFECE7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 stroke-[2]" />
          <input
            type="text"
            placeholder="Search customers by name/email/phone..."
            className="w-full bg-white border border-[#D1CFC9] text-slate-800 hover:border-slate-400 focus:border-[#C5A880] text-xs pl-10 pr-4 py-3 rounded-xl outline-none transition-all placeholder-slate-500 font-medium shadow-inner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Summary tag */}
        <div className="text-xs text-slate-900 font-bold uppercase tracking-wider bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl">
          Total Registered: <strong className="text-[#1A1A1A] font-extrabold">{filtered.length} Accounts</strong>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white border border-[#EFECE7] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto max-h-[68vh] overflow-y-auto relative">
          <table className="w-full text-left border-collapse text-xs table-fixed">
            <thead className="sticky top-0 z-10 bg-slate-100/95 backdrop-blur-sm border-b border-[#EFECE7] shadow-sm select-none">
              <tr className="text-slate-900 uppercase tracking-wider text-[10px] font-bold">
                <th className="py-3.5 px-6 w-[32%] font-bold">Customer Name</th>
                <th className="py-3.5 px-4 w-[28%] font-bold">Email Address</th>
                <th className="py-3.5 px-4 w-[22%] font-bold">Phone Number</th>
                <th className="py-3.5 px-4 w-[18%] font-bold text-center">Orders Count</th>
                <th className="py-3.5 px-6 w-[20%] font-bold text-right">Total Purchase</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE7] font-medium text-slate-700">
              {filtered.length > 0 ? (
                filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Name & Initial Icon */}
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#C5A880]/10 flex items-center justify-center shrink-0 border border-[#C5A880]/20">
                          <User className="w-4.5 h-4.5 text-[#C5A880]" />
                        </div>
                        <span className="font-serif text-sm font-bold text-slate-950 tracking-wide">
                          {c.name}
                        </span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-3 px-4 text-xs font-bold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{c.email}</span>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="py-3 px-4 font-mono text-xs font-bold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{c.phone}</span>
                      </div>
                    </td>

                    {/* Orders */}
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-900 border border-slate-200 text-[10px] font-bold">
                        <ShoppingBag className="w-3 h-3 text-slate-500" />
                        <span>{c.orders}</span>
                      </div>
                    </td>

                    {/* Total Purchase */}
                    <td className="py-3 px-6 text-right font-bold text-slate-950 text-sm">
                      ₹{c.totalPurchase.toLocaleString("en-IN")}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-700 font-bold">
                    No customers found matching search filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
