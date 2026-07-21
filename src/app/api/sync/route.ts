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

    // 1. Sync Cart items securely with stock capping
    if (cartItems && Array.isArray(cartItems) && cartItems.length > 0) {
      const productIds = cartItems.map((i: { productId: string }) => i.productId).filter(Boolean);
      const dbProducts = await prisma.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, stockQty: true, inStock: true },
      });

      for (const item of cartItems) {
        if (!item.productId) continue;
        const product = dbProducts.find((p) => p.id === item.productId);
        if (!product || !product.inStock || product.stockQty <= 0) continue;

        const existingDbCartItem = await prisma.cartItem.findUnique({
          where: {
            sessionId_productId: {
              sessionId: customerId,
              productId: item.productId,
            },
          },
        });

        if (existingDbCartItem) {
          // Set to the target item quantity directly, capped at product stock
          const safeQty = Math.min(Math.max(1, item.quantity || 1), product.stockQty);
          await prisma.cartItem.update({
            where: { id: existingDbCartItem.id },
            data: { quantity: safeQty },
          });
        } else {
          const safeQty = Math.min(Math.max(1, item.quantity || 1), product.stockQty);
          await prisma.cartItem.create({
            data: {
              sessionId: customerId,
              productId: item.productId,
              quantity: safeQty,
            },
          });
        }
      }
    }

    // 2. Sync Wishlist items securely
    if (wishlistItems && Array.isArray(wishlistItems) && wishlistItems.length > 0) {
      for (const productId of wishlistItems) {
        if (!productId || typeof productId !== "string") continue;
        await prisma.wishlistItem.upsert({
          where: {
            customerId_productId: {
              customerId: customerId,
              productId: productId,
            },
          },
          update: {}, // Keep existing if already present
          create: {
            customerId: customerId,
            productId: productId,
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
      include: { product: { include: { images: true } } },
    });

    // Map unified cart items cleanly with latest price and stock limits
    const unifiedCart = dbCartItems.map((dbItem) => ({
      productId: dbItem.productId,
      quantity: Math.min(dbItem.quantity, dbItem.product.stockQty),
      price: dbItem.product.salePrice ?? dbItem.product.price,
      name: dbItem.product.name,
      slug: dbItem.product.slug,
      image: dbItem.product.images?.[0]?.url || "",
      metal: dbItem.product.metal,
      stockQty: dbItem.product.stockQty,
    }));

    const unifiedWishlist = dbWishlistItems.map((w) => w.product);

    return NextResponse.json({
      cartItems: unifiedCart,
      wishlistItems: unifiedWishlist,
    });
  } catch (error) {
    console.error("Sync error:", error);
    return NextResponse.json({ error: "Failed to sync" }, { status: 500 });
  }
}
