"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/shared/motion";

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
    alt: "Avighna Editorial ring detail",
    aspect: "aspect-[4/5]",
    gridSpan: "col-span-12 md:col-span-4"
  },
  {
    src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
    alt: "Avighna Editorial earrings detail",
    aspect: "aspect-square",
    gridSpan: "col-span-12 md:col-span-4"
  },
  {
    src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
    alt: "Avighna Editorial gold ring",
    aspect: "aspect-[3/4]",
    gridSpan: "col-span-12 md:col-span-4"
  },
  {
    src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
    alt: "Avighna Editorial bridal model",
    aspect: "aspect-[16/10]",
    gridSpan: "col-span-12 md:col-span-7"
  },
  {
    src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
    alt: "Avighna Editorial craftsmanship detail",
    aspect: "aspect-square",
    gridSpan: "col-span-12 md:col-span-5"
  }
];

export function EditorialGallerySection() {
  return (
    <section className="bg-[#FAF8F5] py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 xl:px-28">
        
        {/* Title */}
        <div className="text-center mb-16 md:mb-20">
          <FadeIn>
            <p className="text-[11px] font-sans font-medium tracking-[0.35em] uppercase text-[#C5A880]">
              AVIGHNA EDITORIAL · SS 2025
            </p>
          </FadeIn>
        </div>

        {/* Magazine-style Asymmetric Grid */}
        <div className="grid grid-cols-12 gap-6 md:gap-8 lg:gap-10">
          {GALLERY_IMAGES.map((img, i) => (
            <FadeIn 
              key={i} 
              className={img.gridSpan} 
              delay={i * 0.1}
            >
              <div className={`relative overflow-hidden w-full ${img.aspect} bg-[#121212]/5`}>
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </motion.div>
                {/* Very subtle ambient tint */}
                <div className="absolute inset-0 bg-black/[0.02] pointer-events-none" />
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
