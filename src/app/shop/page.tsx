"use client";

import { useMemo, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { products, categories } from "@/lib/data";
import { ProductCard } from "@/components/shop/product-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [categoryFilter, sortBy]);

  const activeCategory = categories.find((c) => c.slug === categoryFilter);

  return (
    <div className="section-padding py-32 md:py-36">
      {/* Header */}
      <FadeIn className="text-center max-w-2xl mx-auto mb-12">
        <p className="label-luxury mb-4">The Collection</p>
        <h1 className="heading-lg mb-4">
          {activeCategory ? activeCategory.name : "All Jewellery"}
        </h1>
        <p className="body-lg">
          {activeCategory?.description ||
            "Explore our complete range of handcrafted luxury jewellery."}
        </p>
      </FadeIn>

      {/* Filters */}
      <FadeIn className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12 pb-6 border-b border-luxury-beige/30">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          <Link
            href="/shop"
            className={cn(
              "px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-300",
              !categoryFilter
                ? "bg-luxury-black text-white"
                : "bg-luxury-cream text-luxury-muted hover:bg-luxury-beige/50"
            )}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className={cn(
                "px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-300",
                categoryFilter === cat.slug
                  ? "bg-luxury-black text-white"
                  : "bg-luxury-cream text-luxury-muted hover:bg-luxury-beige/50"
              )}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-luxury-muted uppercase tracking-wider">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("sort", e.target.value);
              router.push(`${pathname}?${params.toString()}`);
            }}
            className="text-sm bg-transparent border-none focus:outline-none text-luxury-black cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>
      </FadeIn>

      {/* Product count */}
      <p className="text-sm text-luxury-muted mb-8">
        {filteredProducts.length} {filteredProducts.length === 1 ? "piece" : "pieces"}
      </p>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <div className="text-center py-20">
          <p className="font-serif text-xl font-light mb-2">No pieces found</p>
          <p className="text-sm text-luxury-muted mb-6">
            Try browsing a different category
          </p>
          <Link href="/shop" className="btn-luxury-outline">
            View All
          </Link>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
