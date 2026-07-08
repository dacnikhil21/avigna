import { HeroSection } from "@/components/home/hero-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { OffersSection } from "@/components/home/offers-section";
import { TrendingSection } from "@/components/home/trending-section";

export const dynamic = "force-dynamic";
import { LatestCollectionsSection } from "@/components/home/latest-collections-section";
import { FeaturedProductsSection } from "@/components/home/featured-products-section";
import { CustomerPromiseSection } from "@/components/home/customer-promise-section";
import { BoutiqueVisitSection } from "@/components/home/boutique-visit-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <OffersSection />
      <TrendingSection />
      <LatestCollectionsSection />
      <FeaturedProductsSection />
      <CustomerPromiseSection />
      <BoutiqueVisitSection />
    </>
  );
}
