"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { collections } from "@/lib/data";
import { CollectionCard } from "@/components/shop/product-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";

export function CollectionsSection() {
  return (
    <section className="section-padding py-24 md:py-32">
      <FadeIn className="text-center max-w-2xl mx-auto mb-16">
        <p className="label-luxury mb-4">Curated For You</p>
        <h2 className="heading-lg mb-4">Our Collections</h2>
        <p className="body-lg">
          Each collection tells a story of heritage, craftsmanship, and timeless beauty.
          Discover pieces crafted for life&apos;s most precious moments.
        </p>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {collections.map((collection) => (
          <StaggerItem key={collection.slug}>
            <CollectionCard {...collection} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeIn className="text-center mt-12" delay={0.2}>
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-luxury-black hover:text-luxury-gold transition-colors duration-300"
        >
          View All Collections
          <ArrowRight className="w-4 h-4" />
        </Link>
      </FadeIn>
    </section>
  );
}
