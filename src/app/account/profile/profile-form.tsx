"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ProfileForm({ customer }: { customer: { name?: string | null, phone?: string | null, email?: string | null } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: customer?.name || "",
    phone: customer?.phone || "",
  });

  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/account/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update profile");

      setSuccessMsg("Profile details updated successfully!");
      toast.success("Profile updated successfully!");
      setTimeout(() => setSuccessMsg(null), 4000);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      {successMsg && (
        <div className="p-3 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg">
          ✓ {successMsg}
        </div>
      )}

      <div>
        <Label htmlFor="name" className="text-xs">Full Name</Label>
        <Input 
          id="name" 
          value={form.name} 
          onChange={(e) => setForm({ ...form, name: e.target.value })} 
          className="mt-1 text-sm" 
          placeholder="Your full name"
        />
      </div>
      <div>
        <Label htmlFor="email" className="text-xs">Email Address</Label>
        <Input 
          id="email" 
          type="email" 
          value={customer?.email || ""} 
          disabled 
          className="mt-1 bg-gray-50 text-sm text-gray-500 cursor-not-allowed" 
        />
        <p className="text-[10px] text-luxury-muted mt-1">Email address is bound to your account and cannot be changed.</p>
      </div>
      <div>
        <Label htmlFor="phone" className="text-xs">Mobile Number</Label>
        <Input 
          id="phone" 
          value={form.phone} 
          onChange={(e) => setForm({ ...form, phone: e.target.value })} 
          className="mt-1 text-sm" 
          placeholder="10-digit mobile number"
        />
      </div>
      <Button type="submit" variant="gold" size="sm" disabled={loading} className="text-xs font-medium">
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
