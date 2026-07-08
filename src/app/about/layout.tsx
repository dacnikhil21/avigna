import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover the story of Sri Avighna 1 Gram Gold Jewellery — a trusted name in premium 1 gram gold jewellery in Wanaparthy, Telangana. Master craftsmanship, timeless Indian designs.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
