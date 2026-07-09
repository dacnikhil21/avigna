import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/products — paginated, searchable list (all products, not just active)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const categoryId = searchParams.get("categoryId") || undefined;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const skip = (page - 1) * limit;

    const where = {
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" as const } },
              { sku: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {}),
      ...(categoryId ? { categoryId } : {}),
    };

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          images: { orderBy: { position: "asc" } },
          category: true,
          collection: true,
        },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({ items, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Admin GET /api/admin/products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST /api/admin/products — create a new product with images
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name, slug, description, shortDesc, price, salePrice,
      sku, material, metal, purity, color, weight, stones, dimensions,
      stockQty, inStock, isFeatured, isLatest, isExclusive,
      isTrending, isBridal, isActive, categoryId, collectionId,
      metaTitle, metaDesc, metaKeywords, images = [],
    } = body;

    if (!name || !categoryId || !price || !sku) {
      return NextResponse.json({ error: "name, categoryId, price and sku are required" }, { status: 400 });
    }

    const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const product = await prisma.product.create({
      data: {
        name,
        slug: finalSlug,
        description: description || "",
        shortDesc,
        price: Math.round(price),
        salePrice: salePrice ? Math.round(salePrice) : null,
        sku,
        material,
        metal: metal || "Gold Plated",
        purity,
        color,
        weight,
        stones,
        dimensions,
        stockQty: stockQty ?? 0,
        inStock: inStock ?? (stockQty > 0),
        isFeatured: isFeatured ?? false,
        isLatest: isLatest ?? false,
        isExclusive: isExclusive ?? false,
        isTrending: isTrending ?? false,
        isBridal: isBridal ?? false,
        isActive: isActive ?? true,
        categoryId,
        collectionId: collectionId || null,
        metaTitle,
        metaDesc,
        metaKeywords,
        images: {
          create: images.map((img: { url: string; altText?: string; position?: number; isPrimary?: boolean }, i: number) => ({
            url: img.url,
            altText: img.altText || name,
            position: img.position ?? i,
            isPrimary: img.isPrimary ?? i === 0,
          })),
        },
      },
      include: {
        images: { orderBy: { position: "asc" } },
        category: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: unknown) {
    console.error("Admin POST /api/admin/products error:", error);
    const msg = error instanceof Error && error.message.includes("Unique constraint")
      ? "A product with this SKU or slug already exists."
      : "Failed to create product";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
