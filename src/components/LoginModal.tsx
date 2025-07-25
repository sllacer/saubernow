'use client';

import { useState, Fragment } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { Mail, Lock, Eye, EyeOff, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { signIn } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await signIn(formData.email, formData.password);
      
      if (error) {
        setError(error.message);
      } else {
        // Close modal and stay on current page
        onClose();
        // Reset form
        setFormData({ email: '', password: '' });
        setError(null);
        // Refresh current page to update auth state
        router.refresh();
      }
    } catch (err) {
      setError('Ein unerwarteter Fehler ist aufgetreten');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ email: '', password: '' });
    setError(null);
    setShowPassword(false);
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
                    Anmelden
                  </Dialog.Title>
                  <p className="text-gray-600">
                    Willkommen zurück bei SauberNow
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                      {error}
                    </div>
                  )}

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

                {/* Sign up section */}
                <div className="text-center space-y-3 mt-8">
                  <p className="text-sm text-gray-600">
                    Noch kein Konto?
                  </p>
                  <Link
                    href={`/${locale}/signup`}
                    onClick={handleClose}
                    className="w-full inline-block px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    Jetzt registrieren
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}