'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { User, MapPin, Euro, Phone, Languages } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

type CleanerData = {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
  };
  workInfo: {
    serviceAreas: string[];
    hourlyRate: number;
    availability: string[];
    specialties: string[];
    languages: string[];
  };
  description: string;
};

export default function BecomeCleanerPage() {
  const [step, setStep] = useState(1);
  const [cleanerData, setCleanerData] = useState<CleanerData>({
    personalInfo: {
      name: '',
      email: '',
      phone: ''
    },
    workInfo: {
      serviceAreas: [],
      hourlyRate: 25,
      availability: [],
      specialties: [],
      languages: []
    },
    description: ''
  });
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  // Pre-fill form with user data if available
  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/${locale}/login`);
      return;
    }

    if (user) {
      fetchUserProfile();
    }
  }, [user, authLoading, locale, router]);

  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (profile) {
        setCleanerData(prev => ({
          ...prev,
          personalInfo: {
            name: profile.full_name || '',
            email: profile.email || user.email || '',
            phone: profile.phone || ''
          }
        }));
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const validatePersonalField = (field: keyof CleanerData['personalInfo'], value: string): string => {
    switch (field) {
      case 'name':
        if (!value.trim()) return t('validation.required');
        if (value.trim().length < 2) return t('validation.name_too_short');
        break;
      case 'email':
        if (!value.trim()) return t('validation.required');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return t('validation.email_invalid');
        break;
      case 'phone':
        if (value.trim() && !isValidPhoneNumber(value)) return t('validation.phone_invalid');
        break;
    }
    return '';
  };

  const updatePersonalInfo = (field: keyof CleanerData['personalInfo'], value: string) => {
    setCleanerData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
    
    // Clear field error when user starts typing
    const errorKey = `personalInfo.${field}`;
    if (fieldErrors[errorKey]) {
      setFieldErrors(prev => ({
        ...prev,
        [errorKey]: ''
      }));
    }
  };

  const handlePhoneChange = (value: string | undefined) => {
    updatePersonalInfo('phone', value || '');
  };

  const updateWorkInfo = (field: keyof CleanerData['workInfo'], value: any) => {
    setCleanerData(prev => ({
      ...prev,
      workInfo: {
        ...prev.workInfo,
        [field]: value
      }
    }));
  };

  const toggleArrayValue = (array: string[], value: string) => {
    return array.includes(value) 
      ? array.filter(item => item !== value)
      : [...array, value];
  };


  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setSubmitError('Sie müssen angemeldet sein, um sich als Reinigungskraft zu registrieren.');
      return;
    }

    setLoading(true);
    setSubmitError(null);

    try {
      // Update basic profile first
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: cleanerData.personalInfo.name,
          phone: cleanerData.personalInfo.phone || null,
          user_type: 'cleaner'
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Convert language display names to language codes
      const languageCodes = cleanerData.workInfo.languages.map(lang => {
        const langMap: { [key: string]: string } = {
          'Deutsch': 'de',
          'English': 'en',
          'Italiano': 'it',
          'Français': 'fr',
          'Español': 'es',
          'Hrvatski': 'hr'
        };
        return langMap[lang] || lang.toLowerCase();
      });

      // Convert availability to day codes
      const availabilityDays = cleanerData.workInfo.availability.map(day => {
        const dayMap: { [key: string]: string } = {
          'Montag': 'monday',
          'Dienstag': 'tuesday',
          'Mittwoch': 'wednesday',
          'Donnerstag': 'thursday',
          'Freitag': 'friday',
          'Samstag': 'saturday',
          'Sonntag': 'sunday'
        };
        return dayMap[day] || day.toLowerCase();
      });

      // Create or update cleaner profile
      const cleanerProfileData = {
        id: user.id,
        bio: cleanerData.description || null,
        hourly_rate: cleanerData.workInfo.hourlyRate * 100, // Convert to cents
        location_city: 'Salzburg', // Default for now
        languages: languageCodes.length > 0 ? languageCodes : null,
        services_offered: cleanerData.workInfo.specialties.length > 0 ? cleanerData.workInfo.specialties : ['regular_cleaning'],
        availability_days: availabilityDays.length > 0 ? availabilityDays : null,
        verification_status: 'pending',
        is_active: true
      };

      // Try to insert first, if it fails due to existing record, update instead
      const { error: insertError } = await supabase
        .from('cleaners')
        .insert(cleanerProfileData);

      if (insertError) {
        // If insert failed because record exists, update instead
        if (insertError.code === '23505') { // Unique constraint violation
          const { error: updateError } = await supabase
            .from('cleaners')
            .update(cleanerProfileData)
            .eq('id', user.id);
          
          if (updateError) throw updateError;
        } else {
          throw insertError;
        }
      }

      // For now, we'll skip file upload and just show success message
      // In a real implementation, you'd upload files to Supabase Storage
      
      alert('Anmeldung erfolgreich! Wir werden Ihre Unterlagen prüfen und uns binnen 24-48 Stunden bei Ihnen melden.');
      router.push(`/${locale}/profile`);
      
    } catch (err) {
      console.error('Error submitting cleaner registration:', err);
      setSubmitError('Es gab einen Fehler beim Speichern Ihrer Registrierung. Bitte versuchen Sie es erneut.');
    } finally {
      setLoading(false);
    }
  };

  const serviceAreas = [
    'Salzburg Altstadt', 'Salzburg Süd', 'Salzburg Nord', 'Salzburg West', 
    'Salzburg Ost', 'Hallein', 'Anif', 'Grödig'
  ];

  const availabilityOptions = [
    'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'
  ];

  const specialtyOptions = [
    'eco_friendly', 'pet_friendly', 'deep_cleaning'
  ];

  const languageOptions = [
    'Deutsch', 'English', 'Italiano', 'Français', 'Español', 'Hrvatski'
  ];

  if (authLoading) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    i <= step ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {i}
                  </div>
                  {i < 4 && (
                    <div className={`w-12 h-1 mx-2 ${
                      i < step ? 'bg-primary-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              {t('auth.register_as_cleaner')}
            </h1>

            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <User className="mx-auto text-primary-600 mb-3" size={48} />
                    <h2 className="text-xl font-semibold">{t('auth.personal_information')}</h2>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('auth.full_name')}
                    </label>
                    <input
                      type="text"
                      value={cleanerData.personalInfo.name}
                      onChange={(e) => updatePersonalInfo('name', e.target.value)}
                      className={`input-field ${
                        fieldErrors['personalInfo.name'] ? 'border-red-300' : ''
                      }`}
                      onBlur={() => {
                        const error = validatePersonalField('name', cleanerData.personalInfo.name);
                        if (error) setFieldErrors(prev => ({...prev, 'personalInfo.name': error}));
                      }}
                    />
                    {fieldErrors['personalInfo.name'] && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors['personalInfo.name']}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('common.email')}
                    </label>
                    <input
                      type="email"
                      value={cleanerData.personalInfo.email}
                      onChange={(e) => updatePersonalInfo('email', e.target.value)}
                      className={`input-field ${
                        fieldErrors['personalInfo.email'] ? 'border-red-300' : ''
                      }`}
                      onBlur={() => {
                        const error = validatePersonalField('email', cleanerData.personalInfo.email);
                        if (error) setFieldErrors(prev => ({...prev, 'personalInfo.email': error}));
                      }}
                    />
                    {fieldErrors['personalInfo.email'] && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors['personalInfo.email']}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('auth.phone_optional')}
                    </label>
                    <PhoneInput
                      value={cleanerData.personalInfo.phone}
                      onChange={handlePhoneChange}
                      defaultCountry="AT"
                      placeholder="Enter phone number"
                      className="phone-input"
                    />
                    {fieldErrors['personalInfo.phone'] && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors['personalInfo.phone']}</p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!cleanerData.personalInfo.name || !cleanerData.personalInfo.email || !cleanerData.personalInfo.phone}
                      className="btn-primary disabled:bg-gray-400"
                    >
                      {t('common.next')}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Work Information */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <MapPin className="mx-auto text-primary-600 mb-3" size={48} />
                    <h2 className="text-xl font-semibold">Arbeitsgebiete & Verfügbarkeit</h2>
                  </div>

                  {/* Service Areas */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Arbeitsgebiete (mindestens 1 wählen)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {serviceAreas.map(area => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => updateWorkInfo('serviceAreas', toggleArrayValue(cleanerData.workInfo.serviceAreas, area))}
                          className={`p-3 rounded-lg border text-sm transition-all ${
                            cleanerData.workInfo.serviceAreas.includes(area)
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hourly Rate */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Euro className="inline mr-2" size={16} />
                      Stundensatz (€)
                    </label>
                    <input
                      type="number"
                      min="15"
                      max="50"
                      value={cleanerData.workInfo.hourlyRate}
                      onChange={(e) => updateWorkInfo('hourlyRate', parseInt(e.target.value))}
                      className="input-field"
                    />
                  </div>

                  {/* Availability */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Verfügbare Tage
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {availabilityOptions.map(day => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => updateWorkInfo('availability', toggleArrayValue(cleanerData.workInfo.availability, day))}
                          className={`p-2 rounded-lg border text-sm transition-all ${
                            cleanerData.workInfo.availability.includes(day)
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button type="button" onClick={prevStep} className="btn-secondary">
                      {t('common.back')}
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={cleanerData.workInfo.serviceAreas.length === 0}
                      className="btn-primary disabled:bg-gray-400"
                    >
                      {t('common.next')}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Skills & Languages */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Languages className="mx-auto text-primary-600 mb-3" size={48} />
                    <h2 className="text-xl font-semibold">Fähigkeiten & Sprachen</h2>
                  </div>

                  {/* Languages */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Sprachen (mindestens 1 wählen)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {languageOptions.map(lang => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => updateWorkInfo('languages', toggleArrayValue(cleanerData.workInfo.languages, lang))}
                          className={`p-2 rounded-lg border text-sm transition-all ${
                            cleanerData.workInfo.languages.includes(lang)
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Specialties */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Spezialisierungen (optional)
                    </label>
                    <div className="space-y-2">
                      {specialtyOptions.map(specialty => (
                        <button
                          key={specialty}
                          type="button"
                          onClick={() => updateWorkInfo('specialties', toggleArrayValue(cleanerData.workInfo.specialties, specialty))}
                          className={`w-full p-3 rounded-lg border text-left transition-all ${
                            cleanerData.workInfo.specialties.includes(specialty)
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {t(`cleaner.${specialty}`)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Beschreibung Ihrer Dienstleistungen
                    </label>
                    <textarea
                      value={cleanerData.description}
                      onChange={(e) => setCleanerData(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className="input-field"
                      placeholder="Beschreiben Sie Ihre Erfahrung, Arbeitsweise und was Sie besonders macht..."
                    />
                  </div>

                  <div className="flex justify-between">
                    <button type="button" onClick={prevStep} className="btn-secondary">
                      {t('common.back')}
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={cleanerData.workInfo.languages.length === 0}
                      className="btn-primary disabled:bg-gray-400"
                    >
                      {t('common.next')}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Verification Information */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Phone className="mx-auto text-primary-600 mb-3" size={48} />
                    <h2 className="text-xl font-semibold">{t('cleaner.verification_title')}</h2>
                    <p className="text-gray-600 mt-2">
                      {t('cleaner.verification_subtitle')}
                    </p>
                  </div>

                  {/* Verification Information */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">{t('cleaner.next_steps')}:</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• {t('cleaner.video_call_info')}</li>
                      <li>• {t('cleaner.email_details')}</li>
                      <li>• {t('cleaner.trust_message')}</li>
                    </ul>
                  </div>

                  <div className="flex justify-between">
                    <button type="button" onClick={prevStep} className="btn-secondary">
                      {t('common.back')}
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary disabled:bg-gray-400"
                    >
                      {loading ? 'Speichere...' : 'Registrierung abschließen'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </>
  );
}