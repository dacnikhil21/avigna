import Link from "next/link";
import { getTrendingProducts } from "@/lib/db/products";
import { ProductCard } from "@/components/shop/product-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { products as staticProducts } from "@/lib/data";
import type { Product } from "@/types";

export async function TrendingSection() {
  let trendingProducts: Product[] = [];
  try {
    const dbProducts = await getTrendingProducts(8);
    trendingProducts = dbProducts as Product[];
  } catch (error) {
    console.error("Failed to load trending products, falling back to static data:", error);
    trendingProducts = staticProducts.filter((p) => p.isTrending).slice(0, 8) as unknown as Product[];
  }
  return (
    <section className="section-padding py-8 md:py-16 bg-[#FAF8F5]">
      <FadeIn className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-6 gap-4">
        <div>
          <p className="label-luxury mb-1 flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-[#8A6B29]" /> What&apos;s Hot
          </p>
          <h2 className="heading-md">Trending Jewellery</h2>
        </div>
        <Link
          href="/shop?sort=featured"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#8A6B29] hover:text-[#121212] transition-colors font-medium"
        >
          View All <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
        {trendingProducts.map((product, i) => (
          <StaggerItem key={product.id}>
            <ProductCard product={product} priority={i < 5} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
