import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/dashboard — KPIs, recent orders, top products
export async function GET() {
  try {
    const [
      totalOrders,
      paidOrders,
      totalProducts,
      totalCustomers,
      recentOrders,
      topProducts,
      revenueByDay,
    ] = await Promise.all([
      // Total order count
      prisma.order.count(),

      // Paid orders for revenue
      prisma.order.findMany({
        where: { status: "PAID" },
        select: { total: true, createdAt: true },
      }),

      // Active product count
      prisma.product.count({ where: { isActive: true } }),

      // Customer count
      prisma.customer.count(),

      // 5 most recent orders
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { items: true },
      }),

      // Top products by quantity sold
      prisma.orderItem.groupBy({
        by: ["productId", "name", "image"],
        _sum: { quantity: true, price: true },
        orderBy: { _sum: { quantity: "desc" } },
        take: 5,
      }),

      // Revenue last 7 days
      prisma.order.findMany({
        where: {
          status: "PAID",
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
        select: { total: true, createdAt: true },
        orderBy: { createdAt: "asc" },
      }),
    ]);

    const totalRevenue = paidOrders.reduce((sum, o) => sum + o.total, 0);

    return NextResponse.json({
      kpis: {
        totalRevenue,
        totalOrders,
        totalProducts,
        totalCustomers,
        paidOrderCount: paidOrders.length,
      },
      recentOrders,
      topProducts,
      revenueByDay,
    });
  } catch (error) {
    console.error("Admin GET /api/admin/dashboard error:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}
