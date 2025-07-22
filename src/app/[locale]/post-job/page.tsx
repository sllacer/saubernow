'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Home, Clock, MapPin, Euro } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

type JobData = {
  title: string;
  apartmentSize: string;
  cleaningType: string;
  frequency: string;
  location: {
    city: string;
    postalCode: string;
    address: string;
  };
  preferredDate: string;
  estimatedHours: number;
  budgetMin: number;
  budgetMax: number;
  description: string;
};

export default function PostJobPage() {
  const [step, setStep] = useState(1);
  const [jobData, setJobData] = useState<JobData>({
    title: '',
    apartmentSize: '',
    cleaningType: '',
    frequency: '',
    location: {
      city: 'Salzburg',
      postalCode: '',
      address: ''
    },
    preferredDate: '',
    estimatedHours: 2,
    budgetMin: 30,
    budgetMax: 50,
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});

  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/${locale}/login`);
    }
  }, [user, authLoading, locale, router]);

  const updateJobData = (field: keyof JobData, value: any) => {
    setJobData(prev => ({
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

  const updateLocationData = (field: keyof JobData['location'], value: string) => {
    setJobData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value
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
    
    if (!user) {
      setSubmitError('Sie müssen angemeldet sein, um einen Auftrag zu veröffentlichen.');
      return;
    }

    // Validate required fields
    const errors: {[key: string]: string} = {};
    if (!jobData.title.trim()) errors.title = 'Titel ist erforderlich';
    if (!jobData.apartmentSize) errors.apartmentSize = 'Wohnungsgröße ist erforderlich';
    if (!jobData.cleaningType) errors.cleaningType = 'Reinigungsart ist erforderlich';
    if (!jobData.frequency) errors.frequency = 'Häufigkeit ist erforderlich';
    if (!jobData.location.address.trim()) errors.address = 'Adresse ist erforderlich';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    setSubmitError(null);

    try {
      // Map cleaning type to database values
      const jobTypeMap: { [key: string]: string } = {
        'regular': 'regular_cleaning',
        'deep': 'deep_cleaning',
        'move': 'move_cleaning',
        'office': 'office_cleaning'
      };

      // Map frequency to database values
      const frequencyMap: { [key: string]: string } = {
        'weekly': 'weekly',
        'biweekly': 'bi_weekly',
        'monthly': 'monthly',
        'once': 'one_time'
      };

      const jobRecord = {
        customer_id: user.id,
        title: jobData.title,
        description: jobData.description || null,
        location_city: jobData.location.city,
        location_postal_code: jobData.location.postalCode || null,
        location_address: jobData.location.address,
        job_type: jobTypeMap[jobData.cleaningType] || 'regular_cleaning',
        frequency: frequencyMap[jobData.frequency] || 'one_time',
        preferred_date: jobData.preferredDate ? new Date(jobData.preferredDate).toISOString() : null,
        estimated_hours: jobData.estimatedHours,
        budget_min: Math.round(jobData.budgetMin * 100), // Convert to cents
        budget_max: Math.round(jobData.budgetMax * 100), // Convert to cents
        status: 'open'
      };

      const { data, error } = await supabase
        .from('jobs')
        .insert(jobRecord)
        .select()
        .single();

      if (error) throw error;

      alert('Auftrag erfolgreich veröffentlicht! Reinigungskräfte können sich nun bewerben.');
      router.push(`/${locale}`);

    } catch (err) {
      console.error('Error posting job:', err);
      setSubmitError('Es gab einen Fehler beim Veröffentlichen des Auftrags. Bitte versuchen Sie es erneut.');
    } finally {
      setLoading(false);
    }
  };

  const apartmentSizes = [
    { value: 'studio', label: t('job.size_studio') },
    { value: '2room', label: t('job.size_2room') },
    { value: '3room', label: t('job.size_3room') },
    { value: '4room', label: t('job.size_4room') },
  ];

  const cleaningTypes = [
    { value: 'regular', label: t('job.type_regular') },
    { value: 'deep', label: t('job.type_deep') },
    { value: 'move', label: t('job.type_move') },
  ];

  const frequencies = [
    { value: 'weekly', label: t('job.freq_weekly') },
    { value: 'biweekly', label: t('job.freq_biweekly') },
    { value: 'monthly', label: t('job.freq_monthly') },
    { value: 'once', label: t('job.freq_once') },
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
              {t('job.post_title')}
            </h1>

            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Step 1: Job Basic Info */}
              {step === 1 && (
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titel des Auftrags *
                    </label>
                    <input
                      type="text"
                      value={jobData.title}
                      onChange={(e) => updateJobData('title', e.target.value)}
                      className={`input-field ${
                        fieldErrors.title ? 'border-red-300' : ''
                      }`}
                      placeholder="z.B. Wöchentliche Wohnungsreinigung oder Grundreinigung nach Umzug"
                      required
                    />
                    {fieldErrors.title && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.title}</p>
                    )}
                  </div>

                  {/* Apartment Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      <Home className="inline mr-2" size={16} />
                      {t('job.apartment_size')}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {apartmentSizes.map(size => (
                        <button
                          key={size.value}
                          type="button"
                          onClick={() => updateJobData('apartmentSize', size.value)}
                          className={`p-4 rounded-lg border text-left transition-all ${
                            jobData.apartmentSize === size.value
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {size.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cleaning Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {t('job.cleaning_type')}
                    </label>
                    <div className="space-y-2">
                      {cleaningTypes.map(type => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => updateJobData('cleaningType', type.value)}
                          className={`w-full p-4 rounded-lg border text-left transition-all ${
                            jobData.cleaningType === type.value
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Frequency */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      <Clock className="inline mr-2" size={16} />
                      {t('job.frequency')}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {frequencies.map(freq => (
                        <button
                          key={freq.value}
                          type="button"
                          onClick={() => updateJobData('frequency', freq.value)}
                          className={`p-4 rounded-lg border text-left transition-all ${
                            jobData.frequency === freq.value
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {freq.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!jobData.title || !jobData.apartmentSize || !jobData.cleaningType || !jobData.frequency}
                      className="btn-primary disabled:bg-gray-400"
                    >
                      {t('common.next')}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Location & Details */}
              {step === 2 && (
                <div className="space-y-6">
                  {/* Location */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      <MapPin className="inline mr-2" size={20} />
                      Standort
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Stadt *
                        </label>
                        <input
                          type="text"
                          value={jobData.location.city}
                          onChange={(e) => updateLocationData('city', e.target.value)}
                          className="input-field"
                          placeholder="Salzburg"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Postleitzahl
                        </label>
                        <input
                          type="text"
                          value={jobData.location.postalCode}
                          onChange={(e) => updateLocationData('postalCode', e.target.value)}
                          className="input-field"
                          placeholder="5020"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Straße und Hausnummer *
                      </label>
                      <input
                        type="text"
                        value={jobData.location.address}
                        onChange={(e) => updateLocationData('address', e.target.value)}
                        className={`input-field ${
                          fieldErrors.address ? 'border-red-300' : ''
                        }`}
                        placeholder="z.B. Musterstraße 123"
                        required
                      />
                      {fieldErrors.address && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.address}</p>
                      )}
                    </div>
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('job.when_needed')}
                    </label>
                    <input
                      type="date"
                      value={jobData.preferredDate}
                      onChange={(e) => updateJobData('preferredDate', e.target.value)}
                      className="input-field"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('job.description')}
                    </label>
                    <textarea
                      value={jobData.description}
                      onChange={(e) => updateJobData('description', e.target.value)}
                      rows={4}
                      className="input-field"
                      placeholder="Beschreiben Sie Ihre spezifischen Reinigungsanforderungen..."
                    />
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn-secondary"
                    >
                      {t('common.back')}
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!jobData.location.address}
                      className="btn-primary disabled:bg-gray-400"
                    >
                      {t('common.next')}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Budget & Hours */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    <Euro className="inline mr-2" size={20} />
                    Budget & Arbeitsaufwand
                  </h3>

                  {/* Estimated Hours */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="inline mr-2" size={16} />
                      Geschätzte Arbeitszeit (Stunden)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      step="0.5"
                      value={jobData.estimatedHours}
                      onChange={(e) => updateJobData('estimatedHours', Number(e.target.value))}
                      className="input-field"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Wie viele Stunden wird die Reinigung voraussichtlich dauern?
                    </p>
                  </div>

                  {/* Budget Range */}
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Budget pro Stunde (€)
                    </label>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Minimum</label>
                        <div className="relative">
                          <Euro className="absolute left-3 top-3 text-gray-400" size={16} />
                          <input
                            type="number"
                            min="15"
                            max="100"
                            value={jobData.budgetMin}
                            onChange={(e) => updateJobData('budgetMin', Number(e.target.value))}
                            className="input-field pl-10"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Maximum</label>
                        <div className="relative">
                          <Euro className="absolute left-3 top-3 text-gray-400" size={16} />
                          <input
                            type="number"
                            min="15"
                            max="100"
                            value={jobData.budgetMax}
                            onChange={(e) => updateJobData('budgetMax', Number(e.target.value))}
                            className="input-field pl-10"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <strong>Geschätzte Gesamtkosten:</strong> €{jobData.budgetMin * jobData.estimatedHours} - €{jobData.budgetMax * jobData.estimatedHours}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn-secondary"
                    >
                      {t('common.back')}
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn-primary"
                    >
                      {t('common.next')}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Summary & Submit */}
              {step === 4 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Auftrag überprüfen und veröffentlichen
                  </h3>

                  {/* Job Summary */}
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Auftragszusammenfassung</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><strong>Titel:</strong> {jobData.title}</p>
                        <p><strong>Wohnungsgröße:</strong> {apartmentSizes.find(s => s.value === jobData.apartmentSize)?.label}</p>
                        <p><strong>Reinigungsart:</strong> {cleaningTypes.find(t => t.value === jobData.cleaningType)?.label}</p>
                        <p><strong>Häufigkeit:</strong> {frequencies.find(f => f.value === jobData.frequency)?.label}</p>
                      </div>
                      <div>
                        <p><strong>Standort:</strong> {jobData.location.address}, {jobData.location.city}</p>
                        {jobData.preferredDate && <p><strong>Gewünschtes Datum:</strong> {new Date(jobData.preferredDate).toLocaleDateString('de-DE')}</p>}
                        <p><strong>Geschätzte Dauer:</strong> {jobData.estimatedHours} Stunden</p>
                        <p><strong>Budget:</strong> €{jobData.budgetMin}-{jobData.budgetMax}/Stunde</p>
                        <p><strong>Geschätzte Gesamtkosten:</strong> €{jobData.budgetMin * jobData.estimatedHours}-{jobData.budgetMax * jobData.estimatedHours}</p>
                      </div>
                    </div>
                    
                    {jobData.description && (
                      <div>
                        <p><strong>Beschreibung:</strong></p>
                        <p className="text-gray-700 mt-1">{jobData.description}</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Nächste Schritte:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Ihr Auftrag wird für verifizierte Reinigungskräfte sichtbar</li>
                      <li>• Interessierte Reinigungskräfte werden sich bei Ihnen bewerben</li>
                      <li>• Sie können Profile ansehen und Ihr Team auswählen</li>
                      <li>• Die Kommunikation erfolgt über unsere Plattform</li>
                    </ul>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn-secondary"
                    >
                      {t('common.back')}
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary disabled:bg-gray-400"
                    >
                      {loading ? 'Veröffentliche...' : 'Auftrag veröffentlichen'}
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