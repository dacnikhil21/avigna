import { NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { prisma } from "@/lib/prisma";

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

    await prisma.order.update({
      where: { id: dbOrderId },
      data: {
        status: "PAID",
        razorpayPaymentId: razorpay_payment_id,
      },
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
