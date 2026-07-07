"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/shared/motion";

export function CraftsmanshipStorySection() {
  return (
    <section className="bg-[#FAF8F5] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[720px]">

        {/* Left: Image */}
        <FadeIn
          direction="right"
          className="relative min-h-[480px] lg:min-h-full order-2 lg:order-1"
        >
          <Image
            src="https://images.unsplash.com/photo-1603561596112-0a132b757442?w=1200&q=85"
            alt="Master artisan handcrafting jewellery at Avighna Collections"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Warm atmospheric tint */}
          <div className="absolute inset-0 bg-[#C5A880]/8 pointer-events-none" />
        </FadeIn>

        {/* Right: Story */}
        <div className="order-1 lg:order-2 flex items-center">
          <FadeIn
            direction="left"
            className="w-full px-8 md:px-14 lg:px-16 xl:px-20 py-20 lg:py-0 max-w-2xl lg:max-w-none"
          >
            <p className="text-[11px] font-dmsans font-medium tracking-[0.35em] uppercase text-[#C5A880] mb-9">
              The Craft
            </p>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-[#121212] italic leading-[1.18] mb-10">
              Centuries of Knowledge,<br />
              Held in Two Hands
            </h2>

            <p className="font-sans font-light text-[15px] md:text-base text-[#6B6560] leading-[1.85] mb-6">
              Our 1 gram gold jewellery is not a compromise. It is a mastery. Each piece 
              begins as a sculptor&apos;s sketch — then passes through seven pairs of 
              specialist hands before it earns the Avighna mark. The result is 
              indistinguishable from solid gold in presence, weight, and warmth.
            </p>

            <p className="font-sans font-light text-[15px] md:text-base text-[#6B6560] leading-[1.85] mb-14">
              We believe every Indian woman deserves the feeling of wearing gold that 
              carries genuine artistry — without the weight of extraordinary cost. That 
              belief is not a marketing promise. It is the reason we exist.
            </p>

            {/* Artisan quote */}
            <blockquote className="border-l-[1.5px] border-[#C5A880] pl-7 mb-14">
              <p className="font-serif text-xl md:text-2xl italic text-[#121212] leading-[1.5]">
                &ldquo;The gold does not make it valuable.
                <br />The hands that shape it do.&rdquo;
              </p>
              <cite className="block mt-4 text-[10px] font-dmsans tracking-[0.25em] uppercase text-[#C5A880] not-italic">
                — Master Artisan, 32 years with Avighna
              </cite>
            </blockquote>

            {/* Subtle text-link CTA */}
            <Link
              href="/about"
              className="inline-flex items-center gap-4 text-[12px] font-dmsans tracking-[0.22em] uppercase text-[#121212] hover:text-[#C5A880] transition-colors duration-300 group"
            >
              <span>Read Our Story</span>
              <span className="w-8 h-[1px] bg-[#121212] group-hover:bg-[#C5A880] group-hover:w-16 transition-all duration-500" />
            </Link>

          </FadeIn>
        </div>

      </div>
    </section>
  );
}
