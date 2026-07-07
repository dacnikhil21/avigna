import { prisma } from "@/lib/prisma";
import { FaqCategory } from "@prisma/client";

export async function getSiteSettings() {
  return prisma.siteSettings.findUnique({
    where: { id: "singleton" },
  });
}

export async function getAnnouncementBars() {
  return prisma.announcementBar.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getHeroSlides() {
  return prisma.heroSlide.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getBrandStory() {
  return prisma.brandStory.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getEditorialGallery() {
  return prisma.editorialGallery.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getBoutiqueInfo() {
  return prisma.boutiqueInfo.findMany({
    where: { isActive: true },
    orderBy: { isPrimary: "desc" },
  });
}

export async function getTestimonials(limit = 6) {
  return prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: [
      { isFeatured: "desc" },
      { sortOrder: "asc" },
      { createdAt: "desc" }
    ],
    take: limit,
  });
}

export async function getFaqs(category?: FaqCategory) {
  return prisma.faqEntry.findMany({
    where: {
      isActive: true,
      ...(category ? { category } : {}),
    },
    orderBy: { sortOrder: "asc" },
  });
}
