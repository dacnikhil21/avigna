"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FadeIn } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    if (!token) {
      setStatus({ type: "error", message: "Invalid or missing reset token." });
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    
    if (password !== confirmPassword) {
      setStatus({ type: "error", message: "Passwords do not match." });
      return;
    }

    if (password.length < 8) {
      setStatus({ type: "error", message: "Password must be at least 8 characters long." });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/account/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", message: data.error || "Failed to reset password." });
      } else {
        setStatus({
          type: "success",
          message: "Your password has been successfully reset. You can now log in.",
        });
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch (err) {
      setStatus({ type: "error", message: "An unexpected error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding pt-32 pb-20 min-h-screen flex items-center justify-center bg-luxury-cream/10">
      <div className="w-full max-w-md">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-luxury-muted hover:text-luxury-black transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>

        <FadeIn className="bg-white rounded-3xl shadow-luxury p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-light mb-2">Reset Password</h1>
            <p className="text-sm text-luxury-muted">
              Please enter your new password below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {status && (
              <div
                className={`p-3 text-sm text-center rounded-lg border ${
                  status.type === "error"
                    ? "text-red-600 bg-red-50 border-red-100"
                    : "text-emerald-700 bg-emerald-50 border-emerald-200"
                }`}
              >
                {status.message}
              </div>
            )}

            <div>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5"
                placeholder="••••••••"
                disabled={!token || status?.type === "success"}
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1.5"
                placeholder="••••••••"
                disabled={!token || status?.type === "success"}
              />
            </div>

            <Button
              type="submit"
              variant="gold"
              className="w-full"
              disabled={loading || !token || status?.type === "success"}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </FadeIn>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-luxury-cream/10">
        <div className="w-8 h-8 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
