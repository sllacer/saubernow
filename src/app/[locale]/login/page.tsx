'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Navigation from '@/components/Navigation';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      console.log('Login attempt:', formData);
      alert('Anmeldung erfolgreich!');
      router.push(`/${locale}`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Anmelden
              </h1>
              <p className="text-gray-600">
                Willkommen zurück bei SauberNow
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-Mail-Adresse
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="ihre@email.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passwort
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Ihr Passwort"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember me and Forgot password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Angemeldet bleiben
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm text-primary-600 hover:text-primary-500"
                >
                  Passwort vergessen?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Wird angemeldet...' : 'Anmelden'}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-8 mb-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">oder</span>
                </div>
              </div>
            </div>

            {/* Account Type Selection */}
            <div className="space-y-4">
              <p className="text-center text-sm text-gray-600 mb-4">
                Noch kein Konto? Wählen Sie Ihren Kontotyp:
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href={`/${locale}/signup?type=customer`}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center"
                >
                  <div className="font-medium text-gray-900">Kunde</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Reinigung buchen
                  </div>
                </Link>
                
                <Link
                  href={`/${locale}/become-cleaner`}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-center"
                >
                  <div className="font-medium text-gray-900">Reinigungskraft</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Jobs finden
                  </div>
                </Link>
              </div>
            </div>

            {/* Sign up link */}
            <div className="mt-8 text-center">
              <span className="text-sm text-gray-600">
                Noch kein Konto?{' '}
                <Link
                  href={`/${locale}/signup`}
                  className="text-primary-600 hover:text-primary-500 font-medium"
                >
                  Hier registrieren
                </Link>
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}