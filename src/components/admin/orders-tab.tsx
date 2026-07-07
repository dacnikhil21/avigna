"use client";

import { useState } from "react";
import { useAdminStore, MockOrder } from "@/lib/store/admin-store";
import {
  Search,
  Eye,
  CheckCircle,
  Truck,
  XCircle,
  AlertCircle,
  X,
  Calendar,
  CreditCard,
  Phone,
  Mail,
  User,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function OrdersTab() {
  const { orders, updateOrderStatus } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<MockOrder | null>(null);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleStatusChange = (id: string, newStatus: MockOrder["status"]) => {
    updateOrderStatus(id, newStatus);
    showToast(`Order status updated to ${newStatus}`);
    
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.phone.includes(searchTerm);
      
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    Pending: "bg-amber-50 text-amber-900 border border-amber-200",
    Accepted: "bg-blue-50 text-blue-900 border border-blue-200",
    Processing: "bg-purple-50 text-purple-900 border border-purple-200",
    Delivered: "bg-green-50 text-green-900 border border-green-200",
    Cancelled: "bg-red-50 text-red-900 border border-red-200",
  };

  return (
    <div className="space-y-6 font-sans antialiased text-[#1A1A1A]">
      
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg border bg-emerald-600 text-white border-emerald-700 text-xs uppercase tracking-wider font-semibold transition-all duration-300">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          {toastMsg}
        </div>
      )}

      {/* Control Banner */}
      <div className="sticky top-0 z-20 bg-[#FAF8F5]/95 backdrop-blur-md pb-4 pt-1 border-b border-[#EFECE7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 stroke-[2]" />
          <input
            type="text"
            placeholder="Search order / customer / phone..."
            className="w-full bg-white border border-[#D1CFC9] text-slate-800 hover:border-slate-400 focus:border-[#C5A880] text-xs pl-10 pr-4 py-3 rounded-xl outline-none transition-all placeholder-slate-500 font-medium shadow-inner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 select-none">
          {["all", "Pending", "Accepted", "Processing", "Delivered", "Cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-2 rounded-xl text-xs uppercase tracking-wider font-bold transition-all border ${
                statusFilter === status
                  ? "bg-[#C5A880] text-white border-transparent shadow-sm"
                  : "bg-white border-[#D1CFC9] text-slate-800 hover:text-slate-950 hover:border-slate-400"
              }`}
            >
              {status === "all" ? "All Orders" : status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-[#EFECE7] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto max-h-[68vh] overflow-y-auto relative">
          <table className="w-full text-left border-collapse text-xs table-fixed">
            <thead className="sticky top-0 z-10 bg-slate-100/95 backdrop-blur-sm border-b border-[#EFECE7] shadow-sm select-none">
              <tr className="text-slate-900 uppercase tracking-wider text-[10px] font-bold">
                <th className="py-3.5 px-5 w-[15%] font-bold">Order ID</th>
                <th className="py-3.5 px-4 w-[22%] font-bold">Customer Details</th>
                <th className="py-3.5 px-4 w-[28%] font-bold">Products Summary</th>
                <th className="py-3.5 px-4 w-[13%] font-bold">Amount</th>
                <th className="py-3.5 px-4 w-[12%] font-bold">Payment</th>
                <th className="py-3.5 px-4 w-[12%] font-bold">Status</th>
                <th className="py-3.5 px-4 w-[12%] font-bold">Date</th>
                <th className="py-3.5 px-5 w-[14%] font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE7] font-medium text-slate-700">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* ID */}
                    <td className="py-3 px-5 font-bold text-slate-950 font-mono text-xs">
                      {o.id}
                    </td>

                    {/* Customer */}
                    <td className="py-3 px-4">
                      <div className="space-y-0.5">
                        <p className="font-bold text-slate-900">{o.customer}</p>
                        <p className="text-[10px] text-slate-900 bg-slate-100 inline-block px-1.5 py-0.5 rounded font-mono font-bold mt-1">
                          {o.phone}
                        </p>
                      </div>
                    </td>

                    {/* Products */}
                    <td className="py-3 px-4 truncate" title={o.products}>
                      {o.products}
                    </td>

                    {/* Amount */}
                    <td className="py-3 px-4 font-bold text-slate-900 text-sm">
                      ₹{o.amount.toLocaleString("en-IN")}
                    </td>

                    {/* Payment */}
                    <td className="py-3 px-4 uppercase tracking-wider text-[9px] font-bold text-slate-900">
                      {o.payment}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${statusColors[o.status]}`}>
                        {o.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 text-slate-900">
                      {o.date}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedOrder(o)}
                          title="View Details"
                          className="p-2 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        {o.status === "Pending" && (
                          <button
                            onClick={() => handleStatusChange(o.id, "Accepted")}
                            title="Accept Order"
                            className="p-2 hover:bg-blue-50 text-blue-500 hover:text-blue-700 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        
                        {(o.status === "Accepted" || o.status === "Pending") && (
                          <button
                            onClick={() => handleStatusChange(o.id, "Processing")}
                            title="Start Processing"
                            className="p-2 hover:bg-purple-50 text-purple-500 hover:text-purple-700 rounded-lg transition-colors border border-transparent hover:border-purple-100"
                          >
                            <Truck className="w-4 h-4" />
                          </button>
                        )}

                        {o.status === "Processing" && (
                          <button
                            onClick={() => handleStatusChange(o.id, "Delivered")}
                            title="Mark as Delivered"
                            className="p-2 hover:bg-green-50 text-green-500 hover:text-green-700 rounded-lg transition-colors border border-transparent hover:border-green-100"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}

                        {o.status !== "Delivered" && o.status !== "Cancelled" && (
                          <button
                            onClick={() => handleStatusChange(o.id, "Cancelled")}
                            title="Cancel Order"
                            className="p-2 hover:bg-red-50 text-red-500 hover:text-red-700 rounded-lg transition-colors border border-transparent hover:border-red-100"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-700 font-bold">
                    No orders found matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Drawer / Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-[#EFECE7] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="bg-slate-50 border-b border-[#EFECE7] px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#C5A880] uppercase tracking-wider font-bold">
                  Order Details
                </span>
                <h3 className="font-serif text-lg text-slate-950 font-bold mt-0.5">{selectedOrder.id}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-600 hover:text-slate-950 border border-transparent hover:border-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              
              {/* Order Info & Status Ribbon */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span>Placed on: <strong>{selectedOrder.date}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-slate-500" />
                  <span>Payment: <strong className="uppercase">{selectedOrder.payment}</strong></span>
                </div>
                <div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${statusColors[selectedOrder.status]}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              {/* Customer Info Card */}
              <div className="space-y-3">
                <h4 className="font-serif text-sm text-slate-950 font-bold border-b pb-1">Customer Profile</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-900 font-bold">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>{selectedOrder.customer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>{selectedOrder.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>{selectedOrder.email}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <span className="font-normal text-slate-800">Showroom Collection / Flagship Area</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                <h4 className="font-serif text-sm text-slate-950 font-bold border-b pb-1">Items Purchased</h4>
                <div className="p-4 bg-slate-50/50 rounded-xl space-y-2.5 border border-slate-200 text-xs">
                  <div className="flex items-center justify-between text-[10px] uppercase text-slate-900 font-bold border-b pb-1.5 mb-1.5">
                    <span>Product Details</span>
                    <span>Subtotal</span>
                  </div>
                  <div className="flex items-start justify-between gap-4 font-bold text-slate-900">
                    <p className="leading-relaxed">{selectedOrder.products}</p>
                    <span className="shrink-0 text-sm">₹{selectedOrder.amount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 mt-2 text-sm font-bold">
                    <span className="text-slate-950">Grand Total</span>
                    <span className="text-[#C5A880] text-base">₹{selectedOrder.amount.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              {/* Status Actions buttons inside the modal */}
              {selectedOrder.status !== "Delivered" && selectedOrder.status !== "Cancelled" && (
                <div className="pt-4 border-t border-[#EFECE7] flex flex-wrap gap-2.5 justify-end">
                  
                  {selectedOrder.status === "Pending" && (
                    <Button
                      onClick={() => handleStatusChange(selectedOrder.id, "Accepted")}
                      className="bg-[#C5A880] hover:bg-[#b0936b] text-white text-xs uppercase tracking-wider font-bold py-2.5 px-4 rounded-xl shadow-sm"
                    >
                      Accept Order
                    </Button>
                  )}
                  {(selectedOrder.status === "Accepted" || selectedOrder.status === "Pending") && (
                    <Button
                      onClick={() => handleStatusChange(selectedOrder.id, "Processing")}
                      className="bg-purple-600 hover:bg-purple-700 text-white text-xs uppercase tracking-wider font-bold py-2.5 px-4 rounded-xl shadow-md"
                    >
                      Process &amp; Ship
                    </Button>
                  )}
                  {selectedOrder.status === "Processing" && (
                    <Button
                      onClick={() => handleStatusChange(selectedOrder.id, "Delivered")}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-wider font-bold py-2.5 px-4 rounded-xl shadow-md"
                    >
                      Mark as Delivered
                    </Button>
                  )}
                  <Button
                    onClick={() => handleStatusChange(selectedOrder.id, "Cancelled")}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-wider font-bold py-2.5 px-4 rounded-xl shadow-md"
                  >
                    Cancel Order
                  </Button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
