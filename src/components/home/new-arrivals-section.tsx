import Link from "next/link";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/shop/product-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";
import { ArrowRight, Sparkles } from "lucide-react";

const newArrivals = products.filter((p) => p.isLatest).slice(0, 4);

export function NewArrivalsSection() {
  return (
    <section className="section-padding py-16 md:py-24 bg-white">
      <FadeIn className="text-center max-w-xl mx-auto mb-10">
        <p className="label-luxury mb-2 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" /> Fresh Drops
        </p>
        <h2 className="heading-md mb-3">New Arrivals</h2>
        <p className="text-sm text-[#6B6560]">
          The latest additions to Sri Avighna 1 Gram Gold Jewellery — curated fresh from our atelier.
        </p>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {newArrivals.map((product, i) => (
          <StaggerItem key={product.id}>
            <ProductCard product={product} priority={i < 2} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeIn className="mt-10 text-center">
        <Link
          href="/shop?sort=newest"
          className="inline-flex items-center gap-2 border border-[#121212] text-[#121212] text-xs uppercase tracking-[0.15em] px-8 py-3 hover:bg-[#121212] hover:text-white transition-all duration-500 rounded-full"
        >
          See All New Arrivals <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </FadeIn>
    </section>
  );
}
