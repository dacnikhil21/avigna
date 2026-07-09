"use client";

import { CollectionCard } from "@/components/shop/product-card";
import { StaggerContainer, StaggerItem } from "@/components/shared/motion";
import type { Collection } from "@/types";

export function CollectionsGrid({ collections }: { collections: Collection[] }) {
  return (
    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {collections.map((collection) => (
        <StaggerItem key={collection.slug}>
          <CollectionCard
            name={collection.name}
            slug={collection.slug}
            description={collection.description || undefined}
            image={collection.image || undefined}
            tagline={collection.tagline || undefined}
          />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
