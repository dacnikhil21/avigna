"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MapPin, Plus, Trash2, Edit2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Address = {
  id: string;
  fullName: string;
  mobile: string;
  houseFlat: string;
  street: string;
  area: string | null;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
};

export function AddressClient({ initialAddresses }: { initialAddresses: Address[] }) {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const emptyForm = {
    fullName: "",
    mobile: "",
    houseFlat: "",
    street: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  };
  const [form, setForm] = useState(emptyForm);

  const handleOpenNew = () => {
    setForm(emptyForm);
    setEditingId(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (addr: Address) => {
    setForm({
      fullName: addr.fullName,
      mobile: addr.mobile,
      houseFlat: addr.houseFlat,
      street: addr.street,
      area: addr.area || "",
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      isDefault: addr.isDefault,
    });
    setEditingId(addr.id);
    setIsFormOpen(true);
  };

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/account/addresses?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Address deleted successfully");
      setDeletingId(null);
      router.refresh();
    } catch (err) {
      toast.error("Error deleting address");
    }
  };

  const handleSetDefault = async (addr: Address) => {
    try {
      const res = await fetch(`/api/account/addresses`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...addr, isDefault: true }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Default address updated");
      router.refresh();
    } catch (err) {
      toast.error("Error updating default address");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { id: editingId, ...form } : form;
      
      const res = await fetch("/api/account/addresses", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to save address");
      
      toast.success(editingId ? "Address updated" : "Address added");
      setIsFormOpen(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error saving address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-serif">Saved Addresses</h2>
        {!isFormOpen && (
          <Button onClick={handleOpenNew} variant="outline" size="sm" className="gap-2">
            <Plus className="w-4 h-4" /> Add New
          </Button>
        )}
      </div>

      {isFormOpen ? (
        <div className="bg-white p-6 border rounded-2xl mb-8">
          <h3 className="font-serif text-lg mb-4">{editingId ? "Edit Address" : "Add New Address"}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Full Name</Label>
              <Input required value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} className="mt-1" />
            </div>
            <div>
              <Label>Mobile Number</Label>
              <Input required value={form.mobile} onChange={e => setForm({...form, mobile: e.target.value})} className="mt-1" />
            </div>
            <div>
              <Label>House / Flat No.</Label>
              <Input required value={form.houseFlat} onChange={e => setForm({...form, houseFlat: e.target.value})} className="mt-1" />
            </div>
            <div>
              <Label>Street Address</Label>
              <Input required value={form.street} onChange={e => setForm({...form, street: e.target.value})} className="mt-1" />
            </div>
            <div>
              <Label>Area / Landmark (Optional)</Label>
              <Input value={form.area} onChange={e => setForm({...form, area: e.target.value})} className="mt-1" />
            </div>
            <div>
              <Label>City</Label>
              <Input required value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="mt-1" />
            </div>
            <div>
              <Label>State</Label>
              <Input required value={form.state} onChange={e => setForm({...form, state: e.target.value})} className="mt-1" />
            </div>
            <div>
              <Label>Pincode</Label>
              <Input required value={form.pincode} onChange={e => setForm({...form, pincode: e.target.value})} className="mt-1" />
            </div>
            <div className="md:col-span-2 flex items-center gap-2 mt-2">
              <input 
                type="checkbox" 
                id="isDefault" 
                checked={form.isDefault}
                onChange={e => setForm({...form, isDefault: e.target.checked})}
                className="w-4 h-4 text-luxury-gold focus:ring-luxury-gold border-gray-300 rounded"
              />
              <Label htmlFor="isDefault" className="cursor-pointer">Set as default shipping address</Label>
            </div>
            <div className="md:col-span-2 flex gap-3 mt-4">
              <Button type="submit" variant="gold" disabled={loading}>
                {loading ? "Saving..." : "Save Address"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      ) : initialAddresses.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <MapPin className="w-8 h-8 mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No addresses saved</h3>
          <p className="text-sm text-gray-500 mb-4">Add an address for a faster checkout experience.</p>
          <Button onClick={handleOpenNew} variant="gold">Add Address</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {initialAddresses.map((address) => (
            <div key={address.id} className="border border-gray-200 p-4 rounded-xl relative group">
              {address.isDefault && (
                <span className="absolute top-4 right-4 bg-luxury-cream text-luxury-gold text-[10px] font-bold uppercase px-2 py-1 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Default
                </span>
              )}
              <h4 className="font-medium text-luxury-black mb-1">{address.fullName}</h4>
              <p className="text-sm text-gray-600 mb-1">{address.mobile}</p>
              <p className="text-sm text-gray-600">
                {address.houseFlat}, {address.street}
                {address.area && `, ${address.area}`}
                <br />
                {address.city}, {address.state} {address.pincode}
              </p>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                <button onClick={() => handleOpenEdit(address)} className="text-xs flex items-center gap-1 text-luxury-gold font-medium hover:underline">
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                {deletingId === address.id ? (
                  <div className="flex items-center gap-2 bg-red-50 px-2 py-1 rounded">
                    <span className="text-xs text-red-600 font-medium">Delete?</span>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="text-xs font-bold text-red-600 hover:underline"
                    >
                      Yes
                    </button>
                    <span className="text-xs text-gray-300">|</span>
                    <button
                      onClick={() => setDeletingId(null)}
                      className="text-xs text-gray-500 hover:underline"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setDeletingId(address.id)} className="text-xs flex items-center gap-1 text-red-600 font-medium hover:underline">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                )}
                {!address.isDefault && (
                  <button onClick={() => handleSetDefault(address)} className="text-xs ml-auto text-gray-500 hover:text-luxury-gold font-medium hover:underline">
                    Set Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
