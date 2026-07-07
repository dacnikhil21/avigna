"use client";

import { useState, useMemo } from "react";
import { useAdminStore } from "@/lib/store/admin-store";
import type { Product } from "@/types";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Copy,
  Eye,
  Package,
  X,
  Upload,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Filter
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function ProductsTab() {
  const {
    products,
    categories,
    addProduct,
    editProduct,
    deleteProduct,
    duplicateProduct
  } = useAdminStore();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStockStatus, setSelectedStockStatus] = useState("all");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // View States
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formDiscount, setFormDiscount] = useState("");
  const [formStock, setFormStock] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formIsTrending, setFormIsTrending] = useState(false);
  const [formIsLatest, setFormIsLatest] = useState(false);
  const [formIsActive, setFormIsActive] = useState(true);

  // Toast Notification
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Reset form helper
  const resetForm = () => {
    setFormName("");
    setFormCategory(categories[0]?.id || "");
    setFormDesc("");
    setFormPrice("");
    setFormDiscount("");
    setFormStock("");
    setFormImage("");
    setFormIsFeatured(false);
    setFormIsTrending(false);
    setFormIsLatest(false);
    setFormIsActive(true);
    setEditingId(null);
  };

  // Open forms
  const handleOpenAdd = () => {
    resetForm();
    setFormOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setFormName(product.name);
    setFormCategory(product.categoryId);
    setFormDesc(product.description);
    setFormPrice(product.price.toString());
    setFormDiscount(product.salePrice ? (product.price - product.salePrice).toString() : "");
    setFormStock(product.stockQty.toString());
    setFormImage(product.images[0]?.url || "");
    setFormIsFeatured(product.isFeatured);
    setFormIsTrending(product.isTrending);
    setFormIsLatest(product.isLatest);
    setFormIsActive(product.isActive);
    setEditingId(product.id);
    setFormOpen(true);
  };

  // Handle Image Upload File Reader
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Save
  const handleFormSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName || !formCategory || !formPrice || !formStock) {
      showToast("Please fill all required fields", "error");
      return;
    }

    const priceNum = parseFloat(formPrice);
    const discountNum = formDiscount ? parseFloat(formDiscount) : 0;
    const stockNum = parseInt(formStock);
    const salePrice = discountNum > 0 ? priceNum - discountNum : undefined;

    const imgObj = {
      id: `img-${Math.random().toString(36).substr(2, 9)}`,
      productId: editingId || "",
      url: formImage || "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
      position: 0,
      isPrimary: true
    };

    const payload: Omit<Product, "id" | "createdAt" | "updatedAt" | "category" | "slug"> = {
      name: formName,
      categoryId: formCategory,
      description: formDesc,
      price: priceNum,
      salePrice: salePrice,
      stockQty: stockNum,
      inStock: stockNum > 0,
      isFeatured: formIsFeatured,
      isTrending: formIsTrending,
      isLatest: formIsLatest,
      isActive: formIsActive,
      images: [imgObj],
      metal: "Gold",
      sku: `SKU-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      isExclusive: false,
      isBridal: false
    };

    if (editingId) {
      editProduct(editingId, payload);
      showToast("Product updated successfully!");
    } else {
      addProduct(payload);
      showToast("Product added successfully!");
    }

    setFormOpen(false);
    resetForm();
  };

  // Handle Actions
  const handleDuplicate = (id: string) => {
    duplicateProduct(id);
    showToast("Product duplicated successfully!");
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteProduct(deleteId);
      setDeleteId(null);
      showToast("Product deleted successfully!");
    }
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || p.categoryId === selectedCategory;
      
      const matchesStock = selectedStockStatus === "all" || 
        (selectedStockStatus === "instock" && p.stockQty > 0) ||
        (selectedStockStatus === "outstock" && p.stockQty === 0);

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, searchTerm, selectedCategory, selectedStockStatus]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredProducts, currentPage]);

  return (
    <div className="space-y-6 font-sans">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg border text-xs uppercase tracking-wider font-medium transition-all duration-500 transform translate-y-0 ${
          toast.type === "success" 
            ? "bg-[#C5A880] text-white border-[#b8966f]" 
            : "bg-red-600 text-white border-red-700"
        }`}>
          <CheckCircle2 className="w-4 h-4" />
          {toast.message}
        </div>
      )}

      {/* Control Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-3 flex-1 max-w-3xl">
          <div className="relative w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 font-light" />
            <input
              type="text"
              placeholder="Search product / SKU..."
              className="w-full bg-white border border-[#EFECE7] hover:border-gray-300 focus:border-[#C5A880] text-xs pl-10 pr-4 py-2.5 rounded-xl outline-none transition-all duration-300 placeholder-gray-400 font-light"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-luxury-muted" />
            <select
              className="bg-white border border-[#EFECE7] text-xs px-3 py-2.5 rounded-xl outline-none hover:border-gray-300 focus:border-[#C5A880] text-[#6B6560]"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <select
            className="bg-white border border-[#EFECE7] text-xs px-3 py-2.5 rounded-xl outline-none hover:border-gray-300 focus:border-[#C5A880] text-[#6B6560]"
            value={selectedStockStatus}
            onChange={(e) => {
              setSelectedStockStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Stock Status</option>
            <option value="instock">In Stock</option>
            <option value="outstock">Out of Stock</option>
          </select>
        </div>

        {/* Add Product Button */}
        <Button
          onClick={handleOpenAdd}
          className="bg-[#121212] hover:bg-[#C5A880] text-white text-xs uppercase tracking-wider font-semibold py-3 px-5 rounded-xl transition-colors shrink-0"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

      {/* Products Table Card */}
      <div className="bg-white border border-[#EFECE7] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] text-luxury-muted uppercase tracking-wider text-[10px] border-b border-[#EFECE7]">
                <th className="py-4 px-6 font-medium">Product</th>
                <th className="py-4 px-4 font-medium">Category</th>
                <th className="py-4 px-4 font-medium">Price</th>
                <th className="py-4 px-4 font-medium">Stock</th>
                <th className="py-4 px-4 font-medium">Status</th>
                <th className="py-4 px-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE7] font-light">
              {currentItems.length > 0 ? (
                currentItems.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    
                    {/* Name & SKU & Image */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-100 shrink-0 relative bg-gray-50">
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
                        <div className="min-w-0">
                          <h4 className="font-serif text-sm text-[#121212] font-normal tracking-wide">{p.name}</h4>
                          <p className="text-[10px] text-luxury-muted mt-1 uppercase tracking-wider font-sans font-light">
                            {p.sku}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="text-xs text-[#6B6560] uppercase tracking-wider font-light">
                        {p.category.name}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4">
                      <div className="space-y-0.5">
                        <p className="font-semibold text-[#121212]">₹{p.price.toLocaleString("en-IN")}</p>
                        {p.salePrice && (
                          <p className="text-[10px] text-red-500 line-through">₹{p.price.toLocaleString("en-IN")}</p>
                        )}
                      </div>
                    </td>

                    {/* Stock */}
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-medium uppercase tracking-wider ${
                        p.stockQty > 5 
                          ? "bg-green-50 text-green-700 border border-green-200/50" 
                          : p.stockQty > 0 
                            ? "bg-amber-50 text-amber-700 border border-amber-200/50" 
                            : "bg-red-50 text-red-700 border border-red-200/50"
                      }`}>
                        {p.stockQty > 0 ? `${p.stockQty} In Stock` : "Out of Stock"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-medium uppercase tracking-wider ${
                        p.isActive 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50" 
                          : "bg-gray-100 text-gray-500 border border-gray-200/50"
                      }`}>
                        {p.isActive ? "Published" : "Draft"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setPreviewProduct(p)}
                          title="Preview Product"
                          className="p-2 hover:bg-gray-100 text-gray-400 hover:text-[#121212] rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDuplicate(p.id)}
                          title="Duplicate Product"
                          className="p-2 hover:bg-gray-100 text-gray-400 hover:text-[#121212] rounded-lg transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(p)}
                          title="Edit Product"
                          className="p-2 hover:bg-gray-100 text-gray-400 hover:text-[#121212] rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(p.id)}
                          title="Delete Product"
                          className="p-2 hover:bg-gray-100 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-luxury-muted font-light">
                    No products found matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="px-6 py-4 bg-[#FAF8F5] border-t border-[#EFECE7] flex items-center justify-between">
            <span className="text-xs text-luxury-muted font-light">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} entries
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((c) => Math.max(c - 1, 1))}
                className="p-2 border border-[#EFECE7] bg-white rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <span className="text-xs text-[#121212] font-semibold px-2">{currentPage} / {totalPages}</span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((c) => Math.min(c + 1, totalPages))}
                className="p-2 border border-[#EFECE7] bg-white rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Form Modal Dialog Overlay */}
      {formOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto border border-[#EFECE7] shadow-xl p-8 flex flex-col relative animate-in fade-in zoom-in-95 duration-300">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#EFECE7] mb-6">
              <h3 className="font-serif text-lg text-[#121212] font-light">
                {editingId ? "Edit Product Details" : "Create New Product"}
              </h3>
              <button
                onClick={() => setFormOpen(false)}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Product Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="prod-name" className="text-xs uppercase tracking-wider font-light text-[#121212]">
                    Product Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="prod-name"
                    required
                    placeholder="Enter product title"
                    className="input-luxury rounded-xl"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </div>

                {/* Category Select */}
                <div className="space-y-1.5">
                  <Label htmlFor="prod-category" className="text-xs uppercase tracking-wider font-light text-[#121212]">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="prod-category"
                    required
                    className="w-full bg-white border border-[#EFECE7] text-xs px-3.5 py-3 rounded-xl outline-none hover:border-gray-300 focus:border-[#C5A880] text-[#6B6560]"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div className="space-y-1.5">
                  <Label htmlFor="prod-price" className="text-xs uppercase tracking-wider font-light text-[#121212]">
                    Base Price (₹) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="prod-price"
                    type="number"
                    required
                    placeholder="e.g. 2999"
                    className="input-luxury rounded-xl"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                  />
                </div>

                {/* Discount */}
                <div className="space-y-1.5">
                  <Label htmlFor="prod-discount" className="text-xs uppercase tracking-wider font-light text-[#121212]">
                    Discount / Sale Cut (₹)
                  </Label>
                  <Input
                    id="prod-discount"
                    type="number"
                    placeholder="e.g. 500"
                    className="input-luxury rounded-xl"
                    value={formDiscount}
                    onChange={(e) => setFormDiscount(e.target.value)}
                  />
                </div>

                {/* Stock Quantity */}
                <div className="space-y-1.5">
                  <Label htmlFor="prod-stock" className="text-xs uppercase tracking-wider font-light text-[#121212]">
                    Stock Quantity <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="prod-stock"
                    type="number"
                    required
                    placeholder="e.g. 15"
                    className="input-luxury rounded-xl"
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-1.5">
                  <Label className="text-xs uppercase tracking-wider font-light text-[#121212]">
                    Upload Image
                  </Label>
                  <div className="flex gap-4 items-center">
                    <label className="flex-1 flex flex-col items-center justify-center border border-dashed border-[#EFECE7] hover:border-gray-400 py-3 rounded-xl cursor-pointer text-xs text-luxury-muted gap-1 bg-gray-50 transition-colors">
                      <Upload className="w-4 h-4 text-gray-400" />
                      <span>Choose File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageFileChange}
                      />
                    </label>
                    {formImage && (
                      <div className="w-12 h-12 rounded-lg border border-gray-200 overflow-hidden shrink-0 bg-gray-50">
                        <img
                          src={formImage}
                          alt="Preview"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label htmlFor="prod-desc" className="text-xs uppercase tracking-wider font-light text-[#121212]">
                  Description
                </Label>
                <textarea
                  id="prod-desc"
                  placeholder="Enter detailed product description"
                  rows={4}
                  className="input-luxury rounded-xl resize-none mt-1"
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                />
              </div>

              {/* Checkbox Options Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl">
                <label className="flex items-center gap-2.5 text-xs text-[#121212] select-none cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-[#C5A880] focus:ring-[#C5A880] w-4 h-4"
                    checked={formIsFeatured}
                    onChange={(e) => setFormIsFeatured(e.target.checked)}
                  />
                  Featured Product
                </label>
                <label className="flex items-center gap-2.5 text-xs text-[#121212] select-none cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-[#C5A880] focus:ring-[#C5A880] w-4 h-4"
                    checked={formIsTrending}
                    onChange={(e) => setFormIsTrending(e.target.checked)}
                  />
                  Trending Product
                </label>
                <label className="flex items-center gap-2.5 text-xs text-[#121212] select-none cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-[#C5A880] focus:ring-[#C5A880] w-4 h-4"
                    checked={formIsLatest}
                    onChange={(e) => setFormIsLatest(e.target.checked)}
                  />
                  Best Seller / New
                </label>
                <label className="flex items-center gap-2.5 text-xs text-[#121212] select-none cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-[#C5A880] focus:ring-[#C5A880] w-4 h-4"
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
                  />
                  Publish Instantly
                </label>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#EFECE7]">
                <Button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="bg-white border border-[#EFECE7] text-[#121212] hover:bg-gray-50 text-xs uppercase tracking-wider font-medium py-3.5 px-6 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#121212] hover:bg-[#C5A880] text-white text-xs uppercase tracking-wider font-semibold py-3.5 px-6 rounded-xl transition-colors"
                >
                  Save Product
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full border border-[#EFECE7] shadow-xl p-6 relative animate-in fade-in zoom-in-95 duration-250">
            <h3 className="font-serif text-lg text-[#121212] mb-2 font-normal">Confirm Deletion</h3>
            <p className="text-xs text-luxury-muted font-light leading-relaxed mb-6">
              Are you sure you want to delete this product? This action cannot be undone and will immediately remove the item from the customer catalog.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setDeleteId(null)}
                className="bg-white border border-[#EFECE7] text-[#121212] hover:bg-gray-50 text-xs uppercase tracking-wider font-medium py-2.5 px-4 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-wider font-semibold py-2.5 px-4 rounded-xl"
              >
                Delete Product
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox / Preview modal */}
      {previewProduct && (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden border border-[#EFECE7] shadow-2xl relative animate-in fade-in zoom-in-95 duration-300">
            <button
              onClick={() => setPreviewProduct(null)}
              className="absolute top-4 right-4 z-10 p-1.5 bg-black/20 hover:bg-black/35 rounded-full transition-colors text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="relative aspect-square bg-gray-50">
              {previewProduct.images[0] ? (
                <img
                  src={previewProduct.images[0].url}
                  alt={previewProduct.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                  <Package className="w-12 h-12" />
                </div>
              )}
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-[10px] text-luxury-gold uppercase tracking-wider font-medium">
                  {previewProduct.category.name}
                </p>
                <h3 className="font-serif text-xl text-[#121212] font-normal mt-1 leading-tight">{previewProduct.name}</h3>
                <p className="text-[10px] text-luxury-muted uppercase tracking-wider mt-1">{previewProduct.sku}</p>
              </div>
              <p className="text-xs text-luxury-muted font-light leading-relaxed line-clamp-3">
                {previewProduct.description || "No description provided for this product."}
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="font-serif text-xl text-[#121212] font-semibold">
                  ₹{previewProduct.price.toLocaleString("en-IN")}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-wider ${
                  previewProduct.stockQty > 0 ? "bg-green-50 text-green-700 border border-green-200/50" : "bg-red-50 text-red-700 border border-red-200/50"
                }`}>
                  {previewProduct.stockQty > 0 ? `${previewProduct.stockQty} In Stock` : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
