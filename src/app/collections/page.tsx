import type { Metadata } from "next";
import { collections } from "@/lib/data";
import { CollectionsGrid } from "@/components/collections/collections-grid";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore Avighna Collections — curated luxury jewellery collections for bridal, everyday elegance, temple gold, and diamond dreams.",
};

export default function CollectionsPage() {
  return (
    <div className="section-padding pt-32 md:pt-36 pb-20">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="label-luxury mb-4">Curated Collections</p>
        <h1 className="heading-lg mb-4">Stories Woven in Gold</h1>
        <p className="body-lg">
          Each collection is a chapter in our legacy — crafted with passion,
          designed for the extraordinary moments in your life.
        </p>
      </div>
      <CollectionsGrid collections={collections} />
    </div>
  );
}
