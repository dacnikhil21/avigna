"use client";

import { useState, useEffect } from "react";
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
    images: [
      "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"
    ],
    badge: "New Season",
  },
  {
    title: "Festival Offers",
    subtitle: "Celebrate in Radiance",
    tagline: "Up to 20% Off on Heritage Sets",
    link: "/shop?sort=featured",
    images: [
      "https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?w=800&q=80",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80"
    ],
    badge: "Limited Offer",
  },
  {
    title: "New Arrivals",
    subtitle: "Modern Simplicity",
    tagline: "Fresh Designs Added Daily",
    link: "/shop?sort=newest",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
      "https://images.unsplash.com/photo-1576016770956-debb63d900ad?w=800&q=80"
    ],
    badge: "Trending",
  },
];

function OfferCardImage({ images, alt }: { images: string[]; alt: string }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 4500); // Cycles every 4.5 seconds for final polish
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="absolute inset-0 w-full h-full">
      {images.map((img, idx) => (
        <Image
          key={img}
          src={img}
          alt={alt}
          fill
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            idx === currentIdx ? "opacity-100" : "opacity-0 pointer-events-none"
          } transition-transform duration-1000 ease-out group-hover:scale-[1.04]`}
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={idx === 0}
        />
      ))}
    </div>
  );
}

export function OffersSection() {
  return (
    <section className="section-padding py-8 md:py-16 bg-[#FAF8F5]">
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {OFFERS.map((offer) => (
          <StaggerItem key={offer.title}>
            <Link
              href={offer.link}
              className="animate-shine-hover group block relative h-56 md:h-72 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 ease-out transform-gpu"
            >
              {/* Slideshow of optimized images */}
              <OfferCardImage images={offer.images} alt={offer.title} />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 z-[1] pointer-events-none" />

              {/* Badge */}
              <span className="absolute top-4 left-4 px-2.5 py-1 bg-[#C5A880] text-white text-[9px] uppercase tracking-widest font-medium rounded-md z-[2]">
                {offer.badge}
              </span>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-[2] pointer-events-none">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] mb-1 font-medium">
                  {offer.subtitle}
                </p>
                <h3 className="font-serif text-xl md:text-2xl font-light text-white mb-2 leading-tight">
                  {offer.title}
                </h3>
                <p className="text-xs text-white/70 mb-4 line-clamp-1">
                  {offer.tagline}
                </p>
                
                {/* Micro-animated CTA with gold shine effect */}
                <div className="self-start">
                  <span className="relative overflow-hidden inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] text-white group-hover:text-[#C5A880] transition-colors font-medium py-1.5 px-3 bg-black/45 border border-white/20 rounded-md backdrop-blur-sm">
                    Discover Now
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    {/* Animated Shine layer */}
                    <span className="absolute inset-0 w-1/3 h-full bg-white/25 blur-[1px] -translate-x-[250%] shine-element pointer-events-none" />
                  </span>
                </div>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
