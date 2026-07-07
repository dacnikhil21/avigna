import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse Sri Avighna 1 Gram Gold Jewellery — luxury handcrafted jewellery including bridal sets, necklaces, earrings, rings, and more.",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
