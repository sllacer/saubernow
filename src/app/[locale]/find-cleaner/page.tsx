'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Star, Euro, Search, Filter } from 'lucide-react';
import Navigation from '@/components/Navigation';
import LocationAutocomplete from '@/components/LocationAutocomplete';
import { supabase } from '@/lib/supabase';
import { austrianLocations, findExactLocation } from '@/lib/austrianLocations';
import { type AustrianLocation } from '@/lib/locationUtils';

interface Cleaner {
  id: string;
  full_name: string;
  bio: string | null;
  hourly_rate: number | null;
  location_city: string;
  location_postal_code: string | null;
  languages: string[] | null;
  services_offered: string[] | null;
  verification_status: string;
  average_rating: number;
  total_reviews: number;
  is_active: boolean;
}

export default function FindCleanerPage() {
  const [selectedLocation, setSelectedLocation] = useState<AustrianLocation | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: '',
    specialties: [],
    availability: '',
    rating: ''
  });
  const [cleaners, setCleaners] = useState<Cleaner[]>([]);
  const [filteredCleaners, setFilteredCleaners] = useState<Cleaner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const t = useTranslations();
  const locale = useLocale();
  const searchParams = useSearchParams();

  // Handle URL parameters on page load
  useEffect(() => {
    const locationParam = searchParams.get('location');

    if (locationParam) {
      const location = findExactLocation(locationParam, austrianLocations);
      if (location) {
        setSelectedLocation(location);
      }
    }
  }, [searchParams]);

  // Fetch cleaners from database
  useEffect(() => {
    fetchCleaners();
  }, []);

  // Filter cleaners by location whenever selection changes
  useEffect(() => {
    if (selectedLocation && cleaners.length > 0) {
      filterCleanersByLocation();
    } else {
      setFilteredCleaners(cleaners);
    }
  }, [selectedLocation, cleaners]);

  const fetchCleaners = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching cleaners...');
      const { data, error } = await supabase
        .from('cleaners')
        .select(`
          id,
          bio,
          hourly_rate,
          location_city,
          location_postal_code,
          languages,
          services_offered,
          verification_status,
          average_rating,
          total_reviews,
          is_active,
          profiles!inner(full_name)
        `)
        .eq('verification_status', 'verified')
        .eq('is_active', true)
        .order('average_rating', { ascending: false });

      console.log('Query result:', { data, error });
      
      if (error) {
        console.log('Primary query failed, trying debug query...');
        // Debug: Try to get all cleaners to see if RLS is the issue
        const { data: debugData, error: debugError } = await supabase
          .from('cleaners')
          .select('id, verification_status, is_active, profiles!inner(full_name)')
          .limit(5);
        
        console.log('Debug query result:', { debugData, debugError });
        throw error;
      }

      // Transform the data to match our interface
      const transformedCleaners: Cleaner[] = data.map((cleaner: any) => ({
        id: cleaner.id,
        full_name: cleaner.profiles.full_name,
        bio: cleaner.bio,
        hourly_rate: cleaner.hourly_rate,
        location_city: cleaner.location_city,
        location_postal_code: cleaner.location_postal_code,
        languages: cleaner.languages,
        services_offered: cleaner.services_offered,
        verification_status: cleaner.verification_status,
        average_rating: cleaner.average_rating,
        total_reviews: cleaner.total_reviews,
        is_active: cleaner.is_active
      }));

      setCleaners(transformedCleaners);
    } catch (err) {
      console.error('Error fetching cleaners:', err);
      setError('Fehler beim Laden der Reinigungskräfte');
    } finally {
      setLoading(false);
    }
  };

  const filterCleanersByLocation = () => {
    if (!selectedLocation) {
      setFilteredCleaners(cleaners);
      return;
    }

    // Simple location-based filtering - show cleaners in the same city or nearby
    const filtered = cleaners.filter(cleaner => {
      const cityMatch = cleaner.location_city.toLowerCase() === selectedLocation.city.toLowerCase();
      const postalMatch = cleaner.location_postal_code === selectedLocation.postalCode;
      // Also include nearby postal codes (simple proximity by postal code range)
      const postalCodeProximity = selectedLocation.postalCode && cleaner.location_postal_code && 
        Math.abs(parseInt(selectedLocation.postalCode) - parseInt(cleaner.location_postal_code)) <= 100;
      
      return cityMatch || postalMatch || postalCodeProximity;
    });

    setFilteredCleaners(filtered);
  };

  const handleLocationSelect = (location: AustrianLocation) => {
    setSelectedLocation(location);
  };

  // Helper functions for display
  const formatHourlyRate = (cents: number | null) => {
    if (!cents) return 'Preis auf Anfrage';
    return `€${(cents / 100).toFixed(0)}`;
  };

  const getLanguageDisplay = (langCode: string) => {
    const languages: { [key: string]: string } = {
      'de': 'Deutsch',
      'en': 'English',
      'fr': 'Français',
      'it': 'Italiano',
      'es': 'Español',
      'hr': 'Hrvatski'
    };
    return languages[langCode] || langCode;
  };

  const getServiceDisplay = (service: string) => {
    const services: { [key: string]: string } = {
      'regular_cleaning': 'Regelmäßige Reinigung',
      'deep_cleaning': 'Tiefenreinigung',
      'move_cleaning': 'Umzugsreinigung',
      'office_cleaning': 'Büroreinigung'
    };
    return services[service] || service;
  };

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedLocation 
                ? `Reinigungskräfte in ${selectedLocation.displayName}`
                : 'Reinigungskräfte in Ihrer Nähe finden'
              }
            </h1>
            <p className="text-lg text-gray-600">
              {selectedLocation && filteredCleaners.length > 0
                ? `${filteredCleaners.length} verifizierte Reinigungskräfte in ${selectedLocation.displayName} gefunden`
                : 'Entdecken Sie verifizierte Reinigungskräfte in Salzburg'
              }
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <LocationAutocomplete
                  onLocationSelect={handleLocationSelect}
                  placeholder="Standort eingeben (z.B. Salzburg Altstadt)"
                  initialValue={selectedLocation?.displayName || ''}
                />
              </div>
              <button className="btn-secondary flex items-center justify-center space-x-2">
                <Filter size={20} />
                <span>Weitere Filter</span>
              </button>
            </div>
            
            {selectedLocation && (
              <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <div>
                  Suche in {selectedLocation.displayName}
                </div>
                {filteredCleaners.length < cleaners.length && (
                  <div className="text-blue-600">
                    {filteredCleaners.length} von {cleaners.length} Reinigungskräften angezeigt
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cleaner Cards */}
            <div className="lg:col-span-2">
              {loading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                            <div className="h-3 bg-gray-200 rounded w-24"></div>
                          </div>
                        </div>
                        <div className="h-6 bg-gray-200 rounded w-20"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {error}
                </div>
              ) : filteredCleaners.length === 0 && !loading ? (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
                  {selectedLocation 
                    ? `Keine Reinigungskräfte in ${selectedLocation.displayName} gefunden. Versuchen Sie eine andere Stadt.`
                    : 'Keine verifizierten Reinigungskräfte gefunden. Versuchen Sie es später erneut.'
                  }
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredCleaners.map((cleaner) => (
                    <div key={cleaner.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-primary-600 font-semibold text-lg">
                              {cleaner.full_name?.split(' ').map(n => n[0]).join('') || '?'}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="text-lg font-semibold">{cleaner.full_name || 'Unbekannt'}</h3>
                              {cleaner.verification_status === 'verified' && (
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                  ✓ Verifiziert
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Star className="text-yellow-400 fill-current" size={16} />
                                <span className="ml-1">{cleaner.average_rating > 0 ? cleaner.average_rating.toFixed(1) : 'Neu'}</span>
                                <span className="ml-1">({cleaner.total_reviews} Bewertungen)</span>
                              </div>
                              <span>•</span>
                              <div className="flex items-center">
                                <MapPin size={16} />
                                <span className="ml-1">
                                  {cleaner.location_city}
                                  {cleaner.location_postal_code && `, ${cleaner.location_postal_code}`}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-lg font-semibold">
                            <Euro size={20} />
                            <span>{formatHourlyRate(cleaner.hourly_rate)}/Std</span>
                          </div>
                          <div className="text-sm text-green-600">
                            Verfügbar
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {cleaner.services_offered?.map((service, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {getServiceDisplay(service)}
                            </span>
                          )) || (
                            <span className="text-gray-500 text-sm">Keine Services angegeben</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>Sprachen:</span>
                          <span>
                            {cleaner.languages?.map(lang => getLanguageDisplay(lang)).join(', ') || 'Nicht angegeben'}
                          </span>
                        </div>
                        {cleaner.bio && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-600 line-clamp-2">{cleaner.bio}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-3">
                        <button className="flex-1 btn-primary">
                          Kontaktieren
                        </button>
                        <button className="btn-secondary">
                          Profil ansehen
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Filters */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Schnellfilter</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preisbereich (€/Std)
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg p-2">
                      <option value="">Alle Preise</option>
                      <option value="15-25">€15 - €25</option>
                      <option value="25-35">€25 - €35</option>
                      <option value="35+">€35+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mindestbewertung
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg p-2">
                      <option value="">Alle Bewertungen</option>
                      <option value="4.5">4.5+ Sterne</option>
                      <option value="4.0">4.0+ Sterne</option>
                      <option value="3.5">3.5+ Sterne</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Verfügbarkeit
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg p-2">
                      <option value="">Alle</option>
                      <option value="available">Sofort verfügbar</option>
                      <option value="weekend">Wochenende</option>
                      <option value="weekday">Wochentags</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Popular Areas */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Beliebte Gebiete</h3>
                <div className="space-y-2">
                  {['Salzburg Altstadt', 'Salzburg Süd', 'Salzburg Nord', 'Hallein', 'Anif'].map((area) => (
                    <button
                      key={area}
                      className="block w-full text-left p-2 rounded hover:bg-gray-50 transition-colors"
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}