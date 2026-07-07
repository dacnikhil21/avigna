"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the hero section relative to viewport scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Extremely restrained parallax zoom and translate
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  
  // Content fades out and shifts up softly on scroll (0% to 30% scroll progress)
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.3], [0, -30]);
  
  // Scroll indicator disappears immediately upon scrolling
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Framer Motion entry sequence config
  const entryTransition = {
    duration: 1.2,
    ease: [0.25, 1, 0.5, 1] as const // Custom cubic-bezier (ease-out-quad signature)
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (customDelay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: customDelay,
        ...entryTransition
      }
    })
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#121212] select-none"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="relative w-full h-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=85"
            alt="Avighna Collections Premium Bridal Editorial"
            fill
            priority
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
        </motion.div>
        
        {/* Soft, rich ambient overlay */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        
        {/* Bottom vertical gradient to anchor the text content */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/75 via-[#121212]/15 to-transparent pointer-events-none" />
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 xl:px-28 flex items-end pb-28 md:pb-36">
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="w-full grid grid-cols-12"
        >
          {/* Asymmetric layout: Aligned left of center, taking up columns 1 to 7 on desktop */}
          <div className="col-span-12 md:col-span-10 lg:col-span-8 xl:col-span-7 text-left flex flex-col items-start gap-4 md:gap-5">
            
            {/* Logo Monogram */}
            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.4}
              className="mb-1"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#C5A880] w-8 h-8 md:w-9 md:h-9"
              >
                {/* Intricate luxury A letter monogram */}
                <path
                  d="M20 2L35 34H31L20 10L9 34H5L20 2Z"
                  fill="currentColor"
                  fillOpacity="0.85"
                />
                <path
                  d="M13 22H27"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle
                  cx="20"
                  cy="14"
                  r="2"
                  fill="currentColor"
                />
                <path
                  d="M20 2V6"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <path
                  d="M9 34V37M31 34V37"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </motion.div>

            {/* Eyebrow Label */}
            <motion.p
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.7}
              className="text-[11px] font-sans font-medium tracking-[0.3em] uppercase text-[#C5A880]"
            >
              AVIGHNA COLLECTIONS
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              custom={1.0}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#FAF8F5] leading-[1.1] md:leading-[1.0] italic tracking-wide text-balance"
            >
              Where Sacred Heritage<br className="hidden sm:block" />
              Meets Timeless Celebration
            </motion.h1>

            {/* Supporting Paragraph */}
            <motion.p
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              custom={1.3}
              className="font-sans font-light text-sm md:text-base text-white/75 leading-relaxed max-w-md md:max-w-lg mb-2"
            >
              Meticulously hand-carved by legacy artisans, our collections capture the weight, warmth, and sacred radiance of pure gold. An invitation to adorn yourself in India&apos;s finest jewellery heritage, crafted for a lifetime of celebrations.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              animate="visible"
              custom={1.6}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mt-2"
            >
              <Link
                href="/collections"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#121212] hover:bg-[#C5A880] text-white hover:text-[#121212] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-500 ease-out border border-[#121212] hover:border-[#C5A880] active:scale-[0.98] select-none text-center"
              >
                Explore Collections
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/40 hover:border-[#C5A880] text-white hover:bg-[#C5A880] hover:text-[#121212] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-500 ease-out active:scale-[0.98] select-none text-center"
              >
                Shop All Jewellery
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Elegant Scroll Indicator */}
      <motion.div
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
        custom={2.0}
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 pointer-events-none"
      >
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "300%"] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="absolute top-0 left-0 w-full h-4 bg-[#C5A880]"
          />
        </div>
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#FAF8F5]/60 font-medium">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
