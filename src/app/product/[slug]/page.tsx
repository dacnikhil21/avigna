import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/db/products";
import { ProductDetail } from "@/components/shop/product-detail";
import type { Product } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const result = await getProducts({ limit: 100 });
  return result.items.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      images: product.images[0] ? [{ url: product.images[0].url }] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  // Fetch related products from DB
  const relatedResult = await getProducts({
    categorySlug: product.category.slug,
    limit: 5,
  });

  const related = relatedResult.items
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return <ProductDetail product={product as Product} related={related as Product[]} />;
}
