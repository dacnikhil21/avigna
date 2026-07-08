import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// PUT /api/admin/orders/[id]/status — update order status
export async function PUT(req: NextRequest, ctx: RouteContext) {
  try {
    const { id } = await ctx.params;
    const { status } = await req.json();

    if (!status || !Object.values(OrderStatus).includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${Object.values(OrderStatus).join(", ")}` },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = { status };
    if (status === "PAID") updateData.paidAt = new Date();

    const order = await prisma.order.update({
      where: { id },
      data: updateData,
      include: { items: true },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Admin PUT /api/admin/orders/[id]/status error:", error);
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 });
  }
}
