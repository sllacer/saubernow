'use client';

import { useState, Fragment } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { Mail, Lock, Eye, EyeOff, X, User, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { signIn, signUp } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (mode === 'register') {
      if (!formData.name.trim()) return t('auth.name_required');
      if (!formData.email.trim()) return 'E-Mail ist erforderlich';
      if (!formData.password) return 'Passwort ist erforderlich';
      if (formData.password !== formData.confirmPassword) return t('auth.passwords_no_match');
      if (formData.password.length < 6) return t('auth.password_min_length');
      if (formData.phone && !isValidPhoneNumber(formData.phone)) return t('auth.invalid_phone');
    } else {
      if (!formData.email.trim()) return 'E-Mail ist erforderlich';
      if (!formData.password) return 'Passwort ist erforderlich';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      let result;
      
      if (mode === 'login') {
        result = await signIn(formData.email, formData.password);
      } else {
        // Registration
        const metadata = {
          name: formData.name,
          phone: formData.phone || null,
          user_type: 'customer'
        };
        result = await signUp(formData.email, formData.password, metadata);
      }
      
      if (result.error) {
        setError(result.error.message);
      } else {
        // Reset form
        setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
        setError(null);
        setMode('login');
        // Call success callback if provided, otherwise close modal
        if (onSuccess) {
          onSuccess();
        } else {
          onClose();
          // Refresh current page to update auth state
          router.refresh();
        }
      }
    } catch (err) {
      setError(t('auth.unexpected_error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    setError(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setMode('login');
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-8 text-left align-middle shadow-xl transition-all">
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                  <Dialog.Title className="text-3xl font-bold text-gray-900 mb-2">
                    {mode === 'login' ? t('auth.login_title') : t('auth.register_title')}
                  </Dialog.Title>
                  <p className="text-gray-600">
                    {mode === 'login' 
                      ? t('auth.login_subtitle') 
                      : t('auth.register_subtitle')
                    }
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                      {error}
                    </div>
                  )}

                  {/* Name - Registration only */}
                  {mode === 'register' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('auth.full_name_label')}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder={t('auth.full_name_placeholder')}
                          required={mode === 'register'}
                        />
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('auth.email_label')}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder={t('auth.email_placeholder')}
                        required
                      />
                    </div>
                  </div>

                  {/* Phone - Registration only */}
                  {mode === 'register' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('auth.phone_label')}
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                        <PhoneInput
                          country="AT"
                          value={formData.phone}
                          onChange={(value) => handleInputChange('phone', value || '')}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder={t('auth.phone_placeholder')}
                          numberInputProps={{
                            className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('auth.password_label')}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder={t('auth.password_placeholder')}
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
                    {mode === 'register' && (
                      <p className="text-sm text-gray-600 mt-1">
                        {t('auth.password_min_chars')}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password - Registration only */}
                  {mode === 'register' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('auth.confirm_password_label')}
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder={t('auth.confirm_password_placeholder')}
                          required={mode === 'register'}
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
                  )}

                  {/* Remember me and Forgot password - Login only */}
                  {mode === 'login' && (
                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          {t('auth.remember_me')}
                        </span>
                      </label>
                      <button
                        type="button"
                        className="text-sm text-primary-600 hover:text-primary-500"
                      >
                        {t('auth.forgot_password')}
                      </button>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading 
                      ? (mode === 'login' ? t('auth.logging_in') : t('auth.registering')) 
                      : (mode === 'login' ? t('auth.login_button') : t('auth.register_button'))
                    }
                  </button>
                </form>

                {/* Mode Toggle */}
                <div className="text-center space-y-3 mt-8">
                  <p className="text-sm text-gray-600">
                    {mode === 'login' ? t('auth.no_account') : t('auth.have_account')}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setMode(mode === 'login' ? 'register' : 'login');
                      setError(null);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    {mode === 'login' ? t('auth.register_now') : t('auth.switch_to_login')}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}