import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/customers — paginated customer list with order counts
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
            { phone: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        include: {
          _count: { select: { orders: true } },
          orders: {
            where: { status: "PAID" },
            select: { total: true },
          },
        },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip,
      }),
      prisma.customer.count({ where }),
    ]);

    // Attach totalPurchase to each customer
    const enriched = items.map((c) => ({
      ...c,
      totalPurchase: c.orders.reduce((sum, o) => sum + o.total, 0),
      orderCount: c._count.orders,
    }));

    return NextResponse.json({ items: enriched, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Admin GET /api/admin/customers error:", error);
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
  }
}
