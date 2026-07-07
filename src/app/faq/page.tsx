"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { FadeIn } from "@/components/shared/motion";
import { useWebsiteData } from "@/lib/store/admin-store";

const FAQ_GROUPS = [
  {
    title: "Material & Composition",
    description: "Honest craftsmanship transparency regarding our 1 gram gold composition and alloy standards.",
    items: [
      {
        q: "What is 1-gram gold jewellery?",
        a: "1-gram gold jewellery uses a premium brass-copper base alloy core, coated with high-purity gold (22K or 18K) using advanced electroforming techniques. This results in the indistinguishable weight, warmth, and radiance of fine solid gold at an accessible price."
      },
      {
        q: "How is Sri Avighna 1 Gram Gold Jewellery hallmarked?",
        a: "All our gold pieces carry official BIS Hallmark certification (916 for 22K, 750 for 18K) confirming gold purity standards. A physical certificate of authenticity is included inside every signature unboxing box."
      },
      {
        q: "Is the metal safe for sensitive skin?",
        a: "Absolutely. Our core alloy is completely hypoallergenic, nickel-free, and lead-free. It is coated with high-purity gold to ensure comfortable, irritation-free wear for all skin types."
      }
    ]
  },
  {
    title: "Shipping & Security",
    description: "Delivery speeds, shipping insurance, and secure parcel tracking information.",
    items: [
      {
        q: "How long does delivery take?",
        a: "Standard insured shipping across India takes 4–7 business days. Express delivery (1–2 days) is available for select metro pin codes. All orders are processed within 24 hours of confirmation."
      },
      {
        q: "Are shipments safe and insured?",
        a: "Yes. Every shipment is fully insured in transit from our Bangalore boutique to your doorstep. We partner only with premium logistics couriers and require a secure OTP or signature verification upon delivery."
      },
      {
        q: "How can I track my shipment?",
        a: "Once shipped, you will receive a tracking link via email and WhatsApp. You can also view live delivery details and order history inside your Customer Lounge account dashboard."
      }
    ]
  },
  {
    title: "Care & Guarantee",
    description: "Our return window, exchange policy, and simple care guidelines.",
    items: [
      {
        q: "How do I care for my gold jewellery?",
        a: "To preserve the gold polish, store pieces separately in the custom velvet pouches provided. Avoid contact with perfumes, water, sanitisers, and cosmetics. Gently wipe clean with a soft dry microfiber cloth after each wear."
      },
      {
        q: "What is your return and exchange policy?",
        a: "We offer a 15-day return policy for unworn, unaltered items in their original packaging. We also support a lifetime exchange program, giving you full catalog credit for returned pieces toward new collections."
      }
    ]
  }
];

export default function FaqPage() {
  const { brand } = useWebsiteData();
  const [activeId, setActiveId] = useState<string | null>(null);

  const dynamicFaqGroups = FAQ_GROUPS.map(group => ({
    ...group,
    items: group.items.map(item => ({
      q: item.q.replaceAll("Sri Avighna 1 Gram Gold Jewellery", brand.businessName),
      a: item.a.replaceAll("Sri Avighna 1 Gram Gold Jewellery", brand.businessName)
    }))
  }));

  const toggleAccordion = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-32 md:pt-36 pb-28">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <nav className="text-xs text-luxury-muted mb-6 uppercase tracking-wider">
          <Link href="/" className="hover:text-luxury-gold transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-luxury-black">Client FAQ</span>
        </nav>

        {/* Title */}
        <FadeIn className="mb-16">
          <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#C5A880] mb-3">
            Customer Lounge
          </p>
          <h1 className="font-serif text-3xl md:text-5xl font-light text-[#121212] mb-6">
            Boutique <em>FAQ</em>
          </h1>
          <p className="font-sans font-light text-[#6B6560] max-w-2xl leading-relaxed">
            Discover details about our artisanal composition, secure insured shipping, and lifetime support care.
          </p>
        </FadeIn>

        {/* Categories / Groups */}
        <div className="space-y-16">
          {dynamicFaqGroups.map((group, groupIdx) => (
            <div key={group.title} className="space-y-6">
              <div className="border-b border-[#EFECE7] pb-4">
                <h2 className="font-serif text-xl font-light text-[#121212]">{group.title}</h2>
                <p className="text-xs text-luxury-muted mt-1">{group.description}</p>
              </div>

              <div className="divide-y divide-[#EFECE7] border-b border-[#EFECE7]">
                {group.items.map((item, itemIdx) => {
                  const itemId = `${groupIdx}-${itemIdx}`;
                  const isOpen = activeId === itemId;

                  return (
                    <div key={itemId} className="py-5">
                      <button
                        onClick={() => toggleAccordion(itemId)}
                        className="w-full flex items-center justify-between text-left focus:outline-none group"
                      >
                        <span className="font-serif text-base font-normal text-[#121212] group-hover:text-[#C5A880] transition-colors pr-6">
                          {item.q}
                        </span>
                        <span className="shrink-0 text-luxury-muted group-hover:text-[#C5A880] transition-colors">
                          {isOpen ? (
                            <Minus className="w-4 h-4 stroke-[1.5]" />
                          ) : (
                            <Plus className="w-4 h-4 stroke-[1.5]" />
                          )}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="font-sans font-light text-sm text-[#6B6560] leading-relaxed mt-4">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Action Panel */}
        <div className="mt-20 pt-12 border-t border-[#EFECE7] text-center max-w-2xl mx-auto">
          <HelpCircle className="w-8 h-8 text-[#C5A880] mx-auto mb-4 stroke-[1.5]" />
          <h3 className="font-serif text-lg font-light text-[#121212] mb-2">Still Seeking Guidance?</h3>
          <p className="font-sans font-light text-sm text-[#6B6560] mb-8 leading-relaxed">
            Our personal concierge team is ready to assist with custom styling measurements, gift selections, or booking your store appointment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/91${brand.phone.replace(/\s+/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#121212] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C5A880] transition-all duration-500 rounded-none"
            >
              WhatsApp Concierge
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-[#121212] text-[#121212] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#121212] hover:text-white transition-all duration-500 rounded-none"
            >
              Contact Boutique
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
