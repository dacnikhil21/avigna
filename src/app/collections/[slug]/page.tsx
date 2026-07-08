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
import type { Product } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const dbCollections = await prisma.collection.findMany({
    where: { isActive: true },
    select: { slug: true },
  });
  return dbCollections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = await prisma.collection.findUnique({
    where: { slug },
  });
  if (!collection) return { title: "Collection Not Found" };

  return {
    title: collection.name,
    description: collection.description,
  };
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const collection = await prisma.collection.findUnique({
    where: { slug },
  });

  if (!collection) notFound();

  // Fetch products in this collection
  const result = await getProducts({
    collectionSlug: slug,
    limit: 100,
  });

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
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 to-transparent" />
        <div className="relative z-10 section-padding pb-12">
          <FadeIn>
            <p className="label-luxury text-luxury-gold-light mb-3">
              {collection.tagline}
            </p>
            <h1 className="heading-lg text-white">{collection.name}</h1>
            <p className="text-white/70 mt-3 max-w-lg">{collection.description}</p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding py-12 md:py-16">
        <FadeIn className="flex items-end justify-between mb-6">
          <div>
            <p className="label-luxury mb-1">The Collection</p>
            <h2 className="heading-md">Featured Pieces</h2>
          </div>
          <Button variant="outline" asChild className="hidden sm:inline-flex">
            <Link href="/shop">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {result.items.map((product) => (
            <ProductCard key={product.id} product={product as Product} />
          ))}
        </div>
      </section>
    </>
  );
}
