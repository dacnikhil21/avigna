import { prisma } from "@/lib/prisma";
import { Prisma, OrderStatus } from "@prisma/client";

interface CreateOrderData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  state: string;
  pincode: string;
  isGift: boolean;
  giftMessage?: string;
  subtotal: number;
  shipping: number;
  discount?: number;
  total: number;
  razorpayOrderId?: string;
  items: {
    productId: string;
    quantity: number;
    price: number; // in paise
    name: string;
    image: string;
    sku?: string;
  }[];
}

export async function createOrder(data: CreateOrderData) {
  const { items, ...orderData } = data;

  // Attempt to find or create customer
  let customer = await prisma.customer.findFirst({
    where: {
      OR: [
        { email: orderData.customerEmail },
        { phone: orderData.customerPhone },
      ],
    },
  });

  if (!customer) {
    customer = await prisma.customer.create({
      data: {
        name: orderData.customerName,
        email: orderData.customerEmail,
        phone: orderData.customerPhone,
        addressLine1: orderData.shippingAddress,
        city: orderData.city,
        state: orderData.state,
        pincode: orderData.pincode,
      },
    });
  }

  return prisma.order.create({
    data: {
      ...orderData,
      customerId: customer.id,
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          quantity:  item.quantity,
          price:     item.price,
          name:      item.name,
          image:     item.image,
          sku:       item.sku,
        })),
      },
    },
    include: {
      items: true,
    },
  });
}

export async function getOrderByNumber(orderNumber: string) {
  return prisma.order.findUnique({
    where: { orderNumber },
    include: {
      items: true,
    },
  });
}

export async function updateOrderStatus(orderId: string, status: OrderStatus, razorpayPaymentId?: string, razorpaySignature?: string) {
  const updateData: Prisma.OrderUpdateInput = { status };
  
  if (status === OrderStatus.PAID) {
    updateData.paidAt = new Date();
  }
  if (razorpayPaymentId) {
    updateData.razorpayPaymentId = razorpayPaymentId;
  }
  if (razorpaySignature) {
    updateData.razorpaySignature = razorpaySignature;
  }

  return prisma.order.update({
    where: { id: orderId },
    data: updateData,
  });
}
