import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CollectionsGrid } from "@/components/collections/collections-grid";
import type { Collection } from "@/types";
import { collections as staticCollections } from "@/lib/data";
import Image from "next/image";
import { FadeIn } from "@/components/shared/motion";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore Avighna Collections — curated 1 gram gold jewellery collections for brides, everyday elegance, temple gold, kemp stone jewellery, and festive occasions.",
};

export default async function CollectionsPage() {
  let collections: Collection[] = [];
  try {
    const dbCollections = await prisma.collection.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    collections = dbCollections.map((c) => ({
      ...c,
      image: c.coverImage || undefined,
    })) as Collection[];
  } catch (error) {
    console.error("Failed to load live collections, falling back to static:", error);
    collections = staticCollections as unknown as Collection[];
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero Banner */}
      <section className="relative h-[45vh] min-h-[300px] flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=1920&q=80"
          alt="Sri Avighna Collections Grid Background"
          fill
          priority
          className="object-cover animate-in fade-in zoom-in-95 duration-500"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-[#121212]/35 to-transparent" />
        <div className="relative z-10 section-padding pb-12 w-full">
          <FadeIn>
            <p className="label-luxury text-[#C5A880] mb-2">Exclusive Editions</p>
            <h1 className="heading-lg text-white font-serif tracking-wide leading-tight">Stories Woven in Gold</h1>
          </FadeIn>
        </div>
      </section>

      {/* Grid List */}
      <div className="section-padding py-16">
        <CollectionsGrid collections={collections} />
      </div>
    </div>
  );
}
