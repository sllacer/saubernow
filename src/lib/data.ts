import { Cleaner } from '@/types';

export interface Testimonial {
  id: string;
  name: string;
  photo?: string;
  rating: number;
  quote: string;
  location: string;
  serviceType?: string;
}

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Weber',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b8c5?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    quote: 'Maria hat meine Wohnung perfekt gereinigt. Sehr zuverlässig und freundlich!',
    location: 'Salzburg Altstadt',
    serviceType: 'Wohnungsreinigung'
  },
  {
    id: '2',
    name: 'Thomas Huber',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    quote: 'Schnelle Buchung, faire Preise und excellente Arbeit. Kann SauberNow nur empfehlen!',
    location: 'Salzburg Süd',
    serviceType: 'Büroreinigung'
  },
  {
    id: '3',
    name: 'Anna Kirchner',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    quote: 'Endlich eine Plattform mit verifizierten Reinigungskräften. Fühle mich sicher!',
    location: 'Salzburg Nord',
    serviceType: 'Tiefenreinigung'
  },
  {
    id: '4',
    name: 'Michael Steiner',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 4,
    quote: 'Einfache Buchung über die App. Die Reinigungskraft war pünktlich und gründlich.',
    location: 'Salzburg West',
    serviceType: 'Regelmäßige Reinigung'
  },
  {
    id: '5',
    name: 'Lisa Brunner',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    quote: 'Petra hat unsere Umzugsreinigung perfekt gemacht. Sehr professionell!',
    location: 'Salzburg Ost',
    serviceType: 'Umzugsreinigung'
  },
  {
    id: '6',
    name: 'David Klein',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    quote: 'Transparente Preise und keine versteckten Kosten. Genau was ich gesucht habe.',
    location: 'Salzburg Zentrum',
    serviceType: 'Fensterreinigung'
  },
  {
    id: '7',
    name: 'Julia Mayer',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    rating: 4,
    quote: 'Super Service! Elena ist sehr aufmerksam und arbeitet sehr sauber.',
    location: 'Salzburg Süd',
    serviceType: 'Haustierffreundliche Reinigung'
  }
];

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