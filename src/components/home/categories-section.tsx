"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { categories, testimonials } from "@/lib/data";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";

export function CategoriesSection() {
  return (
    <section className="section-padding py-24 md:py-32">
      <FadeIn className="text-center max-w-2xl mx-auto mb-16">
        <p className="label-luxury mb-4">Shop By Category</p>
        <h2 className="heading-lg mb-4">Find Your Perfect Piece</h2>
        <p className="body-lg">
          Whether you&apos;re celebrating a wedding, marking a milestone, or
          treating yourself — we have something extraordinary for every occasion.
        </p>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat) => (
          <StaggerItem key={cat.slug}>
            <Link
              href={`/shop?category=${cat.slug}`}
              className="group block relative aspect-square rounded-3xl overflow-hidden"
            >
              <Image
                src={cat.image!}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 via-luxury-black/10 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <h3 className="font-serif text-lg md:text-xl font-light text-white group-hover:text-luxury-gold-light transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-white/60 mt-1 hidden md:block">
                  {cat.description}
                </p>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="section-padding py-24 md:py-32 bg-luxury-black text-white">
      <FadeIn className="text-center max-w-2xl mx-auto mb-16">
        <p className="label-luxury text-luxury-gold-light mb-4">Testimonials</p>
        <h2 className="heading-lg text-white mb-4">Loved by Thousands</h2>
        <p className="text-white/60 leading-relaxed">
          Hear from our cherished customers who trust Avighna Collections
          for their most important moments.
        </p>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((t) => (
          <StaggerItem key={t.name}>
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm h-full flex flex-col">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-luxury-gold text-luxury-gold"
                  />
                ))}
              </div>
              <p className="text-white/80 text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{t.content}&rdquo;
              </p>
              <div>
                <p className="font-serif text-lg font-light">{t.name}</p>
                <p className="text-xs text-luxury-gold mt-0.5">{t.role}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1603561596112-0a132b757442?w=1920&q=80"
          alt="Diamond jewellery"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-luxury-black/50 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 section-padding py-32 md:py-40 text-center">
        <FadeIn>
          <p className="label-luxury text-luxury-gold-light mb-4">
            Begin Your Journey
          </p>
          <h2 className="heading-lg text-white mb-6 max-w-2xl mx-auto text-balance">
            Visit Our Showroom or Book a Private Consultation
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-10 leading-relaxed">
            Experience our collections in person with a dedicated jewellery
            consultant. Complimentary styling advice for bridal and special occasions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-gold">
              Book Appointment
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/30 text-white text-sm uppercase tracking-[0.15em] rounded-full transition-all duration-500 hover:bg-white/10"
            >
              Shop Online
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function TrustBadgesSection() {
  const badges = [
    { title: "BIS Hallmarked", desc: "916 & 750 purity certified" },
    { title: "Free Insured Shipping", desc: "On orders above ₹50,000" },
    { title: "Lifetime Exchange", desc: "Upgrade anytime, any value" },
    { title: "Secure Payments", desc: "256-bit SSL encryption" },
  ];

  return (
    <section className="section-padding py-16 border-y border-luxury-beige/30">
      <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {badges.map((badge) => (
          <StaggerItem key={badge.title}>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full gold-gradient flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              <h4 className="text-sm font-medium mb-1">{badge.title}</h4>
              <p className="text-xs text-luxury-muted">{badge.desc}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
