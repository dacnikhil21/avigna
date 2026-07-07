"use client";

import Link from "next/link";
import { Phone, MapPin, Mail, Clock } from "lucide-react";
import { BRAND } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { useWebsiteData } from "@/lib/store/admin-store";

export function Footer() {
  const { brand } = useWebsiteData();
  return (
    <footer className="bg-[#121212] text-white border-t border-white/5">
      {/* Zone A: Brand Promise & Statement (Full Width Top) */}
      <div className="section-padding py-16 text-center max-w-4xl mx-auto border-b border-white/5">
        <p className="text-[10px] font-sans uppercase tracking-[0.4em] text-[#C5A880] mb-3">
          The Sri Avighna Promise
        </p>
        <h2 className="font-serif text-2xl md:text-3xl font-light italic text-[#FAF8F5] leading-relaxed max-w-2xl mx-auto">
          &ldquo;Crafted with reverence. Designed to make you feel like royalty every single day.&rdquo;
        </h2>
        <div className="w-12 h-px bg-[#C5A880]/30 mx-auto mt-4" />
      </div>

      {/* Main footer layout with Columns */}
      <div className="section-padding py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* Column 1: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-sans font-medium">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-white/50 font-light font-sans">
              <li>
                <Link href="/" className="hover:text-white transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors duration-300">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-white transition-colors duration-300">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Categories */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-sans font-medium">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-white/50 font-light font-sans">
              <li>
                <Link href="/shop?category=necklace" className="hover:text-white transition-colors duration-300">
                  Necklaces
                </Link>
              </li>
              <li>
                <Link href="/shop?category=earrings" className="hover:text-white transition-colors duration-300">
                  Earrings
                </Link>
              </li>
              <li>
                <Link href="/shop?category=bangles" className="hover:text-white transition-colors duration-300">
                  Bangles
                </Link>
              </li>
              <li>
                <Link href="/shop?category=finger-rings" className="hover:text-white transition-colors duration-300">
                  Rings
                </Link>
              </li>
              <li>
                <Link href="/shop?category=bracelets" className="hover:text-white transition-colors duration-300">
                  Bracelets
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Store & Contact Info */}
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-sans font-medium">
              Store Information
            </h4>
            <ul className="space-y-3.5 text-xs text-white/50 font-light font-sans">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] mt-0.5 shrink-0" />
                <span>
                  <strong>{brand.businessName}</strong><br />
                  {brand.address}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C5A880] mt-0.5 shrink-0" />
                <span>
                  Business Hours:<br />
                  {brand.storeTimings}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>{brand.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>{brand.email}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Guarantees / certifications banner */}
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-4 items-center opacity-30 select-none">
            <span className="text-[9px] tracking-widest uppercase text-white/60">BIS 916 certified</span>
            <div className="w-1 h-1 rounded-full bg-white/40" />
            <span className="text-[9px] tracking-widest uppercase text-white/60">100% Insured Delivery</span>
          </div>
        </div>
      </div>

      <Separator className="bg-white/5" />

      {/* Bottom bar */}
      <div className="section-padding py-6 bg-[#0C0C0C]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-sans font-light text-white/30 tracking-wider">
          <p>
            &copy; {new Date().getFullYear()} {brand.businessName}. Designed with reverence. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white/50 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white/50 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white/50 transition-colors">
              Shipping &amp; Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
