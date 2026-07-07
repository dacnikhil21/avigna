"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { collections } from "@/lib/data";
import { FadeIn } from "@/components/shared/motion";
import type { Collection } from "@/types";

export function FeaturedCollectionsSection() {
  return (
    <section className="bg-[#121212] py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 xl:px-28">

        {/* Section header */}
        <div className="flex items-end justify-between mb-16 md:mb-20">
          <FadeIn>
            <p className="text-[11px] font-dmsans font-medium tracking-[0.35em] uppercase text-[#C5A880] mb-4">
              Curated Collections
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-white italic leading-tight">
              Worlds of Beauty
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <Link
              href="/collections"
              className="hidden md:inline-flex items-center gap-4 text-[11px] font-dmsans tracking-[0.2em] uppercase text-white/40 hover:text-[#C5A880] transition-colors duration-400 group"
            >
              All Collections
              <span className="w-8 h-[1px] bg-white/30 group-hover:bg-[#C5A880] group-hover:w-14 transition-all duration-500" />
            </Link>
          </FadeIn>
        </div>

        {/* Asymmetric editorial grid — desktop */}
        <div className="hidden md:grid grid-cols-12 gap-4 lg:gap-5">
          {/* Row 1: Large (7) + Tall (5) */}
          <FadeIn className="col-span-7" delay={0.1}>
            <CollectionCard collection={collections[0]} className="h-[500px] lg:h-[560px]" />
          </FadeIn>
          <FadeIn className="col-span-5" delay={0.2}>
            <CollectionCard collection={collections[1]} className="h-[500px] lg:h-[560px]" />
          </FadeIn>

          {/* Row 2: Medium (5) + Wide (7) */}
          <FadeIn className="col-span-5" delay={0.25}>
            <CollectionCard collection={collections[2]} className="h-[420px] lg:h-[480px]" />
          </FadeIn>
          <FadeIn className="col-span-7" delay={0.35}>
            <CollectionCard collection={collections[3]} className="h-[420px] lg:h-[480px]" />
          </FadeIn>
        </div>

        {/* Mobile: stacked full-width */}
        <div className="md:hidden flex flex-col gap-4">
          {collections.map((col, i) => (
            <FadeIn key={col.slug} delay={i * 0.1}>
              <CollectionCard collection={col} className="h-[380px]" />
            </FadeIn>
          ))}
        </div>

        {/* Mobile CTA */}
        <FadeIn className="mt-10 md:hidden text-center" delay={0.4}>
          <Link
            href="/collections"
            className="inline-flex items-center gap-3 text-[11px] font-dmsans tracking-[0.2em] uppercase text-[#C5A880]"
          >
            View All Collections
            <span className="w-6 h-[1px] bg-[#C5A880]" />
          </Link>
        </FadeIn>

      </div>
    </section>
  );
}

function CollectionCard({
  collection,
  className,
}: {
  collection: Collection;
  className?: string;
}) {
  return (
    <Link href={`/collections/${collection.slug}`} className="block group h-full">
      <div className={`relative overflow-hidden ${className}`}>

        {/* Image with hover zoom */}
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        >
          <Image
            src={collection.image ?? ""}
            alt={collection.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </motion.div>

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/85 via-[#121212]/25 to-transparent" />

        {/* Content anchored bottom-left */}
        <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9">
          <p className="text-[10px] font-dmsans tracking-[0.28em] uppercase text-[#C5A880] mb-2.5 transition-colors duration-300">
            {collection.tagline}
          </p>
          <h3 className="font-serif text-2xl md:text-3xl font-light text-white italic mb-5 leading-tight group-hover:text-[#FAF8F5] transition-colors duration-300">
            {collection.name}
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-dmsans tracking-[0.22em] uppercase text-white/50 group-hover:text-[#C5A880] transition-colors duration-400">
              Explore
            </span>
            <span className="w-6 h-[1px] bg-white/30 group-hover:bg-[#C5A880] group-hover:w-12 transition-all duration-500" />
          </div>
        </div>

      </div>
    </Link>
  );
}
