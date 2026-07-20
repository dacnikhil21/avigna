import { NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      dbOrderId,
    } = body;

    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: dbOrderId },
      include: { items: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status === "PAID") {
      return NextResponse.json({ success: true, message: "Order already paid" });
    }

    // Execute all database updates atomically within a transaction
    const updatedOrder = await prisma.$transaction(async (tx) => {
      // 1. Update order status
      const completedOrder = await tx.order.update({
        where: { id: dbOrderId },
        data: {
          status: "PAID",
          razorpayPaymentId: razorpay_payment_id,
          paidAt: new Date(),
        },
        include: { items: true },
      });

      // 2. Reduce stock for each item
      for (const item of completedOrder.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stockQty: { decrement: item.quantity },
          },
        });
      }

      // 3. Clear customer's DB cart
      if (completedOrder.customerId) {
        await tx.cartItem.deleteMany({
          where: { sessionId: completedOrder.customerId }, // We use customerId as sessionId for authenticated carts
        });
      }

      return completedOrder;
    });

    // 4. Send Order Confirmation Email asynchronously (don't fail the verification if this fails)
    // Fire and forget
    sendOrderConfirmationEmail(updatedOrder).catch(err => {
      console.error("Non-fatal: Failed to send order confirmation email", err);
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
