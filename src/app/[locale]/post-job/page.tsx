'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Home, Clock, MapPin, Euro, Zap, Droplets, Sparkles, Settings, Wrench, Spray, ShowerHead, Trash2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import LoginModal from '@/components/LoginModal';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

type EquipmentItem = {
  id: string;
  name: string;
  category: 'basic_tools' | 'specialized' | 'supplies' | 'services';
  icon: string;
};

type JobData = {
  title: string;
  apartmentSize: string;
  cleaningType: string;
  frequency: string;
  selectedEquipment: string[];
  customRequirements: string;
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
    selectedEquipment: [],
    customRequirements: '',
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
  const [showLoginModal, setShowLoginModal] = useState(false);

  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  // Remove automatic redirect - we'll handle authentication at step 5

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

  // Handle successful authentication - retry submit
  const handleAuthSuccess = () => {
    setShowLoginModal(false);
    // Trigger form submission after a brief delay to ensure auth state is updated
    setTimeout(() => {
      const form = document.querySelector('form') as HTMLFormElement;
      if (form) {
        form.requestSubmit();
      }
    }, 100);
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is authenticated, show modal if not
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    // Validate required fields
    const errors: {[key: string]: string} = {};
    if (!jobData.title.trim()) errors.title = 'Titel ist erforderlich';
    if (!jobData.apartmentSize) errors.apartmentSize = t('job.apartment_size_required');
    if (!jobData.cleaningType) errors.cleaningType = t('job.cleaning_type_required');
    if (!jobData.frequency) errors.frequency = t('job.frequency_required');
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
        selected_equipment: jobData.selectedEquipment,
        custom_requirements: jobData.customRequirements || null,
        status: 'open'
      };

      const { data, error } = await supabase
        .from('jobs')
        .insert(jobRecord)
        .select()
        .single();

      if (error) throw error;

      alert(t('job.success_message'));
      router.push(`/${locale}`);

    } catch (err) {
      console.error('Error posting job:', err);
      setSubmitError(t('job.error_message'));
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

  const equipmentOptions: EquipmentItem[] = [
    // Basic Tools
    { id: 'vacuum', name: t('job.equipment_vacuum'), category: 'basic_tools', icon: 'Zap' },
    { id: 'mop', name: t('job.equipment_mop'), category: 'basic_tools', icon: 'Droplets' },
    { id: 'cloths', name: t('job.equipment_cloths'), category: 'basic_tools', icon: 'Sparkles' },
    { id: 'gloves', name: t('job.equipment_gloves'), category: 'basic_tools', icon: 'Settings' },
    
    // Specialized Equipment
    { id: 'steam_cleaner', name: t('job.equipment_steam_cleaner'), category: 'specialized', icon: 'Zap' },
    { id: 'carpet_cleaner', name: t('job.equipment_carpet_cleaner'), category: 'specialized', icon: 'Wrench' },
    { id: 'window_squeegee', name: t('job.equipment_window_squeegee'), category: 'specialized', icon: 'Droplets' },
    { id: 'pressure_washer', name: t('job.equipment_pressure_washer'), category: 'specialized', icon: 'Spray' },
    
    // Cleaning Supplies
    { id: 'all_purpose', name: t('job.equipment_all_purpose'), category: 'supplies', icon: 'Spray' },
    { id: 'bathroom_cleaner', name: t('job.equipment_bathroom_cleaner'), category: 'supplies', icon: 'ShowerHead' },
    { id: 'glass_cleaner', name: t('job.equipment_glass_cleaner'), category: 'supplies', icon: 'Sparkles' },
    { id: 'floor_cleaner', name: t('job.equipment_floor_cleaner'), category: 'supplies', icon: 'Droplets' },
    
    // Special Services
    { id: 'deep_cleaning', name: t('job.equipment_deep_cleaning'), category: 'services', icon: 'Zap' },
    { id: 'carpet_service', name: t('job.equipment_carpet_service'), category: 'services', icon: 'Settings' },
    { id: 'window_service', name: t('job.equipment_window_service'), category: 'services', icon: 'Sparkles' },
    { id: 'appliance_cleaning', name: t('job.equipment_appliance_cleaning'), category: 'services', icon: 'Wrench' },
  ];

  // Helper function to get icon component
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      Zap, Droplets, Sparkles, Settings, Wrench, Spray, ShowerHead, Trash2
    };
    return iconMap[iconName] || Sparkles;
  };

  // Helper function to toggle equipment selection
  const toggleEquipment = (equipmentId: string) => {
    setJobData(prev => ({
      ...prev,
      selectedEquipment: prev.selectedEquipment.includes(equipmentId)
        ? prev.selectedEquipment.filter(id => id !== equipmentId)
        : [...prev.selectedEquipment, equipmentId]
    }));
  };

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
      
      <main className="min-h-screen bg-gray-50 pt-20 pb-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[
                { number: 1, label: t('job.step_room_size') },
                { number: 2, label: t('job.step_equipment') },
                { number: 3, label: t('job.step_location') },
                { number: 4, label: t('job.step_budget') },
                { number: 5, label: t('job.step_summary') }
              ].map((stepInfo, index) => (
                <div key={stepInfo.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      stepInfo.number <= step ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {stepInfo.number}
                    </div>
                    <span className={`text-xs mt-1 text-center ${
                      stepInfo.number <= step ? 'text-primary-600 font-medium' : 'text-gray-500'
                    }`}>
                      {stepInfo.label}
                    </span>
                  </div>
                  {index < 4 && (
                    <div className={`h-1 flex-1 mx-2 transition-colors ${
                      stepInfo.number < step ? 'bg-primary-600' : 'bg-gray-200'
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
                      placeholder={t('job.job_title_placeholder')}
                      required
                    />
                    {fieldErrors.title && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.title}</p>
                    )}
                  </div>

                  {/* Apartment Size */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-6 text-center">
                      <Home className="inline mr-2" size={24} />
                      {t('job.apartment_size')}
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {apartmentSizes.map(size => (
                        <button
                          key={size.value}
                          type="button"
                          onClick={() => updateJobData('apartmentSize', size.value)}
                          className={`p-6 rounded-xl border-2 text-center transition-all transform hover:scale-105 ${
                            jobData.apartmentSize === size.value
                              ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-lg'
                              : 'border-gray-300 hover:border-primary-300 hover:shadow-md bg-white'
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            <Home size={32} className={`mb-3 ${
                              jobData.apartmentSize === size.value ? 'text-primary-600' : 'text-gray-500'
                            }`} />
                            <span className="font-semibold text-sm">{size.label}</span>
                          </div>
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

              {/* Step 2: Equipment & Cleaning Needs */}
              {step === 2 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {t('job.equipment_title')}
                    </h2>
                    <p className="text-gray-600">
                      {t('job.equipment_description')}
                    </p>
                  </div>

                  {/* Equipment Categories */}
                  {['basic_tools', 'specialized', 'supplies', 'services'].map(category => {
                    const categoryItems = equipmentOptions.filter(item => item.category === category);
                    const categoryTitles = {
                      basic_tools: t('job.basic_tools'),
                      specialized: t('job.specialized_equipment'),
                      supplies: t('job.cleaning_supplies'),
                      services: t('job.special_services')
                    };

                    return (
                      <div key={category} className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                          {categoryTitles[category as keyof typeof categoryTitles]}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {categoryItems.map(equipment => {
                            const IconComponent = getIconComponent(equipment.icon);
                            const isSelected = jobData.selectedEquipment.includes(equipment.id);
                            
                            return (
                              <button
                                key={equipment.id}
                                type="button"
                                onClick={() => toggleEquipment(equipment.id)}
                                className={`p-4 rounded-lg border-2 text-center transition-all transform hover:scale-105 ${
                                  isSelected
                                    ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-md'
                                    : 'border-gray-300 hover:border-primary-300 hover:shadow-sm bg-white'
                                }`}
                              >
                                <div className="flex flex-col items-center">
                                  <IconComponent size={24} className={`mb-2 ${
                                    isSelected ? 'text-primary-600' : 'text-gray-500'
                                  }`} />
                                  <span className="text-xs font-medium">{equipment.name}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  {/* Custom Requirements */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('job.custom_requirements')}
                    </label>
                    <textarea
                      value={jobData.customRequirements}
                      onChange={(e) => updateJobData('customRequirements', e.target.value)}
                      rows={3}
                      className="input-field"
                      placeholder={t('job.custom_requirements_placeholder')}
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
                      className="btn-primary"
                    >
                      {t('common.next')}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Location & Details */}
              {step === 3 && (
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
                          placeholder={t('job.city_placeholder')}
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
                          placeholder={t('job.postal_code_placeholder')}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('job.street_address_label')}
                      </label>
                      <input
                        type="text"
                        value={jobData.location.address}
                        onChange={(e) => updateLocationData('address', e.target.value)}
                        className={`input-field ${
                          fieldErrors.address ? 'border-red-300' : ''
                        }`}
                        placeholder={t('job.address_placeholder')}
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

              {/* Step 4: Budget & Hours */}
              {step === 4 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    <Euro className="inline mr-2" size={20} />
                    Budget & Arbeitsaufwand
                  </h3>

                  {/* Estimated Hours */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="inline mr-2" size={16} />
                      {t('job.estimated_hours_label')}
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
                      {t('job.estimated_hours_hint')}
                    </p>
                  </div>

                  {/* Budget Range */}
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      {t('job.budget_per_hour')}
                    </label>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">{t('job.budget_min_label')}</label>
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
                        <label className="block text-xs text-gray-500 mb-1">{t('job.budget_max_label')}</label>
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
                        <strong>{t('job.estimated_total_cost')}:</strong> €{jobData.budgetMin * jobData.estimatedHours} - €{jobData.budgetMax * jobData.estimatedHours}
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

              {/* Step 5: Summary & Submit */}
              {step === 5 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t('job.review_and_publish')}
                  </h3>

                  {/* Job Summary */}
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <h4 className="font-semibold text-gray-900 mb-3">{t('job.job_summary')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><strong>{t('job.title_label')}:</strong> {jobData.title}</p>
                        <p><strong>{t('job.apartment_size_label')}:</strong> {apartmentSizes.find(s => s.value === jobData.apartmentSize)?.label}</p>
                        <p><strong>{t('job.cleaning_type_label')}:</strong> {cleaningTypes.find(type => type.value === jobData.cleaningType)?.label}</p>
                        <p><strong>{t('job.frequency_label')}:</strong> {frequencies.find(f => f.value === jobData.frequency)?.label}</p>
                      </div>
                      <div>
                        <p><strong>{t('job.location_label')}:</strong> {jobData.location.address}, {jobData.location.city}</p>
                        {jobData.preferredDate && <p><strong>{t('job.preferred_date_label')}:</strong> {new Date(jobData.preferredDate).toLocaleDateString('de-DE')}</p>}
                        <p><strong>{t('job.estimated_duration_label')}:</strong> {jobData.estimatedHours} {t('job.hours_suffix')}</p>
                        <p><strong>{t('job.budget_label')}:</strong> €{jobData.budgetMin}-{jobData.budgetMax}/Stunde</p>
                        <p><strong>{t('job.estimated_total_cost')}:</strong> €{jobData.budgetMin * jobData.estimatedHours}-{jobData.budgetMax * jobData.estimatedHours}</p>
                      </div>
                    </div>
                    
                    {/* Selected Equipment */}
                    {jobData.selectedEquipment.length > 0 && (
                      <div>
                        <p><strong>{t('job.selected_equipment_label')}:</strong></p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {jobData.selectedEquipment.map(equipmentId => {
                            const equipment = equipmentOptions.find(eq => eq.id === equipmentId);
                            return equipment ? (
                              <span key={equipmentId} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                                {equipment.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                    
                    {/* Custom Requirements */}
                    {jobData.customRequirements && (
                      <div>
                        <p><strong>{t('job.special_requirements_label')}:</strong></p>
                        <p className="text-gray-700 mt-1">{jobData.customRequirements}</p>
                      </div>
                    )}
                    
                    {jobData.description && (
                      <div>
                        <p><strong>{t('job.description_label')}:</strong></p>
                        <p className="text-gray-700 mt-1">{jobData.description}</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">{t('job.next_steps_title')}:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• {t('job.next_step_1')}</li>
                      <li>• {t('job.next_step_2')}</li>
                      <li>• {t('job.next_step_3')}</li>
                      <li>• {t('job.next_step_4')}</li>
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
                      {loading 
                        ? t('job.publishing') 
                        : user 
                          ? t('job.publish_job')
                          : t('job.login_and_publish')
                      }
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>

      {/* Authentication Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}