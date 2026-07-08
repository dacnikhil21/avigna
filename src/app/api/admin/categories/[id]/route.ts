import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// PUT /api/admin/categories/[id]
export async function PUT(req: NextRequest, ctx: RouteContext) {
  try {
    const { id } = await ctx.params;
    const body = await req.json();
    const { name, description, image, icon, parentId, sortOrder, isActive } = body;

    const data: Record<string, unknown> = {};
    if (name !== undefined) {
      data.name = name;
      data.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    }
    if (description !== undefined) data.description = description;
    if (image !== undefined) data.image = image;
    if (icon !== undefined) data.icon = icon;
    if (parentId !== undefined) data.parentId = parentId || null;
    if (sortOrder !== undefined) data.sortOrder = sortOrder;
    if (isActive !== undefined) data.isActive = isActive;

    const category = await prisma.category.update({ where: { id }, data });
    return NextResponse.json(category);
  } catch (error) {
    console.error("Admin PUT /api/admin/categories/[id] error:", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

// DELETE /api/admin/categories/[id] — soft delete
export async function DELETE(_req: NextRequest, ctx: RouteContext) {
  try {
    const { id } = await ctx.params;
    // Check if any products still use this category
    const count = await prisma.product.count({ where: { categoryId: id, isActive: true } });
    if (count > 0) {
      return NextResponse.json(
        { error: `Cannot delete: ${count} active product(s) use this category. Deactivate them first.` },
        { status: 409 }
      );
    }
    await prisma.category.update({ where: { id }, data: { isActive: false } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin DELETE /api/admin/categories/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
