"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/lib/data";
import { ProductCard } from "@/components/shop/product-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";

export function FeaturedSection() {
  const featured = getFeaturedProducts();

  return (
    <section className="section-padding py-24 md:py-32 bg-luxury-cream/50">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <FadeIn>
          <p className="label-luxury mb-4">Handpicked Excellence</p>
          <h2 className="heading-lg">Featured Pieces</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Button variant="outline" asChild>
            <Link href="/shop">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </FadeIn>
      </div>

      <StaggerContainer className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {featured.map((product, i) => (
          <StaggerItem key={product.id}>
            <ProductCard product={product} priority={i < 2} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

export function CraftsmanshipSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        {/* Image side */}
        <div className="relative aspect-square lg:aspect-auto min-h-[400px]">
          <Image
            src="https://images.unsplash.com/photo-1603561596112-0a132b757442?w=1200&q=80"
            alt="Master craftsman at work"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Content side */}
        <div className="flex items-center section-padding py-20 lg:py-0 bg-luxury-white">
          <FadeIn className="max-w-lg">
            <p className="label-luxury mb-4">Our Heritage</p>
            <h2 className="heading-lg mb-6">
              Crafted by Masters, Worn with Pride
            </h2>
            <p className="body-lg mb-6">
              For over three decades, Sri Avighna 1 Gram Gold Jewellery has been the trusted name
              for discerning jewellery lovers across India. Every piece is handcrafted
              by master artisans using techniques passed down through generations.
            </p>
            <p className="body-lg mb-8">
              From the first sketch to the final polish, we maintain the highest
              standards of quality — BIS hallmarked gold, GIA-certified diamonds,
              and a lifetime craftsmanship guarantee.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-10">
              {[
                { value: "30+", label: "Years of Excellence" },
                { value: "50K+", label: "Happy Customers" },
                { value: "916", label: "BIS Hallmarked" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-2xl md:text-3xl font-light text-luxury-gold">
                    {stat.value}
                  </p>
                  <p className="text-xs text-luxury-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <Button variant="outline" asChild>
              <Link href="/about">
                Our Story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
