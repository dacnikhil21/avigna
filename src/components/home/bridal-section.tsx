import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/shop/product-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";
import { ArrowRight } from "lucide-react";

const bridalProducts = products.filter((p) => p.isBridal || p.categoryId === "cat-bridal").slice(0, 4);

export function BridalSection() {
  return (
    <section className="bg-[#121212] section-padding py-16 md:py-24">
      {/* Header */}
      <FadeIn className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] mb-2">For The Sacred Day</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-white">Bridal Collection</h2>
        </div>
        <Link
          href="/bridal-salon"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#C5A880] hover:text-white transition-colors font-medium"
        >
          Visit Bridal Salon <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </FadeIn>

      {/* Banner strip */}
      <FadeIn className="relative h-40 md:h-64 rounded-2xl overflow-hidden mb-10">
        <Image
          src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=1600&q=80"
          alt="Bridal Collection"
          fill
          className="object-cover object-top brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-white/60 text-xs uppercase tracking-[0.3em] mb-2">Avighna Bridal Salon</p>
          <h3 className="font-serif text-2xl md:text-4xl font-light text-white italic mb-4">
            Complete Telugu Bridal Trousseau
          </h3>
          <Link
            href="/bridal-salon"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#C5A880] text-white text-xs uppercase tracking-[0.15em] hover:bg-[#b8966f] transition-all duration-300 rounded-full"
          >
            Book Private Consultation <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </FadeIn>

      {/* Products */}
      {bridalProducts.length > 0 && (
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {bridalProducts.map((product, i) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} priority={i < 2} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

      <FadeIn className="mt-8 text-center">
        <Link
          href="/shop?category=bridal-collection"
          className="inline-flex items-center gap-2 border border-white/30 text-white text-xs uppercase tracking-[0.15em] px-6 py-3 hover:bg-white hover:text-[#121212] transition-all duration-500 rounded-full"
        >
          View Full Bridal Catalogue <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </FadeIn>
    </section>
  );
}
