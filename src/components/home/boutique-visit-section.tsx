"use client";

import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { FadeIn } from "@/components/shared/motion";

export function BoutiqueVisitSection() {
  return (
    <section className="bg-[#FAF8F5] py-10 md:py-20 border-t border-[#EFECE7]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 xl:px-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Details */}
          <div className="lg:col-span-5">
            <FadeIn>
              <p className="text-[11px] font-sans font-medium tracking-[0.35em] uppercase text-[#C5A880] mb-1">
                Our Flagship
              </p>
              
              <h2 className="font-serif text-3xl md:text-4xl font-light text-[#121212] leading-tight mb-4">
                Visit Our Store
              </h2>
              
              <div className="space-y-6 text-sm font-sans font-light text-[#6B6560] leading-relaxed mb-8">
                <div className="flex gap-4 items-start">
                  <MapPin className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-base font-normal text-[#121212] mb-1">
                      Boutique Address
                    </h4>
                    <p className="text-sm">
                      Sri Avighna Collections<br />
                      Beside More Supermarket, Opp RR Complex,<br />
                      Polytechnic Road, Wanaparthy – 509103
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Clock className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-base font-normal text-[#121212] mb-1">
                      Opening Hours
                    </h4>
                    <p className="text-sm">
                      Monday — Sunday<br />
                      11:00 AM — 8:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Phone className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-base font-normal text-[#121212] mb-1">
                      Phone Number
                    </h4>
                    <p className="text-sm">
                      +91 70130 04127
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <Mail className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-base font-normal text-[#121212] mb-1">
                      Email Address
                    </h4>
                    <p className="text-sm">
                      avighnacollections1@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <a
                  href="https://maps.google.com/?q=Sri+Avighna+Collections+Wanaparthy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 text-[12px] font-dmsans tracking-[0.22em] uppercase text-[#121212] hover:text-[#C5A880] transition-colors duration-300 group"
                >
                  <span>Get Directions on Google Maps</span>
                  <span className="w-8 h-[1px] bg-[#121212] group-hover:bg-[#C5A880] group-hover:w-16 transition-all duration-500" />
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Map Visualizer */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.2}>
              <div className="relative aspect-[16/10] bg-[#121212] flex flex-col items-center justify-center text-center p-6 select-none border border-white/5 shadow-luxury">
                {/* Subtle map lines drawing visual overlay using SVG */}
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none overflow-hidden">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="20%" x2="100%" y2="40%" stroke="white" strokeWidth="1" />
                    <line x1="20%" y1="0" x2="60%" y2="100%" stroke="white" strokeWidth="1" />
                    <line x1="0" y1="70%" x2="100%" y2="50%" stroke="white" strokeWidth="1" />
                    <line x1="80%" y1="0" x2="40%" y2="100%" stroke="white" strokeWidth="1" />
                    <circle cx="50%" cy="50%" r="80" stroke="white" strokeWidth="1" fill="none" />
                    <circle cx="50%" cy="50%" r="140" stroke="white" strokeWidth="1" fill="none" />
                  </svg>
                </div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full border border-[#C5A880]/30 flex items-center justify-center mx-auto mb-6 bg-[#1A1A1A]">
                    <MapPin className="w-5 h-5 text-[#C5A880]" />
                  </div>
                  
                  <h3 className="font-serif text-xl font-light text-[#FAF8F5] italic mb-2">
                    Wanaparthy Flagship
                  </h3>
                  
                  <p className="text-[11px] font-sans tracking-[0.2em] uppercase text-white/40 mb-1">
                    Wanaparthy, Telangana
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
