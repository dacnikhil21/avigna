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
    
    // Update active modal order view if it is open
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
    Pending: "bg-amber-50 text-amber-700 border border-amber-200/50",
    Accepted: "bg-blue-50 text-blue-700 border border-blue-200/50",
    Processing: "bg-purple-50 text-purple-700 border border-purple-200/50",
    Delivered: "bg-green-50 text-green-700 border border-green-200/50",
    Cancelled: "bg-red-50 text-red-700 border border-red-200/50",
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg border bg-[#C5A880] text-white border-[#b8966f] text-xs uppercase tracking-wider font-medium transition-all duration-300">
          <CheckCircle2 className="w-4 h-4" />
          {toastMsg}
        </div>
      )}

      {/* Control Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 font-light" />
          <input
            type="text"
            placeholder="Search order / customer / phone..."
            className="w-full bg-white border border-[#EFECE7] hover:border-gray-300 focus:border-[#C5A880] text-xs pl-10 pr-4 py-2.5 rounded-xl outline-none transition-all duration-300 placeholder-gray-400 font-light"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {["all", "Pending", "Accepted", "Processing", "Delivered", "Cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 font-light ${
                statusFilter === status
                  ? "bg-[#121212] text-white"
                  : "bg-white border border-[#EFECE7] text-[#6B6560] hover:text-[#121212] hover:border-gray-400"
              }`}
            >
              {status === "all" ? "All Orders" : status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-[#EFECE7] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] text-luxury-muted uppercase tracking-wider text-[10px] border-b border-[#EFECE7]">
                <th className="py-4 px-6 font-medium">Order ID</th>
                <th className="py-4 px-4 font-medium">Customer Details</th>
                <th className="py-4 px-4 font-medium">Products Summary</th>
                <th className="py-4 px-4 font-medium">Amount</th>
                <th className="py-4 px-4 font-medium">Payment</th>
                <th className="py-4 px-4 font-medium">Status</th>
                <th className="py-4 px-4 font-medium">Date</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE7] font-light text-slate-600">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                    
                    {/* ID */}
                    <td className="py-4 px-6 font-medium text-[#121212] font-mono text-xs">
                      {o.id}
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-4">
                      <div className="space-y-0.5">
                        <p className="font-medium text-[#121212]">{o.customer}</p>
                        <p className="text-[10px] text-luxury-muted">{o.phone}</p>
                      </div>
                    </td>

                    {/* Products */}
                    <td className="py-4 px-4 max-w-[220px] truncate" title={o.products}>
                      {o.products}
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-4 font-semibold text-[#121212]">
                      ₹{o.amount.toLocaleString("en-IN")}
                    </td>

                    {/* Payment */}
                    <td className="py-4 px-4 uppercase tracking-wider text-[9px] font-medium text-[#6B6560]">
                      {o.payment}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-medium uppercase tracking-wider ${statusColors[o.status]}`}>
                        {o.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4">
                      {o.date}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedOrder(o)}
                          title="View Details"
                          className="p-2 hover:bg-gray-100 text-gray-400 hover:text-[#121212] rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        {o.status === "Pending" && (
                          <button
                            onClick={() => handleStatusChange(o.id, "Accepted")}
                            title="Accept Order"
                            className="p-2 hover:bg-blue-50 text-blue-400 hover:text-blue-600 rounded-lg transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        
                        {(o.status === "Accepted" || o.status === "Pending") && (
                          <button
                            onClick={() => handleStatusChange(o.id, "Processing")}
                            title="Start Processing"
                            className="p-2 hover:bg-purple-50 text-purple-400 hover:text-purple-600 rounded-lg transition-colors"
                          >
                            <Truck className="w-4 h-4" />
                          </button>
                        )}

                        {o.status === "Processing" && (
                          <button
                            onClick={() => handleStatusChange(o.id, "Delivered")}
                            title="Mark as Delivered"
                            className="p-2 hover:bg-green-50 text-green-400 hover:text-green-600 rounded-lg transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}

                        {o.status !== "Delivered" && o.status !== "Cancelled" && (
                          <button
                            onClick={() => handleStatusChange(o.id, "Cancelled")}
                            title="Cancel Order"
                            className="p-2 hover:bg-red-50 text-red-400 hover:text-red-600 rounded-lg transition-colors"
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
                  <td colSpan={8} className="py-12 text-center text-luxury-muted font-light">
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
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-[#EFECE7] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-250">
            
            {/* Header */}
            <div className="bg-[#FAF8F5] border-b border-[#EFECE7] px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-luxury-gold uppercase tracking-wider font-semibold">
                  Order Details
                </span>
                <h3 className="font-serif text-base text-[#121212] font-normal mt-0.5">{selectedOrder.id}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-800"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              
              {/* Order Info & Status Ribbon */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-50 border border-gray-100 rounded-xl text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Placed on: <strong>{selectedOrder.date}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-gray-400" />
                  <span>Payment: <strong className="uppercase">{selectedOrder.payment}</strong></span>
                </div>
                <div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-wider ${statusColors[selectedOrder.status]}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              {/* Customer Info Card */}
              <div className="space-y-3">
                <h4 className="font-serif text-sm text-[#121212] font-normal border-b pb-1">Customer Profile</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#6B6560]">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>{selectedOrder.customer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>{selectedOrder.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>{selectedOrder.email}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <span>Standard Address: Wanaparthy Flagship Area</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                <h4 className="font-serif text-sm text-[#121212] font-normal border-b pb-1">Items Purchased</h4>
                <div className="p-4 bg-gray-50/50 rounded-xl space-y-2.5 border border-gray-100 text-xs">
                  <div className="flex items-center justify-between text-[10px] uppercase text-luxury-muted font-medium border-b pb-1.5 mb-1.5">
                    <span>Product details</span>
                    <span>Subtotal</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-[#121212] leading-relaxed">{selectedOrder.products}</p>
                    <span className="font-semibold shrink-0 text-[#121212]">₹{selectedOrder.amount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2 text-sm font-semibold">
                    <span className="text-[#121212]">Grand Total</span>
                    <span className="text-[#C5A880]">₹{selectedOrder.amount.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              {/* Status Actions buttons inside the modal */}
              {selectedOrder.status !== "Delivered" && selectedOrder.status !== "Cancelled" && (
                <div className="pt-4 border-t border-[#EFECE7] flex flex-wrap gap-2.5 justify-end">
                  {selectedOrder.status === "Pending" && (
                    <Button
                      onClick={() => handleStatusChange(selectedOrder.id, "Accepted")}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs uppercase tracking-wider font-semibold py-2 px-4 rounded-xl"
                    >
                      Accept Order
                    </Button>
                  )}
                  {(selectedOrder.status === "Accepted" || selectedOrder.status === "Pending") && (
                    <Button
                      onClick={() => handleStatusChange(selectedOrder.id, "Processing")}
                      className="bg-purple-600 hover:bg-purple-700 text-white text-xs uppercase tracking-wider font-semibold py-2 px-4 rounded-xl"
                    >
                      Process &amp; Ship
                    </Button>
                  )}
                  {selectedOrder.status === "Processing" && (
                    <Button
                      onClick={() => handleStatusChange(selectedOrder.id, "Delivered")}
                      className="bg-green-600 hover:bg-green-700 text-white text-xs uppercase tracking-wider font-semibold py-2 px-4 rounded-xl"
                    >
                      Mark as Delivered
                    </Button>
                  )}
                  <Button
                    onClick={() => handleStatusChange(selectedOrder.id, "Cancelled")}
                    className="bg-red-50 hover:bg-red-100 text-red-600 text-xs uppercase tracking-wider font-semibold py-2 px-4 rounded-xl"
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
