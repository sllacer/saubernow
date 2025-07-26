'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Globe } from 'lucide-react';

export default function Footer() {
  const locale = useLocale();

  const toggleLocale = () => {
    const newLocale = locale === 'de' ? 'en' : 'de';
    window.location.href = `/${newLocale}${window.location.pathname.substring(3)}`;
  };

  return (
    <footer className="footer bg-gray-900 text-white">
      <div className="footer-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="footer-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo and Language Section */}
          <div className="footer-brand lg:col-span-1">
            <div className="footer-logo flex items-center space-x-3 mb-6">
              <Image
                src="/saubernow-logo.svg"
                alt="SauberNow"
                width={40}
                height={40}
                className="footer-logo-image h-10 w-10 brightness-0 invert"
              />
              <span className="footer-logo-text text-2xl font-light">
                SauberNow
              </span>
            </div>
            
            <p className="footer-description text-gray-300 mb-6 leading-relaxed">
              Salzburgs vertrauenswürdigste Plattform für professionelle Reinigungsdienstleistungen.
            </p>

            {/* Language Selector */}
            <button
              onClick={toggleLocale}
              className="footer-language-toggle inline-flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <Globe size={18} className="footer-language-icon" />
              <span className="footer-language-text font-medium">
                {locale === 'de' ? 'English' : 'Deutsch'}
              </span>
            </button>
          </div>

          {/* Services */}
          <div className="footer-services">
            <h3 className="footer-section-title text-lg font-semibold mb-4">
              Services
            </h3>
            <ul className="footer-links space-y-3">
              <li>
                <Link 
                  href={`/${locale}/find-cleaner`}
                  className="footer-link text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Reinigungskraft finden
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/become-cleaner`}
                  className="footer-link text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Reinigungskraft werden
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/post-job`}
                  className="footer-link text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Job posten
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/pricing`}
                  className="footer-link text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Preise
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-company">
            <h3 className="footer-section-title text-lg font-semibold mb-4">
              Unternehmen
            </h3>
            <ul className="footer-links space-y-3">
              <li>
                <Link 
                  href={`/${locale}/about`}
                  className="footer-link text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Über uns
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/careers`}
                  className="footer-link text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Karriere
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/contact`}
                  className="footer-link text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/help`}
                  className="footer-link text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Hilfe & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-legal">
            <h3 className="footer-section-title text-lg font-semibold mb-4">
              Rechtliches
            </h3>
            <ul className="footer-links space-y-3">
              <li>
                <Link 
                  href={`/${locale}/privacy-policy`}
                  className="footer-link text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Datenschutzerklärung
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/terms-of-service`}
                  className="footer-link text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Nutzungsbedingungen
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/cookie-policy`}
                  className="footer-link text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Cookie-Richtlinie
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/imprint`}
                  className="footer-link text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Impressum
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom border-t border-gray-800 mt-12 pt-8">
          <div className="footer-bottom-content flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="footer-copyright text-gray-400 text-sm">
              © {new Date().getFullYear()} SauberNow. Alle Rechte vorbehalten.
            </div>
            <div className="footer-location text-gray-400 text-sm">
              Salzburg, Österreich
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}