import type { Metadata } from "next";
import { collections } from "@/lib/data";
import { CollectionsGrid } from "@/components/collections/collections-grid";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore Sri Avighna 1 Gram Gold Jewellery — curated luxury jewellery collections for bridal, everyday elegance, temple gold, and diamond dreams.",
};

export default function CollectionsPage() {
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
