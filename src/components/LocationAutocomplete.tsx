'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin } from 'lucide-react';
import { austrianLocations } from '@/lib/austrianLocations';
import { searchLocations, type AustrianLocation } from '@/lib/locationUtils';

interface LocationAutocompleteProps {
  onLocationSelect: (location: AustrianLocation) => void;
  placeholder?: string;
  initialValue?: string;
  className?: string;
}

export default function LocationAutocomplete({
  onLocationSelect,
  placeholder,
  initialValue = '',
  className = ''
}: LocationAutocompleteProps) {
  const t = useTranslations('search');
  const [query, setQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<AustrianLocation[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (query.length >= 2) {
      const results = searchLocations(query, austrianLocations);
      setSuggestions(results);
      setIsOpen(results.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (location: AustrianLocation) => {
    setQuery(location.displayName);
    setIsOpen(false);
    setSelectedIndex(-1);
    onLocationSelect(location);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  useEffect(() => {
    if (selectedIndex >= 0 && suggestionRefs.current[selectedIndex]) {
      suggestionRefs.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [selectedIndex]);

  const handleFocus = () => {
    if (query.length >= 2) {
      setIsOpen(true);
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Only close if clicking outside the entire component
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!relatedTarget || !e.currentTarget.contains(relatedTarget)) {
      // Delay closing to allow for suggestion clicks
      setTimeout(() => {
        setIsOpen(false);
        setSelectedIndex(-1);
      }, 100);
    }
  };

  const defaultPlaceholder = t('location-placeholder', {
    defaultValue: 'Ort oder PLZ eingeben...'
  });

  return (
    <div className={`relative ${className}`} onBlur={handleBlur}>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder={placeholder || defaultPlaceholder}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          autoComplete="off"
        />
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <ul className="py-1">
            {suggestions.map((location, index) => (
              <li
                key={`${location.postalCode}-${location.city}-${location.district || ''}`}
                ref={el => { suggestionRefs.current[index] = el; }}
                onClick={() => handleSuggestionClick(location)}
                className={`px-4 py-3 cursor-pointer transition-colors duration-150 hover:bg-gray-50 ${
                  index === selectedIndex ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {location.displayName}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {location.postalCode} • {location.state}
                    </div>
                  </div>
                  <MapPin className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
                </div>
              </li>
            ))}
          </ul>
          
          {suggestions.length === 12 && (
            <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 border-t">
              {t('more-results-hint', {
                defaultValue: 'Weiter tippen für präzisere Ergebnisse...'
              })}
            </div>
          )}
        </div>
      )}

      {query.length >= 2 && suggestions.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="px-4 py-3 text-sm text-gray-500 text-center">
            {t('no-locations-found', {
              defaultValue: 'Keine Orte gefunden für "{query}"'
            }).replace('{query}', query)}
          </div>
        </div>
      )}
    </div>
  );
}