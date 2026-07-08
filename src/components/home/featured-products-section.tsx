import Link from "next/link";
import { getFeaturedProducts } from "@/lib/db/products";
import { ProductCard } from "@/components/shop/product-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";
import { ArrowRight } from "lucide-react";

export async function FeaturedProductsSection() {
  const featuredProducts = await getFeaturedProducts(8);
  return (
    <section className="section-padding py-8 md:py-16 bg-white">
      <FadeIn className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-6 gap-4">
        <div>
          <p className="label-luxury mb-1">Handpicked</p>
          <h2 className="heading-md">Featured Products</h2>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#C5A880] hover:text-[#121212] transition-colors font-medium"
        >
          View Full Collection <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
        {featuredProducts.map((product, i) => (
          <StaggerItem key={product.id}>
            <ProductCard product={product} priority={i < 5} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
