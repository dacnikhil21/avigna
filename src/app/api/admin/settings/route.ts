import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SINGLETON_ID = "singleton";

// GET /api/admin/settings — returns current SiteSettings
export async function GET() {
  try {
    const settings = await prisma.siteSettings.findUnique({ where: { id: SINGLETON_ID } });
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Admin GET /api/admin/settings error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

// PUT /api/admin/settings — upserts the singleton SiteSettings row
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      brandName, tagline, description, logoUrl, faviconUrl,
      phone, whatsapp, email,
      addressLine1, addressLine2, city, state, pincode, country,
      instagramUrl, facebookUrl, youtubeUrl, pinterestUrl,
      razorpayKeyId,
      logoText, logoSubText, storeTimings, gstNumber,
      defaultMetaTitle, defaultMetaDesc, defaultOgImage,
      googleAnalyticsId,
    } = body;

    const settings = await prisma.siteSettings.upsert({
      where: { id: SINGLETON_ID },
      update: {
        brandName, tagline, description, logoUrl, faviconUrl,
        phone, whatsapp, email,
        addressLine1, addressLine2, city, state, pincode,
        country: country || "India",
        instagramUrl, facebookUrl, youtubeUrl, pinterestUrl,
        razorpayKeyId,
        logoText, logoSubText, storeTimings, gstNumber,
        defaultMetaTitle, defaultMetaDesc, defaultOgImage,
        googleAnalyticsId,
      },
      create: {
        id: SINGLETON_ID,
        brandName: brandName || "Sri Avighna 1 Gram Gold Jewellery",
        tagline, description, logoUrl, faviconUrl,
        phone, whatsapp, email,
        addressLine1, addressLine2, city, state, pincode,
        country: country || "India",
        instagramUrl, facebookUrl, youtubeUrl, pinterestUrl,
        razorpayKeyId,
        logoText: logoText || "Sri Avighna",
        logoSubText: logoSubText || "1 Gram Gold Jewellery",
        storeTimings: storeTimings || "10:30 AM – 9:00 PM",
        gstNumber,
        defaultMetaTitle, defaultMetaDesc, defaultOgImage,
        googleAnalyticsId,
      },
    });

    // Also sync the default HeroSlide
    if (tagline || defaultMetaTitle) {
      await prisma.heroSlide.upsert({
        where: { id: "singleton-hero" },
        update: {
          title: defaultMetaTitle || "",
          subtitle: tagline || "",
        },
        create: {
          id: "singleton-hero",
          title: defaultMetaTitle || "",
          subtitle: tagline || "",
          imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=85",
          sortOrder: 1,
          isActive: true,
        },
      });
    }

    // Also sync default AnnouncementBar
    if (defaultOgImage) {
      await prisma.announcementBar.upsert({
        where: { id: "singleton-announcement" },
        update: { text: defaultOgImage },
        create: {
          id: "singleton-announcement",
          text: defaultOgImage,
          sortOrder: 1,
          isActive: true,
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Admin PUT /api/admin/settings error:", error);
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
