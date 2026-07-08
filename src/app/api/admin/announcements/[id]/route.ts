import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// PUT /api/admin/announcements/[id]
export async function PUT(req: NextRequest, ctx: RouteContext) {
  try {
    const { id } = await ctx.params;
    const body = await req.json();
    const { text, link, linkLabel, sortOrder, isActive } = body;

    const data: Record<string, unknown> = {};
    if (text !== undefined) data.text = text;
    if (link !== undefined) data.link = link;
    if (linkLabel !== undefined) data.linkLabel = linkLabel;
    if (sortOrder !== undefined) data.sortOrder = parseInt(sortOrder || "0", 10);
    if (isActive !== undefined) data.isActive = isActive;

    const bar = await prisma.announcementBar.update({
      where: { id },
      data,
    });

    return NextResponse.json(bar);
  } catch (error) {
    console.error("Admin PUT /api/admin/announcements/[id] error:", error);
    return NextResponse.json({ error: "Failed to update announcement" }, { status: 500 });
  }
}

// DELETE /api/admin/announcements/[id]
export async function DELETE(_req: NextRequest, ctx: RouteContext) {
  try {
    const { id } = await ctx.params;
    await prisma.announcementBar.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin DELETE /api/admin/announcements/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete announcement" }, { status: 500 });
  }
}
