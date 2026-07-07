"use client";

import Link from "next/link";
import { Phone, MapPin, ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/data";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-[#121212] text-white border-t border-white/5">
      {/* Zone A: Brand Promise & Statement (Full Width Top) */}
      <div className="section-padding py-20 text-center max-w-4xl mx-auto border-b border-white/5">
        <p className="text-[10px] font-sans uppercase tracking-[0.4em] text-[#C5A880] mb-4">
          The Avighna Promise
        </p>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light italic text-[#FAF8F5] leading-relaxed max-w-3xl mx-auto">
          &ldquo;Crafted with reverence. Designed to make you feel like royalty every single day.&rdquo;
        </h2>
        <div className="w-16 h-px bg-[#C5A880]/40 mx-auto mt-6" />
      </div>

      {/* Main footer layout with Columns */}
      <div className="section-padding py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 max-w-7xl mx-auto">
          
          {/* Zone B: Customer Care & Concierge (Column 1 - 2.5 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-sans font-medium">
              Client Care
            </h4>
            <ul className="space-y-4 text-sm text-white/50 font-light font-sans">
              <li>
                <Link href="/faq" className="hover:text-white transition-colors duration-300">
                  Care & Restoration Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors duration-300">
                  Lifetime Polish Guarantee
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors duration-300">
                  Returns & Exchange Policy
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href="https://wa.me/917013004127"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#C5A880] hover:text-white transition-all duration-300 font-medium"
                >
                  WhatsApp Consult &rarr;
                </a>
              </li>
            </ul>
          </div>

          {/* Zone C: The Collections (Column 2 - 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-sans font-medium">
              Lookbooks
            </h4>
            <ul className="space-y-4 text-sm text-white/50 font-light font-sans">
              <li>
                <Link href="/shop?category=necklaces" className="hover:text-white transition-colors duration-300">
                  Temple Gold Edit
                </Link>
              </li>
              <li>
                <Link href="/shop?category=earrings" className="hover:text-white transition-colors duration-300">
                  Antique Royal Edit
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-white transition-colors duration-300">
                  Modern Minimalist
                </Link>
              </li>
              <li>
                <Link href="/bridal-salon" className="hover:text-white transition-colors duration-300 text-white/80 font-medium">
                  The Bridal Salon ✨
                </Link>
              </li>
            </ul>
          </div>

          {/* Zone D: Store & Appointment (Column 3 - 3.5 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-sans font-medium">
              Flagship Boutique
            </h4>
            <ul className="space-y-4 text-sm text-white/50 font-light font-sans">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] mt-0.5 shrink-0" />
                <span>
                  Beside More Supermarket,<br />
                  Opp RR Complex, Polytechnic Road,<br />
                  Wanaparthy – 509103
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>+91 70130 04127</span>
              </li>
              <li className="pt-2">
                <Link
                  href="/boutique"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#C5A880] hover:text-white transition-all duration-300 font-medium"
                >
                  Schedule Private Visit &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Zone E: The Newsletter Invitation (Column 4 - 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-sans font-medium">
              An Invitation
            </h4>
            <div className="space-y-4">
              <p className="text-xs text-white/50 leading-relaxed font-sans font-light">
                Receive personal invitations to private collection releases, artisan karigar journals, and boutique sittings.
              </p>
              
              {/* Formless calligraphy input styling */}
              <form onSubmit={(e) => { e.preventDefault(); alert("You are added to the circle."); }} className="flex items-center border-b border-white/20 py-2">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none placeholder:text-white/20 text-sm font-sans"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 text-white hover:text-[#C5A880] transition-colors p-1"
                  aria-label="Submit email"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Zone F: Social Media (Column 5 - Full Width Row below grids) */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-8 text-xs tracking-widest uppercase font-medium font-sans">
            <a href="#" className="text-white/40 hover:text-[#C5A880] transition-colors duration-300">Pinterest</a>
            <a href="#" className="text-white/40 hover:text-[#C5A880] transition-colors duration-300">Instagram</a>
            <a href="#" className="text-white/40 hover:text-[#C5A880] transition-colors duration-300">YouTube</a>
          </div>

          {/* Payment guarantees / certificates */}
          <div className="flex gap-4 items-center opacity-30 select-none">
            <span className="text-[9px] tracking-widest uppercase text-white/60">BIS 916 certified</span>
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="text-[9px] tracking-widest uppercase text-white/60">100% Insured Delivery</span>
          </div>
        </div>
      </div>

      <Separator className="bg-white/5" />

      {/* Bottom bar */}
      <div className="section-padding py-8 bg-[#0C0C0C]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-sans font-light text-white/30 tracking-wider">
          <p>
            &copy; {new Date().getFullYear()} {BRAND.name}. Designed with reverence. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white/50 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white/50 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white/50 transition-colors">
              Shipping & Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
