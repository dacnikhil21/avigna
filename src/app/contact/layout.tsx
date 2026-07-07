import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Avighna Collections. Book a private consultation, visit our Bengaluru showroom, or ask about our luxury jewellery.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
