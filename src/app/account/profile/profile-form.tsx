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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/account/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update profile");

      toast.success("Profile updated successfully!");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input 
          id="name" 
          value={form.name} 
          onChange={(e) => setForm({ ...form, name: e.target.value })} 
          className="mt-1.5" 
        />
      </div>
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input 
          id="email" 
          type="email" 
          value={customer?.email || ""} 
          disabled 
          className="mt-1.5 bg-gray-50" 
        />
        <p className="text-xs text-luxury-muted mt-1">Email cannot be changed.</p>
      </div>
      <div>
        <Label htmlFor="phone">Mobile Number</Label>
        <Input 
          id="phone" 
          value={form.phone} 
          onChange={(e) => setForm({ ...form, phone: e.target.value })} 
          className="mt-1.5" 
        />
      </div>
      <Button type="submit" variant="gold" disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
