import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug, getRelatedProducts } from "@/lib/db/products";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const related = await getRelatedProducts(product.id, product.categoryId, 4);

    return NextResponse.json({
      product,
      related,
    });
  } catch (error) {
    console.error("API /api/products/[slug] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
