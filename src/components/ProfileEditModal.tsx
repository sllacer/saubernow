'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { X, Save, User, Phone, Mail, MapPin, Euro, Clock, Globe } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  user_type: 'customer' | 'cleaner';
  created_at: string;
  updated_at: string;
}

interface CleanerProfile {
  bio: string | null;
  hourly_rate: number | null;
  location_city: string;
  location_postal_code: string | null;
  location_address: string | null;
  languages: string[] | null;
  services_offered: string[] | null;
  availability_days: string[] | null;
  verification_status: 'pending' | 'verified' | 'rejected';
  average_rating: number;
  total_reviews: number;
  total_jobs_completed: number;
  is_active: boolean;
}

interface ProfileEditModalProps {
  profile: Profile;
  cleanerProfile: CleanerProfile | null;
  onClose: () => void;
  onUpdate: () => void;
}

export default function ProfileEditModal({ profile, cleanerProfile, onClose, onUpdate }: ProfileEditModalProps) {
  const [formData, setFormData] = useState({
    full_name: profile.full_name || '',
    phone: profile.phone || '',
    // Cleaner-specific fields
    bio: cleanerProfile?.bio || '',
    hourly_rate: cleanerProfile?.hourly_rate ? (cleanerProfile.hourly_rate / 100).toString() : '',
    location_city: cleanerProfile?.location_city || 'Salzburg',
    location_postal_code: cleanerProfile?.location_postal_code || '',
    location_address: cleanerProfile?.location_address || '',
    languages: cleanerProfile?.languages || [],
    services_offered: cleanerProfile?.services_offered || [],
    availability_days: cleanerProfile?.availability_days || [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});

  const t = useTranslations();

  const availableLanguages = [
    { code: 'de', name: 'Deutsch' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'it', name: 'Italiano' },
    { code: 'es', name: 'Español' }
  ];

  const availableServices = [
    { code: 'regular_cleaning', name: 'Regelmäßige Reinigung' },
    { code: 'deep_cleaning', name: 'Grundreinigung' },
    { code: 'move_cleaning', name: 'Umzugsreinigung' },
    { code: 'office_cleaning', name: 'Büroreinigung' }
  ];

  const availableDays = [
    { code: 'monday', name: 'Montag' },
    { code: 'tuesday', name: 'Dienstag' },
    { code: 'wednesday', name: 'Mittwoch' },
    { code: 'thursday', name: 'Donnerstag' },
    { code: 'friday', name: 'Freitag' },
    { code: 'saturday', name: 'Samstag' },
    { code: 'sunday', name: 'Sonntag' }
  ];

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handlePhoneChange = (value: string | undefined) => {
    setFormData(prev => ({ ...prev, phone: value || '' }));
    if (fieldErrors.phone) {
      setFieldErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const handleArrayFieldToggle = (field: 'languages' | 'services_offered' | 'availability_days', value: string) => {
    const currentArray = formData[field] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    handleInputChange(field, newArray);
  };

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};

    if (!formData.full_name.trim()) {
      errors.full_name = 'Name ist erforderlich';
    }

    if (formData.phone && !isValidPhoneNumber(formData.phone)) {
      errors.phone = 'Ungültige Telefonnummer';
    }

    if (profile.user_type === 'cleaner') {
      if (formData.hourly_rate && (isNaN(Number(formData.hourly_rate)) || Number(formData.hourly_rate) <= 0)) {
        errors.hourly_rate = 'Stundensatz muss eine positive Zahl sein';
      }

      if (!formData.location_city.trim()) {
        errors.location_city = 'Stadt ist erforderlich';
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Update basic profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          phone: formData.phone || null,
        })
        .eq('id', profile.id);

      if (profileError) throw profileError;

      // Update cleaner profile if user is a cleaner
      if (profile.user_type === 'cleaner') {
        const cleanerData = {
          bio: formData.bio || null,
          hourly_rate: formData.hourly_rate ? Math.round(Number(formData.hourly_rate) * 100) : null,
          location_city: formData.location_city,
          location_postal_code: formData.location_postal_code || null,
          location_address: formData.location_address || null,
          languages: formData.languages.length > 0 ? formData.languages : null,
          services_offered: formData.services_offered.length > 0 ? formData.services_offered : null,
          availability_days: formData.availability_days.length > 0 ? formData.availability_days : null,
        };

        const { error: cleanerError } = await supabase
          .from('cleaners')
          .update(cleanerData)
          .eq('id', profile.id);

        if (cleanerError) throw cleanerError;
      }

      onUpdate();
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Fehler beim Speichern des Profils');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Profil bearbeiten</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Grundinformationen</h3>
            
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vollständiger Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => handleInputChange('full_name', e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    fieldErrors.full_name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Ihr vollständiger Name"
                  required
                />
              </div>
              {fieldErrors.full_name && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.full_name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefonnummer
              </label>
              <PhoneInput
                value={formData.phone}
                onChange={handlePhoneChange}
                defaultCountry="AT"
                placeholder="Telefonnummer eingeben"
                className="phone-input"
              />
              {fieldErrors.phone && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.phone}</p>
              )}
            </div>
          </div>

          {/* Cleaner-specific fields */}
          {profile.user_type === 'cleaner' && (
            <>
              {/* Location */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Standort</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stadt *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="text"
                        value={formData.location_city}
                        onChange={(e) => handleInputChange('location_city', e.target.value)}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          fieldErrors.location_city ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="z.B. Salzburg"
                        required
                      />
                    </div>
                    {fieldErrors.location_city && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.location_city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postleitzahl
                    </label>
                    <input
                      type="text"
                      value={formData.location_postal_code}
                      onChange={(e) => handleInputChange('location_postal_code', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="z.B. 5020"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse
                  </label>
                  <input
                    type="text"
                    value={formData.location_address}
                    onChange={(e) => handleInputChange('location_address', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Straße und Hausnummer (optional)"
                  />
                </div>
              </div>

              {/* Services & Rate */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Dienstleistungen & Preise</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stundensatz (€)
                  </label>
                  <div className="relative">
                    <Euro className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="number"
                      step="0.50"
                      min="0"
                      value={formData.hourly_rate}
                      onChange={(e) => handleInputChange('hourly_rate', e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        fieldErrors.hourly_rate ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="z.B. 15.00"
                    />
                  </div>
                  {fieldErrors.hourly_rate && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.hourly_rate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Angebotene Services
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {availableServices.map((service) => (
                      <label key={service.code} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.services_offered.includes(service.code)}
                          onChange={() => handleArrayFieldToggle('services_offered', service.code)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{service.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Sprachen
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableLanguages.map((language) => (
                    <label key={language.code} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.languages.includes(language.code)}
                        onChange={() => handleArrayFieldToggle('languages', language.code)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{language.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Verfügbare Tage
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {availableDays.map((day) => (
                    <label key={day.code} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.availability_days.includes(day.code)}
                        onChange={() => handleArrayFieldToggle('availability_days', day.code)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{day.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Über mich
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Erzählen Sie potenziellen Kunden etwas über sich und Ihre Erfahrung..."
                />
              </div>
            </>
          )}

          {/* Submit Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Speichere...' : 'Speichern'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}