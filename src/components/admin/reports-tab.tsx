"use client";

import { useState } from "react";
import { FileDown, CheckCircle2, Loader2, BarChart2, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReportsTab() {
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

  // Mock reporting data
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
    <div className="space-y-8 font-sans antialiased text-[#1A1A1A]">
      
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg border bg-emerald-600 text-white border-emerald-700 text-xs uppercase tracking-wider font-semibold transition-all duration-300">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          {toastMsg}
        </div>
      )}

      {/* Action Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm">
        <div>
          <h3 className="font-serif text-xl text-slate-950 font-bold">Business Analytics &amp; Reports</h3>
          <p className="text-xs text-slate-800 font-bold mt-1.5">Export transaction logs and category charts for offline auditing.</p>
        </div>
        
        {/* Export Buttons */}
        <div className="flex items-center gap-3">
          <Button
            onClick={handleExportPdf}
            disabled={downloadingPdf}
            className="bg-white border border-[#D1CFC9] hover:border-slate-400 text-slate-900 text-xs uppercase tracking-wider font-bold py-3 px-5 rounded-xl transition-all flex items-center gap-2 shadow-sm"
          >
            {downloadingPdf ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
            ) : (
              <FileDown className="w-4 h-4 text-slate-500" />
            )}
            Export PDF
          </Button>

          <Button
            onClick={handleExportExcel}
            disabled={downloadingExcel}
            className="bg-[#C5A880] hover:bg-[#b0936b] text-white text-xs uppercase tracking-wider font-bold py-3.5 px-5 rounded-xl transition-all flex items-center gap-2 shadow-md"
          >
            {downloadingExcel ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <FileDown className="w-4 h-4 text-white" />
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
                <span className="text-[11px] text-slate-900 font-extrabold uppercase tracking-wider leading-none">{item.label}</span>
                <div className="w-8 h-8 rounded-xl bg-[#C5A880]/15 flex items-center justify-center text-[#8C6D3F]">
                  <Icon className="w-4.5 h-4.5 stroke-[2.5]" />
                </div>
              </div>
              <div>
                <h4 className="font-sans text-2xl font-black text-slate-950 leading-none">{item.val}</h4>
                <p className="text-[11px] text-slate-800 font-bold mt-2">{item.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reports Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Best Selling Products */}
        <div className="bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-[#EFECE7] pb-3.5">
            <h3 className="font-serif text-lg text-slate-950 font-bold">Best Selling Products</h3>
            <span className="text-[10px] uppercase tracking-wider text-slate-900 font-extrabold bg-slate-100 px-2 py-0.5 rounded">By Units Sold</span>
          </div>

          <div className="overflow-x-auto border border-[#EFECE7] rounded-xl">
            <table className="w-full text-left border-collapse text-xs table-fixed">
              <thead>
                <tr className="bg-slate-100 text-slate-950 uppercase tracking-wider text-[10px] border-b border-[#EFECE7]">
                  <th className="py-3 px-4 font-extrabold text-center w-12">Rank</th>
                  <th className="py-3 px-4 font-extrabold">Product</th>
                  <th className="py-3 px-4 font-extrabold text-center w-24">Units Sold</th>
                  <th className="py-3 px-4 font-extrabold text-right w-28">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE7] font-bold text-slate-900">
                {bestSellers.map((p) => (
                  <tr key={p.rank} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 text-center font-extrabold text-slate-950">{p.rank}</td>
                    <td className="py-3 px-4 font-bold text-slate-950 truncate">{p.name}</td>
                    <td className="py-3 px-4 text-center">{p.sold}</td>
                    <td className="py-3 px-4 text-right font-extrabold text-slate-950">₹{p.rev.toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-[#EFECE7] pb-3.5">
            <h3 className="font-serif text-lg text-slate-950 font-bold">Top Performing Categories</h3>
            <span className="text-[10px] uppercase tracking-wider text-slate-900 font-extrabold bg-slate-100 px-2 py-0.5 rounded">By Revenue Volume</span>
          </div>

          <div className="overflow-x-auto border border-[#EFECE7] rounded-xl">
            <table className="w-full text-left border-collapse text-xs table-fixed">
              <thead>
                <tr className="bg-slate-100 text-slate-950 uppercase tracking-wider text-[10px] border-b border-[#EFECE7]">
                  <th className="py-3 px-4 font-extrabold text-center w-12">Rank</th>
                  <th className="py-3 px-4 font-extrabold">Category</th>
                  <th className="py-3 px-4 font-extrabold text-center w-28">Items Count</th>
                  <th className="py-3 px-4 font-extrabold text-right w-28">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE7] font-bold text-slate-900">
                {topCategories.map((cat) => (
                  <tr key={cat.rank} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 text-center font-extrabold text-slate-950">{cat.rank}</td>
                    <td className="py-3 px-4 font-bold text-slate-950 uppercase tracking-wider truncate">{cat.name}</td>
                    <td className="py-3 px-4 text-center">{cat.items}</td>
                    <td className="py-3 px-4 text-right font-extrabold text-slate-950">₹{cat.rev.toLocaleString("en-IN")}</td>
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
