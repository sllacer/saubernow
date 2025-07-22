import { Cleaner } from '@/types';

export const mockCleaners: Cleaner[] = [
  {
    id: '1',
    name: 'Maria Schmidt',
    rating: 4.8,
    reviewCount: 24,
    hourlyRate: 25,
    languages: ['Deutsch', 'English'],
    specialties: ['eco_friendly', 'deep_cleaning'],
    verified: true,
    location: 'Salzburg Altstadt',
    distance: 1.2,
    description: 'Erfahrene Reinigungskraft mit 8 Jahren Erfahrung. Spezialisiert auf umweltfreundliche Reinigungsmittel und Tiefenreinigung.',
    email: 'maria.schmidt@example.com',
    phone: '+43 664 123 4567'
  },
  {
    id: '2',
    name: 'Anna Müller',
    rating: 4.9,
    reviewCount: 18,
    hourlyRate: 22,
    languages: ['Deutsch'],
    specialties: ['pet_friendly', 'regular'],
    verified: true,
    location: 'Salzburg Süd',
    distance: 2.5,
    description: 'Zuverlässige und gründliche Reinigung. Sehr erfahren mit Haushalten mit Haustieren.',
    email: 'anna.mueller@example.com',
    phone: '+43 664 234 5678'
  },
  {
    id: '3',
    name: 'Petra Wagner',
    rating: 4.7,
    reviewCount: 31,
    hourlyRate: 28,
    languages: ['Deutsch', 'English', 'Italiano'],
    specialties: ['deep_cleaning', 'move_cleaning'],
    verified: true,
    location: 'Salzburg Nord',
    distance: 3.1,
    description: 'Professionelle Reinigungskraft mit Fokus auf Tiefenreinigung und Umzugsreinigung.',
    email: 'petra.wagner@example.com',
    phone: '+43 664 345 6789'
  },
  {
    id: '4',
    name: 'Sofia Rossi',
    rating: 4.6,
    reviewCount: 12,
    hourlyRate: 24,
    languages: ['English', 'Italiano'],
    specialties: ['eco_friendly'],
    verified: false,
    location: 'Salzburg West',
    distance: 4.2,
    description: 'Italian expat with 5 years of cleaning experience. Specializes in eco-friendly cleaning products.',
    email: 'sofia.rossi@example.com',
    phone: '+43 664 456 7890'
  },
  {
    id: '5',
    name: 'Elena Novak',
    rating: 4.9,
    reviewCount: 27,
    hourlyRate: 26,
    languages: ['English', 'Deutsch', 'Hrvatski'],
    specialties: ['regular', 'pet_friendly'],
    verified: true,
    location: 'Salzburg Ost',
    distance: 2.8,
    description: 'Experienced cleaner from Croatia. Very reliable and detail-oriented with excellent references.',
    email: 'elena.novak@example.com',
    phone: '+43 664 567 8901'
  }
];