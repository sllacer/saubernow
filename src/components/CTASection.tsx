'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { ClipboardList, Search } from 'lucide-react';

interface CTASectionProps {
  className?: string;
}

export default function CTASection({ className = '' }: CTASectionProps) {
  const locale = useLocale();

  return (
    <section 
      id="cta-section" 
      className={`cta-section py-16 bg-gray-50 ${className}`}
    >
      <div className="cta-container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="cta-header mb-8">
          <h2 className="cta-title text-3xl font-bold text-gray-900">
            Starten Sie noch heute
          </h2>
        </div>
        
        <div className="cta-cards grid md:grid-cols-2 gap-8">
          {/* Post Job CTA */}
          <div className="cta-card cta-card-post bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
            <div className="cta-card-icon bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <ClipboardList className="text-primary-600" size={32} />
            </div>
            <h3 className="cta-card-title text-xl font-bold text-gray-900 mb-4">Reinigungsjob posten</h3>
            <p className="cta-card-description text-gray-600 mb-6">
              Beschreiben Sie Ihre Anforderungen und lassen Sie qualifizierte Reinigungskräfte sich bei Ihnen bewerben.
            </p>
            <Link 
              href={`/${locale}/post-job`} 
              className="cta-card-button inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Job jetzt posten
            </Link>
          </div>
          
          {/* Search CTA */}
          <div className="cta-card cta-card-search bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
            <div className="cta-card-icon bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Search className="text-primary-600" size={32} />
            </div>
            <h3 className="cta-card-title text-xl font-bold text-gray-900 mb-4">Direkt suchen</h3>
            <p className="cta-card-description text-gray-600 mb-6">
              Durchsuchen Sie alle verfügbaren Reinigungskräfte und kontaktieren Sie Ihren Favoriten direkt.
            </p>
            <Link 
              href={`/${locale}/find-cleaner`} 
              className="cta-card-button inline-block bg-white hover:bg-gray-50 border-2 border-primary-600 text-primary-600 font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Jetzt durchsuchen
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}