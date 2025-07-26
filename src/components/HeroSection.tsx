'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { ClipboardList, Search } from 'lucide-react';
import { CheckCircle } from 'lucide-react';
import ProcessCarousel from './ProcessCarousel';
import Image from 'next/image';

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
        <div className="hero-grid relative">
          {/* Left Content */}
          <div className="hero-content lg:w-2/3 text-center lg:text-left relative z-20 lg:pr-20">
              {/* Trust Badge */}
              <div className="hero-badge inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 mb-8 shadow-lg">
                <CheckCircle className="text-green-600" size={20} />
                <span className="text-sm font-semibold text-gray-700">Salzburgs vertrauenswürdigste Reinigungsplattform</span>
              </div>
              
              {/* Hero Headline */}
              <h1 className="hero-headline text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Vertrauensvolle Reinigungskräfte 
                <span className="text-primary-600"> in Ihrer Nähe</span>
              </h1>
              
              {/* Hero Subtitle */}
              <p className="hero-subtitle text-xl text-gray-600 mb-8 max-w-2xl lg:max-w-none leading-relaxed">
                Finden Sie verifizierte, lokale Reinigungsprofis mit transparenten Bewertungen 
                und fairen Preisen. Sicher, einfach, zuverlässig.
              </p>

              {/* Hero CTAs */}
              <div className="hero-ctas flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href={`/${locale}/post-job`} 
                  className="hero-cta-primary inline-flex items-center justify-center space-x-3 bg-primary-600 hover:bg-primary-700 text-white font-bold px-8 py-4 text-lg rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 transform"
                >
                  <ClipboardList size={24} />
                  <span>Reinigungsjob posten</span>
                </Link>
                <Link 
                  href={`/${locale}/find-cleaner`} 
                  className="hero-cta-secondary inline-flex items-center justify-center space-x-3 bg-white hover:bg-gray-50 border-2 border-primary-600 text-primary-600 font-bold px-8 py-4 text-lg rounded-xl transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 transform"
                >
                  <Search size={24} />
                  <span>Direkt durchsuchen</span>
                </Link>
              </div>
            </div>

          {/* Right Image - Overlapping from the right */}
          <div className="hero-image absolute right-0 top-0 lg:w-1/2 h-full flex items-center justify-end pr-8 hidden lg:flex">
            <div className="hero-image-container relative">
              <Image
                src="/cleaner-image.png"
                alt="Professional cleaner with cleaning tools"
                width={400}
                height={500}
                className="w-full h-auto max-w-md object-contain drop-shadow-2xl"
                priority
              />
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full blur-sm opacity-70"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-primary-400 rounded-full blur-sm opacity-50"></div>
            </div>
          </div>

          {/* Mobile Image */}
          <div className="hero-image-mobile lg:hidden mt-8 flex justify-center">
            <div className="hero-image-container relative">
              <Image
                src="/cleaner-image.png"
                alt="Professional cleaner with cleaning tools"
                width={300}
                height={375}
                className="w-full h-auto max-w-xs object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>

        {/* Hero Process Carousel - Full Width Below */}
        <div className="hero-process mt-20">
          <h3 className="hero-process-title text-2xl font-bold text-gray-900 text-center mb-8">
            So einfach funktioniert's
          </h3>
          <ProcessCarousel className="hero-process-carousel" />
        </div>
      </div>
    </section>
  );
}