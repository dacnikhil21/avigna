"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, MessageCircle, Sparkles } from "lucide-react";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/shop/product-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";
import { formatPrice } from "@/lib/utils";

const bridalProducts = products.filter((p) => p.categoryId === "cat-bridal");

const OCCASIONS = [
  { label: "Mehendi & Sangeet", icon: "🌸" },
  { label: "Wedding Ceremony", icon: "✨" },
  { label: "Reception", icon: "💎" },
  { label: "Engagement", icon: "💍" },
];

const TROUSSEAU_FIELDS = [
  { id: "name", label: "Your Name", type: "text", placeholder: "Priya Sharma" },
  { id: "phone", label: "WhatsApp Number", type: "tel", placeholder: "+91 98765 43210" },
  { id: "weddingDate", label: "Wedding Date", type: "date", placeholder: "" },
  { id: "outfitColors", label: "Outfit Colours (e.g. Red & Gold, Ivory & Blush)", type: "text", placeholder: "Burgundy & Antique Gold" },
];

export default function BridalSalonPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", weddingDate: "", outfitColors: "", notes: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=1600&q=85"
          alt="Sri Avighna 1 Gram Gold Jewellery Bridal Salon"
          fill
          priority
          className="object-cover object-top"
          style={{ filter: "brightness(0.65) saturate(0.8)" }}
        />
        {/* Rich gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/30 to-transparent" />

        <div className="relative z-10 w-full section-padding pb-20 md:pb-28">
          <FadeIn>
            <p className="text-[10px] font-sans uppercase tracking-[0.4em] text-[#C5A880] mb-4">
              Sri Avighna 1 Gram Gold Jewellery — Prestige
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-[1.1] max-w-3xl">
              The Bridal<br />
              <em>Salon</em>
            </h1>
            <p className="font-sans text-white/70 text-sm md:text-base font-light max-w-lg leading-relaxed mb-10">
              Your trousseau is not an outfit accessory. It is the story you will tell for generations.
              Let our personal stylists curate it with the reverence it deserves.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#consultation"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#C5A880] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#b8966f] transition-all duration-500"
              >
                Request Private Consultation
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/shop?category=bridal"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/50 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-white/10 transition-all duration-500"
              >
                Browse Bridal Catalogue
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Occasion Tabs */}
      <section className="bg-[#121212] py-8">
        <div className="section-padding">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {OCCASIONS.map(({ label, icon }) => (
              <div key={label} className="flex items-center gap-2 text-white/60 text-[11px] uppercase tracking-[0.2em] font-sans">
                <span className="text-base">{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Statement */}
      <section className="section-padding py-24 md:py-32">
        <FadeIn className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] font-sans uppercase tracking-[0.4em] text-[#C5A880] mb-6">
            The Trousseau Philosophy
          </p>
          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl font-light text-[#121212] italic leading-[1.5] mb-8">
            &ldquo;A bride&apos;s jewellery is not worn once.
            It is passed down, pointed to, and remembered
            long after the wedding photographs have faded.&rdquo;
          </blockquote>
          <div className="w-16 h-px bg-[#C5A880] mx-auto" />
        </FadeIn>
      </section>

      {/* Bridal Sets Grid */}
      <section className="section-padding pb-24 md:pb-32">
        <FadeIn className="mb-14">
          <p className="label-luxury mb-3">Heritage Bridal Édition</p>
          <h2 className="heading-lg max-w-xl">
            The Trousseau<br />Edit
          </h2>
        </FadeIn>

        {bridalProducts.length > 0 ? (
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {bridalProducts.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} priority />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          /* Showcase fallback using all featured products styled as bridal */
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {products.filter(p => p.isFeatured).slice(0, 3).map((product) => (
              <StaggerItem key={product.id}>
                <div className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-luxury-cream mb-4">
                    <Image src={product.images[0]?.url ?? ""} alt={product.images[0]?.altText ?? product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-3 left-3">
                      <span className="text-[9px] uppercase tracking-[0.2em] bg-[#C5A880] text-white px-3 py-1.5">Bridal Edit</span>
                    </div>
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] mb-1.5">{product.metal}</p>
                  <h3 className="font-serif text-lg font-light text-[#121212] mb-1.5">{product.name}</h3>
                  <p className="text-sm text-[#6B6560]">{formatPrice(product.price)}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        <FadeIn className="mt-12 text-center">
          <Link
            href="/shop?category=bridal"
            className="inline-flex items-center gap-2 border border-[#121212] text-[#121212] text-xs uppercase tracking-[0.2em] px-8 py-4 hover:bg-[#121212] hover:text-white transition-all duration-500"
          >
            View Full Bridal Catalogue
            <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>
      </section>

      {/* The Experience: 3 Services */}
      <section className="bg-[#121212] section-padding py-24 md:py-32">
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[10px] font-sans uppercase tracking-[0.4em] text-[#C5A880] mb-4">
            The Salon Experience
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-white">
            Three Ways to Begin
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#C5A880]/20">
          {[
            {
              number: "01",
              title: "WhatsApp Stylist",
              description: "Send us your lehenga colour and a photo. Within 24 hours, your personal stylist will share a curated collection of matching sets, with video walkthroughs under natural light.",
              cta: "Chat on WhatsApp",
              href: "https://wa.me/917013004127",
              external: true,
            },
            {
              number: "02",
              title: "Virtual Styling Session",
              description: "Book a 45-minute video consultation. We will open our vault, try pieces on camera, and help you select a trousseau that complements every ceremony — from mehendi to reception.",
              cta: "Book Virtual Session",
              href: "#consultation",
              external: false,
            },
            {
              number: "03",
              title: "Showroom Appointment",
              description: "Visit our Wanaparthy flagship. A dedicated stylist's desk is reserved for you, with pieces laid out on velvet trays under warm lighting that mirrors how they will look on your wedding day.",
              cta: "Book Showroom Visit",
              href: "/boutique",
              external: false,
            },
          ].map(({ number, title, description, cta, href, external }) => (
            <div key={number} className="bg-[#121212] p-10 md:p-12">
              <p className="font-serif text-4xl font-light text-[#C5A880]/40 mb-6">{number}</p>
              <h3 className="font-serif text-xl font-light text-white mb-4">{title}</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-8">{description}</p>
              {external ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A880] hover:text-white transition-colors group">
                  {cta} <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              ) : (
                <Link href={href} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A880] hover:text-white transition-colors group">
                  {cta} <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Trousseau Consultation Form */}
      <section id="consultation" className="section-padding py-24 md:py-32 bg-[#FAF8F5]">
        <div className="max-w-2xl mx-auto">
          <FadeIn className="mb-14">
            <p className="text-[10px] font-sans uppercase tracking-[0.4em] text-[#C5A880] mb-4">
              Private Styling
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-[#121212] mb-4">
              Request a Bridal Trousseau Consultation
            </h2>
            <p className="text-sm text-[#6B6560] leading-relaxed">
              Share your details and we will have a personal bridal stylist reach out to you within one business day.
            </p>
          </FadeIn>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16 border border-[#EFECE7] bg-white px-8"
              >
                <div className="w-14 h-14 rounded-full bg-[#C5A880]/10 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-6 h-6 text-[#C5A880]" />
                </div>
                <h3 className="font-serif text-2xl font-light text-[#121212] italic mb-4">
                  Your consultation request is received.
                </h3>
                <p className="text-sm text-[#6B6560] leading-relaxed mb-8 max-w-md mx-auto">
                  Our bridal stylist, {form.name ? form.name.split(" ")[0] : "dear bride"}, will reach you within 24 hours on WhatsApp to begin curating your trousseau together.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a
                    href="https://wa.me/917013004127"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#121212] text-white text-xs uppercase tracking-[0.15em] hover:bg-[#C5A880] transition-all duration-500"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Us Now
                  </a>
                  <Link href="/shop?category=bridal" className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#121212] text-[#121212] text-xs uppercase tracking-[0.15em] hover:bg-[#121212] hover:text-white transition-all duration-500">
                    Browse Catalogue
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6 bg-white border border-[#EFECE7] p-8 md:p-12"
              >
                {TROUSSEAU_FIELDS.map(({ id, label, type, placeholder }) => (
                  <div key={id} className="flex flex-col gap-2">
                    <label htmlFor={id} className="text-[11px] uppercase tracking-[0.2em] text-[#6B6560] font-sans">
                      {label}
                    </label>
                    <input
                      id={id}
                      type={type}
                      placeholder={placeholder}
                      required={id !== "outfitColors"}
                      value={form[id as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                      className="border-0 border-b border-[#EFECE7] bg-transparent py-3 text-sm text-[#121212] placeholder:text-[#9a948f] focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <label htmlFor="notes" className="text-[11px] uppercase tracking-[0.2em] text-[#6B6560] font-sans">
                    Any Special Requests or Notes
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    placeholder="Heritage family sets, temple jewellery only, specific stone preferences..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="border-0 border-b border-[#EFECE7] bg-transparent py-3 text-sm text-[#121212] placeholder:text-[#9a948f] focus:outline-none focus:border-[#C5A880] transition-colors resize-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 bg-[#121212] text-white text-xs uppercase tracking-[0.2em] hover:bg-[#C5A880] transition-all duration-500"
                  >
                    <Sparkles className="w-4 h-4" />
                    Request My Consultation
                  </button>
                  <p className="text-[10px] text-[#9a948f] text-center mt-4 leading-relaxed">
                    Your information is handled with complete discretion and will only be used for bridal consultation purposes.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
