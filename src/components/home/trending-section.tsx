import Link from "next/link";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/shop/product-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";
import { ArrowRight, TrendingUp } from "lucide-react";

const trendingProducts = products.filter((p) => p.isTrending).slice(0, 8);

export function TrendingSection() {
  return (
    <section className="section-padding py-16 md:py-24 bg-[#FAF8F5]">
      <FadeIn className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
        <div>
          <p className="label-luxury mb-2 flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-[#C5A880]" /> What&apos;s Hot
          </p>
          <h2 className="heading-md">Trending Jewellery</h2>
        </div>
        <Link
          href="/shop?sort=featured"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#C5A880] hover:text-[#121212] transition-colors font-medium"
        >
          View All <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
        {trendingProducts.map((product, i) => (
          <StaggerItem key={product.id}>
            <ProductCard product={product} priority={i < 2} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
