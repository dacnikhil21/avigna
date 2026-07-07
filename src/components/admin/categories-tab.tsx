"use client";

import { useState } from "react";
import { useAdminStore } from "@/lib/store/admin-store";
import type { Category } from "@/types";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Folder,
  Upload,
  CheckCircle2,
  X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function CategoriesTab() {
  const {
    categories,
    products,
    addCategory,
    editCategory,
    deleteCategory,
    toggleHideCategory
  } = useAdminStore();

  // Modal Views
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form State
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formIsActive, setFormIsActive] = useState(true);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const resetForm = () => {
    setFormName("");
    setFormDesc("");
    setFormImage("");
    setFormIsActive(true);
    setEditingId(null);
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
    setEditingId(category.id);
    setFormOpen(true);
  };

  // Image Upload File Reader
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

  const handleFormSave = (e: React.FormEvent) => {
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
      sortOrder: categories.length + 1
    };

    if (editingId) {
      editCategory(editingId, payload);
      showToast("Category updated successfully!");
    } else {
      addCategory(payload);
      showToast("Category created successfully!");
    }

    setFormOpen(false);
    resetForm();
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      // Check if any product is using this category
      const productCount = products.filter((p) => p.categoryId === deleteId).length;
      if (productCount > 0) {
        showToast(`Cannot delete: Category has ${productCount} associated products`, "error");
        setDeleteId(null);
        return;
      }
      deleteCategory(deleteId);
      setDeleteId(null);
      showToast("Category deleted successfully!");
    }
  };

  const handleToggleHide = (id: string, name: string, currentlyActive: boolean) => {
    toggleHideCategory(id);
    showToast(`Category "${name}" is now ${currentlyActive ? "hidden" : "visible"}.`);
  };

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
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-luxury-muted font-light">
            Manage your jewellery categories and store collections structures.
          </p>
        </div>
        <Button
          onClick={handleOpenAdd}
          className="bg-[#121212] hover:bg-[#C5A880] text-white text-xs uppercase tracking-wider font-semibold py-3 px-5 rounded-xl transition-colors shrink-0"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Category
        </Button>
      </div>

      {/* Categories Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((c) => {
          const productCount = products.filter((p) => p.categoryId === c.id).length;
          return (
            <div
              key={c.id}
              className={`bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group ${
                c.isActive ? "border-[#EFECE7]" : "border-dashed border-red-200 opacity-60"
              }`}
            >
              
              {/* Image Banner */}
              <div className="relative h-40 bg-gray-50 overflow-hidden shrink-0">
                {c.image ? (
                  <img
                    src={c.image}
                    alt={c.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Folder className="w-8 h-8 stroke-[1.5]" />
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-wider border ${
                    c.isActive 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200/50" 
                      : "bg-red-50 text-red-700 border-red-200/50"
                  }`}>
                    {c.isActive ? "Active" : "Hidden"}
                  </span>
                </div>
              </div>

              {/* Card Contents */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-base text-[#121212] font-normal tracking-wide">{c.name}</h4>
                  <p className="text-xs text-luxury-muted mt-2 font-light line-clamp-2 leading-relaxed">
                    {c.description || "No description provided."}
                  </p>
                </div>
                
                <div className="pt-5 border-t border-gray-100 flex items-center justify-between mt-4">
                  <span className="text-[10px] uppercase tracking-wider text-luxury-muted font-sans font-light">
                    {productCount} {productCount === 1 ? "Product" : "Products"}
                  </span>
                  
                  {/* Action Controls */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleHide(c.id, c.name, c.isActive)}
                      title={c.isActive ? "Hide Category" : "Show Category"}
                      className="p-2 hover:bg-gray-100 text-gray-400 hover:text-gray-700 rounded-lg transition-colors"
                    >
                      {c.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleOpenEdit(c)}
                      title="Edit Category"
                      className="p-2 hover:bg-gray-100 text-gray-400 hover:text-gray-700 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteId(c.id)}
                      title="Delete Category"
                      className="p-2 hover:bg-gray-100 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
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
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-[#EFECE7] shadow-xl p-8 relative animate-in fade-in zoom-in-95 duration-250">
            <div className="flex items-center justify-between pb-4 border-b border-[#EFECE7] mb-6">
              <h3 className="font-serif text-lg text-[#121212] font-light">
                {editingId ? "Edit Category Details" : "Create New Category"}
              </h3>
              <button
                onClick={() => setFormOpen(false)}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSave} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="cat-name" className="text-xs uppercase tracking-wider font-light text-[#121212]">
                  Category Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="cat-name"
                  required
                  placeholder="e.g. Earrings"
                  className="input-luxury rounded-xl"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="cat-desc" className="text-xs uppercase tracking-wider font-light text-[#121212]">
                  Description
                </Label>
                <textarea
                  id="cat-desc"
                  placeholder="Enter category summary"
                  rows={3}
                  className="input-luxury rounded-xl resize-none mt-1"
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-1.5">
                <Label className="text-xs uppercase tracking-wider font-light text-[#121212]">
                  Category Banner Image
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

              {/* Visibility Switch */}
              <label className="flex items-center gap-2.5 text-xs text-[#121212] select-none cursor-pointer p-3 bg-gray-50 rounded-xl">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#C5A880] focus:ring-[#C5A880] w-4 h-4"
                  checked={formIsActive}
                  onChange={(e) => setFormIsActive(e.target.checked)}
                />
                Active &amp; Visible on Customer Website
              </label>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#EFECE7] mt-6">
                <Button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="bg-white border border-[#EFECE7] text-[#121212] hover:bg-gray-50 text-xs uppercase tracking-wider font-medium py-3 px-5 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#121212] hover:bg-[#C5A880] text-white text-xs uppercase tracking-wider font-semibold py-3 px-5 rounded-xl transition-colors"
                >
                  Save Category
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
            <h3 className="font-serif text-lg text-[#121212] mb-2 font-normal">Delete Category</h3>
            <p className="text-xs text-luxury-muted font-light leading-relaxed mb-6">
              Are you sure you want to delete this category? This operation is blocked if there are products linked to it.
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
                Delete Category
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
