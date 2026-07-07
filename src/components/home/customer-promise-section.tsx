import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";
import { Shield, RefreshCcw, Star, Truck, MessageCircle, Award } from "lucide-react";

const promises = [
  {
    icon: Shield,
    title: "100% Authentic",
    description: "Genuine 1 Gram Gold jewellery — quality you can see and feel.",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary insured delivery across India on all orders.",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description: "Hassle-free 7-day returns and exchange policy.",
  },
  {
    icon: Star,
    title: "Lifetime Polish",
    description: "Free polishing service to keep your jewellery looking new.",
  },
  {
    icon: MessageCircle,
    title: "Client Support",
    description: "Dedicated assistance from our friendly support team.",
  },
  {
    icon: Award,
    title: "Trusted Since 2015",
    description: "Over 10 years of trust, quality, and craftsmanship in Wanaparthy.",
  },
];

export function CustomerPromiseSection() {
  return (
    <section className="bg-[#121212] section-padding py-16 md:py-24">
      <FadeIn className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] mb-3">The Avighna Promise</p>
        <h2 className="font-serif text-3xl md:text-4xl font-light text-white mb-4">
          Why Choose Avighna Collections
        </h2>
        <p className="text-white/50 text-sm leading-relaxed">
          Every piece we create carries our commitment to quality, heritage, and your happiness.
        </p>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
        {promises.map(({ icon: Icon, title, description }) => (
          <StaggerItem key={title}>
            <div className="flex flex-col items-start p-5 md:p-6 border border-white/10 rounded-2xl hover:border-[#C5A880]/40 transition-all duration-300 hover:bg-white/5">
              <div className="w-10 h-10 rounded-full bg-[#C5A880]/10 flex items-center justify-center mb-4">
                <Icon className="w-4 h-4 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-base text-white font-light mb-2">{title}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{description}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
