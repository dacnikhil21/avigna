import Link from "next/link";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/shop/product-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";
import { ArrowRight } from "lucide-react";

const mensProducts = products.filter((p) => p.categoryId === "cat-mens").slice(0, 3);
const kidsProducts = products.filter((p) => p.categoryId === "cat-kids").slice(0, 3);

export function MensKidsSection() {
  return (
    <section className="section-padding py-16 md:py-24 bg-white">
      {/* Men's Collection */}
      <FadeIn className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
        <div>
          <p className="label-luxury mb-2">For Him</p>
          <h2 className="heading-md">Men&apos;s Collection</h2>
        </div>
        <Link
          href="/shop?category=mens-collection"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#C5A880] hover:text-[#121212] transition-colors font-medium"
        >
          View All <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 mb-16">
        {mensProducts.map((product, i) => (
          <StaggerItem key={product.id}>
            <ProductCard product={product} priority={i < 2} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Kids Collection */}
      <FadeIn className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
        <div>
          <p className="label-luxury mb-2">For Little Ones</p>
          <h2 className="heading-md">Kids Collection</h2>
        </div>
        <Link
          href="/shop?category=kids-collection"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#C5A880] hover:text-[#121212] transition-colors font-medium"
        >
          View All <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {kidsProducts.map((product) => (
          <StaggerItem key={product.id}>
            <ProductCard product={product} priority={false} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
