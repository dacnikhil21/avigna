import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// PUT /api/admin/products/[id] — update product fields + images
export async function PUT(req: NextRequest, ctx: RouteContext) {
  try {
    const { id } = await ctx.params;
    const body = await req.json();

    const {
      name, slug, description, shortDesc, price, salePrice,
      sku, metal, purity, color, weight, stones, dimensions,
      stockQty, inStock, isFeatured, isLatest, isExclusive,
      isTrending, isBridal, isActive, categoryId, collectionId,
      metaTitle, metaDesc, metaKeywords, images,
    } = body;

    // Build update data — only include defined fields
    const data: Record<string, unknown> = {};
    if (name !== undefined) data.name = name;
    if (slug !== undefined) data.slug = slug;
    if (description !== undefined) data.description = description;
    if (shortDesc !== undefined) data.shortDesc = shortDesc;
    if (price !== undefined) data.price = Math.round(price);
    if (salePrice !== undefined) data.salePrice = salePrice ? Math.round(salePrice) : null;
    if (sku !== undefined) data.sku = sku;
    if (metal !== undefined) data.metal = metal;
    if (purity !== undefined) data.purity = purity;
    if (color !== undefined) data.color = color;
    if (weight !== undefined) data.weight = weight;
    if (stones !== undefined) data.stones = stones;
    if (dimensions !== undefined) data.dimensions = dimensions;
    if (stockQty !== undefined) data.stockQty = stockQty;
    if (inStock !== undefined) data.inStock = inStock;
    if (isFeatured !== undefined) data.isFeatured = isFeatured;
    if (isLatest !== undefined) data.isLatest = isLatest;
    if (isExclusive !== undefined) data.isExclusive = isExclusive;
    if (isTrending !== undefined) data.isTrending = isTrending;
    if (isBridal !== undefined) data.isBridal = isBridal;
    if (isActive !== undefined) data.isActive = isActive;
    if (categoryId !== undefined) data.categoryId = categoryId;
    if (collectionId !== undefined) data.collectionId = collectionId || null;
    if (metaTitle !== undefined) data.metaTitle = metaTitle;
    if (metaDesc !== undefined) data.metaDesc = metaDesc;
    if (metaKeywords !== undefined) data.metaKeywords = metaKeywords;

    // If images array provided — replace all images for this product
    if (images && Array.isArray(images)) {
      await prisma.productImage.deleteMany({ where: { productId: id } });
      data.images = {
        create: images.map((img: { url: string; altText?: string; position?: number; isPrimary?: boolean }, i: number) => ({
          url: img.url,
          altText: img.altText || "",
          position: img.position ?? i,
          isPrimary: img.isPrimary ?? i === 0,
        })),
      };
    }

    const product = await prisma.product.update({
      where: { id },
      data,
      include: {
        images: { orderBy: { position: "asc" } },
        category: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Admin PUT /api/admin/products/[id] error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE /api/admin/products/[id] — soft delete (sets isActive=false)
export async function DELETE(_req: NextRequest, ctx: RouteContext) {
  try {
    const { id } = await ctx.params;
    // Soft delete — keeps order history intact
    await prisma.product.update({
      where: { id },
      data: { isActive: false },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin DELETE /api/admin/products/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
