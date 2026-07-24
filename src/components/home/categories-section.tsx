"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/shared/motion";
import type { Category } from "@/types";
import { categories as staticCategories } from "@/lib/data";

export function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (Array.isArray(data)) {
          const displaySlugs = [
            "earrings", "necklace", "long-haram", "short-haram", "bangles",
            "glass-bangles", "thali-chains", "panchaloham-jewellery", "vaddanam",
            "hair-accessories", "pendants", "bracelets", "finger-rings", "nose-pins", "anklets"
          ];
          // Filter to only display these 15 categories on homepage scroll
          setCategories(data.filter((c: Category) => displaySlugs.includes(c.slug)));
        } else {
          // fallback if response isn't array
          setCategories(staticCategories.filter((c) => [
            "earrings", "necklace", "long-haram", "short-haram", "bangles",
            "glass-bangles", "thali-chains", "panchaloham-jewellery", "vaddanam",
            "hair-accessories", "pendants", "bracelets", "finger-rings", "nose-pins", "anklets"
          ].includes(c.slug)) as unknown as Category[]);
        }
      } catch (error) {
        console.error("Error fetching homepage categories, falling back to static:", error);
        const displaySlugs = [
          "earrings", "necklace", "long-haram", "short-haram", "bangles",
          "glass-bangles", "thali-chains", "panchaloham-jewellery", "vaddanam",
          "hair-accessories", "pendants", "bracelets", "finger-rings", "nose-pins", "anklets"
        ];
        setCategories(staticCategories.filter((c) => displaySlugs.includes(c.slug)) as unknown as Category[]);
      }
    }
    fetchCategories();
  }, []);

  if (categories.length === 0) return null;

  return (
    <section className="py-8 md:py-12 bg-white border-b border-[#EFECE7]">
      <FadeIn className="text-center max-w-2xl mx-auto mb-5 px-6">
        <p className="text-[10px] font-sans font-semibold tracking-[0.25em] uppercase text-[#C5A880] mb-0.5">Shop by Category</p>
        <h2 className="font-serif text-xl md:text-2xl font-light text-[#121212]">Browse Our Curation</h2>
      </FadeIn>

      <div className="relative w-full">
        {/* Horizontal Scroll Wrapper */}
        <div className="flex gap-3 sm:gap-5 md:gap-6 overflow-x-auto pb-3 pt-1 px-4 md:px-12 no-scrollbar scroll-smooth">
          {categories.map((cat) => {
            const displayName = cat.name.replace(/\s+jewellery/i, "").trim();
            return (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="w-[72px] sm:w-[84px] md:w-24 shrink-0 flex flex-col items-center group cursor-pointer text-center"
              >
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-[#FAF8F5] border border-[#EFECE7] transition-all duration-500 group-hover:border-[#C5A880] group-hover:scale-105 shadow-sm shrink-0">
                  <Image
                    src={cat.image || "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80"}
                    alt={displayName}
                    fill
                    unoptimized={Boolean(cat.image?.startsWith("data:"))}
                    sizes="(max-width: 768px) 64px, 80px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#1A1A1A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <span className="mt-2 text-[9px] sm:text-[10px] md:text-xs font-sans font-medium tracking-wider text-[#4A4A4A] group-hover:text-[#C5A880] transition-colors duration-300 uppercase leading-tight text-center w-full px-0.5 line-clamp-2">
                  {displayName}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
