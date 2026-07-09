"use client";

import { useState } from "react";
import Image from "next/image";
import { useWebsiteData } from "@/lib/store/admin-store";
import { FadeIn } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  const { brand } = useWebsiteData();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[45vh] min-h-[300px] flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80"
          alt="Sri Avighna Boutique Showroom Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-[#121212]/30 to-transparent" />
        <div className="relative z-10 section-padding pb-12 w-full">
          <FadeIn>
            <p className="label-luxury text-[#C5A880] mb-2">Get in Touch</p>
            <h1 className="heading-lg text-white font-serif tracking-wide leading-tight">Visit Our Showroom</h1>
          </FadeIn>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="section-padding py-20 md:py-28 bg-[#FAF8F5]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto items-start">
          
          {/* Store Info (Left) */}
          <FadeIn className="space-y-8">
            <div>
              <p className="label-luxury mb-2">Private Consultation</p>
              <h2 className="font-serif text-3xl font-light text-[#121212] mb-6">Our Wanaparthy Flagship</h2>
              <p className="text-sm md:text-base text-luxury-muted font-light leading-relaxed mb-6">
                Whether you are looking to curate a custom bridal collection, seek direct styling advice, or explore our latest premium 1 gram gold replica arrivals — our consultants are ready to assist you in our private Wanaparthy salon.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    label: "Address",
                    value: brand.address,
                    href: `https://maps.google.com/?q=${encodeURIComponent(brand.address)}`,
                  },
                  {
                    icon: Phone,
                    label: "Phone / WhatsApp",
                    value: brand.phone,
                    href: `tel:${brand.phone.replace(/\s+/g, "")}`,
                  },
                  {
                    icon: Mail,
                    label: "Email Support",
                    value: brand.email,
                    href: `mailto:${brand.email}`,
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-4 p-4 bg-white rounded-2xl border border-[#EFECE7] hover:border-[#C5A880] hover:shadow-luxury transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#FAF8F5] group-hover:bg-[#C5A880]/10 flex items-center justify-center shrink-0 transition-colors">
                      <item.icon className="w-4 h-4 text-[#C5A880]" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">{item.label}</p>
                      <p className="text-xs md:text-sm text-[#121212] font-medium leading-relaxed">{item.value}</p>
                    </div>
                  </a>
                ))}

                {/* Opening Hours Card */}
                <div className="flex gap-4 p-4 bg-white rounded-2xl border border-[#EFECE7]">
                  <div className="w-10 h-10 rounded-full bg-[#FAF8F5] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#C5A880]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">Boutique Hours</p>
                    <p className="text-xs md:text-sm text-[#121212] font-medium leading-relaxed">
                      Monday – Sunday: 10:00 AM – 8:30 PM (IST)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Contact Form Card (Right) */}
          <FadeIn delay={0.1}>
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-luxury-xl border border-luxury-beige/10">
              <h3 className="font-serif text-2xl font-light text-[#121212] mb-2">Send a Message</h3>
              <p className="text-xs text-luxury-muted font-light mb-8">
                Fill out the form below, and our jewellery concierge team will reach out to you within 24 hours.
              </p>

              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl font-light text-[#121212] mb-3">Message Sent</h3>
                  <p className="text-xs text-luxury-muted max-w-xs mx-auto leading-relaxed">
                    Thank you. We have received your query and look forward to speaking with you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-name" className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Your Name</Label>
                      <Input id="contact-name" required className="mt-1.5 focus:border-[#C5A880] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-[#FAF8F5] border-transparent font-medium text-xs md:text-sm text-[#121212] rounded-xl h-11 px-4" placeholder="Aditi Rao" />
                    </div>
                    <div>
                      <Label htmlFor="contact-phone" className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">WhatsApp Number</Label>
                      <Input id="contact-phone" type="tel" className="mt-1.5 focus:border-[#C5A880] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-[#FAF8F5] border-transparent font-medium text-xs md:text-sm text-[#121212] rounded-xl h-11 px-4" placeholder="+91 98765 43210" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="contact-email" className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Email Address</Label>
                    <Input id="contact-email" type="email" required className="mt-1.5 focus:border-[#C5A880] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-[#FAF8F5] border-transparent font-medium text-xs md:text-sm text-[#121212] rounded-xl h-11 px-4" placeholder="aditi@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="contact-subject" className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Subject / Collection Interest</Label>
                    <Input id="contact-subject" required className="mt-1.5 focus:border-[#C5A880] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-[#FAF8F5] border-transparent font-medium text-xs md:text-sm text-[#121212] rounded-xl h-11 px-4" placeholder="Inquiry about Temple Gold Bridal Sets" />
                  </div>
                  <div>
                    <Label htmlFor="contact-message" className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Message Detail</Label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      className="w-full mt-1.5 p-4 focus:border-[#C5A880] focus:outline-none focus:ring-0 bg-[#FAF8F5] border-transparent font-medium text-xs md:text-sm text-[#121212] rounded-xl resize-none outline-none border transition-all duration-300"
                      placeholder="Share details about your wedding date, design preferences, or consultation details..."
                    />
                  </div>
                  <Button type="submit" variant="gold" className="w-full h-11 text-xs uppercase tracking-wider font-semibold rounded-xl active:scale-[0.98] transition-all">
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </FadeIn>

        </div>
      </section>
    </>
  );
}
