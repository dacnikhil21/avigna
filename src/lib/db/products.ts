import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export interface ProductFilters {
  categorySlug?: string;
  collectionSlug?: string;
  isFeatured?: boolean;
  isLatest?: boolean;
  isTrending?: boolean;
  isExclusive?: boolean;
  isBridal?: boolean;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
  page?: number;
}

export async function getProducts(filters: ProductFilters = {}) {
  const {
    categorySlug,
    collectionSlug,
    isFeatured,
    isLatest,
    isTrending,
    isExclusive,
    isBridal,
    search,
    minPrice,
    maxPrice,
    limit = 12,
    page = 1,
  } = filters;

  const skip = (page - 1) * limit;

  const where: Prisma.ProductWhereInput = {
    isActive: true,
  };

  if (categorySlug) {
    where.category = { slug: categorySlug };
  }

  if (collectionSlug) {
    where.collection = { slug: collectionSlug };
  }

  if (isFeatured !== undefined) where.isFeatured = isFeatured;
  if (isLatest !== undefined) where.isLatest = isLatest;
  if (isTrending !== undefined) where.isTrending = isTrending;
  if (isExclusive !== undefined) where.isExclusive = isExclusive;
  if (isBridal !== undefined) where.isBridal = isBridal;

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { sku: { contains: search, mode: "insensitive" } },
    ];
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) where.price.gte = minPrice;
    if (maxPrice !== undefined) where.price.lte = maxPrice;
  }

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        images: {
          orderBy: { position: "asc" },
        },
        category: true,
        collection: true,
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip,
    }),
    prisma.product.count({ where }),
  ]);

  return {
    items,
    total,
    pages: Math.ceil(total / limit),
    page,
    limit,
  };
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      images: {
        orderBy: { position: "asc" },
      },
      category: true,
      collection: true,
    },
  });
}

export async function getFeaturedProducts(limit = 8) {
  return prisma.product.findMany({
    where: { isFeatured: true, isActive: true },
    include: {
      images: { orderBy: { position: "asc" } },
      category: true,
      collection: true,
    },
    take: limit,
    orderBy: { createdAt: "desc" },
  });
}

export async function getLatestProducts(limit = 8) {
  return prisma.product.findMany({
    where: { isLatest: true, isActive: true },
    include: {
      images: { orderBy: { position: "asc" } },
      category: true,
      collection: true,
    },
    take: limit,
    orderBy: { createdAt: "desc" },
  });
}

export async function getTrendingProducts(limit = 8) {
  return prisma.product.findMany({
    where: { isTrending: true, isActive: true },
    include: {
      images: { orderBy: { position: "asc" } },
      category: true,
      collection: true,
    },
    take: limit,
    orderBy: { createdAt: "desc" },
  });
}

export async function getRelatedProducts(productId: string, categoryId: string, limit = 4) {
  return prisma.product.findMany({
    where: {
      categoryId,
      id: { not: productId },
      isActive: true,
    },
    include: {
      images: { orderBy: { position: "asc" } },
      category: true,
      collection: true,
    },
    take: limit,
    orderBy: { isFeatured: "desc" },
  });
}
