import Link from "next/link";
import { getFeaturedProducts } from "@/lib/data";
import { ProductCard } from "@/components/shop/product-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";
import { ArrowRight } from "lucide-react";

const bestSellers = getFeaturedProducts().slice(0, 8);

export function BestSellersSection() {
  return (
    <section className="section-padding py-16 md:py-24 bg-[#FAF8F5]">
      <FadeIn className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
        <div>
          <p className="label-luxury mb-2">Customer Favourites</p>
          <h2 className="heading-md">Best Sellers</h2>
        </div>
        <Link
          href="/shop?sort=featured"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#C5A880] hover:text-[#121212] transition-colors font-medium"
        >
          View All <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
        {bestSellers.map((product, i) => (
          <StaggerItem key={product.id}>
            <ProductCard product={product} priority={i < 4} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
