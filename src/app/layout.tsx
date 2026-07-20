import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, DM_Sans } from "next/font/google";
import { CustomerLayoutWrapper } from "@/components/layout/customer-layout-wrapper";
import { JsonLd } from "@/components/shared/json-ld";
import { BRAND } from "@/lib/data";
import { Toaster } from "sonner";
import { AuthModal } from "@/components/auth/auth-modal";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  let siteName = BRAND.name;
  let description = BRAND.description;
  
  try {
    const settings = await prisma.siteSettings.findFirst();
    if (settings) {
      siteName = settings.brandName || BRAND.name;
      description = settings.defaultMetaDesc || settings.description || BRAND.description;
    }
  } catch (e) {
    // Gracefully handle db errors during build
  }

  return {
    title: {
      default: `${siteName} | ${BRAND.tagline}`,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: [
      "luxury jewellery",
      "Indian jewellery",
      "bridal jewellery",
      "gold jewellery",
      "kemp stone jewellery",
      "Sri Avighna 1 Gram Gold Jewellery",
      "Wanaparthy jewellery",
      "Telangana jewellery",
      "1 gram gold jewellery",
    ],
    authors: [{ name: siteName }],
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName,
      title: `${siteName} | ${BRAND.tagline}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${dmSans.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen antialiased">
        <CustomerLayoutWrapper>
          {children}
          <AuthModal />
        </CustomerLayoutWrapper>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
