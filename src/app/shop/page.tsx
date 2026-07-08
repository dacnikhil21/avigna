"use client";

import { useMemo, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ProductCard } from "@/components/shop/product-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import type { Product, Category } from "@/types";

function ShopContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const categoryFilter = searchParams.get("category");
  const searchQuery = searchParams.get("q") || searchParams.get("search");
  const sortBy = searchParams.get("sort") || "featured";

  useEffect(() => {
    async function loadData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch("/api/products?limit=250"),
          fetch("/api/categories"),
        ]);
        const prodData = await prodRes.json();
        const catData = await catRes.json();
        setProducts(prodData.items || []);
        setCategories(catData || []);
      } catch (err) {
        console.error("Failed to load shop data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = categoryFilter
      ? products.filter((p) => {
          const cat = categories.find((c) => c.slug === categoryFilter);
          return p.category?.slug === categoryFilter || (cat && p.categoryId === cat.id);
        })
      : [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.shortDesc && p.shortDesc.toLowerCase().includes(q))
      );
    }

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
  }, [categoryFilter, sortBy, products, categories, searchQuery]);

  const activeCategory = categories.find((c) => c.slug === categoryFilter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-[#6B6560]">Loading collection...</p>
        </div>
      </div>
    );
  }

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
        <FadeIn className="text-center max-w-2xl mx-auto mb-6">
          <p className="label-luxury mb-1">Sri Avighna 1 Gram Gold Jewellery</p>
          <h1 className="heading-lg mb-1">
            {activeCategory ? activeCategory.name : "All Jewellery"}
          </h1>
          <p className="body-lg text-sm">
            {activeCategory?.description ||
              "Explore our complete range of 1 gram gold jewellery — handcrafted for every occasion."}
          </p>
        </FadeIn>

        {/* Filter bar */}
        <FadeIn className="mb-6">
          {/* Scrollable category pills */}
          <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
            <Link
              href="/shop"
              className={cn(
                "flex-shrink-0 px-3 py-1.5 rounded-full text-[10px] md:text-xs uppercase tracking-wider transition-all duration-300 border",
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
                  "flex-shrink-0 px-3 py-1.5 rounded-full text-[10px] md:text-xs uppercase tracking-wider transition-all duration-300 border whitespace-nowrap",
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
            <p className="text-xs md:text-sm text-[#6B6560]">
              <span className="font-medium text-[#121212]">{filteredProducts.length}</span> {filteredProducts.length === 1 ? "piece" : "pieces"}
            </p>
            <div className="flex items-center gap-1.5 border border-[#EFECE7] bg-white rounded-full px-3 py-1.5">
              <SlidersHorizontal className="w-3 h-3 text-[#9a948f]" />
              <select
                value={sortBy}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("sort", e.target.value);
                  router.push(`${pathname}?${params.toString()}`);
                }}
                className="text-[10px] md:text-xs bg-transparent border-none focus:outline-none text-[#121212] cursor-pointer"
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

        {/* Product Grid — 2 cols mobile, 3 tablet, 4-5 desktop */}
        {filteredProducts.length > 0 ? (
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {filteredProducts.map((product, i) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} priority={i < 5} />
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
