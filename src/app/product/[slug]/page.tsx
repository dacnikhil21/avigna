import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/db/products";
import { ProductDetail } from "@/components/shop/product-detail";
import type { Product } from "@/types";
import { products as staticProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const result = await getProducts({ limit: 100 });
    return result.items.map((p) => ({ slug: p.slug }));
  } catch (error) {
    console.warn("Prisma: database not available during build time, bypassing products pre-render", error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProductBySlug(slug);
    if (!product) return { title: "Product Not Found" };
    return {
      title: product.name,
      description: product.description || undefined,
    };
  } catch (err) {
    console.error("generateMetadata failed for product, returning fallback:", err);
    const matchedProd = staticProducts.find((p) => p.slug === slug);
    if (matchedProd) {
      return { title: matchedProd.name, description: matchedProd.description };
    }
    return { title: "Jewellery Piece | Sri Avighna" };
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  let product: Product | null = null;
  let related: Product[] = [];

  try {
    const dbProduct = await getProductBySlug(slug);
    if (dbProduct) {
      product = dbProduct as unknown as Product;
      const relatedResult = await getProducts({
        categorySlug: dbProduct.category.slug,
        limit: 5,
      });
      related = relatedResult.items
        .filter((p) => p.id !== dbProduct.id)
        .slice(0, 4) as Product[];
    }
  } catch (error) {
    console.error("Failed to load product details, falling back to static:", error);
    const matchedProd = staticProducts.find((p) => p.slug === slug);
    if (matchedProd) {
      product = matchedProd as unknown as Product;
      related = staticProducts
        .filter((p) => p.categoryId === matchedProd.categoryId && p.id !== matchedProd.id)
        .slice(0, 4) as unknown as Product[];
    }
  }

  if (!product) notFound();

  return <ProductDetail product={product as Product} related={related} />;
}
