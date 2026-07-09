import { NextResponse } from "next/server";
import {
  getSiteSettings,
  getAnnouncementBars,
  getHeroSlides,
  getBrandStory,
  getEditorialGallery,
  getBoutiqueInfo,
  getTestimonials,
} from "@/lib/db/content";

export async function GET() {
  try {
    const [
      settings,
      announcements,
      heroSlides,
      brandStories,
      editorialGallery,
      boutiqueInfo,
      testimonials,
    ] = await Promise.all([
      getSiteSettings(),
      getAnnouncementBars(),
      getHeroSlides(),
      getBrandStory(),
      getEditorialGallery(),
      getBoutiqueInfo(),
      getTestimonials(),
    ]);

    const result = {
      settings,
      announcements,
      heroSlides,
      brandStories,
      editorialGallery,
      boutiqueInfo,
      testimonials,
    };

    return new NextResponse(JSON.stringify(result), {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("API /api/content error:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to fetch CMS content" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
