import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// PUT /api/admin/hero-slides/[id]
export async function PUT(req: NextRequest, ctx: RouteContext) {
  try {
    const { id } = await ctx.params;
    const body = await req.json();
    const { title, subtitle, eyebrow, ctaText, ctaUrl, secondaryCtaText, secondaryCtaUrl, imageUrl, imageAlt, overlayOpacity, sortOrder, isActive } = body;

    const data: Record<string, unknown> = {};
    if (title !== undefined) data.title = title;
    if (subtitle !== undefined) data.subtitle = subtitle;
    if (eyebrow !== undefined) data.eyebrow = eyebrow;
    if (ctaText !== undefined) data.ctaText = ctaText;
    if (ctaUrl !== undefined) data.ctaUrl = ctaUrl;
    if (secondaryCtaText !== undefined) data.secondaryCtaText = secondaryCtaText;
    if (secondaryCtaUrl !== undefined) data.secondaryCtaUrl = secondaryCtaUrl;
    if (imageUrl !== undefined) data.imageUrl = imageUrl;
    if (imageAlt !== undefined) data.imageAlt = imageAlt;
    if (overlayOpacity !== undefined) data.overlayOpacity = parseFloat(overlayOpacity || "0.5");
    if (sortOrder !== undefined) data.sortOrder = parseInt(sortOrder || "0", 10);
    if (isActive !== undefined) data.isActive = isActive;

    const slide = await prisma.heroSlide.update({
      where: { id },
      data,
    });

    return NextResponse.json(slide);
  } catch (error) {
    console.error("Admin PUT /api/admin/hero-slides/[id] error:", error);
    return NextResponse.json({ error: "Failed to update hero slide" }, { status: 500 });
  }
}

// DELETE /api/admin/hero-slides/[id]
export async function DELETE(_req: NextRequest, ctx: RouteContext) {
  try {
    const { id } = await ctx.params;
    await prisma.heroSlide.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin DELETE /api/admin/hero-slides/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete hero slide" }, { status: 500 });
  }
}
