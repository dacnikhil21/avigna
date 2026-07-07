import { NextResponse } from "next/server";
import { getRazorpayInstance } from "@/lib/razorpay";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, customer, items } = body;

    if (!amount || !customer || !items?.length) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const orderNumber = generateOrderNumber();
    const shipping = amount > 5000000 ? 0 : 50000;
    const subtotal = amount - shipping;

    const dbOrder = await prisma.order.create({
      data: {
        orderNumber,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        shippingAddress: customer.address,
        city: customer.city,
        state: customer.state,
        pincode: customer.pincode,
        subtotal,
        shipping,
        total: amount,
        items: {
          create: items.map(
            (item: {
              productId: string;
              quantity: number;
              price: number;
              name: string;
              image: string;
            }) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
              name: item.name,
              image: item.image,
            })
          ),
        },
      },
    });

    const razorpay = getRazorpayInstance();
    const razorpayOrder = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: orderNumber,
    });

    await prisma.order.update({
      where: { id: dbOrder.id },
      data: { razorpayOrderId: razorpayOrder.id },
    });

    return NextResponse.json({
      orderId: razorpayOrder.id,
      orderNumber,
      dbOrderId: dbOrder.id,
      amount,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
