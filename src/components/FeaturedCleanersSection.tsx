'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Users } from 'lucide-react';
import CleanerCard from './CleanerCard';
import { mockCleaners } from '@/lib/data';

interface FeaturedCleanersSectionProps {
  className?: string;
}

export default function FeaturedCleanersSection({ className = '' }: FeaturedCleanersSectionProps) {
  const locale = useLocale();

  const handleContactCleaner = (cleanerId: string) => {
    // In a real app, this would open a messaging interface
    alert(`Contacting cleaner ${cleanerId}`);
  };

  const featuredCleaners = mockCleaners
    .filter(cleaner => cleaner.verified && cleaner.rating >= 4.7)
    .slice(0, 3);

  return (
    <section 
      id="featured-cleaners-section" 
      className={`featured-cleaners-section py-16 bg-white ${className}`}
    >
      <div className="featured-cleaners-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="featured-cleaners-header text-center mb-12">
          <h2 className="featured-cleaners-title text-3xl font-bold text-gray-900 mb-4">
            Unsere Top-bewerteten Reinigungskräfte
          </h2>
          <p className="featured-cleaners-subtitle text-lg text-gray-600 max-w-2xl mx-auto">
            Entdecken Sie einige unserer besten und vertrauenswürdigsten Reinigungsprofis
          </p>
        </div>
        
        <div className="featured-cleaners-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCleaners.map((cleaner) => (
            <div 
              key={cleaner.id} 
              className="featured-cleaner-card transform hover:scale-105 transition-transform duration-200"
            >
              <CleanerCard 
                cleaner={cleaner} 
                onContact={() => handleContactCleaner(cleaner.id)} 
              />
            </div>
          ))}
        </div>
        
        <div className="featured-cleaners-cta text-center">
          <Link 
            href={`/${locale}/find-cleaner`} 
            className="featured-cleaners-button inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Users size={20} />
            <span>Alle Reinigungskräfte anzeigen</span>
          </Link>
        </div>
      </div>
    </section>
  );
}