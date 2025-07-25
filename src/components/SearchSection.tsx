'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Search } from 'lucide-react';
import LocationAutocomplete from './LocationAutocomplete';
import { type AustrianLocation } from '@/lib/locationUtils';

interface SearchSectionProps {
  className?: string;
}

export default function SearchSection({ className = '' }: SearchSectionProps) {
  const [selectedLocation, setSelectedLocation] = useState<AustrianLocation | null>(null);
  const router = useRouter();
  const locale = useLocale();

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

  return (
    <section 
      id="search-section" 
      className={`search-section py-16 bg-gradient-to-r from-primary-600 to-blue-600 ${className}`}
    >
      <div className="search-container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="search-header mb-8">
          <h2 className="search-title text-3xl font-bold text-white mb-4">
            Bereit, Ihre perfekte Reinigungskraft zu finden?
          </h2>
          <p className="search-subtitle text-xl text-primary-100">
            Geben Sie Ihren Standort ein und entdecken Sie verifizierte Experten in Ihrer Nähe
          </p>
        </div>
        
        <div className="search-form max-w-xl mx-auto">
          <div className="search-input-wrapper mb-4">
            <LocationAutocomplete
              onLocationSelect={handleLocationSelect}
              placeholder="PLZ oder Ort eingeben (z.B. 5020 Salzburg)"
              className="search-input"
            />
          </div>
          <button
            onClick={handleSearchSubmit}
            disabled={!selectedLocation}
            className="search-button w-full bg-white hover:bg-gray-50 disabled:bg-gray-300 disabled:cursor-not-allowed text-primary-700 font-semibold px-8 py-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Search size={20} />
            <span>Reinigungskräfte in meiner Nähe finden</span>
          </button>
        </div>
      </div>
    </section>
  );
}