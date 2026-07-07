import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { collections, products } from "@/lib/data";
import { ProductCard } from "@/components/shop/product-card";
import { FadeIn } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) return { title: "Collection Not Found" };

  return {
    title: collection.name,
    description: collection.description,
  };
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);

  if (!collection) notFound();

  const collectionProducts = products.filter((p) => p.collection?.slug === slug);

  return (
    <>
      <section className="relative h-[50vh] min-h-[350px] flex items-end">
        <Image
          src={collection.coverImage ?? collection.image ?? ""}
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

      <section className="section-padding py-20">
        <FadeIn className="flex items-end justify-between mb-12">
          <div>
            <p className="label-luxury mb-2">The Collection</p>
            <h2 className="heading-md">Featured Pieces</h2>
          </div>
          <Button variant="outline" asChild className="hidden sm:inline-flex">
            <Link href="/shop">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {collectionProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
