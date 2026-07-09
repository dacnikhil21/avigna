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
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920&q=80"
          alt="Sri Avighna 1 Gram Gold Jewellery — premium jewellery craftsmanship"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-[#121212]/35 to-transparent" />
        {/* Smooth bottom transition to page background */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAF8F5] to-transparent pointer-events-none z-[5]" />
        <div className="relative z-10 section-padding pb-16 w-full">
          <FadeIn>
            <p className="label-luxury text-[#C5A880] mb-4">Our Legacy</p>
            <h1 className="heading-lg text-white font-serif tracking-wide leading-tight">Stories Woven in Gold</h1>
          </FadeIn>
        </div>
      </section>

      {/* Narrative Section 1: Intro */}
      <section className="section-padding py-20 md:py-28 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="label-luxury mb-4">The Avighna Story</p>
            <h2 className="heading-md mb-8 italic">A Legacy of Trust & Splendor</h2>
            <p className="font-serif text-lg md:text-xl font-light text-luxury-black/90 leading-relaxed max-w-3xl mx-auto">
              Founded in the historic town of Wanaparthy, Telangana, {brand.businessName} began with a singular, passionate vision: to bring the weight, warmth, and sacred radiance of pure gold replica jewellery within reach of every woman, honoring India&apos;s rich cultural heritage.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Alternating Story Block 1 */}
      <section className="section-padding py-16 md:py-24 bg-white border-t border-[#EFECE7]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          <FadeIn direction="left" className="order-2 lg:order-1 space-y-6">
            <p className="text-[10px] font-sans uppercase tracking-[0.35em] text-[#C5A880] font-medium">Legacy & Origin</p>
            <h3 className="font-serif text-2xl md:text-3xl font-light text-[#121212]">The Craft of Wanaparthy</h3>
            <p className="text-sm md:text-base text-luxury-muted leading-relaxed font-light">
              What started as a small boutique featuring hand-curated designs has grown into one of South Telangana&apos;s most trusted luxury gold destinations. Every single ornament in our collection tells a story of meticulous dedication — starting from initial sketches to the final hand-plating step.
            </p>
            <p className="text-sm md:text-base text-luxury-muted leading-relaxed font-light">
              Our designs capture the majestic allure of legacy temple structures, showcasing intricate filigree, deities, and kemp motifs that make each piece a timeless piece of heritage.
            </p>
          </FadeIn>
          <FadeIn direction="right" className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-luxury-md">
              <Image
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"
                alt="Intricate golden replica details"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Alternating Story Block 2 */}
      <section className="section-padding py-16 md:py-24 bg-[#FAF8F5] border-t border-[#EFECE7]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          <FadeIn direction="left">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-luxury-md">
              <Image
                src="https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&q=80"
                alt="Legacy gold artisan at work"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
          <FadeIn direction="right" className="space-y-6">
            <p className="text-[10px] font-sans uppercase tracking-[0.35em] text-[#C5A880] font-medium">Handcrafted Artistry</p>
            <h3 className="font-serif text-2xl md:text-3xl font-light text-[#121212]">Master Craftsmen at Work</h3>
            <p className="text-sm md:text-base text-luxury-muted leading-relaxed font-light">
              We work hand-in-hand with legacy artisans who have inherited gold replica techniques passed down through generations. Our stones (high-grade rubies, emeralds, and kemp) are hand-selected, individually tested for clarity, and manually set into copper-alloy frames.
            </p>
            <p className="text-sm md:text-base text-luxury-muted leading-relaxed font-light">
              This handcrafted method ensures that no two pieces are identical, preserving the premium touch and luxury weight that mass-produced casting techniques completely fail to achieve.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Alternating Story Block 3 */}
      <section className="section-padding py-16 md:py-24 bg-white border-t border-[#EFECE7]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          <FadeIn direction="left" className="order-2 lg:order-1 space-y-6">
            <p className="text-[10px] font-sans uppercase tracking-[0.35em] text-[#C5A880] font-medium">For Your Celebrations</p>
            <h3 className="font-serif text-2xl md:text-3xl font-light text-[#121212]">Designed for Life&apos;s Milestones</h3>
            <p className="text-sm md:text-base text-luxury-muted leading-relaxed font-light">
              From Telugu bridal trousseaus to classical Bharatanatyam dance sets, and modern everyday gold bracelets, we cater to every special event in your calendar. Our premium 1 gram gold electroplating resists tarnish, maintaining its brilliant warm sheen through years of celebrations.
            </p>
            <p className="text-sm md:text-base text-luxury-muted leading-relaxed font-light">
              We stand as the destination for brides who seek the opulent weight and finish of pure solid gold with the freedom, practicality, and security of a premium 1 gram replica.
            </p>
          </FadeIn>
          <FadeIn direction="right" className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-luxury-md">
              <Image
                src="/images/hero-1.jpeg"
                alt="South Indian bridal gold replica set"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section id="craftsmanship" className="section-padding py-24 bg-luxury-cream/50 border-t border-[#EFECE7]">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <p className="label-luxury mb-4">What We Stand For</p>
          <h2 className="heading-lg">Our Values</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {values.map((value, i) => (
            <FadeIn key={value.title} delay={i * 0.1}>
              <div className="p-8 bg-white rounded-3xl shadow-luxury h-full hover:shadow-luxury-lg hover:-translate-y-1 transition-all duration-300 border border-[#EFECE7]/40">
                <value.icon className="w-8 h-8 text-[#C5A880] mb-4" />
                <h3 className="font-serif text-xl font-light mb-3 text-[#121212]">{value.title}</h3>
                <p className="text-sm text-luxury-muted leading-relaxed font-light">
                  {value.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Certification */}
      <section id="certification" className="section-padding py-24 md:py-32 bg-white border-t border-[#EFECE7]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <FadeIn>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-luxury-md">
              <Image
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80"
                alt="Certified Sri Avighna 1 Gram Gold jewellery"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.1} className="space-y-6">
            <p className="label-luxury mb-4">Quality Shield</p>
            <h2 className="heading-md mb-6">Premium Plating & Guarantee</h2>
            <div className="space-y-4 body-lg text-sm md:text-base font-light text-luxury-muted">
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
