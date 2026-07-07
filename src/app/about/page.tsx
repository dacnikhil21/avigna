import type { Metadata } from "next";
import Image from "next/image";
import { BRAND } from "@/lib/data";
import { FadeIn } from "@/components/shared/motion";
import { Award, Gem, Heart, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover the story of Sri Avighna 1 Gram Gold Jewellery — three decades of master craftsmanship, BIS hallmarked gold, and timeless Indian jewellery.",
};

const values = [
  {
    icon: Gem,
    title: "Uncompromising Quality",
    description:
      "Every piece uses BIS hallmarked gold and GIA-certified diamonds. We never compromise on purity or craftsmanship.",
  },
  {
    icon: Heart,
    title: "Crafted with Love",
    description:
      "Our master artisans pour decades of experience into every piece, using techniques passed down through generations.",
  },
  {
    icon: Award,
    title: "Certified Authenticity",
    description:
      "Each purchase includes a certificate of authenticity, detailed specifications, and our lifetime craftsmanship guarantee.",
  },
  {
    icon: Users,
    title: "Customer First",
    description:
      "From private consultations to after-sales service, we treat every customer like family — because you are.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1603561596112-0a132b757442?w=1920&q=80"
          alt="Sri Avighna 1 Gram Gold Jewellery craftsmanship"
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
            <h2 className="heading-md mb-8">Three Decades of Trust</h2>
            <div className="space-y-6 body-lg text-left">
              <p>
                Founded in 1994 in the heart of Bengaluru, {BRAND.name} began as a
                small family workshop with a singular vision: to create jewellery that
                honours India&apos;s rich artistic heritage while embracing contemporary
                elegance.
              </p>
              <p>
                What started with a handful of master craftsmen has grown into one of
                South India&apos;s most trusted luxury jewellery brands — yet our
                approach remains unchanged. Every piece is still handcrafted, every
                diamond still hand-selected, and every customer still treated like family.
              </p>
              <p>
                Today, we serve discerning customers across India — brides seeking
                their perfect wedding set, professionals looking for everyday elegance,
                and families marking life&apos;s most precious milestones.
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
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80"
                alt="BIS Hallmarked gold jewellery"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="label-luxury mb-4">Certification</p>
            <h2 className="heading-md mb-6">BIS Hallmarked & GIA Certified</h2>
            <div className="space-y-4 body-lg">
              <p>
                Every gold piece from Sri Avighna 1 Gram Gold Jewellery carries the BIS hallmark —
                the Bureau of Indian Standards mark that guarantees purity. Our 22K
                gold is 916 purity, and our 18K gold is 750 purity.
              </p>
              <p>
                All diamonds above 0.30 carats come with GIA (Gemological Institute
                of America) certification, ensuring you receive exactly what we promise.
              </p>
              <p>
                Each purchase includes a detailed certificate of authenticity with
                complete specifications — metal purity, stone details, weight, and
                unique SKU.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
