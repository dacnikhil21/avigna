"use client";

import { FadeIn } from "@/components/shared/motion";

export function BrandPhilosophySection() {
  return (
    <section className="bg-[#FAF8F5] py-36 md:py-48 lg:py-56">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 xl:px-28">
        <div className="max-w-4xl">

          {/* Eyebrow */}
          <FadeIn>
            <p className="text-[11px] font-dmsans font-medium tracking-[0.35em] uppercase text-[#C5A880] mb-10 md:mb-14">
              Our Philosophy
            </p>
          </FadeIn>

          {/* Large editorial statement */}
          <FadeIn delay={0.2}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#121212] leading-[1.15] italic mb-12 md:mb-16 text-balance">
              We do not sell jewellery.
              <br />
              We create moments
              <br />
              you will never forget.
            </h2>
          </FadeIn>

          {/* Premium paragraph */}
          <FadeIn delay={0.4}>
            <p className="font-sans font-light text-base md:text-lg text-[#6B6560] leading-[1.85] max-w-2xl mb-16 md:mb-20">
              Every piece that leaves our atelier carries within it the weight of 
              generations — the practised hands of legacy artisans, the warmth of 
              Indian tradition, and the quiet confidence of a woman who knows her 
              worth. We craft not for catalogues, but for lifetimes.
            </p>
          </FadeIn>

          {/* Gold rule — editorial separator */}
          <FadeIn delay={0.55}>
            <div className="w-20 h-[1px] bg-[#C5A880]" />
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
