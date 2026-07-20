import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { cartItems, wishlistItems } = await req.json();
    const customerId = session.user.id;

    // 1. Sync Cart
    // We treat the customerId as the sessionId for logged-in users.
    if (cartItems && cartItems.length > 0) {
      for (const item of cartItems) {
        // Upsert cart item
        await prisma.cartItem.upsert({
          where: {
            sessionId_productId: {
              sessionId: customerId,
              productId: item.productId,
            },
          },
          update: {
            quantity: item.quantity,
          },
          create: {
            sessionId: customerId,
            productId: item.productId,
            quantity: item.quantity,
          },
        });
      }
    }

    // 2. Sync Wishlist
    if (wishlistItems && wishlistItems.length > 0) {
      for (const productId of wishlistItems) {
        await prisma.wishlistItem.upsert({
          where: {
            customerId_productId: {
              customerId: customerId,
              productId: productId,
            },
          },
          update: {}, // do nothing if exists
          create: {
            customerId: customerId,
            productId: productId,
            // optionally leave sessionId null for logged-in wishlists
          },
        });
      }
    }

    // 3. Fetch unified state from DB
    const dbCartItems = await prisma.cartItem.findMany({
      where: { sessionId: customerId },
      include: { product: { include: { images: true } } },
    });

    const dbWishlistItems = await prisma.wishlistItem.findMany({
      where: { customerId: customerId },
      include: { product: true },
    });

    const unifiedCart = dbCartItems.map((dbItem) => ({
      productId: dbItem.productId,
      quantity: dbItem.quantity,
      price: dbItem.product.price,
      name: dbItem.product.name,
      image: dbItem.product.images?.[0]?.url || "",
      stockQty: dbItem.product.stockQty,
    }));

    const unifiedWishlist = dbWishlistItems.map((w) => w.productId);

    return NextResponse.json({
      cartItems: unifiedCart,
      wishlistItems: unifiedWishlist,
    });
  } catch (error) {
    console.error("Sync error:", error);
    return NextResponse.json({ error: "Failed to sync" }, { status: 500 });
  }
}
