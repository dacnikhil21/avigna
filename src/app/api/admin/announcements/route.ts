import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/announcements
export async function GET() {
  try {
    const bars = await prisma.announcementBar.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(bars);
  } catch (error) {
    console.error("Admin GET /api/admin/announcements error:", error);
    return NextResponse.json({ error: "Failed to fetch announcements" }, { status: 500 });
  }
}

// POST /api/admin/announcements
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, link, linkLabel, sortOrder, isActive } = body;

    if (!text) {
      return NextResponse.json({ error: "text is required" }, { status: 400 });
    }

    const bar = await prisma.announcementBar.create({
      data: {
        text,
        link,
        linkLabel,
        sortOrder: parseInt(sortOrder || "0", 10),
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(bar, { status: 201 });
  } catch (error) {
    console.error("Admin POST /api/admin/announcements error:", error);
    return NextResponse.json({ error: "Failed to create announcement" }, { status: 500 });
  }
}
