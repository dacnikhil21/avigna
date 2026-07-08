"use client";

import { useState, useEffect } from "react";
import type { Category, Product } from "@/types";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Folder,
  Upload,
  CheckCircle2,
  X,
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function CategoriesTab() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products?limit=250");
      const data = await res.json();
      setProducts(data && Array.isArray(data.items) ? data.items : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    Promise.all([fetchCategories(), fetchProducts()]);
  }, []);

  // Modal Views
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formIsActive, setFormIsActive] = useState(true);
  const [formSortOrder, setFormSortOrder] = useState<number>(1);

  // Dirty state warning
  const [isDirty, setIsDirty] = useState(false);
  const [showDiscardWarning, setShowDiscardWarning] = useState(false);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFieldChange = <T,>(setter: (v: T) => void, val: T) => {
    setter(val);
    setIsDirty(true);
  };

  const resetForm = () => {
    setFormName("");
    setFormDesc("");
    setFormImage("");
    setFormIsActive(true);
    setFormSortOrder(categories.length + 1);
    setEditingId(null);
    setIsDirty(false);
  };

  const handleOpenAdd = () => {
    resetForm();
    setFormOpen(true);
  };

  const handleOpenEdit = (category: Category) => {
    setFormName(category.name);
    setFormDesc(category.description || "");
    setFormImage(category.image || "");
    setFormIsActive(category.isActive);
    setFormSortOrder(category.sortOrder);
    setEditingId(category.id);
    setFormOpen(true);
    setIsDirty(false);
  };

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
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormImage(reader.result as string);
        setIsDirty(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName) {
      showToast("Please enter a category name", "error");
      return;
    }

    const payload = {
      name: formName,
      description: formDesc,
      image: formImage || "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
      isActive: formIsActive,
      sortOrder: Number(formSortOrder)
    };

    try {
      if (editingId) {
        const res = await fetch(`/api/admin/categories/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          showToast("Category updated successfully!");
          fetchCategories();
        } else {
          showToast("Failed to update category.", "error");
        }
      } else {
        const res = await fetch("/api/admin/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          showToast("Category created successfully!");
          fetchCategories();
        } else {
          showToast("Failed to create category.", "error");
        }
      }
    } catch (err) {
      console.error(err);
      showToast("Error saving category.", "error");
    }

    setFormOpen(false);
    resetForm();
  };

  const handleDeleteConfirm = async () => {
    if (deleteId) {
      const productCount = products.filter((p) => p.categoryId === deleteId).length;
      if (productCount > 0) {
        showToast(`Cannot delete: Category has ${productCount} associated products`, "error");
        setDeleteId(null);
        return;
      }
      try {
        const res = await fetch(`/api/admin/categories/${deleteId}`, {
          method: "DELETE",
        });
        if (res.ok) {
          showToast("Category deleted successfully!");
          fetchCategories();
        } else {
          const errData = await res.json();
          showToast(errData.error || "Failed to delete category.", "error");
        }
      } catch (err) {
        console.error(err);
        showToast("Error deleting category.", "error");
      }
      setDeleteId(null);
    }
  };

  const handleToggleHide = async (id: string, name: string, currentlyActive: boolean) => {
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentlyActive }),
      });
      if (res.ok) {
        showToast(`Category "${name}" is now ${currentlyActive ? "hidden" : "visible"}.`);
        fetchCategories();
      } else {
        showToast("Failed to toggle visibility.", "error");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Sort categories by sortOrder ascending
  const sortedCategories = [...categories].sort((a, b) => a.sortOrder - b.sortOrder);

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

      {/* Control Banner */}
      <div className="flex items-center justify-between border-b border-[#EFECE7] pb-4">
        <div>
          <p className="text-xs text-slate-800 font-bold">
            Configure your active showroom structures, category headers, and sort order layout display.
          </p>
        </div>
        <Button
          onClick={handleOpenAdd}
          className="bg-[#C5A880] hover:bg-[#b0936b] text-white text-xs uppercase tracking-wider font-bold py-3 px-5 rounded-xl transition-all shadow-md shrink-0 flex items-center gap-2"
        >
          <Plus className="w-4 h-4 mr-1.5 stroke-[2.5]" /> Add Category
        </Button>
      </div>

      {/* Categories Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedCategories.map((c) => {
          const productCount = products.filter((p) => p.categoryId === c.id).length;
          return (
            <div
              key={c.id}
              className={`bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group ${
                c.isActive ? "border-[#EFECE7]" : "border-dashed border-red-300 opacity-80"
              }`}
            >
              
              {/* Image Banner */}
              <div className="relative h-44 bg-slate-50 overflow-hidden shrink-0">
                {c.image ? (
                  <img
                    src={c.image}
                    alt={c.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <Folder className="w-10 h-10 stroke-[1.5]" />
                  </div>
                )}
                
                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                    c.isActive 
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
                      : "bg-red-50 text-red-800 border-red-200"
                  }`}>
                    {c.isActive ? "Active" : "Hidden"}
                  </span>
                  <span className="bg-slate-900/80 text-white px-2 py-0.5 rounded-full text-[8.5px] font-mono font-bold tracking-wide uppercase self-start">
                    Order: {c.sortOrder}
                  </span>
                </div>
              </div>

              {/* Card Contents */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-base text-slate-950 font-bold tracking-wide">{c.name}</h4>
                  <p className="text-xs text-slate-800 mt-2 font-medium line-clamp-2 leading-relaxed">
                    {c.description || "No description provided."}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                  <span className="text-[10px] uppercase tracking-wider text-slate-900 font-bold">
                    {productCount} {productCount === 1 ? "Product" : "Products"}
                  </span>
                  
                  {/* Action Controls */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleHide(c.id, c.name, c.isActive)}
                      title={c.isActive ? "Hide Category" : "Show Category"}
                      className="p-2 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                    >
                      {c.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleOpenEdit(c)}
                      title="Edit Category"
                      className="p-2 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteId(c.id)}
                      title="Delete Category"
                      className="p-2 hover:bg-slate-100 text-slate-600 hover:text-red-600 rounded-lg transition-colors border border-transparent hover:border-red-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Add / Edit Form Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-[#EFECE7] shadow-xl p-8 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#EFECE7] mb-6">
              <h3 className="font-serif text-lg text-slate-950 font-bold">
                {editingId ? "Edit Category Details" : "Create New Category"}
              </h3>
              <button
                onClick={handleCloseAttempt}
                className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-600 hover:text-slate-900 border border-transparent hover:border-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSave} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="cat-name" className="text-xs uppercase tracking-wider font-bold text-slate-900">
                  Category Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="cat-name"
                  required
                  placeholder="e.g. Earrings"
                  className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold"
                  value={formName}
                  onChange={(e) => handleFieldChange(setFormName, e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cat-desc" className="text-xs uppercase tracking-wider font-bold text-slate-900">
                  Description
                </Label>
                <textarea
                  id="cat-desc"
                  placeholder="Enter category summary description"
                  rows={3}
                  className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold resize-none mt-1"
                  value={formDesc}
                  onChange={(e) => handleFieldChange(setFormDesc, e.target.value)}
                />
              </div>

              {/* Display Sort Order */}
              <div className="space-y-2">
                <Label htmlFor="cat-sort" className="text-xs uppercase tracking-wider font-bold text-slate-900">
                  Display Order Sort Order
                </Label>
                <Input
                  id="cat-sort"
                  type="number"
                  required
                  className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold"
                  value={formSortOrder}
                  onChange={(e) => handleFieldChange(setFormSortOrder, parseInt(e.target.value) || 1)}
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider font-bold text-slate-900">
                  Category Banner Image
                </Label>

                {/* Upload trigger */}
                <label className="flex flex-col items-center justify-center border border-dashed border-[#D1CFC9] hover:border-[#C5A880] py-4 rounded-xl cursor-pointer text-xs font-bold text-slate-700 gap-1.5 bg-slate-50 transition-colors">
                  <Upload className="w-5 h-5 text-slate-400" />
                  <span>Click to Choose File</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageFileChange}
                  />
                </label>

                {/* Preview + Replace + Remove controls */}
                {formImage && (
                  <div className="flex items-center gap-4 mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="w-14 h-14 rounded-lg border border-slate-200 overflow-hidden shrink-0 bg-white flex items-center justify-center">
                      <img
                        src={formImage}
                        alt="Category Preview"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">Image selected</p>
                      <p className="text-[10px] text-slate-600 font-medium mt-0.5">Click Replace to change or Remove to delete</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Replace */}
                      <label className="p-2 bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200 cursor-pointer transition-colors" title="Replace Image">
                        <RefreshCw className="w-4 h-4" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageFileChange}
                        />
                      </label>
                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => {
                          setFormImage("");
                          setIsDirty(true);
                          showToast("Image removed.");
                        }}
                        className="p-2 bg-white hover:bg-red-50 text-red-500 hover:text-red-700 rounded-lg border border-slate-200 hover:border-red-200 transition-colors"
                        title="Remove Image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Visibility Switch */}
              <label className="flex items-center gap-2.5 text-xs text-slate-900 font-bold select-none cursor-pointer p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <input
                  type="checkbox"
                  className="rounded border-slate-400 text-[#C5A880] focus:ring-[#C5A880] w-4.5 h-4.5"
                  checked={formIsActive}
                  onChange={(e) => handleFieldChange(setFormIsActive, e.target.checked)}
                />
                Active &amp; Visible on Customer Website
              </label>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#EFECE7] mt-6">
                <Button
                  type="button"
                  onClick={handleCloseAttempt}
                  className="bg-white border border-[#D1CFC9] text-slate-800 hover:bg-slate-50 text-xs uppercase tracking-wider font-bold py-3 px-5 rounded-xl shadow-sm"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#C5A880] hover:bg-[#b0936b] text-white text-xs uppercase tracking-wider font-bold py-3 px-5 rounded-xl transition-all shadow-md"
                >
                  Save Category
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Discard Warning Dialog */}
      {showDiscardWarning && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full border border-red-200 shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <AlertTriangle className="w-6 h-6 stroke-[2]" />
              <h3 className="font-serif text-lg font-bold">Unsaved Changes</h3>
            </div>
            <p className="text-xs text-slate-800 font-medium leading-relaxed mb-6">
              You have made modifications to this category form. Closing now will discard all unsaved edits. Are you sure you want to exit?
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
            <h3 className="font-serif text-lg text-slate-950 font-bold mb-2">Delete Category</h3>
            <p className="text-xs text-slate-800 font-medium leading-relaxed mb-6">
              Are you sure you want to delete this category? This operation is blocked if there are products linked to it.
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
                Delete Category
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
