"use client";

import { useState, useEffect, useCallback } from "react";
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
  CheckCircle2,
  Printer,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Order, OrderItem } from "@prisma/client";

type OrderWithItems = Order & {
  items: OrderItem[];
};

export function OrdersTab() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<OrderWithItems | null>(null);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/orders?limit=250");
      const data = await res.json();
      setOrders(data && Array.isArray(data.items) ? data.items : []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      showToast("Failed to load orders from database.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        showToast(`Order status updated to ${newStatus}`);
        fetchOrders();
        
        // Update modal state if open
        if (selectedOrder && selectedOrder.id === id) {
          const updatedOrder = await res.json();
          setSelectedOrder(updatedOrder);
        }
      } else {
        showToast(`Failed to update order status`);
      }
    } catch (err) {
      console.error(err);
      showToast(`Error updating order status`);
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerPhone.includes(searchTerm);
      
    let matchesStatus = false;
    if (statusFilter === "all") {
      matchesStatus = true;
    } else if (statusFilter === "Pending") {
      matchesStatus = o.status === "PENDING";
    } else if (statusFilter === "Accepted") {
      matchesStatus = o.status === "PAID";
    } else if (statusFilter === "Processing") {
      matchesStatus = o.status === "PROCESSING" || o.status === "SHIPPED";
    } else if (statusFilter === "Delivered") {
      matchesStatus = o.status === "DELIVERED";
    } else if (statusFilter === "Cancelled") {
      matchesStatus = o.status === "CANCELLED";
    }
    
    return matchesSearch && matchesStatus;
  });

  const formatStatus = (s: string) => {
    switch (s) {
      case "PENDING": return "Pending";
      case "PAID": return "Accepted";
      case "PROCESSING": return "Processing";
      case "SHIPPED": return "Shipped";
      case "DELIVERED": return "Delivered";
      case "CANCELLED": return "Cancelled";
      case "REFUNDED": return "Refunded";
      default: return s;
    }
  };

  const statusColors: Record<string, string> = {
    PENDING: "bg-amber-50 text-amber-900 border border-amber-200",
    PAID: "bg-blue-50 text-blue-900 border border-blue-200",
    PROCESSING: "bg-purple-50 text-purple-900 border border-purple-200",
    SHIPPED: "bg-indigo-50 text-indigo-900 border border-indigo-200",
    DELIVERED: "bg-green-50 text-green-900 border border-green-200",
    CANCELLED: "bg-red-50 text-red-900 border border-red-200",
    REFUNDED: "bg-rose-50 text-rose-900 border border-rose-200",
  };

  const handlePrint = (order: OrderWithItems) => {
    if (!order) return;
    const printWindow = window.open("about:blank", "_blank", "left=50,top=50,width=800,height=900");
    if (!printWindow) return;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${order.orderNumber || order.id}</title>
          <style>
            body { font-family: system-ui, sans-serif; padding: 40px; color: #1a1a1a; line-height: 1.5; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #efece7; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: 300; font-family: serif; }
            .title { font-size: 28px; font-weight: 300; text-align: right; text-transform: uppercase; color: #C5A880; }
            .grid { display: grid; grid-template-cols: 1fr 1fr; gap: 30px; margin-bottom: 40px; }
            .section-title { font-family: serif; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #C5A880; border-bottom: 1px solid #efece7; padding-bottom: 5px; margin-bottom: 15px; }
            .meta-item { margin-bottom: 8px; font-size: 13px; }
            .meta-label { font-weight: bold; color: #666; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 40px; font-size: 13px; }
            th { text-align: left; padding: 12px; border-bottom: 2px solid #1a1a1a; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; }
            td { padding: 12px; border-bottom: 1px solid #efece7; }
            .total-row { font-weight: bold; font-size: 14px; }
            .grand-total { font-size: 18px; color: #C5A880; }
            .footer { text-align: center; margin-top: 50px; font-size: 11px; color: #888; border-top: 1px solid #efece7; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo">Sri Avighna</div>
              <div style="font-size: 10px; color: #C5A880; letter-spacing: 0.2em; text-transform: uppercase;">1 Gram Gold Jewellery</div>
            </div>
            <div class="title">Invoice</div>
          </div>
          
          <div class="grid">
            <div>
              <div class="section-title">Billed To</div>
              <div class="meta-item"><span class="meta-label">Customer:</span> ${order.customerName}</div>
              <div class="meta-item"><span class="meta-label">Phone:</span> ${order.customerPhone}</div>
              <div class="meta-item"><span class="meta-label">Email:</span> ${order.customerEmail}</div>
              <div class="meta-item"><span class="meta-label">Address:</span> ${order.shippingAddress}, ${order.city}, ${order.state} - ${order.pincode}</div>
            </div>
            <div>
              <div class="section-title">Order Details</div>
              <div class="meta-item"><span class="meta-label">Order ID:</span> ${order.orderNumber || order.id}</div>
              <div class="meta-item"><span class="meta-label">Date:</span> ${new Date(order.createdAt).toLocaleDateString("en-IN")}</div>
              <div class="meta-item"><span class="meta-label">Status:</span> ${formatStatus(order.status)}</div>
              <div class="meta-item"><span class="meta-label">Payment:</span> ${order.razorpayOrderId ? "Razorpay" : "Cash on Delivery"}</div>
            </div>
          </div>
          
          <div class="section-title">Items Ordered</div>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Qty</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map((item: OrderItem) => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.sku || "—"}</td>
                  <td>₹${(item.price / 100).toLocaleString("en-IN")}</td>
                  <td>${item.quantity}</td>
                  <td style="text-align: right;">₹${((item.price * item.quantity) / 100).toLocaleString("en-IN")}</td>
                </tr>
              `).join("")}
              <tr class="total-row">
                <td colspan="3"></td>
                <td>Subtotal</td>
                <td style="text-align: right;">₹${(order.subtotal / 100).toLocaleString("en-IN")}</td>
              </tr>
              <tr class="total-row">
                <td colspan="3"></td>
                <td>Shipping</td>
                <td style="text-align: right;">₹${(order.shipping / 100).toLocaleString("en-IN")}</td>
              </tr>
              <tr class="total-row grand-total">
                <td colspan="3"></td>
                <td>Grand Total</td>
                <td style="text-align: right;">₹${(order.total / 100).toLocaleString("en-IN")}</td>
              </tr>
            </tbody>
          </table>
          
          <div class="footer">
            Thank you for shopping with Sri Avighna 1 Gram Gold Jewellery!<br>
            Wanaparthy Flagship, Telangana | Support: avighnacollections1@gmail.com
          </div>
          
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              }
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (loading && orders.length === 0) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="w-8 h-8 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin mr-3 text-[#C5A880]" />
        <span className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A]">Loading order logs...</span>
      </div>
    );
  }

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
                <th className="py-3.5 px-5 w-[16%] font-bold">Order ID</th>
                <th className="py-3.5 px-4 w-[20%] font-bold">Customer Details</th>
                <th className="py-3.5 px-4 w-[28%] font-bold">Products Summary</th>
                <th className="py-3.5 px-4 w-[12%] font-bold">Amount</th>
                <th className="py-3.5 px-4 w-[12%] font-bold">Payment</th>
                <th className="py-3.5 px-4 w-[12%] font-bold">Status</th>
                <th className="py-3.5 px-4 w-[12%] font-bold">Date</th>
                <th className="py-3.5 px-5 w-[18%] font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE7] font-medium text-slate-700">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* ID */}
                    <td className="py-3 px-5 font-bold text-slate-950 font-mono text-xs truncate">
                      {o.orderNumber || o.id}
                    </td>

                    {/* Customer */}
                    <td className="py-3 px-4">
                      <div className="space-y-0.5">
                        <p className="font-bold text-slate-900">{o.customerName}</p>
                        <p className="text-[10px] text-slate-900 bg-slate-100 inline-block px-1.5 py-0.5 rounded font-mono font-bold mt-1">
                          {o.customerPhone}
                        </p>
                      </div>
                    </td>

                    {/* Products */}
                    <td className="py-3 px-4 truncate" title={o.items.map((i: OrderItem) => `${i.name} (${i.quantity})`).join(", ")}>
                      {o.items.map((i: OrderItem) => `${i.name} (${i.quantity})`).join(", ")}
                    </td>

                    {/* Amount */}
                    <td className="py-3 px-4 font-bold text-slate-900 text-sm">
                      ₹{(o.total / 100).toLocaleString("en-IN")}
                    </td>

                    {/* Payment */}
                    <td className="py-3 px-4 uppercase tracking-wider text-[9px] font-bold text-slate-900">
                      {o.razorpayOrderId ? "Razorpay" : "COD"}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${statusColors[o.status]}`}>
                        {formatStatus(o.status)}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 text-slate-900">
                      {new Date(o.createdAt).toLocaleDateString("en-IN")}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedOrder(o)}
                          title="View Details"
                          className="p-2 hover:bg-slate-100 text-slate-600 hover:text-slate-950 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => handlePrint(o)}
                          title="Print Invoice"
                          className="p-2 hover:bg-slate-100 text-[#C5A880] hover:text-[#b0936b] rounded-lg transition-colors border border-transparent hover:border-slate-200"
                        >
                          <Printer className="w-4 h-4" />
                        </button>

                        {o.status === "PENDING" && (
                          <button
                            onClick={() => handleStatusChange(o.id, "PROCESSING")}
                            title="Accept & Process"
                            className="p-2 hover:bg-blue-50 text-blue-500 hover:text-blue-700 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        
                        {o.status === "PROCESSING" && (
                          <button
                            onClick={() => handleStatusChange(o.id, "SHIPPED")}
                            title="Mark as Shipped"
                            className="p-2 hover:bg-purple-50 text-purple-500 hover:text-purple-700 rounded-lg transition-colors border border-transparent hover:border-purple-100"
                          >
                            <Truck className="w-4 h-4" />
                          </button>
                        )}

                        {(o.status === "SHIPPED" || o.status === "PAID" || o.status === "PROCESSING") && (
                          <button
                            onClick={() => handleStatusChange(o.id, "DELIVERED")}
                            title="Mark as Delivered"
                            className="p-2 hover:bg-green-50 text-green-500 hover:text-green-700 rounded-lg transition-colors border border-transparent hover:border-green-100"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}

                        {o.status !== "DELIVERED" && o.status !== "CANCELLED" && (
                          <button
                            onClick={() => handleStatusChange(o.id, "CANCELLED")}
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
                <h3 className="font-serif text-lg text-slate-950 font-bold mt-0.5">{selectedOrder.orderNumber || selectedOrder.id}</h3>
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
                  <span>Placed on: <strong>{new Date(selectedOrder.createdAt).toLocaleDateString("en-IN")}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-slate-500" />
                  <span>Payment: <strong className="uppercase">{selectedOrder.razorpayOrderId ? "Razorpay" : "COD"}</strong></span>
                </div>
                <div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${statusColors[selectedOrder.status]}`}>
                    {formatStatus(selectedOrder.status)}
                  </span>
                </div>
              </div>

              {/* Customer Info Card */}
              <div className="space-y-3">
                <h4 className="font-serif text-sm text-slate-950 font-bold border-b pb-1">Customer Profile</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-900 font-bold">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>{selectedOrder.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>{selectedOrder.customerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>{selectedOrder.customerEmail}</span>
                  </div>
                  <div className="flex items-start gap-2 col-span-2">
                    <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <span className="font-normal text-slate-800">
                      <strong>Shipping Address:</strong> {selectedOrder.shippingAddress}, {selectedOrder.city}, {selectedOrder.state} - {selectedOrder.pincode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                <h4 className="font-serif text-sm text-slate-950 font-bold border-b pb-1">Items Purchased</h4>
                <div className="p-4 bg-slate-50/50 rounded-xl space-y-2.5 border border-slate-200 text-xs">
                  <div className="flex items-center justify-between text-[10px] uppercase text-slate-900 font-bold border-b pb-1.5 mb-1.5">
                    <span>Product Details</span>
                    <span style={{ textAlign: "right" }}>Subtotal</span>
                  </div>
                  {selectedOrder.items.map((item: OrderItem) => (
                    <div key={item.id} className="flex items-start justify-between gap-4 font-bold text-slate-900">
                      <p className="leading-relaxed">{item.name} (x{item.quantity})</p>
                      <span className="shrink-0 text-sm">₹{((item.price * item.quantity) / 100).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 mt-2 text-sm font-bold">
                    <span className="text-slate-950">Grand Total</span>
                    <span className="text-[#C5A880] text-base">₹{(selectedOrder.total / 100).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              {/* Status Actions buttons inside the modal */}
              <div className="pt-4 border-t border-[#EFECE7] flex flex-wrap gap-2.5 justify-end">
                <Button
                  onClick={() => handlePrint(selectedOrder)}
                  className="bg-white border border-[#D1CFC9] text-slate-800 hover:bg-slate-50 text-xs uppercase tracking-wider font-bold py-2.5 px-4 rounded-xl shadow-sm flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" /> Print Invoice
                </Button>
                
                {selectedOrder.status !== "DELIVERED" && selectedOrder.status !== "CANCELLED" && (
                  <>
                    {selectedOrder.status === "PENDING" && (
                      <Button
                        onClick={() => handleStatusChange(selectedOrder.id, "PROCESSING")}
                        className="bg-[#C5A880] hover:bg-[#b0936b] text-white text-xs uppercase tracking-wider font-bold py-2.5 px-4 rounded-xl shadow-sm"
                      >
                        Accept Order
                      </Button>
                    )}
                    {selectedOrder.status === "PROCESSING" && (
                      <Button
                        onClick={() => handleStatusChange(selectedOrder.id, "SHIPPED")}
                        className="bg-purple-600 hover:bg-purple-700 text-white text-xs uppercase tracking-wider font-bold py-2.5 px-4 rounded-xl shadow-md"
                      >
                        Process &amp; Ship
                      </Button>
                    )}
                    {(selectedOrder.status === "SHIPPED" || selectedOrder.status === "PAID" || selectedOrder.status === "PROCESSING") && (
                      <Button
                        onClick={() => handleStatusChange(selectedOrder.id, "DELIVERED")}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-wider font-bold py-2.5 px-4 rounded-xl shadow-md"
                      >
                        Mark as Delivered
                      </Button>
                    )}
                    <Button
                      onClick={() => handleStatusChange(selectedOrder.id, "CANCELLED")}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-wider font-bold py-2.5 px-4 rounded-xl shadow-md"
                    >
                      Cancel Order
                    </Button>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
