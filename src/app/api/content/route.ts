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

    return NextResponse.json({
      settings,
      announcements,
      heroSlides,
      brandStories,
      editorialGallery,
      boutiqueInfo,
      testimonials,
    });
  } catch (error) {
    console.error("API /api/content error:", error);
    return NextResponse.json(
      { error: "Failed to fetch CMS content" },
      { status: 500 }
    );
  }
}
