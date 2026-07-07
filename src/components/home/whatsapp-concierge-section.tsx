"use client";

import { MessageCircle } from "lucide-react";
import { FadeIn } from "@/components/shared/motion";
import { BRAND } from "@/lib/data";

export function WhatsAppConciergeSection() {
  return (
    <section className="bg-[#121212] py-28 md:py-36 border-t border-[#EFECE7]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 xl:px-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Story/Description */}
          <div className="lg:col-span-7">
            <FadeIn>
              <p className="text-[11px] font-sans font-medium tracking-[0.35em] uppercase text-[#C5A880] mb-6">
                Client Services
              </p>
              
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-[#FAF8F5] leading-tight italic mb-8">
                Your Personal Styling Concierge
              </h2>
              
              <p className="font-sans font-light text-sm md:text-base text-white/70 leading-relaxed mb-6">
                We believe that finding the perfect adornment requires conversation. 
                Whether you are curating a complete bridal set, searching for a meaningful gift, 
                or seeking styling guidance, our concierge is here to assist you.
              </p>
              
              <p className="font-sans font-light text-sm md:text-base text-white/70 leading-relaxed">
                Receive high-resolution photographs, video close-ups of craftsmanship details, 
                and bespoke recommendations tailored to your preferences, directly on WhatsApp.
              </p>
            </FadeIn>
          </div>

          {/* Right Column - CTA Block */}
          <div className="lg:col-span-5">
            <FadeIn delay={0.2}>
              <div className="border border-white/10 p-8 md:p-10 flex flex-col items-start bg-white/[0.02]">
                <div className="w-10 h-10 rounded-full border border-[#C5A880]/30 flex items-center justify-center mb-6">
                  <MessageCircle className="w-5 h-5 text-[#C5A880]" />
                </div>
                
                <h3 className="font-serif text-xl font-light text-[#FAF8F5] italic mb-2">
                  Direct Styling Line
                </h3>
                
                <p className="text-[11px] font-sans tracking-[0.2em] uppercase text-white/40 mb-6">
                  Available daily 10 am — 8 pm
                </p>
                
                <a
                  href={`https://wa.me/${BRAND.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-2xl md:text-3xl font-light text-[#C5A880] tracking-wide hover:text-white transition-colors duration-300 mb-8 block"
                >
                  {BRAND.phone}
                </a>
                
                <a
                  href={`https://wa.me/${BRAND.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-8 py-4 bg-[#C5A880] hover:bg-[#FAF8F5] text-[#121212] hover:text-[#121212] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-500 ease-out active:scale-[0.98] select-none text-center"
                >
                  Begin Consultation
                </a>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
