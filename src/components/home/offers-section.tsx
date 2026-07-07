"use client";

import Link from "next/link";
import Image from "next/image";
import { StaggerContainer, StaggerItem } from "@/components/shared/motion";
import { ArrowRight } from "lucide-react";

const OFFERS = [
  {
    title: "Latest Collections",
    subtitle: "Pristine 1 Gram Gold",
    tagline: "Explore New Season Releases",
    link: "/shop?category=latest-collections",
    image: "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&q=80",
    badge: "New Season",
  },
  {
    title: "Festival Offers",
    subtitle: "Celebrate in Radiance",
    tagline: "Up to 20% Off on Heritage Sets",
    link: "/shop?sort=featured",
    image: "https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?w=800&q=80",
    badge: "Limited Offer",
  },
  {
    title: "New Arrivals",
    subtitle: "Modern Simplicity",
    tagline: "Fresh Designs Added Daily",
    link: "/shop?sort=newest",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    badge: "Trending",
  },
];

export function OffersSection() {
  return (
    <section className="section-padding py-8 md:py-16 bg-[#FAF8F5]">
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {OFFERS.map((offer) => (
          <StaggerItem key={offer.title}>
            <Link
              href={offer.link}
              className="group block relative h-56 md:h-72 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Image */}
              <Image
                src={offer.image}
                alt={offer.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />

              {/* Badge */}
              <span className="absolute top-4 left-4 px-2.5 py-1 bg-[#C5A880] text-white text-[9px] uppercase tracking-widest font-medium rounded-md">
                {offer.badge}
              </span>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] mb-1 font-medium">
                  {offer.subtitle}
                </p>
                <h3 className="font-serif text-xl md:text-2xl font-light text-white mb-2 leading-tight">
                  {offer.title}
                </h3>
                <p className="text-xs text-white/70 mb-4 line-clamp-1">
                  {offer.tagline}
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] text-white group-hover:text-[#C5A880] transition-colors font-medium">
                  Discover Now
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
