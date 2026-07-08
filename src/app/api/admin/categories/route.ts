import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/categories — all categories (admin sees hidden ones too)
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        _count: { select: { products: true } },
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Admin GET /api/admin/categories error:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

// POST /api/admin/categories — create category
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, image, icon, parentId, sortOrder, isActive } = body;

    if (!name) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        image,
        icon,
        parentId: parentId || null,
        sortOrder: sortOrder ?? 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error: unknown) {
    console.error("Admin POST /api/admin/categories error:", error);
    const msg = error instanceof Error && error.message.includes("Unique constraint")
      ? "A category with this slug already exists."
      : "Failed to create category";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
