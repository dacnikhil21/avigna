import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getProducts } from "@/lib/db/products";
import { ProductCard } from "@/components/shop/product-card";
import { FadeIn } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { Product, Collection } from "@/types";
import { collections as staticCollections, products as staticProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const dbCollections = await prisma.collection.findMany({
      where: { isActive: true },
      select: { slug: true },
    });
    return dbCollections.map((c) => ({ slug: c.slug }));
  } catch (error) {
    console.warn("Prisma: database not available during build time, bypassing collections pre-render", error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const collection = await prisma.collection.findUnique({
      where: { slug },
    });
    if (!collection) return { title: "Collection Not Found" };
    return {
      title: collection.name,
      description: collection.description || undefined,
    };
  } catch (err) {
    console.error("generateMetadata failed for collection, returning fallback:", err);
    const matchedColl = staticCollections.find((c) => c.slug === slug);
    if (matchedColl) {
      return { title: matchedColl.name, description: matchedColl.description };
    }
    return { title: "Collection | Sri Avighna" };
  }
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  let collection: Collection | null = null;
  let products: Product[] = [];

  try {
    const dbCollection = await prisma.collection.findUnique({
      where: { slug },
    });
    if (dbCollection) {
      collection = dbCollection as unknown as Collection;
      const result = await getProducts({
        collectionSlug: slug,
        limit: 100,
      });
      products = result.items as Product[];
    }
  } catch (error) {
    console.error("Failed to load collection details, falling back to static:", error);
    const matchedColl = staticCollections.find((c) => c.slug === slug);
    if (matchedColl) {
      collection = matchedColl as unknown as Collection;
      products = staticProducts.filter((p) => p.collectionId === matchedColl.id) as unknown as Product[];
    }
  }

  if (!collection) notFound();

  return (
    <>
      {/* Breadcrumbs */}
      <div className="section-padding pt-28 md:pt-32 pb-4">
        <nav className="flex items-center gap-1.5 text-xs text-[#9a948f]">
          <Link href="/" className="hover:text-[#C5A880] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/collections" className="hover:text-[#C5A880] transition-colors">Collections</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#121212] font-medium">{collection.name}</span>
        </nav>
      </div>

      <section className="relative h-[50vh] min-h-[350px] flex items-end">
        <Image
          src={collection.coverImage ?? ""}
          alt={collection.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 section-padding pb-10 text-white">
          <FadeIn className="max-w-3xl">
            <h1 className="font-serif text-3xl md:text-5xl font-light mb-3 tracking-wide">{collection.name}</h1>
            {collection.tagline && (
              <p className="text-[#C5A880] font-medium text-sm md:text-base uppercase tracking-wider mb-2">
                {collection.tagline}
              </p>
            )}
            {collection.description && (
              <p className="text-slate-200 text-sm md:text-base leading-relaxed font-light">
                {collection.description}
              </p>
            )}
          </FadeIn>
        </div>
      </section>

      <section className="section-padding py-16 bg-[#FAF8F5]">
        <FadeIn className="flex items-center justify-between mb-8">
          <div>
            <h2 className="heading-md mb-1">Featured Creations</h2>
            <p className="body-md text-xs">Discover dynamic designs in this collection.</p>
          </div>
          <Button variant="outline" asChild className="hidden sm:inline-flex">
            <Link href="/shop">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product as Product} />
          ))}
        </div>
      </section>
    </>
  );
}
