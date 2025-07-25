'use client';

import { Star, CheckCircle, MapPin, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Cleaner } from '@/types';

interface CleanerCardProps {
  cleaner: Cleaner;
  onContact?: () => void;
}

export default function CleanerCard({ cleaner, onContact }: CleanerCardProps) {
  const t = useTranslations();

  return (
    <div 
      id={`cleaner-card-${cleaner.id}`}
      className="cleaner-card bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <div className="cleaner-card-content flex items-start space-x-4">
        {/* Profile Photo */}
        <div className="cleaner-photo-section flex-shrink-0">
          {cleaner.photo ? (
            <img
              src={cleaner.photo}
              alt={cleaner.name}
              className="cleaner-photo w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="cleaner-photo-placeholder w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="cleaner-photo-initial text-gray-500 text-xl font-semibold">
                {cleaner.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Cleaner Info */}
        <div className="cleaner-info flex-1 min-w-0">
          {/* Name and Verification */}
          <div className="cleaner-header flex items-center space-x-2 mb-2">
            <h3 className="cleaner-name text-lg font-semibold text-gray-900 truncate">
              {cleaner.name}
            </h3>
            {cleaner.verified && (
              <div className="cleaner-verified-badge flex items-center space-x-1 bg-success-50 text-success-700 px-2 py-1 rounded-full text-xs">
                <CheckCircle size={14} className="verified-icon" />
                <span className="verified-text">{t('cleaner.verified_badge')}</span>
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="cleaner-rating flex items-center space-x-2 mb-2">
            <div className="rating-stars flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`rating-star ${i < Math.floor(cleaner.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="rating-text text-sm text-gray-600">
              {cleaner.rating.toFixed(1)} ({cleaner.reviewCount} {cleaner.reviewCount === 1 ? 'Bewertung' : 'Bewertungen'})
            </span>
          </div>

          {/* Location */}
          <div className="cleaner-location flex items-center space-x-1 text-sm text-gray-600 mb-2">
            <MapPin size={14} className="location-icon" />
            <span className="location-text">{cleaner.location}</span>
            {cleaner.distance && (
              <span className="location-distance">• {cleaner.distance.toFixed(1)} km</span>
            )}
          </div>

          {/* Price */}
          <div className="cleaner-price text-lg font-semibold text-primary-600 mb-3">
            {t('home.from_price', { price: cleaner.hourlyRate })}
          </div>

          {/* Languages */}
          <div className="cleaner-languages mb-3">
            <span className="languages-label text-sm font-medium text-gray-700">{t('cleaner.languages')}: </span>
            <span className="languages-list text-sm text-gray-600">
              {cleaner.languages.join(', ')}
            </span>
          </div>

          {/* Specialties */}
          {cleaner.specialties.length > 0 && (
            <div className="cleaner-specialties mb-4">
              <span className="specialties-label text-sm font-medium text-gray-700 block mb-1">
                {t('cleaner.specialties')}:
              </span>
              <div className="specialties-list flex flex-wrap gap-1">
                {cleaner.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className={`specialty-tag specialty-tag-${specialty.replace(/[^a-z]/gi, '-').toLowerCase()} bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full`}
                  >
                    {t(`cleaner.${specialty.replace(/[^a-z]/gi, '_').toLowerCase()}`)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <p className="cleaner-description text-sm text-gray-600 mb-4 line-clamp-2">
            {cleaner.description}
          </p>

          {/* Contact Button */}
          <button
            onClick={onContact}
            className="cleaner-contact-button flex items-center space-x-2 btn-primary w-full sm:w-auto"
          >
            <MessageCircle size={16} className="contact-icon" />
            <span className="contact-text">{t('cleaner.contact')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}