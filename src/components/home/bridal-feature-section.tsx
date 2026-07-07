"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/shared/motion";

export function BridalFeatureSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#121212]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=85"
          alt="Sri Avighna 1 Gram Gold Jewellery Majestic Bridal Set Editorial"
          fill
          priority
          className="object-cover object-[center_35%]"
          sizes="100vw"
        />
        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        {/* Soft bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center py-20">
        <FadeIn>
          <p className="text-[11px] font-sans font-medium tracking-[0.35em] uppercase text-[#C5A880] mb-6">
            The Bridal Collection
          </p>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#FAF8F5] leading-tight italic mb-8 text-balance">
            For the Woman Who Carries<br />Every Dream
          </h2>
        </FadeIn>
        
        <FadeIn delay={0.4}>
          <p className="font-sans font-light text-sm md:text-base text-white/80 leading-relaxed max-w-md mx-auto mb-12">
            Uncompromising majesty crafted in 1-gram gold, carrying the weight, 
            warmth, and intricate reverence of pure heritage.
          </p>
        </FadeIn>
        
        <FadeIn delay={0.6}>
          <Link
            href="/shop?category=bridal"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#FAF8F5] hover:bg-[#C5A880] text-[#121212] hover:text-white text-xs uppercase tracking-[0.2em] font-medium transition-all duration-500 ease-out border border-[#FAF8F5] hover:border-[#C5A880] active:scale-[0.98] select-none text-center"
          >
            Discover Bridal
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
