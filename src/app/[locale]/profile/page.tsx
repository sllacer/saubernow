'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { User, Phone, Mail, MapPin, Edit3, Camera, Star, CheckCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import ProfileEditModal from '@/components/ProfileEditModal';

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

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [cleanerProfile, setCleanerProfile] = useState<CleanerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/${locale}/login`);
      return;
    }

    if (user) {
      fetchProfile();
    }
  }, [user, authLoading, locale, router]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Fetch basic profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // If user is a cleaner, fetch cleaner-specific data
      if (profileData.user_type === 'cleaner') {
        const { data: cleanerData, error: cleanerError } = await supabase
          .from('cleaners')
          .select('*')
          .eq('id', user.id)
          .single();

        if (cleanerError) throw cleanerError;
        setCleanerProfile(cleanerData);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = () => {
    fetchProfile(); // Refresh profile data
    setShowEditModal(false);
  };

  if (authLoading || loading) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!profile) return null;

  const formatCurrency = (cents: number | null) => {
    if (!cents) return '-';
    return `€${(cents / 100).toFixed(2)}`;
  };

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getLanguageDisplay = (langCode: string) => {
    const languages: { [key: string]: string } = {
      'de': 'Deutsch',
      'en': 'English',
      'fr': 'Français',
      'it': 'Italiano',
      'es': 'Español'
    };
    return languages[langCode] || langCode;
  };

  const getServiceDisplay = (service: string) => {
    const services: { [key: string]: string } = {
      'regular_cleaning': t('services.regular_cleaning'),
      'deep_cleaning': t('services.deep_cleaning'),
      'move_cleaning': t('services.move_cleaning'),
      'office_cleaning': t('services.office_cleaning')
    };
    return services[service] || service;
  };

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-gray-500" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {profile.full_name || 'Unbekannter Benutzer'}
                  </h1>
                  <p className="text-lg text-gray-600 capitalize">
                    {profile.user_type === 'cleaner' ? t('auth.cleaner') : t('auth.customer')}
                  </p>
                  {profile.user_type === 'cleaner' && cleanerProfile && (
                    <div className="flex items-center mt-2 space-x-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getVerificationStatusColor(cleanerProfile.verification_status)}`}>
                        {cleanerProfile.verification_status === 'verified' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {cleanerProfile.verification_status === 'verified' ? '✓ Verifiziert' : 
                         cleanerProfile.verification_status === 'pending' ? 'Prüfung läuft' : 'Abgelehnt'}
                      </span>
                      {cleanerProfile.average_rating > 0 && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          {cleanerProfile.average_rating.toFixed(1)} ({cleanerProfile.total_reviews} Bewertungen)
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setShowEditModal(true)}
                className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Profil bearbeiten
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Grundinformationen</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{profile.email || 'Keine E-Mail'}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{profile.phone || 'Keine Telefonnummer'}</span>
                </div>
                {cleanerProfile && (
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-900">
                      {cleanerProfile.location_city}
                      {cleanerProfile.location_postal_code && `, ${cleanerProfile.location_postal_code}`}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Cleaner-specific Information */}
            {profile.user_type === 'cleaner' && cleanerProfile && (
              <>
                {/* Services & Rates */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Dienstleistungen & Preise</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Stundensatz</label>
                      <p className="text-2xl font-bold text-primary-600">
                        {formatCurrency(cleanerProfile.hourly_rate)}/Stunde
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Angebotene Services</label>
                      <div className="flex flex-wrap gap-2">
                        {cleanerProfile.services_offered?.map((service) => (
                          <span key={service} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {getServiceDisplay(service)}
                          </span>
                        )) || <span className="text-gray-500">Keine Services angegeben</span>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sprachen</label>
                      <div className="flex flex-wrap gap-2">
                        {cleanerProfile.languages?.map((lang) => (
                          <span key={lang} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            {getLanguageDisplay(lang)}
                          </span>
                        )) || <span className="text-gray-500">Keine Sprachen angegeben</span>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Statistiken</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary-600">{cleanerProfile.total_jobs_completed}</p>
                      <p className="text-sm text-gray-600">Abgeschlossene Jobs</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary-600">{cleanerProfile.total_reviews}</p>
                      <p className="text-sm text-gray-600">Bewertungen</p>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Über mich</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {cleanerProfile.bio || 'Noch keine Beschreibung vorhanden.'}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Profile Edit Modal */}
      {showEditModal && (
        <ProfileEditModal
          profile={profile}
          cleanerProfile={cleanerProfile}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleProfileUpdate}
        />
      )}
    </>
  );
}