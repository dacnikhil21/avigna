import Link from "next/link";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/shop/product-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";
import { ArrowRight } from "lucide-react";

const latestProducts = products.filter((p) => p.isLatest).slice(0, 8);

export function LatestCollectionsSection() {
  return (
    <section className="section-padding py-12 md:py-16 bg-white">
      <FadeIn className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-6 gap-4">
        <div>
          <p className="label-luxury mb-1">Just Arrived</p>
          <h2 className="heading-md">Latest Collections</h2>
        </div>
        <Link
          href="/shop?category=latest-collections"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#C5A880] hover:text-[#121212] transition-colors font-medium"
        >
          View All New <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
        {latestProducts.map((product, i) => (
          <StaggerItem key={product.id}>
            <ProductCard product={product} priority={i < 5} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
