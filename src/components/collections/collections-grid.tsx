"use client";

import { CollectionCard } from "@/components/shop/product-card";
import { StaggerContainer, StaggerItem } from "@/components/shared/motion";
import type { Collection } from "@/types";

export function CollectionsGrid({ collections }: { collections: Collection[] }) {
  return (
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {collections.map((collection) => (
        <StaggerItem key={collection.slug}>
          <CollectionCard {...collection} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
