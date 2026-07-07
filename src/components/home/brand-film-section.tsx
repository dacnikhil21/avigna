"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Maximize2 } from "lucide-react";
import { FadeIn } from "@/components/shared/motion";

export function BrandFilmSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a09]">
      {/* Top label */}
      <FadeIn className="absolute top-10 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
        <p className="text-[10px] font-sans uppercase tracking-[0.4em] text-[#C5A880] mb-2">
          The Craft
        </p>
        <h2 className="font-serif text-2xl md:text-3xl font-light text-white italic">
          Where Tradition Meets Artistry
        </h2>
      </FadeIn>

      {/* Cinematic Video */}
      <div className="relative w-full" style={{ aspectRatio: "16/7" }}>
        {/* Gradient overlays for cinematic feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a09]/60 via-transparent to-[#0a0a09]/40 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a09]/30 via-transparent to-[#0a0a09]/30 z-10 pointer-events-none" />

        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.85) saturate(0.9) contrast(1.05)" }}
        >
          {/* Premium jewelry craftsmanship stock footage */}
          <source
            src="https://cdn.coverr.co/videos/coverr-gold-jewelry-craft-6756/1080p.mp4"
            type="video/mp4"
          />
          {/* Fallback to a reliable public stock video */}
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            type="video/mp4"
          />
        </video>

        {/* Bottom caption */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
          <p className="font-serif text-base md:text-lg font-light text-white/80 italic max-w-lg mx-auto leading-relaxed px-6">
            &ldquo;Every piece is shaped by hands that understand the language of gold.&rdquo;
          </p>
          <div className="w-12 h-px bg-[#C5A880] mx-auto mt-4" />
        </div>

        {/* Controls */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMute}
            className="flex items-center gap-2 px-4 py-2.5 bg-black/40 backdrop-blur-sm border border-white/20 text-white text-[11px] tracking-[0.15em] uppercase font-sans hover:bg-black/60 transition-colors"
          >
            {muted ? (
              <VolumeX className="w-3.5 h-3.5 text-[#C5A880]" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#C5A880]" />
            )}
            {muted ? "Unmute" : "Mute"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.requestFullscreen?.();
              }
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#C5A880]/90 backdrop-blur-sm text-white text-[11px] tracking-[0.15em] uppercase font-sans hover:bg-[#C5A880] transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Open Film
          </motion.button>
        </div>
      </div>

      {/* Decorative brand pillars below video */}
      <div className="grid grid-cols-3 border-t border-[#C5A880]/20">
        {[
          { label: "Karigar Heritage", value: "200+ Years" },
          { label: "Purity Certified", value: "BIS Hallmarked" },
          { label: "Artisan Hours", value: "100–400 hrs" },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center py-8 px-4 border-r border-[#C5A880]/20 last:border-0 text-center"
          >
            <p className="font-serif text-xl md:text-2xl font-light text-[#C5A880] mb-1">
              {value}
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
