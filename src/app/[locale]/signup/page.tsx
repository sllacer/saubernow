'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'customer',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});

  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { signUp } = useAuth();

  const validateField = (field: string, value: string | boolean): string => {
    switch (field) {
      case 'name':
        if (typeof value === 'string') {
          if (!value.trim()) return t('validation.required');
          if (value.trim().length < 2) return t('validation.name_too_short');
        }
        break;
      case 'email':
        if (typeof value === 'string') {
          if (!value.trim()) return t('validation.required');
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) return t('validation.email_invalid');
        }
        break;
      case 'phone':
        if (typeof value === 'string' && value.trim()) {
          // Only validate if phone number is provided (it's optional)
          if (!isValidPhoneNumber(value)) return t('validation.phone_invalid');
        }
        break;
      case 'password':
        if (typeof value === 'string') {
          if (!value) return t('validation.required');
          if (value.length < 8) return t('validation.password_too_short');
          const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
          if (!strongPasswordRegex.test(value)) return t('validation.password_weak');
        }
        break;
      case 'confirmPassword':
        if (typeof value === 'string') {
          if (!value) return t('validation.required');
          if (value !== formData.password) return t('validation.passwords_mismatch');
        }
        break;
      case 'acceptTerms':
        if (typeof value === 'boolean' && !value) return t('validation.terms_required');
        break;
    }
    return '';
  };

  const handleInputChange = (field: string, value: string | boolean) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate all fields
    const errors: {[key: string]: string} = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) {
        errors[field] = error;
      }
    });
    
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signUp(formData.email, formData.password, {
        full_name: formData.name,
        phone: formData.phone,
        user_type: formData.userType
      });
      
      if (error) {
        setError(error.message);
      } else {
        if (formData.userType === 'cleaner') {
          router.push(`/${locale}/become-cleaner`);
        } else {
          router.push(`/${locale}`);
        }
      }
    } catch (err) {
      setError('Ein unerwarteter Fehler ist aufgetreten');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t('auth.signup_title')}
              </h1>
              <p className="text-gray-600">
                {t('auth.signup_subtitle')}
              </p>
            </div>

            {/* Account Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t('auth.register_as')}
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleInputChange('userType', 'customer')}
                  className={`p-4 border-2 rounded-lg transition-all text-center ${
                    formData.userType === 'customer'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{t('auth.customer')}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {t('auth.book_cleaning')}
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => handleInputChange('userType', 'cleaner')}
                  className={`p-4 border-2 rounded-lg transition-all text-center ${
                    formData.userType === 'cleaner'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{t('auth.cleaner')}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {t('auth.find_jobs')}
                  </div>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.full_name')}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      fieldErrors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder={t('auth.full_name')}
                    onBlur={() => {
                      const error = validateField('name', formData.name);
                      if (error) setFieldErrors(prev => ({...prev, name: error}));
                    }}
                  />
                </div>
                {fieldErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('common.email')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      fieldErrors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="your@email.com"
                    onBlur={() => {
                      const error = validateField('email', formData.email);
                      if (error) setFieldErrors(prev => ({...prev, email: error}));
                    }}
                  />
                </div>
                {fieldErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.phone_optional')}
                </label>
                <PhoneInput
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  defaultCountry="AT"
                  placeholder="Enter phone number"
                  className="phone-input"
                />
                {fieldErrors.phone && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.phone}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={t('auth.password_hint')}
                    minLength={8}
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

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.confirm_password')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={t('auth.repeat_password')}
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                  className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  required
                />
                <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-600">
                  {t('auth.accept_terms')}{' '}
                  <button type="button" className="text-primary-600 hover:text-primary-500">
                    {t('auth.terms_conditions')}
                  </button>{' '}
                  {t('auth.and')}{' '}
                  <button type="button" className="text-primary-600 hover:text-primary-500">
                    {t('auth.privacy_policy')}
                  </button>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t('auth.creating_account') : t('auth.create_account')}
              </button>
            </form>

            {/* Login link */}
            <div className="mt-8 text-center">
              <span className="text-sm text-gray-600">
                {t('auth.already_have_account')}{' '}
                <Link
                  href={`/${locale}/login`}
                  className="text-primary-600 hover:text-primary-500 font-medium"
                >
                  {t('auth.login_here')}
                </Link>
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}