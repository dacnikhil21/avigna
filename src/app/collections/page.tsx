import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CollectionsGrid } from "@/components/collections/collections-grid";
import type { Collection } from "@/types";
import { collections as staticCollections } from "@/lib/data";

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
    <div className="section-padding pt-32 md:pt-36 pb-20">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <p className="label-luxury mb-1">Curated Collections</p>
        <h1 className="heading-lg mb-1">Stories Woven in Gold</h1>
        <p className="body-lg text-sm">
          Each collection is a chapter in our legacy — crafted with passion,
          designed for the extraordinary moments in your life.
        </p>
      </div>
      <CollectionsGrid collections={collections} />
    </div>
  );
}
