"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/account/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", message: data.error || "Failed to send reset link." });
      } else {
        setStatus({
          type: "success",
          message: "If an account exists for that email, we have sent a password reset link.",
        });
        setEmail("");
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
            <h1 className="font-serif text-3xl font-light mb-2">Forgot Password</h1>
            <p className="text-sm text-luxury-muted">
              Enter your email address and we will send you a link to reset your password.
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5"
                placeholder="you@example.com"
              />
            </div>

            <Button
              type="submit"
              variant="gold"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Sending link..." : "Send Reset Link"}
            </Button>
          </form>
        </FadeIn>
      </div>
    </div>
  );
}
