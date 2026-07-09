import { NextResponse } from "next/server";
import { getAllCategories } from "@/lib/db/categories";

export async function GET() {
  try {
    const categories = await getAllCategories();
    return new NextResponse(JSON.stringify(categories), {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("API /api/categories error:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to fetch categories" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
