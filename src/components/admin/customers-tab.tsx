"use client";

import { useState } from "react";
import { useAdminStore } from "@/lib/store/admin-store";
import { Search, User, Mail, Phone, ShoppingBag, ArrowDownAz } from "lucide-react";

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
    <div className="space-y-6 font-sans">
      
      {/* Control Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 font-light" />
          <input
            type="text"
            placeholder="Search customers by name/email/phone..."
            className="w-full bg-white border border-[#EFECE7] hover:border-gray-300 focus:border-[#C5A880] text-xs pl-10 pr-4 py-2.5 rounded-xl outline-none transition-all duration-300 placeholder-gray-400 font-light"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Summary tag */}
        <div className="text-xs text-luxury-muted font-light uppercase tracking-wider">
          Total: <strong className="text-[#121212]">{filtered.length} Accounts</strong>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white border border-[#EFECE7] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] text-luxury-muted uppercase tracking-wider text-[10px] border-b border-[#EFECE7]">
                <th className="py-4 px-6 font-medium">Customer Details</th>
                <th className="py-4 px-4 font-medium">Email</th>
                <th className="py-4 px-4 font-medium">Phone Number</th>
                <th className="py-4 px-4 font-medium text-center">Orders Count</th>
                <th className="py-4 px-6 font-medium text-right">Total Purchase</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE7] font-light text-slate-600">
              {filtered.length > 0 ? (
                filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                    
                    {/* Name & Initial Icon */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#C5A880]/10 flex items-center justify-center shrink-0 border border-[#C5A880]/20">
                          <User className="w-4 h-4 text-[#C5A880]" />
                        </div>
                        <span className="font-serif text-sm font-normal text-[#121212] tracking-wide">
                          {c.name}
                        </span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-4 px-4 font-sans text-xs">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{c.email}</span>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="py-4 px-4 font-sans text-xs">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{c.phone}</span>
                      </div>
                    </td>

                    {/* Orders */}
                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gray-50 text-gray-700 border border-gray-200/50 text-[10px] font-medium">
                        <ShoppingBag className="w-3 h-3 text-gray-400" />
                        <span>{c.orders}</span>
                      </div>
                    </td>

                    {/* Total Purchase */}
                    <td className="py-4 px-6 text-right font-semibold text-[#121212] text-sm">
                      ₹{c.totalPurchase.toLocaleString("en-IN")}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-luxury-muted font-light">
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
