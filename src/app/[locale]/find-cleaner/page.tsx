'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Star, Euro, Search, Filter } from 'lucide-react';
import Navigation from '@/components/Navigation';

export default function FindCleanerPage() {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: '',
    specialties: [],
    availability: '',
    rating: ''
  });

  const t = useTranslations();
  const locale = useLocale();

  const mockCleaners = [
    {
      id: 1,
      name: 'Maria Schmidt',
      rating: 4.9,
      reviews: 127,
      hourlyRate: 28,
      location: 'Salzburg Altstadt',
      specialties: ['Tiefenreinigung', 'Umweltfreundlich'],
      languages: ['Deutsch', 'English'],
      verified: true,
      available: true
    },
    {
      id: 2,
      name: 'Anna Weber',
      rating: 4.8,
      reviews: 89,
      hourlyRate: 25,
      location: 'Salzburg Süd',
      specialties: ['Haustierfrei', 'Büroreinigung'],
      languages: ['Deutsch', 'Italiano'],
      verified: true,
      available: true
    },
    {
      id: 3,
      name: 'Stefan Müller',
      rating: 4.7,
      reviews: 156,
      hourlyRate: 30,
      location: 'Salzburg Nord',
      specialties: ['Tiefenreinigung', 'Fensterreinigung'],
      languages: ['Deutsch', 'English', 'Français'],
      verified: true,
      available: false
    }
  ];

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Reinigungskräfte in Ihrer Nähe finden
            </h1>
            <p className="text-lg text-gray-600">
              Entdecken Sie verifizierte Reinigungskräfte in Salzburg
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Standort eingeben (z.B. Salzburg Altstadt)"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button className="btn-primary flex items-center space-x-2">
                <Search size={20} />
                <span>Suchen</span>
              </button>
              <button className="btn-secondary flex items-center space-x-2">
                <Filter size={20} />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cleaner Cards */}
            <div className="lg:col-span-2 space-y-6">
              {mockCleaners.map((cleaner) => (
                <div key={cleaner.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-semibold text-lg">
                          {cleaner.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold">{cleaner.name}</h3>
                          {cleaner.verified && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              ✓ Verifiziert
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Star className="text-yellow-400 fill-current" size={16} />
                            <span className="ml-1">{cleaner.rating}</span>
                            <span className="ml-1">({cleaner.reviews} Bewertungen)</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center">
                            <MapPin size={16} />
                            <span className="ml-1">{cleaner.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-lg font-semibold">
                        <Euro size={20} />
                        <span>{cleaner.hourlyRate}/Std</span>
                      </div>
                      <div className={`text-sm ${cleaner.available ? 'text-green-600' : 'text-red-600'}`}>
                        {cleaner.available ? 'Verfügbar' : 'Ausgebucht'}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {cleaner.specialties.map((specialty, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>Sprachen:</span>
                      <span>{cleaner.languages.join(', ')}</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button 
                      className={`flex-1 ${cleaner.available ? 'btn-primary' : 'btn-disabled'}`}
                      disabled={!cleaner.available}
                    >
                      {cleaner.available ? 'Kontaktieren' : 'Nicht verfügbar'}
                    </button>
                    <button className="btn-secondary">
                      Profil ansehen
                    </button>
                  </div>
                </div>
              ))}
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