import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { MarqueeSection } from '@/components/sections/MarqueeSection';
import { NewArrivalsSection } from '@/components/sections/NewArrivalsSection';
import { CategoriesSection } from '@/components/sections/CategoriesSection';
import { EditorialSections } from '@/components/sections/EditorialSections';
import { BestSellersSection } from '@/components/sections/BestSellersSection';
import { BrandStorySection } from '@/components/sections/BrandStorySection';
import { TrustSection } from '@/components/sections/TrustSection';

export const metadata: Metadata = {
  title: 'RNT FOOTWEAR — Premium Performance Shoes',
  description: 'Discover RNT FOOTWEAR — premium performance and lifestyle footwear. Shop running, training, lifestyle, and casual shoes. Built for more.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <NewArrivalsSection />
      <CategoriesSection />
      <EditorialSections />
      <BestSellersSection />
      <BrandStorySection />
      <TrustSection />
    </>
  );
}
