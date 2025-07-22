'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Home, Clock, MapPin } from 'lucide-react';
import Navigation from '@/components/Navigation';

type JobData = {
  apartmentSize: string;
  cleaningType: string;
  frequency: string;
  location: string;
  preferredDate: string;
  description: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
};

export default function PostJobPage() {
  const [step, setStep] = useState(1);
  const [jobData, setJobData] = useState<JobData>({
    apartmentSize: '',
    cleaningType: '',
    frequency: '',
    location: '',
    preferredDate: '',
    description: '',
    contactInfo: {
      name: '',
      email: '',
      phone: ''
    }
  });

  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const updateJobData = (field: keyof JobData, value: any) => {
    setJobData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateContactInfo = (field: keyof JobData['contactInfo'], value: string) => {
    setJobData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value
      }
    }));
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to an API
    console.log('Job posted:', jobData);
    alert('Auftrag erfolgreich veröffentlicht!');
    router.push(`/${locale}`);
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

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    i <= step ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {i}
                  </div>
                  {i < 3 && (
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

            <form onSubmit={handleSubmit}>
              {/* Step 1: Job Details */}
              {step === 1 && (
                <div className="space-y-6">
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
                      disabled={!jobData.apartmentSize || !jobData.cleaningType || !jobData.frequency}
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline mr-2" size={16} />
                      {t('common.address')}
                    </label>
                    <input
                      type="text"
                      value={jobData.location}
                      onChange={(e) => updateJobData('location', e.target.value)}
                      className="input-field"
                      placeholder="z.B. Salzburg Altstadt, 5020 Salzburg"
                      required
                    />
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
                      disabled={!jobData.location}
                      className="btn-primary disabled:bg-gray-400"
                    >
                      {t('common.next')}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Information */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('common.name')}
                    </label>
                    <input
                      type="text"
                      value={jobData.contactInfo.name}
                      onChange={(e) => updateContactInfo('name', e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('common.email')}
                    </label>
                    <input
                      type="email"
                      value={jobData.contactInfo.email}
                      onChange={(e) => updateContactInfo('email', e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('common.phone')} (optional)
                    </label>
                    <input
                      type="tel"
                      value={jobData.contactInfo.phone}
                      onChange={(e) => updateContactInfo('phone', e.target.value)}
                      className="input-field"
                      placeholder="+43 ..."
                    />
                  </div>

                  {/* Job Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">{t('common.summary')}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>{t('common.apartment')}:</strong> {apartmentSizes.find(s => s.value === jobData.apartmentSize)?.label}</p>
                      <p><strong>{t('common.cleaning_type_label')}:</strong> {cleaningTypes.find(t => t.value === jobData.cleaningType)?.label}</p>
                      <p><strong>Häufigkeit:</strong> {frequencies.find(f => f.value === jobData.frequency)?.label}</p>
                      <p><strong>Ort:</strong> {jobData.location}</p>
                      {jobData.preferredDate && <p><strong>Gewünschtes Datum:</strong> {jobData.preferredDate}</p>}
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
                      type="submit"
                      disabled={!jobData.contactInfo.name || !jobData.contactInfo.email}
                      className="btn-primary disabled:bg-gray-400"
                    >
                      {t('job.post_job')}
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