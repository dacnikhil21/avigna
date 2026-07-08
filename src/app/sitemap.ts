import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://avighnacollections.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let productEntries: MetadataRoute.Sitemap = [];
  let collectionEntries: MetadataRoute.Sitemap = [];

  try {
    const [dbProducts, dbCollections] = await Promise.all([
      prisma.product.findMany({
        where: { isActive: true },
        select: { slug: true },
      }),
      prisma.collection.findMany({
        where: { isActive: true },
        select: { slug: true },
      }),
    ]);

    productEntries = dbProducts.map((p) => ({
      url: `${BASE_URL}/product/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    collectionEntries = dbCollections.map((c) => ({
      url: `${BASE_URL}/collections/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.warn("Prisma: database not available during build time, bypassing sitemap dynamic entries", error);
  }

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/collections`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...productEntries,
    ...collectionEntries,
  ];
}
