import type { Metadata } from "next";
import { User } from "lucide-react";

export const metadata: Metadata = {
  title: "Account | Avighna Collections",
  description: "Your Avighna Collections account.",
};

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center px-6 py-40 text-center">
      <User className="w-10 h-10 text-[#C5A880] mb-6 stroke-[1.5]" />
      <p className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#C5A880] mb-4">
        Your Account
      </p>
      <h1 className="font-serif text-3xl md:text-4xl font-light text-[#121212] italic mb-6">
        Welcome Back
      </h1>
      <p className="font-sans font-light text-sm text-[#6B6560] leading-relaxed max-w-sm mb-10">
        Account management will be available soon. In the meantime, our concierge team is here to assist you.
      </p>
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-8 py-4 bg-[#121212] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C5A880] transition-all duration-500"
      >
        Contact Concierge
      </a>
    </div>
  );
}
