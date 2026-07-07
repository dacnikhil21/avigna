import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/db/products";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const categorySlug = searchParams.get("category") || undefined;
    const collectionSlug = searchParams.get("collection") || undefined;
    const isFeatured = searchParams.get("featured") === "true" ? true : undefined;
    const isLatest = searchParams.get("latest") === "true" ? true : undefined;
    const isTrending = searchParams.get("trending") === "true" ? true : undefined;
    const isExclusive = searchParams.get("exclusive") === "true" ? true : undefined;
    const isBridal = searchParams.get("bridal") === "true" ? true : undefined;
    const search = searchParams.get("search") || undefined;

    const minPriceStr = searchParams.get("minPrice");
    const maxPriceStr = searchParams.get("maxPrice");
    const minPrice = minPriceStr ? parseInt(minPriceStr, 10) : undefined;
    const maxPrice = maxPriceStr ? parseInt(maxPriceStr, 10) : undefined;

    const limitStr = searchParams.get("limit");
    const pageStr = searchParams.get("page");
    const limit = limitStr ? parseInt(limitStr, 10) : 12;
    const page = pageStr ? parseInt(pageStr, 10) : 1;

    const result = await getProducts({
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
      limit,
      page,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("API /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
