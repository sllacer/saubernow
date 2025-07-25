'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin } from 'lucide-react';

interface DistanceSelectorProps {
  onDistanceChange: (distance: number) => void;
  initialDistance?: number;
  className?: string;
}

const DISTANCE_OPTIONS = [
  { value: 5, label: '5 km' },
  { value: 10, label: '10 km' },
  { value: 15, label: '15 km' },
  { value: 25, label: '25 km' },
  { value: 50, label: '50 km' }
];

export default function DistanceSelector({
  onDistanceChange,
  initialDistance = 15,
  className = ''
}: DistanceSelectorProps) {
  const t = useTranslations('search');
  const [selectedDistance, setSelectedDistance] = useState(initialDistance);

  const handleDistanceChange = (distance: number) => {
    setSelectedDistance(distance);
    onDistanceChange(distance);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <select
          value={selectedDistance}
          onChange={(e) => handleDistanceChange(parseInt(e.target.value))}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 appearance-none bg-white cursor-pointer"
        >
          {DISTANCE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {t('distance-option', {
                distance: option.label,
                defaultValue: `${option.label} Umkreis`
              })}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        {t('distance-hint', {
          defaultValue: 'Suchradius für Reinigungskräfte'
        })}
      </div>
    </div>
  );
}