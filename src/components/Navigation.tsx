'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('navigation');
  const locale = useLocale();

  const toggleLocale = () => {
    const newLocale = locale === 'de' ? 'en' : 'de';
    window.location.href = `/${newLocale}${window.location.pathname.substring(3)}`;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary-600">SauberNow</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href={`/${locale}/find-cleaner`}
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              {t('find_cleaner')}
            </Link>
            <Link 
              href={`/${locale}/become-cleaner`}
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              {t('become_cleaner')}
            </Link>
            
            <button
              onClick={toggleLocale}
              className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              <Globe size={16} />
              <span>{locale.toUpperCase()}</span>
            </button>

            <Link 
              href={`/${locale}/login`}
              className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              {t('login')}
            </Link>
            <Link 
              href={`/${locale}/signup`}
              className="btn-primary"
            >
              {t('signup')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link 
                href={`/${locale}/find-cleaner`}
                className="block text-gray-700 hover:text-primary-600 px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('find_cleaner')}
              </Link>
              <Link 
                href={`/${locale}/become-cleaner`}
                className="block text-gray-700 hover:text-primary-600 px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('become_cleaner')}
              </Link>
              <button
                onClick={toggleLocale}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 px-3 py-2 text-base font-medium w-full text-left"
              >
                <Globe size={16} />
                <span>{locale === 'de' ? 'English' : 'Deutsch'}</span>
              </button>
              <Link 
                href={`/${locale}/login`}
                className="block text-gray-700 hover:text-primary-600 px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('login')}
              </Link>
              <Link 
                href={`/${locale}/signup`}
                className="block btn-primary mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('signup')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}