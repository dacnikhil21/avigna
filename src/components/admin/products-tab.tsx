"use client";

import { useState, useMemo } from "react";
import { useAdminStore } from "@/lib/store/admin-store";
import type { Product, ProductImage } from "@/types";
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
  Filter,
  Star,
  Trash,
  RefreshCw,
  AlertTriangle
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
  const itemsPerPage = 10;

  // View States
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  
  // Dirty state warning dialog
  const [isDirty, setIsDirty] = useState(false);
  const [showDiscardWarning, setShowDiscardWarning] = useState(false);

  // Form State
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formDiscount, setFormDiscount] = useState("");
  const [formStock, setFormStock] = useState("");
  
  // Multiple images state
  const [formImages, setFormImages] = useState<Omit<ProductImage, "productId">[]>([]);
  
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formIsTrending, setFormIsTrending] = useState(false);
  const [formIsLatest, setFormIsLatest] = useState(false);
  const [formIsActive, setFormIsActive] = useState(true);

  // Drag over state
  const [dragOver, setDragOver] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFieldChange = <T,>(setter: (v: T) => void, val: T) => {
    setter(val);
    setIsDirty(true);
  };

  // Reset form helper
  const resetForm = () => {
    setFormName("");
    setFormCategory(categories[0]?.id || "");
    setFormDesc("");
    setFormPrice("");
    setFormDiscount("");
    setFormStock("");
    setFormImages([]);
    setFormIsFeatured(false);
    setFormIsTrending(false);
    setFormIsLatest(false);
    setFormIsActive(true);
    setEditingId(null);
    setIsDirty(false);
  };

  // Open forms
  const handleOpenAdd = () => {
    resetForm();
    setFormOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setFormName(product.name);
    setFormCategory(product.categoryId);
    setFormDesc(product.description || "");
    setFormPrice(product.price.toString());
    setFormDiscount(product.salePrice && product.salePrice < product.price ? product.salePrice.toString() : "");
    setFormStock(product.stockQty.toString());
    
    // Map existing images securely
    const mappedImages = product.images.map((img) => ({
      id: img.id,
      url: img.url,
      isPrimary: img.isPrimary,
      position: img.position,
      altText: img.altText || product.name
    }));
    setFormImages(mappedImages);
    
    setFormIsFeatured(product.isFeatured);
    setFormIsTrending(product.isTrending);
    setFormIsLatest(product.isLatest);
    setFormIsActive(product.isActive);
    setEditingId(product.id);
    
    setFormOpen(true);
    setIsDirty(false);
  };

  // Close with dirty check
  const handleCloseAttempt = () => {
    if (isDirty) {
      setShowDiscardWarning(true);
    } else {
      setFormOpen(false);
      resetForm();
    }
  };

  const confirmDiscard = () => {
    setShowDiscardWarning(false);
    setFormOpen(false);
    resetForm();
  };

  // Image Upload File Reader
  const addImagesFromFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        showToast("Invalid file type. Select images only.", "error");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const isFirst = formImages.length === 0;
        const newImage: Omit<ProductImage, "productId"> = {
          id: `img-${Math.random().toString(36).substr(2, 9)}`,
          url: reader.result as string,
          isPrimary: isFirst,
          position: formImages.length,
          altText: file.name
        };
        setFormImages((prev) => [...prev, newImage]);
        setIsDirty(true);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addImagesFromFiles(e.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) {
      addImagesFromFiles(e.dataTransfer.files);
    }
  };

  const handleReplaceImage = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormImages((prev) =>
        prev.map((img) =>
          img.id === id ? { ...img, url: reader.result as string, altText: file.name } : img
        )
      );
      setIsDirty(true);
      showToast("Image replaced successfully.");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (id: string) => {
    const toRemove = formImages.find((img) => img.id === id);
    const updated = formImages.filter((img) => img.id !== id);
    
    // If we removed the primary image, set the first remaining image as primary
    if (toRemove?.isPrimary && updated.length > 0) {
      updated[0].isPrimary = true;
    }
    
    setFormImages(updated);
    setIsDirty(true);
    showToast("Image removed.");
  };

  const handleSetPrimary = (id: string) => {
    setFormImages((prev) =>
      prev.map((img) => ({
        ...img,
        isPrimary: img.id === id
      }))
    );
    setIsDirty(true);
    showToast("Featured image updated.");
  };

  // Handle Save
  const handleFormSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName || !formCategory || !formPrice || !formStock) {
      showToast("Please fill in all required fields marked with *", "error");
      return;
    }

    const priceNum = parseFloat(formPrice);
    // formDiscount now holds the final SALE PRICE directly
    const salePriceInput = formDiscount ? parseFloat(formDiscount) : 0;
    const stockNum = parseInt(formStock);
    // Only set a salePrice if it is strictly less than the original price
    const salePrice = (salePriceInput > 0 && salePriceInput < priceNum) ? salePriceInput : undefined;

    // Build formal images structures
    const formattedImages: ProductImage[] = formImages.map((img, idx) => ({
      id: img.id,
      productId: editingId || "",
      url: img.url,
      position: idx,
      isPrimary: img.isPrimary,
      altText: img.altText || formName
    }));

    const payload: Omit<Product, "id" | "createdAt" | "updatedAt" | "category" | "slug"> = {
      name: formName,
      categoryId: formCategory,
      description: formDesc,
      price: priceNum,
      salePrice: salePrice === null ? undefined : salePrice,
      stockQty: stockNum,
      inStock: stockNum > 0,
      isFeatured: formIsFeatured,
      isTrending: formIsTrending,
      isLatest: formIsLatest,
      isActive: formIsActive,
      images: formattedImages,
      metal: "Gold",
      sku: editingId ? (products.find((p) => p.id === editingId)?.sku || "") : `SKU-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      isExclusive: false,
      isBridal: false
    };

    if (editingId) {
      editProduct(editingId, payload);
      showToast("Product changes saved successfully!");
    } else {
      addProduct(payload);
      showToast("Product added to catalog successfully!");
    }

    setFormOpen(false);
    resetForm();
  };

  // Handle Actions
  const handleDuplicate = (id: string) => {
    duplicateProduct(id);
    showToast("Product copy duplicated successfully!");
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteProduct(deleteId);
      setDeleteId(null);
      showToast("Product deleted successfully.");
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
    <div className="space-y-6 font-sans antialiased text-[#1A1A1A]">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg border text-xs uppercase tracking-wider font-semibold transition-all duration-300 transform translate-y-0 ${
          toast.type === "success" 
            ? "bg-emerald-600 text-white border-emerald-700" 
            : "bg-red-600 text-white border-red-700"
        }`}>
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          {toast.message}
        </div>
      )}

      {/* Sticky Search & Filter Header */}
      <div className="sticky top-0 z-20 bg-[#FAF8F5]/95 backdrop-blur-md pb-4 pt-1 border-b border-[#EFECE7] flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-3 flex-1 max-w-4xl">
          <div className="relative w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 stroke-[2]" />
            <input
              type="text"
              placeholder="Search by product name or SKU..."
              className="w-full bg-white border border-[#D1CFC9] text-slate-800 hover:border-slate-400 focus:border-[#C5A880] text-xs pl-10 pr-4 py-3 rounded-xl outline-none transition-all placeholder-slate-500 font-medium shadow-inner"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-700 stroke-[2]" />
            <select
              className="bg-white border border-[#D1CFC9] text-xs px-3.5 py-3 rounded-xl outline-none hover:border-slate-400 focus:border-[#C5A880] text-slate-800 font-semibold cursor-pointer shadow-sm"
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
            className="bg-white border border-[#D1CFC9] text-xs px-3.5 py-3 rounded-xl outline-none hover:border-slate-400 focus:border-[#C5A880] text-slate-800 font-semibold cursor-pointer shadow-sm"
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
          className="bg-[#C5A880] hover:bg-[#b0936b] text-white text-xs uppercase tracking-wider font-bold py-3.5 px-6 rounded-xl transition-all shadow-md shrink-0 flex items-center gap-2"
        >
          <Plus className="w-4.5 h-4.5 stroke-[2.5]" /> Add Product
        </Button>
      </div>

      {/* Products Table Card */}
      <div className="bg-white border border-[#EFECE7] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto max-h-[68vh] overflow-y-auto relative">
          <table className="w-full text-left border-collapse text-xs table-fixed">
            <thead className="sticky top-0 z-10 bg-slate-100/95 backdrop-blur-sm border-b border-[#EFECE7] shadow-sm select-none">
              <tr className="text-slate-900 uppercase tracking-wider text-[10px] font-bold">
                <th className="py-3.5 px-5 w-[42%] font-bold">Product Name &amp; SKU</th>
                <th className="py-3.5 px-4 w-[16%] font-bold">Category</th>
                <th className="py-3.5 px-4 w-[14%] font-bold">Price Details</th>
                <th className="py-3.5 px-4 w-[14%] font-bold">Inventory</th>
                <th className="py-3.5 px-4 w-[14%] font-bold">Status</th>
                <th className="py-3.5 px-5 w-[14%] font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE7] text-slate-700 font-medium">
              {currentItems.length > 0 ? (
                currentItems.map((p) => {
                  const primaryImg = p.images.find(img => img.isPrimary)?.url || p.images[0]?.url;
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      
                      {/* Name & SKU & Image */}
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 shrink-0 relative bg-slate-50 flex items-center justify-center">
                            {primaryImg ? (
                              <img
                                src={primaryImg}
                                alt={p.name}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <Package className="w-5 h-5 text-slate-400" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-slate-900 truncate leading-snug tracking-wide">
                              {p.name}
                            </h4>
                            <p className="text-[10px] text-slate-900 mt-1 uppercase tracking-wider font-mono bg-slate-100 px-2 py-0.5 rounded-md inline-block">
                              {p.sku}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4">
                        <span className="text-xs text-slate-900 bg-slate-50 border border-slate-100 px-2 py-1 rounded-md uppercase tracking-wider font-bold">
                          {p.category.name}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4">
                        <div className="space-y-0.5 text-slate-900">
                          <p className="font-bold text-sm">₹{p.price.toLocaleString("en-IN")}</p>
                          {p.salePrice && (
                            <p className="text-[10px] text-red-600 line-through">₹{p.price.toLocaleString("en-IN")}</p>
                          )}
                        </div>
                      </td>

                      {/* Stock */}
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                          p.stockQty > 5 
                            ? "bg-green-50 text-green-800 border-green-200" 
                            : p.stockQty > 0 
                              ? "bg-amber-50 text-amber-800 border-amber-200" 
                              : "bg-red-50 text-red-800 border-red-200"
                        }`}>
                          {p.stockQty > 0 ? `${p.stockQty} In Stock` : "Out of Stock"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                          p.isActive 
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
                            : "bg-zinc-100 text-zinc-700 border-zinc-200"
                        }`}>
                          {p.isActive ? "Published" : "Draft"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setPreviewProduct(p)}
                            title="Preview Lightbox"
                            className="p-2 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDuplicate(p.id)}
                            title="Duplicate Product"
                            className="p-2 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(p)}
                            title="Edit Product"
                            className="p-2 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteId(p.id)}
                            title="Delete Product"
                            className="p-2 hover:bg-red-50 text-red-500 hover:text-red-700 rounded-lg transition-colors border border-transparent hover:border-red-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-700 font-bold">
                    No products found matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="px-6 py-4 bg-slate-50 border-t border-[#EFECE7] flex items-center justify-between">
            <span className="text-xs text-slate-900 font-bold">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} entries
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((c) => Math.max(c - 1, 1))}
                className="p-2 border border-[#D1CFC9] bg-white rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                <ChevronLeft className="w-4.5 h-4.5 text-slate-700" />
              </button>
              <span className="text-xs text-slate-900 font-bold px-2.5">{currentPage} / {totalPages}</span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((c) => Math.min(c + 1, totalPages))}
                className="p-2 border border-[#D1CFC9] bg-white rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                <ChevronRight className="w-4.5 h-4.5 text-slate-700" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Form Modal Dialog Overlay */}
      {formOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto select-none">
          <div className="bg-white rounded-2xl max-w-4xl w-full my-6 border border-[#EFECE7] shadow-2xl flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header - sticky */}
            <div className="flex items-center justify-between p-8 pb-4 border-b border-[#EFECE7] shrink-0">
              <h3 className="font-serif text-xl text-slate-950 font-bold">
                {editingId ? "Edit Product Details" : "Create New Product"}
              </h3>
              <button
                onClick={handleCloseAttempt}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600 hover:text-slate-900 border border-transparent hover:border-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form - scrollable body */}
            <form onSubmit={handleFormSave} className="flex flex-col flex-1">
              <div className="overflow-y-auto px-8 py-6 space-y-6 max-h-[65vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Product Name */}
                <div className="space-y-2">
                  <Label htmlFor="prod-name" className="text-xs uppercase tracking-wider font-bold text-slate-900">
                    Product Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="prod-name"
                    required
                    placeholder="Enter product title (e.g., Antique Temple Haram)"
                    className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] text-slate-900 font-bold"
                    value={formName}
                    onChange={(e) => handleFieldChange(setFormName, e.target.value)}
                  />
                </div>

                {/* Category Select */}
                <div className="space-y-2">
                  <Label htmlFor="prod-category" className="text-xs uppercase tracking-wider font-bold text-slate-900">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="prod-category"
                    required
                    className="w-full bg-white border border-[#D1CFC9] text-xs px-3.5 py-3 rounded-xl outline-none hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold cursor-pointer shadow-sm"
                    value={formCategory}
                    onChange={(e) => handleFieldChange(setFormCategory, e.target.value)}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <Label htmlFor="prod-price" className="text-xs uppercase tracking-wider font-bold text-slate-900">
                    Base Price (₹) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="prod-price"
                    type="number"
                    required
                    placeholder="e.g. 2999"
                    className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold"
                    value={formPrice}
                    onChange={(e) => handleFieldChange(setFormPrice, e.target.value)}
                  />
                </div>

                {/* Sale Price (Discount) */}
                <div className="space-y-2">
                  <Label htmlFor="prod-discount" className="text-xs uppercase tracking-wider font-bold text-slate-900">
                    Sale Price (₹) <span className="text-slate-500 text-[10px] font-normal normal-case tracking-normal">— optional, must be less than MRP</span>
                  </Label>
                  <Input
                    id="prod-discount"
                    type="number"
                    placeholder={formPrice ? `e.g. ${Math.round(parseFloat(formPrice || "0") * 0.9)} (leave blank = no discount)` : "e.g. 1800"}
                    className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold"
                    value={formDiscount}
                    onChange={(e) => handleFieldChange(setFormDiscount, e.target.value)}
                  />
                  {formDiscount && formPrice && parseFloat(formDiscount) >= parseFloat(formPrice) && (
                    <p className="text-[10px] text-red-600 font-bold mt-1">⚠ Sale price must be less than MRP (₹{formPrice}). Discount will not apply.</p>
                  )}
                  {formDiscount && formPrice && parseFloat(formDiscount) > 0 && parseFloat(formDiscount) < parseFloat(formPrice) && (
                    <p className="text-[10px] text-emerald-700 font-bold mt-1">✓ Customer saves ₹{(parseFloat(formPrice) - parseFloat(formDiscount)).toFixed(0)} ({Math.round(((parseFloat(formPrice) - parseFloat(formDiscount)) / parseFloat(formPrice)) * 100)}% off)</p>
                  )}
                </div>

                {/* Stock Quantity */}
                <div className="space-y-2">
                  <Label htmlFor="prod-stock" className="text-xs uppercase tracking-wider font-bold text-slate-900">
                    Stock Quantity <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="prod-stock"
                    type="number"
                    required
                    placeholder="e.g. 15"
                    className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold"
                    value={formStock}
                    onChange={(e) => handleFieldChange(setFormStock, e.target.value)}
                  />
                </div>

              </div>

              {/* Advanced Image Management Area */}
              <div className="space-y-3.5 border-t border-[#EFECE7] pt-6">
                <Label className="text-xs uppercase tracking-wider font-bold text-slate-900 block">
                  Product Image Management <span className="text-red-500">*</span>
                </Label>
                
                {/* Drag and Drop Box */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`w-full flex flex-col items-center justify-center border-2 border-dashed rounded-xl py-6 cursor-pointer text-xs font-bold gap-2 transition-all select-none ${
                    dragOver
                      ? "border-[#C5A880] bg-[#C5A880]/5 text-[#C5A880]"
                      : "border-[#D1CFC9] hover:border-slate-400 bg-slate-50 text-slate-700"
                  }`}
                >
                  <Upload className={`w-8 h-8 ${dragOver ? "text-[#C5A880] animate-bounce" : "text-slate-400"}`} />
                  <span>Drag &amp; drop product images here, or</span>
                  <label className="px-3.5 py-1.5 bg-[#C5A880] hover:bg-[#b0936b] text-white rounded-lg transition-colors cursor-pointer inline-block text-[10px] uppercase font-bold tracking-wider">
                    Browse Files
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageFileChange}
                    />
                  </label>
                  <p className="text-[10px] text-slate-500 font-normal mt-0.5">Supports PNG, JPG, JPEG. Max size 2MB per file.</p>
                </div>

                {/* Images Thumbnails Grid */}
                {formImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 pt-3">
                    {formImages.map((img) => (
                      <div
                        key={img.id}
                        className={`group relative rounded-xl border overflow-hidden bg-slate-50 flex flex-col justify-between aspect-square transition-all border-slate-200 ${
                          img.isPrimary ? "ring-2 ring-[#C5A880]" : "hover:border-slate-300"
                        }`}
                      >
                        
                        {/* Image Thumbnail */}
                        <div className="relative flex-grow overflow-hidden bg-slate-100 flex items-center justify-center">
                          <img
                            src={img.url}
                            alt="Product"
                            className="object-cover w-full h-full"
                          />
                          
                          {/* Image Action Overlays */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                            {/* Replace */}
                            <label className="p-1.5 bg-white/20 hover:bg-white/40 text-white rounded-lg cursor-pointer transition-colors" title="Replace Image">
                              <RefreshCw className="w-4.5 h-4.5" />
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleReplaceImage(img.id, file);
                                }}
                              />
                            </label>
                            {/* Remove */}
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(img.id)}
                              className="p-1.5 bg-red-600/30 hover:bg-red-600 text-white rounded-lg transition-colors"
                              title="Delete Image"
                            >
                              <Trash className="w-4.5 h-4.5" />
                            </button>
                          </div>
                        </div>

                        {/* Control Bar */}
                        <div className="bg-slate-100 border-t border-slate-200 p-2 flex items-center justify-between shrink-0">
                          {img.isPrimary ? (
                            <span className="text-[9px] uppercase tracking-wider font-bold text-[#C5A880] flex items-center gap-1">
                              <Star className="w-3 h-3 fill-[#C5A880] stroke-[#C5A880]" /> Main Image
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSetPrimary(img.id)}
                              className="text-[9px] uppercase tracking-wider font-bold text-slate-700 hover:text-[#C5A880] transition-colors"
                            >
                              Set Main
                            </button>
                          )}
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2 border-t border-[#EFECE7] pt-6">
                <Label htmlFor="prod-desc" className="text-xs uppercase tracking-wider font-bold text-slate-900">
                  Description
                </Label>
                <textarea
                  id="prod-desc"
                  placeholder="Enter detailed product specifications, materials used, size metrics..."
                  rows={4}
                  className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold resize-none mt-1"
                  value={formDesc}
                  onChange={(e) => handleFieldChange(setFormDesc, e.target.value)}
                />
              </div>

              {/* Checkbox Options Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <label className="flex items-center gap-2.5 text-xs text-slate-900 font-bold select-none cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-slate-400 text-[#C5A880] focus:ring-[#C5A880] w-4.5 h-4.5"
                    checked={formIsFeatured}
                    onChange={(e) => handleFieldChange(setFormIsFeatured, e.target.checked)}
                  />
                  Featured Product
                </label>
                <label className="flex items-center gap-2.5 text-xs text-slate-900 font-bold select-none cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-slate-400 text-[#C5A880] focus:ring-[#C5A880] w-4.5 h-4.5"
                    checked={formIsTrending}
                    onChange={(e) => handleFieldChange(setFormIsTrending, e.target.checked)}
                  />
                  Trending Product
                </label>
                <label className="flex items-center gap-2.5 text-xs text-slate-900 font-bold select-none cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-slate-400 text-[#C5A880] focus:ring-[#C5A880] w-4.5 h-4.5"
                    checked={formIsLatest}
                    onChange={(e) => handleFieldChange(setFormIsLatest, e.target.checked)}
                  />
                  Best Seller / New
                </label>
                <label className="flex items-center gap-2.5 text-xs text-slate-900 font-bold select-none cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-slate-400 text-[#C5A880] focus:ring-[#C5A880] w-4.5 h-4.5"
                    checked={formIsActive}
                    onChange={(e) => handleFieldChange(setFormIsActive, e.target.checked)}
                  />
                  Publish Instantly
                </label>
              </div>

              </div>

              {/* Form Actions - always visible at bottom */}
              <div className="flex justify-end gap-3.5 p-8 pt-5 border-t border-[#EFECE7] shrink-0 bg-white rounded-b-2xl">
                <Button
                  type="button"
                  onClick={handleCloseAttempt}
                  className="bg-white border border-[#D1CFC9] text-slate-800 hover:bg-slate-50 text-xs uppercase tracking-wider font-bold py-3.5 px-6 rounded-xl shadow-sm"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#C5A880] hover:bg-[#b0936b] text-white text-xs uppercase tracking-wider font-bold py-3.5 px-8 rounded-xl transition-colors shadow-md"
                >
                  Save Product
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Discard Warning Modal Dialog */}
      {showDiscardWarning && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full border border-red-200 shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <AlertTriangle className="w-6 h-6 stroke-[2]" />
              <h3 className="font-serif text-lg font-bold">Unsaved Changes</h3>
            </div>
            <p className="text-xs text-slate-800 font-medium leading-relaxed mb-6">
              You have made modifications to this product form. Closing now will discard all unsaved edits. Are you sure you want to exit?
            </p>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setShowDiscardWarning(false)}
                className="bg-white border border-[#D1CFC9] text-slate-800 hover:bg-slate-50 text-xs uppercase tracking-wider font-bold py-2.5 px-4 rounded-xl shadow-sm"
              >
                Keep Editing
              </Button>
              <Button
                onClick={confirmDiscard}
                className="bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-wider font-bold py-2.5 px-4 rounded-xl shadow-md"
              >
                Discard Edits
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full border border-[#EFECE7] shadow-xl p-6 relative animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-serif text-lg text-slate-950 font-bold mb-2">Confirm Deletion</h3>
            <p className="text-xs text-slate-800 font-medium leading-relaxed mb-6">
              Are you sure you want to delete this product? This action cannot be undone and will immediately remove the item from the customer catalog.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setDeleteId(null)}
                className="bg-white border border-[#D1CFC9] text-slate-800 hover:bg-slate-50 text-xs uppercase tracking-wider font-bold py-2.5 px-4 rounded-xl shadow-sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-wider font-bold py-2.5 px-4 rounded-xl shadow-md"
              >
                Delete Product
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox / Preview modal */}
      {previewProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 select-none">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95 duration-250">
            <button
              onClick={() => setPreviewProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 rounded-full transition-colors text-white border border-white/20"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="relative aspect-square bg-slate-50 flex items-center justify-center">
              {previewProduct.images[0] ? (
                <img
                  src={previewProduct.images.find(img => img.isPrimary)?.url || previewProduct.images[0].url}
                  alt={previewProduct.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <Package className="w-16 h-16 text-slate-400" />
              )}
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-[10px] text-[#C5A880] uppercase tracking-wider font-bold">
                  {previewProduct.category.name}
                </p>
                <h3 className="font-serif text-xl text-slate-950 font-bold mt-1 leading-tight">{previewProduct.name}</h3>
                <p className="text-[10px] text-slate-900 uppercase tracking-wider mt-1 font-mono">{previewProduct.sku}</p>
              </div>
              <p className="text-xs text-slate-800 font-medium leading-relaxed line-clamp-3">
                {previewProduct.description || "No description provided for this product."}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="font-serif text-xl text-slate-950 font-bold">
                  ₹{previewProduct.price.toLocaleString("en-IN")}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                  previewProduct.stockQty > 0 ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"
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
