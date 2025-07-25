'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Menu, X, Globe, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from './LoginModal';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('navigation');
  const locale = useLocale();
  const router = useRouter();
  const { user, signOut, loading } = useAuth();

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleLocale = () => {
    const newLocale = locale === 'de' ? 'en' : 'de';
    window.location.href = `/${newLocale}${window.location.pathname.substring(3)}`;
  };

  const handleSignOut = async () => {
    await signOut();
    setIsUserMenuOpen(false);
  };

  const handleProfileClick = () => {
    if (user) {
      // Redirect to profile page when logged in
      router.push(`/${locale}/profile`);
    } else {
      // Open login modal when not logged in
      setIsLoginModalOpen(true);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex-shrink-0 flex items-center">
              <Image
                src="/saubernow-logo.png"
                alt="SauberNow"
                width={120}
                height={40}
                priority
                className="h-8 w-auto"
              />
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

            {!loading && (
              <button
                onClick={handleProfileClick}
                className="flex items-center text-gray-700 hover:text-primary-600 p-2 rounded-lg transition-colors"
              >
                <User size={20} />
              </button>
            )}
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
              
              {!loading && (
                <button
                  onClick={() => {
                    handleProfileClick();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full text-gray-700 hover:text-primary-600 px-3 py-2 text-base font-medium text-left"
                >
                  <User size={16} className="mr-2" />
                  {user ? 'Profil' : 'Anmelden'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </nav>
  );
}