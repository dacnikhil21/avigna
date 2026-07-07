"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data";
import { FadeIn } from "@/components/shared/motion";

// Display the most popular 15 categories in the circular horizontal scrolling section
const DISPLAY_CATEGORIES = categories.filter(c => 
  [
    "earrings",
    "necklace",
    "long-haram",
    "short-haram",
    "bangles",
    "glass-bangles",
    "thali-chains",
    "panchaloham-jewellery",
    "vaddanam",
    "hair-accessories",
    "pendants",
    "bracelets",
    "finger-rings",
    "nose-pins",
    "anklets"
  ].includes(c.slug)
);

export function CategoriesSection() {
  return (
    <section className="py-8 md:py-12 bg-white border-b border-[#EFECE7]">
      <FadeIn className="text-center max-w-2xl mx-auto mb-5 px-6">
        <p className="text-[10px] font-sans font-semibold tracking-[0.25em] uppercase text-[#C5A880] mb-0.5">Shop by Category</p>
        <h2 className="font-serif text-xl md:text-2xl font-light text-[#121212]">Browse Our Curation</h2>
      </FadeIn>

      <div className="relative w-full">
        {/* Horizontal Scroll Wrapper */}
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-3 pt-1 px-6 md:px-12 no-scrollbar scroll-smooth">
          {DISPLAY_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="flex flex-col items-center text-center group shrink-0 w-16 md:w-20 transition-all"
            >
              {/* Circular Container */}
              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border border-[#EFECE7] group-hover:border-[#C5A880] shadow-sm transition-all duration-300 mb-2 bg-[#FAF8F5]">
                <Image
                  src={cat.image!}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 56px, 64px"
                />
              </div>
              {/* Name Label */}
              <span className="text-[9px] md:text-[10px] font-sans tracking-wide text-[#121212] group-hover:text-[#C5A880] font-medium leading-tight line-clamp-1 w-full transition-colors duration-300">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
