"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/shared/motion";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("admin", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Invalid administrator credentials");
      } else {
        toast.success("Welcome back, Administrator");
        router.push("/admin");
        router.refresh();
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-6">
      <FadeIn className="w-full max-w-md bg-white rounded-3xl p-10 shadow-2xl">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-12 h-12 bg-luxury-cream rounded-full flex items-center justify-center mb-4">
            <Lock className="w-5 h-5 text-luxury-gold" />
          </div>
          <h1 className="font-serif text-2xl font-light text-luxury-black">
            Admin Access
          </h1>
          <p className="text-xs tracking-[0.2em] uppercase text-luxury-gold mt-2 font-medium">
            Sri Avighna Collections
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-luxury-black mb-1.5 block">
              Admin Email
            </label>
            <Input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-[#FAF8F5] border-transparent focus:border-luxury-gold focus:bg-white"
              placeholder="admin@sriavighna.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-luxury-black mb-1.5 block">
              Password
            </label>
            <Input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="bg-[#FAF8F5] border-transparent focus:border-luxury-gold focus:bg-white"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            variant="gold"
            className="w-full mt-4"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </Button>
        </form>
      </FadeIn>
    </div>
  );
}
