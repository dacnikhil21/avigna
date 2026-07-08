import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover the story of Sri Avighna 1 Gram Gold Jewellery — three decades of master craftsmanship, premium 1 gram gold plating, and timeless Indian jewellery.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
