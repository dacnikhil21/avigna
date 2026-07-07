"use client";

import { useMemo, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { products, categories } from "@/lib/data";
import { ProductCard } from "@/components/shop/product-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight, SlidersHorizontal } from "lucide-react";

function ShopContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const sortBy = searchParams.get("sort") || "featured";

  const filteredProducts = useMemo(() => {
    const result = categoryFilter
      ? products.filter((p) => p.category.slug === categoryFilter)
      : [...products];

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        result.sort((a, b) => (b.isLatest ? 1 : 0) - (a.isLatest ? 1 : 0));
        break;
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [categoryFilter, sortBy]);

  const activeCategory = categories.find((c) => c.slug === categoryFilter);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Breadcrumbs */}
      <div className="section-padding pt-28 md:pt-32 pb-4">
        <nav className="flex items-center gap-1.5 text-xs text-[#9a948f]">
          <Link href="/" className="hover:text-[#C5A880] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-[#C5A880] transition-colors">Shop</Link>
          {activeCategory && (
            <>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#121212] font-medium">{activeCategory.name}</span>
            </>
          )}
        </nav>
      </div>

      <div className="section-padding pb-16">
        {/* Header */}
        <FadeIn className="text-center max-w-2xl mx-auto mb-8">
          <p className="label-luxury mb-3">Avighna Collections</p>
          <h1 className="heading-lg mb-3">
            {activeCategory ? activeCategory.name : "All Jewellery"}
          </h1>
          <p className="body-lg text-sm">
            {activeCategory?.description ||
              "Explore our complete range of 1 gram gold jewellery — handcrafted for every occasion."}
          </p>
        </FadeIn>

        {/* Filter bar */}
        <FadeIn className="mb-8">
          {/* Scrollable category pills */}
          <div className="flex items-center gap-3 mb-4 overflow-x-auto pb-2 scrollbar-none">
            <Link
              href="/shop"
              className={cn(
                "flex-shrink-0 px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-300 border",
                !categoryFilter
                  ? "bg-[#121212] text-white border-[#121212]"
                  : "bg-white text-[#6B6560] border-[#EFECE7] hover:border-[#C5A880]"
              )}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className={cn(
                  "flex-shrink-0 px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-300 border whitespace-nowrap",
                  categoryFilter === cat.slug
                    ? "bg-[#121212] text-white border-[#121212]"
                    : "bg-white text-[#6B6560] border-[#EFECE7] hover:border-[#C5A880]"
                )}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Results count + Sort */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#6B6560]">
              <span className="font-medium text-[#121212]">{filteredProducts.length}</span> {filteredProducts.length === 1 ? "piece" : "pieces"}
            </p>
            <div className="flex items-center gap-2 border border-[#EFECE7] bg-white rounded-full px-4 py-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#9a948f]" />
              <select
                value={sortBy}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("sort", e.target.value);
                  router.push(`${pathname}?${params.toString()}`);
                }}
                className="text-xs bg-transparent border-none focus:outline-none text-[#121212] cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A–Z</option>
              </select>
            </div>
          </div>
        </FadeIn>

        {/* Product Grid — 2 cols mobile, 3 tablet, 4 desktop */}
        {filteredProducts.length > 0 ? (
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {filteredProducts.map((product, i) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} priority={i < 4} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="text-center py-20">
            <p className="font-serif text-xl font-light mb-2">No pieces found</p>
            <p className="text-sm text-[#6B6560] mb-6">
              Try browsing a different category
            </p>
            <Link href="/shop" className="btn-luxury-outline">
              View All
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-[#6B6560]">Loading collection...</p>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
