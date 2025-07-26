'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from './LoginModal';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('navigation');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();

  // Check if we're on homepage
  const isHomepage = pathname === `/${locale}` || pathname === '/';

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrollY(currentScrollY);
      setIsScrollingDown(currentScrollY > lastScrollY && currentScrollY > 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Determine navigation styling
  const getNavStyles = () => {
    if (!isHomepage) {
      // Default white navigation for other pages
      return {
        nav: "main-navigation bg-white shadow-sm border-b border-gray-200",
        logo: "nav-logo h-8 w-8",
        logoText: "nav-logo-text text-xl font-light text-gray-900 font-sans",
        link: "text-gray-700 hover:text-primary-600",
        mobileToggle: "text-gray-700 hover:text-primary-600"
      };
    }

    // Check if we're still in the hero section (3/4 of hero height)
    const heroHeight = window.innerHeight * 0.75; // 3/4 of hero height
    
    if (scrollY < heroHeight) {
      // Dark navigation when in hero section
      return {
        nav: "main-navigation bg-gray-900 shadow-lg border-b border-gray-900",
        logo: "nav-logo h-8 w-8 brightness-0 invert",
        logoText: "nav-logo-text text-xl font-light text-white font-sans",
        link: "text-gray-300 hover:text-white",
        mobileToggle: "text-gray-300 hover:text-white"
      };
    }

    // Light navigation when outside hero section
    return {
      nav: "main-navigation bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200",
      logo: "nav-logo h-8 w-8",
      logoText: "nav-logo-text text-xl font-light text-gray-900 font-sans",
      link: "text-gray-700 hover:text-primary-600",
      mobileToggle: "text-gray-700 hover:text-primary-600"
    };
  };

  const navStyles = getNavStyles();

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
    <nav 
      id="main-navigation" 
      className={`${navStyles.nav} fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrollingDown ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="nav-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="nav-wrapper flex justify-between h-16">
          {/* Logo Section - Centered */}
          <div className="nav-logo-section flex items-center justify-center flex-1 md:flex-none md:justify-start">
            <Link href={`/${locale}`} className="nav-logo-link flex-shrink-0 flex items-center justify-center space-x-3">
              <Image
                src="/saubernow-logo.svg"
                alt="SauberNow"
                width={32}
                height={32}
                priority
                className={navStyles.logo}
              />
              <span className={navStyles.logoText}>
                SauberNow
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-desktop hidden md:flex items-center space-x-8">
            <Link 
              href={`/${locale}/find-cleaner`}
              className={`nav-link nav-link-find-cleaner ${navStyles.link} px-3 py-2 text-sm font-medium transition-colors`}
            >
              {t('find_cleaner')}
            </Link>
            <Link 
              href={`/${locale}/become-cleaner`}
              className={`nav-link nav-link-become-cleaner ${navStyles.link} px-3 py-2 text-sm font-medium transition-colors`}
            >
              {t('become_cleaner')}
            </Link>

            {!loading && (
              <button
                id="profile-button"
                onClick={handleProfileClick}
                className={`nav-profile-button flex items-center ${navStyles.link} p-2 rounded-lg transition-colors`}
              >
                <User size={20} className="nav-profile-icon" />
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="nav-mobile-toggle md:hidden flex items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`mobile-menu-toggle ${navStyles.mobileToggle}`}
            >
              {isMenuOpen ? <X size={24} className="mobile-menu-close" /> : <Menu size={24} className="mobile-menu-open" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div id="mobile-navigation" className="nav-mobile md:hidden">
            <div className="nav-mobile-container px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link 
                href={`/${locale}/find-cleaner`}
                className={`nav-mobile-link nav-mobile-link-find-cleaner block ${navStyles.link} px-3 py-2 text-base font-medium`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('find_cleaner')}
              </Link>
              <Link 
                href={`/${locale}/become-cleaner`}
                className={`nav-mobile-link nav-mobile-link-become-cleaner block ${navStyles.link} px-3 py-2 text-base font-medium`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('become_cleaner')}
              </Link>
              
              {!loading && (
                <button
                  onClick={() => {
                    handleProfileClick();
                    setIsMenuOpen(false);
                  }}
                  className={`nav-mobile-profile-button flex items-center w-full ${navStyles.link} px-3 py-2 text-base font-medium text-left`}
                >
                  <User size={16} className="nav-mobile-profile-icon mr-2" />
                  <span className="nav-mobile-profile-text">{user ? 'Profil' : 'Anmelden'}</span>
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