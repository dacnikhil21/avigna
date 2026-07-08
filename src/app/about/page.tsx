"use client";

import Image from "next/image";
import { useWebsiteData } from "@/lib/store/admin-store";
import { FadeIn } from "@/components/shared/motion";
import { Award, Gem, Heart, Users } from "lucide-react";

const values = [
  {
    icon: Gem,
    title: "Uncompromising Quality",
    description:
      "Every piece features premium 1 gram gold plating and expert craftsmanship. We never compromise on quality or details.",
  },
  {
    icon: Heart,
    title: "Crafted with Love",
    description:
      "Our master artisans pour decades of experience into every piece, using techniques passed down through generations.",
  },
  {
    icon: Award,
    title: "Trusted Quality",
    description:
      "Every piece is crafted from premium copper-alloy cores with thick 24K gold electroplating. Quality you can see, feel, and wear every day.",
  },
  {
    icon: Users,
    title: "Customer First",
    description:
      "From private consultations to after-sales service, we treat every customer like family — because you are.",
  },
];

export default function AboutPage() {
  const { brand } = useWebsiteData();
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920&q=80"
          alt="Sri Avighna 1 Gram Gold Jewellery — premium jewellery craftsmanship"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 to-luxury-black/20" />
        <div className="relative z-10 section-padding pb-16">
          <FadeIn>
            <p className="label-luxury text-luxury-gold-light mb-4">Our Story</p>
            <h1 className="heading-lg text-white">A Legacy of Excellence</h1>
          </FadeIn>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="heading-md mb-8">A Legacy of Trust</h2>
            <div className="space-y-6 body-lg text-left">
              <p>
                Founded in the heart of Wanaparthy, Telangana, {brand.businessName} began as a
                small family store with a singular vision: to bring the finest 1 gram gold
                jewellery to every woman — honouring India&apos;s rich artistic heritage at an
                honest, accessible price.
              </p>
              <p>
                What started with a handful of curated designs has grown into one of
                South Telangana&apos;s most trusted jewellery destinations — yet our
                approach remains unchanged. Every piece is still handcrafted, every
                kemp stone still hand-selected, and every customer still treated like family.
              </p>
              <p>
                Today, we serve discerning customers across India — brides seeking
                their perfect wedding set, families celebrating festivals, and women
                looking for everyday elegance at every milestone.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section id="craftsmanship" className="section-padding py-24 bg-luxury-cream/50">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <p className="label-luxury mb-4">What We Stand For</p>
          <h2 className="heading-lg">Our Values</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {values.map((value, i) => (
            <FadeIn key={value.title} delay={i * 0.1}>
              <div className="p-8 bg-white rounded-3xl shadow-luxury h-full">
                <value.icon className="w-8 h-8 text-luxury-gold mb-4" />
                <h3 className="font-serif text-xl font-light mb-3">{value.title}</h3>
                <p className="text-sm text-luxury-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Certification */}
      <section id="certification" className="section-padding py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <FadeIn>
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"
                alt="Premium 1 Gram Gold jewellery"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="label-luxury mb-4">Certification</p>
            <h2 className="heading-md mb-6">Premium Plating & Lifetime Guarantee</h2>
            <div className="space-y-4 body-lg">
              <p>
                Every piece from {brand.businessName} is built on a high-grade, hypoallergenic copper-alloy core, electroplated with a premium layer of 24K gold to deliver the weight, warmth, and shine of fine solid gold.
              </p>
              <p>
                Our collections are coated with an advanced anti-tarnish protective layer to prevent oxidation and discoloration, ensuring long-lasting beauty and comfort for all skin types.
              </p>
              <p>
                Each purchase includes a detailed certificate of authenticity with complete specifications — including base metal details, gold plating thickness, stones description, weight, and a unique SKU.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
