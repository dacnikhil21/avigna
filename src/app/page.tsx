import { HeroSection } from "@/components/home/hero-section";
import { BrandPhilosophySection } from "@/components/home/brand-philosophy-section";
import { BrandFilmSection } from "@/components/home/brand-film-section";
import { FeaturedCollectionsSection } from "@/components/home/featured-collections-section";
import { CraftsmanshipStorySection } from "@/components/home/craftsmanship-story-section";
import { BridalFeatureSection } from "@/components/home/bridal-feature-section";
import { EditorialGallerySection } from "@/components/home/editorial-gallery-section";
import { WhatsAppConciergeSection } from "@/components/home/whatsapp-concierge-section";
import { BoutiqueVisitSection } from "@/components/home/boutique-visit-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandPhilosophySection />
      <BrandFilmSection />
      <FeaturedCollectionsSection />
      <CraftsmanshipStorySection />
      <BridalFeatureSection />
      <EditorialGallerySection />
      <WhatsAppConciergeSection />
      <BoutiqueVisitSection />
    </>
  );
}

