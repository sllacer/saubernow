'use client';

import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProcessCarousel from '@/components/ProcessCarousel';
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
        
        {/* Process Section */}
        <section className="process-section bg-gradient-to-br from-primary-50 via-white to-blue-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="process-title text-2xl font-bold text-gray-900 text-center mb-8">
              So einfach funktioniert's
            </h2>
            <ProcessCarousel />
          </div>
        </section>
        
        <TestimonialsSection />
        <SearchSection />
        <FeaturedCleanersSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
}