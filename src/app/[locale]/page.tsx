'use client';

import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import SearchSection from '@/components/SearchSection';
import FeaturedCleanersSection from '@/components/FeaturedCleanersSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div id="homepage" className="homepage">
      <Navigation />
      
      <main className="homepage-main">
        <HeroSection />
        <TestimonialsSection />
        <SearchSection />
        <FeaturedCleanersSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
}