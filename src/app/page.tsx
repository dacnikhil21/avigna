import { HeroSection } from "@/components/home/hero-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { OffersSection } from "@/components/home/offers-section";
import { LatestCollectionsSection } from "@/components/home/latest-collections-section";
import { TrendingSection } from "@/components/home/trending-section";
import { BestSellersSection } from "@/components/home/best-sellers-section";
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
      <BestSellersSection />
      <CustomerPromiseSection />
      <BoutiqueVisitSection />
    </>
  );
}
