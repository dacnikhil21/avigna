import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Sri Avighna Collections. Visit our boutique in Wanaparthy, or ask about our luxury jewellery.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
