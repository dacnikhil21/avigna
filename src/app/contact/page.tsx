"use client";

import { useState } from "react";
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
    <div className="section-padding pt-32 md:pt-36 pb-20">
      <FadeIn className="text-center max-w-2xl mx-auto mb-16">
        <p className="label-luxury mb-4">Get in Touch</p>
        <h1 className="heading-lg mb-4">We&apos;d Love to Hear From You</h1>
        <p className="body-lg">
          Whether you need styling advice, want to book a private consultation,
          or have a question — our team is here to help.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact form */}
        <FadeIn>
          <div className="bg-luxury-cream/30 rounded-3xl p-8">
            {submitted ? (
              <div className="text-center py-12">
                <h3 className="font-serif text-2xl font-light mb-3">Thank You</h3>
                <p className="text-sm text-luxury-muted">
                  We&apos;ve received your message and will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="contact-name">Name</Label>
                  <Input id="contact-name" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="contact-email">Email</Label>
                  <Input id="contact-email" type="email" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="contact-phone">Phone</Label>
                  <Input id="contact-phone" type="tel" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="contact-subject">Subject</Label>
                  <Input id="contact-subject" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="contact-message">Message</Label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    className="input-luxury mt-1.5 resize-none"
                  />
                </div>
                <Button type="submit" variant="gold" className="w-full">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </FadeIn>

        {/* Store info */}
        <FadeIn delay={0.1}>
          <div id="store" className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-light mb-6">Visit Our Showroom</h2>
              <div className="space-y-5">
                {[
                  { icon: MapPin, label: "Address", value: brand.address },
                  { icon: Phone, label: "Phone", value: brand.phone },
                  { icon: Mail, label: "Email", value: brand.email },
                  {
                    icon: Clock,
                    label: "Hours",
                    value: brand.storeTimings,
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-luxury-cream flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-luxury-gold" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-luxury-muted mb-0.5">
                        {label}
                      </p>
                      <p className="text-sm whitespace-pre-line">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl overflow-hidden h-64 bg-luxury-cream">
              <iframe
                title={`${brand.businessName} Store Location`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent("Sri Avighna 1 Gram Gold Jewellery, Beside More Supermarket, Opp RR Complex, Polytechnic Road, Wanaparthy - 509103")}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
