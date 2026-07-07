import { BRAND } from "@/lib/data";

export function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: BRAND.name,
    description: BRAND.description,
    url: process.env.NEXT_PUBLIC_APP_URL || "https://avighnacollections.com",
    telephone: BRAND.phone,
    email: BRAND.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "123, MG Road",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560001",
      addressCountry: "IN",
    },
    priceRange: "₹₹₹₹",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
    />
  );
}
