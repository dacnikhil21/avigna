import { NextResponse } from "next/server";
import { getRazorpayInstance } from "@/lib/razorpay";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/utils";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { customer, items } = body;

    if (!customer || !items?.length) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Fetch all products from DB to validate stock and price
    const productIds = items.map((i: { productId: string }) => i.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { images: true },
    });

    let calculatedTotal = 0;
    const finalItems = [];

    for (const item of items) {
      const dbProduct = dbProducts.find((p) => p.id === item.productId);
      
      if (!dbProduct) {
        return NextResponse.json({ error: `Product not found: ${item.productId}` }, { status: 400 });
      }

      if (dbProduct.stockQty < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${dbProduct.name}. Only ${dbProduct.stockQty} available.` },
          { status: 400 }
        );
      }

      const price = dbProduct.salePrice ?? dbProduct.price;
      calculatedTotal += price * item.quantity;
      
      finalItems.push({
        productId: dbProduct.id,
        quantity: item.quantity,
        price: price,
        name: dbProduct.name,
        image: dbProduct.images[0]?.url || "",
      });
    }

    const orderNumber = generateOrderNumber();
    const shipping = calculatedTotal >= 5000 ? 0 : 99; // Free shipping above ₹5000
    const amountInRupees = calculatedTotal + shipping;
    const amountInPaise = amountInRupees * 100; // Razorpay requires amount in PAISE (1 INR = 100 Paise)
    const subtotal = calculatedTotal;

    const dbOrder = await prisma.order.create({
      data: {
        orderNumber,
        customerName: customer.name || session.user.name || "Customer",
        customerEmail: customer.email || session.user.email || "customer@example.com",
        customerPhone: customer.phone || "0000000000",
        shippingAddress: customer.address || "Address",
        city: customer.city || "City",
        state: customer.state || "State",
        pincode: customer.pincode || "000000",
        subtotal,
        shipping,
        total: amountInRupees,
        customerId: session.user.id,
        items: {
          create: finalItems.map(
            (item) => ({
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
      amount: amountInPaise,
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
      amount: amountInPaise,
    });
  } catch (error) {
    console.error("Create order error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create order";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
