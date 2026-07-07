"use client";

import { useState } from "react";
import { useAdminStore } from "@/lib/store/admin-store";
import { FileDown, CheckCircle2, Loader2, ArrowUpRight, BarChart2, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReportsTab() {
  const { products, categories, orders } = useAdminStore();
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [downloadingExcel, setDownloadingExcel] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleExportPdf = () => {
    setDownloadingPdf(true);
    setTimeout(() => {
      setDownloadingPdf(false);
      triggerToast("PDF Report exported successfully! Check your downloads.");
    }, 1500);
  };

  const handleExportExcel = () => {
    setDownloadingExcel(true);
    setTimeout(() => {
      setDownloadingExcel(false);
      triggerToast("Excel Sheet exported successfully! Check your downloads.");
    }, 1500);
  };

  // Mock reporting tables
  const bestSellers = [
    { rank: 1, name: "Temple Kemp Jhumka Earrings", category: "Earrings", sold: 48, rev: 72000 },
    { rank: 2, name: "Antique Lakshmi Haram Set", category: "Necklaces", sold: 34, rev: 221000 },
    { rank: 3, name: "Kemp Vanki Bangle", category: "Bangles", sold: 29, rev: 34800 },
    { rank: 4, name: "Ruby Kemp Necklace Set", category: "Necklaces", sold: 22, rev: 110000 },
    { rank: 5, name: "Guttapusalu Pearl Choker", category: "Necklaces", sold: 18, rev: 57600 }
  ];

  const topCategories = [
    { rank: 1, name: "Necklaces", items: 25, sales: 74, rev: 388600 },
    { rank: 2, name: "Earrings", items: 18, sales: 52, rev: 104500 },
    { rank: 3, name: "Bangles", items: 12, sales: 34, rev: 64200 },
    { rank: 4, name: "Rings", items: 10, sales: 21, rev: 28400 }
  ];

  return (
    <div className="space-y-8 font-sans">
      
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg border bg-[#C5A880] text-white border-[#b8966f] text-xs uppercase tracking-wider font-medium transition-all duration-300">
          <CheckCircle2 className="w-4 h-4" />
          {toastMsg}
        </div>
      )}

      {/* Action Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm">
        <div>
          <h3 className="font-serif text-lg text-[#121212] font-light font-normal">Business Analytics &amp; Reports</h3>
          <p className="text-xs text-luxury-muted mt-1">Export transaction logs and category charts for offline auditing.</p>
        </div>
        
        {/* Export Buttons */}
        <div className="flex items-center gap-3">
          <Button
            onClick={handleExportPdf}
            disabled={downloadingPdf}
            className="bg-white border border-[#EFECE7] hover:border-gray-400 text-[#121212] text-xs uppercase tracking-wider font-medium py-2.5 px-4 rounded-xl transition-all flex items-center gap-2"
          >
            {downloadingPdf ? (
              <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
            ) : (
              <FileDown className="w-4 h-4 text-gray-400" />
            )}
            Export PDF
          </Button>

          <Button
            onClick={handleExportExcel}
            disabled={downloadingExcel}
            className="bg-[#121212] hover:bg-[#C5A880] text-white text-xs uppercase tracking-wider font-semibold py-2.5 px-4 rounded-xl transition-all flex items-center gap-2 shadow-sm"
          >
            {downloadingExcel ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <FileDown className="w-4 h-4 text-white/70" />
            )}
            Export Excel
          </Button>
        </div>
      </div>

      {/* Summary KPI Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Gross Sales Revenue", val: "₹5,85,900", sub: "Calculated from checkout logs", icon: BarChart2 },
          { label: "Total Completed Orders", val: "181 orders", sub: "98% delivery completion rate", icon: FileDown },
          { label: "Average Transaction Value", val: "₹3,237", sub: "Increased by 5% this month", icon: PieChart },
          { label: "Customer Acquisition Value", val: "₹450", sub: "Lower than South India average", icon: PieChart }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white border border-[#EFECE7] rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-luxury-muted font-light">{item.label}</span>
                <div className="w-8 h-8 rounded-xl bg-[#C5A880]/10 flex items-center justify-center text-[#C5A880]">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h4 className="font-serif text-xl font-normal text-[#121212] tracking-wide">{item.val}</h4>
                <p className="text-[10px] text-luxury-muted font-light mt-1">{item.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reports Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Best Selling Products */}
        <div className="bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base text-[#121212] font-light">Best Selling Products</h3>
            <span className="text-[10px] uppercase tracking-wider text-luxury-muted font-light">By Units Sold</span>
          </div>

          <div className="overflow-x-auto border border-gray-100 rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF8F5] text-luxury-muted uppercase tracking-wider text-[10px] border-b border-gray-100">
                  <th className="py-3.5 px-4 font-medium text-center w-12">Rank</th>
                  <th className="py-3.5 px-4 font-medium">Product</th>
                  <th className="py-3.5 px-4 font-medium text-center">Units Sold</th>
                  <th className="py-3.5 px-4 font-medium text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-light text-slate-600">
                {bestSellers.map((p) => (
                  <tr key={p.rank} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-4 text-center font-medium text-[#121212]">{p.rank}</td>
                    <td className="py-3.5 px-4 font-medium text-[#121212]">{p.name}</td>
                    <td className="py-3.5 px-4 text-center">{p.sold}</td>
                    <td className="py-3.5 px-4 text-right font-semibold text-[#121212]">₹{p.rev.toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base text-[#121212] font-light">Top Performing Categories</h3>
            <span className="text-[10px] uppercase tracking-wider text-luxury-muted font-light">By Revenue Volume</span>
          </div>

          <div className="overflow-x-auto border border-gray-100 rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF8F5] text-luxury-muted uppercase tracking-wider text-[10px] border-b border-gray-100">
                  <th className="py-3.5 px-4 font-medium text-center w-12">Rank</th>
                  <th className="py-3.5 px-4 font-medium">Category</th>
                  <th className="py-3.5 px-4 font-medium text-center">Items Count</th>
                  <th className="py-3.5 px-4 font-medium text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-light text-slate-600">
                {topCategories.map((cat) => (
                  <tr key={cat.rank} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 px-4 text-center font-medium text-[#121212]">{cat.rank}</td>
                    <td className="py-3.5 px-4 font-medium text-[#121212] uppercase tracking-wider">{cat.name}</td>
                    <td className="py-3.5 px-4 text-center">{cat.items}</td>
                    <td className="py-3.5 px-4 text-right font-semibold text-[#121212]">₹{cat.rev.toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
