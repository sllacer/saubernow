'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Shield, Heart, Award, ClipboardList, Search } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import ProcessCarousel from './ProcessCarousel';

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className = '' }: HeroSectionProps) {
  const locale = useLocale();

  return (
    <section 
      id="hero-section" 
      className={`hero-section bg-gradient-to-br from-primary-50 via-white to-blue-50 py-16 lg:py-24 relative overflow-hidden ${className}`}
    >
      {/* Background Pattern */}
      <div className="hero-background absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-300 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-blue-300 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-primary-200 rounded-full blur-xl"></div>
      </div>
      
      <div className="hero-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="hero-content text-center">
          {/* Trust Badge */}
          <div className="hero-badge inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 shadow-lg">
            <CheckCircle className="text-green-600" size={20} />
            <span className="text-sm font-semibold text-gray-700">Salzburgs vertrauenswürdigste Reinigungsplattform</span>
          </div>
          
          {/* Hero Headline */}
          <h1 className="hero-headline text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Vertrauensvolle Reinigungskräfte 
            <span className="text-primary-600"> in Ihrer Nähe</span>
          </h1>
          
          {/* Hero Subtitle */}
          <p className="hero-subtitle text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Finden Sie verifizierte, lokale Reinigungsprofis mit transparenten Bewertungen 
            und fairen Preisen. Sicher, einfach, zuverlässig.
          </p>

          {/* Trust Stats */}
          <div className="hero-stats grid grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto">
            <div className="hero-stat text-center">
              <div className="hero-stat-content flex items-center justify-center mb-2">
                <Shield className="text-primary-600 mr-2" size={24} />
                <span className="text-3xl font-bold text-gray-900">50+</span>
              </div>
              <p className="hero-stat-label text-sm text-gray-600">Verifizierte Experten</p>
            </div>
            <div className="hero-stat text-center">
              <div className="hero-stat-content flex items-center justify-center mb-2">
                <Heart className="text-red-500 mr-2" size={24} />
                <span className="text-3xl font-bold text-gray-900">200+</span>
              </div>
              <p className="hero-stat-label text-sm text-gray-600">Zufriedene Kunden</p>
            </div>
            <div className="hero-stat text-center">
              <div className="hero-stat-content flex items-center justify-center mb-2">
                <Award className="text-yellow-500 mr-2" size={24} />
                <span className="text-3xl font-bold text-gray-900">4.8</span>
              </div>
              <p className="hero-stat-label text-sm text-gray-600">Durchschnittsbewertung</p>
            </div>
          </div>

          {/* Hero Process Carousel */}
          <div className="hero-process mb-12">
            <h3 className="hero-process-title text-2xl font-bold text-gray-900 text-center mb-8">
              So einfach funktioniert's
            </h3>
            <ProcessCarousel className="hero-process-carousel" />
          </div>

          {/* Hero CTAs */}
          <div className="hero-ctas flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={`/${locale}/post-job`} 
              className="hero-cta-primary inline-flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <ClipboardList size={20} />
              <span>Reinigungsjob posten</span>
            </Link>
            <Link 
              href={`/${locale}/find-cleaner`} 
              className="hero-cta-secondary inline-flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 border-2 border-primary-600 text-primary-600 font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Search size={20} />
              <span>Direkt durchsuchen</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}