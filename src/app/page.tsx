import { HeroSection } from "@/components/home/hero-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { LatestCollectionsSection } from "@/components/home/latest-collections-section";
import { TrendingSection } from "@/components/home/trending-section";
import { BridalSection } from "@/components/home/bridal-section";
import { MensKidsSection } from "@/components/home/mens-kids-section";
import { BestSellersSection } from "@/components/home/best-sellers-section";
import { NewArrivalsSection } from "@/components/home/new-arrivals-section";
import { FeaturedProductsSection } from "@/components/home/featured-products-section";
import { CustomerPromiseSection } from "@/components/home/customer-promise-section";
import { BoutiqueVisitSection } from "@/components/home/boutique-visit-section";
import { TestimonialsSection } from "@/components/home/categories-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <LatestCollectionsSection />
      <TrendingSection />
      <BridalSection />
      <MensKidsSection />
      <BestSellersSection />
      <NewArrivalsSection />
      <FeaturedProductsSection />
      <TestimonialsSection />
      <CustomerPromiseSection />
      <BoutiqueVisitSection />
    </>
  );
}
