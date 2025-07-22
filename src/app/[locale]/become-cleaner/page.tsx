'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { User, MapPin, Euro, Upload, Languages } from 'lucide-react';
import Navigation from '@/components/Navigation';

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
  documents: {
    id?: File;
    insurance?: File;
  };
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
    description: '',
    documents: {}
  });

  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const updatePersonalInfo = (field: keyof CleanerData['personalInfo'], value: string) => {
    setCleanerData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
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

  const handleFileUpload = (type: 'id' | 'insurance', file: File) => {
    setCleanerData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [type]: file
      }
    }));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to an API for manual verification
    console.log('Cleaner registration:', cleanerData);
    alert('Anmeldung erfolgreich! Wir werden Ihre Unterlagen prüfen und uns binnen 24-48 Stunden bei Ihnen melden.');
    router.push(`/${locale}`);
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
              Als Reinigungskraft registrieren
            </h1>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <User className="mx-auto text-primary-600 mb-3" size={48} />
                    <h2 className="text-xl font-semibold">Persönliche Informationen</h2>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vollständiger Name
                    </label>
                    <input
                      type="text"
                      value={cleanerData.personalInfo.name}
                      onChange={(e) => updatePersonalInfo('name', e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-Mail-Adresse
                    </label>
                    <input
                      type="email"
                      value={cleanerData.personalInfo.email}
                      onChange={(e) => updatePersonalInfo('email', e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefonnummer
                    </label>
                    <input
                      type="tel"
                      value={cleanerData.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                      className="input-field"
                      placeholder="+43 ..."
                      required
                    />
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

              {/* Step 4: Document Upload */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Upload className="mx-auto text-primary-600 mb-3" size={48} />
                    <h2 className="text-xl font-semibold">Dokumente hochladen</h2>
                    <p className="text-gray-600 mt-2">
                      Für die Verifizierung benötigen wir folgende Dokumente
                    </p>
                  </div>

                  {/* ID Document */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ausweisdokument (Personalausweis oder Reisepass)
                    </label>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload('id', e.target.files[0])}
                      className="input-field"
                      required
                    />
                    {cleanerData.documents.id && (
                      <p className="text-sm text-green-600 mt-1">
                        ✓ {cleanerData.documents.id.name}
                      </p>
                    )}
                  </div>

                  {/* Insurance Document */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Haftpflichtversicherung (optional, aber empfohlen)
                    </label>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload('insurance', e.target.files[0])}
                      className="input-field"
                    />
                    {cleanerData.documents.insurance && (
                      <p className="text-sm text-green-600 mt-1">
                        ✓ {cleanerData.documents.insurance.name}
                      </p>
                    )}
                  </div>

                  {/* Verification Info */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Nächste Schritte:</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Wir prüfen Ihre Unterlagen binnen 24-48 Stunden</li>
                      <li>• Sie erhalten eine E-Mail mit dem Verifizierungsstatus</li>
                      <li>• Nach erfolgreicher Verifizierung können Sie Aufträge annehmen</li>
                    </ul>
                  </div>

                  <div className="flex justify-between">
                    <button type="button" onClick={prevStep} className="btn-secondary">
                      {t('common.back')}
                    </button>
                    <button
                      type="submit"
                      disabled={!cleanerData.documents.id}
                      className="btn-primary disabled:bg-gray-400"
                    >
                      Registrierung abschließen
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