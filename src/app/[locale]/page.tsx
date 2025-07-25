'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Users, Shield, Star } from 'lucide-react';
import Navigation from '@/components/Navigation';
import CleanerCard from '@/components/CleanerCard';
import LocationAutocomplete from '@/components/LocationAutocomplete';
import { mockCleaners } from '@/lib/data';
import { type AustrianLocation } from '@/lib/locationUtils';

export default function HomePage() {
  const [selectedLocation, setSelectedLocation] = useState<AustrianLocation | null>(null);
  const [showCleaners, setShowCleaners] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const handleLocationSelect = (location: AustrianLocation) => {
    setSelectedLocation(location);
  };

  const handleSearchSubmit = () => {
    if (selectedLocation) {
      const searchParams = new URLSearchParams({
        location: selectedLocation.postalCode
      });
      router.push(`/${locale}/find-cleaner?${searchParams.toString()}`);
    }
  };

  const handleContactCleaner = (cleanerId: string) => {
    // In a real app, this would open a messaging interface
    alert(`Contacting cleaner ${cleanerId}`);
  };

  return (
    <>
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary-50 to-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                {t('home.hero_title')}
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                {t('home.hero_subtitle')}
              </p>
              
              {/* Location Search Form */}
              <div className="max-w-xl mx-auto mb-8">
                <div className="mb-4">
                  <LocationAutocomplete
                    onLocationSelect={handleLocationSelect}
                    placeholder={t('home.location_placeholder')}
                  />
                </div>
                <button
                  onClick={handleSearchSubmit}
                  disabled={!selectedLocation}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                >
                  <Search size={20} />
                  <span>{t('home.search_cleaners', { defaultValue: 'Reinigungskräfte finden' })}</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href={`/${locale}/find-cleaner`} className="btn-primary">
                  {t('home.cta_find')}
                </Link>
                <Link href={`/${locale}/become-cleaner`} className="btn-secondary">
                  {t('home.cta_join')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Warum SauberNow wählen?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-primary-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Verifizierte Reinigungskräfte</h3>
                <p className="text-gray-600">Alle Reinigungskräfte werden manuell überprüft und verifiziert.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-primary-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Lokale Experten</h3>
                <p className="text-gray-600">Finden Sie Reinigungskräfte in Ihrer direkten Umgebung in Salzburg.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="text-primary-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Transparente Bewertungen</h3>
                <p className="text-gray-600">Echte Bewertungen von verifizierten Kunden.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Cleaners Section - Removed from homepage as search redirects to find-cleaner page */}

        {/* Stats Section */}
        <section className="py-16 bg-primary-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center text-white">
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-primary-100">Verifizierte Reinigungskräfte</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">200+</div>
                <div className="text-primary-100">Zufriedene Kunden</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">4.8</div>
                <div className="text-primary-100">Durchschnittliche Bewertung</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}