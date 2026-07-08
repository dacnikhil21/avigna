import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/hero-slides
export async function GET() {
  try {
    const slides = await prisma.heroSlide.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(slides);
  } catch (error) {
    console.error("Admin GET /api/admin/hero-slides error:", error);
    return NextResponse.json({ error: "Failed to fetch hero slides" }, { status: 500 });
  }
}

// POST /api/admin/hero-slides
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, subtitle, eyebrow, ctaText, ctaUrl, secondaryCtaText, secondaryCtaUrl, imageUrl, imageAlt, overlayOpacity, sortOrder, isActive } = body;

    if (!imageUrl) {
      return NextResponse.json({ error: "imageUrl is required" }, { status: 400 });
    }

    const slide = await prisma.heroSlide.create({
      data: {
        title: title || "",
        subtitle: subtitle || "",
        eyebrow: eyebrow || "",
        ctaText: ctaText || "",
        ctaUrl: ctaUrl || "",
        secondaryCtaText,
        secondaryCtaUrl,
        imageUrl,
        imageAlt: imageAlt || "",
        overlayOpacity: parseFloat(overlayOpacity || "0.5"),
        sortOrder: parseInt(sortOrder || "0", 10),
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(slide, { status: 201 });
  } catch (error) {
    console.error("Admin POST /api/admin/hero-slides error:", error);
    return NextResponse.json({ error: "Failed to create hero slide" }, { status: 500 });
  }
}
