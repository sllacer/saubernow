# SauberNow - Cleaner Marketplace Platform

SauberNow is a cleaner marketplace platform targeting Austria, starting with Salzburg. The platform connects customers with verified local cleaning professionals through a commission-based marketplace model.

## Features

- **Location-based cleaner discovery** - Find cleaners in your area
- **Job posting flow** - MyHammer-style job posting for customers
- **Manual verification system** - Admin-verified cleaners with trust badges
- **Multi-language support** - German (primary) and English
- **Mobile-first design** - Progressive Web App (PWA) ready
- **Austrian localization** - Euro pricing, Austrian addresses, local phone formats

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Mobile**: PWA with manifest

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/saubernow.git
   cd saubernow
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── app/[locale]/              # Next.js 13+ app router with internationalization
│   ├── page.tsx              # Homepage with cleaner discovery
│   ├── post-job/             # Customer job posting flow
│   └── become-cleaner/       # Cleaner registration flow
├── components/               # Reusable React components
│   ├── Navigation.tsx        # Main navigation with language switching
│   └── CleanerCard.tsx       # Cleaner profile display component
├── locales/                  # Internationalization files
│   ├── de.json              # German translations (primary)
│   └── en.json              # English translations
├── types/                    # TypeScript type definitions
└── lib/                      # Utilities and mock data
```

## Key User Flows

### Customer Flow
1. Enter location on homepage
2. Browse available cleaners with ratings and pricing
3. Post job with apartment size, cleaning type, frequency
4. Receive responses from interested cleaners
5. Communicate and book through platform

### Cleaner Flow  
1. Register with personal info and work details
2. Upload verification documents (ID, insurance)
3. Wait for manual admin verification (24-48 hours)
4. Browse and respond to job postings in service area
5. Communicate with customers and manage bookings

### Admin Flow
1. Review cleaner applications and documents
2. Manually verify and approve cleaners
3. Monitor platform activity and user management

## Localization

The application supports German (primary) and English with:
- Austrian German as default language
- Euro currency formatting (€X/hour)
- Austrian address and phone number formats
- European date/time formats
- Language switching in navigation

## Mobile & PWA

- Mobile-first responsive design
- PWA manifest for app-like experience
- Touch-optimized interface
- Offline capability for viewing bookings
- Location services integration

## Development Notes

- All components use TypeScript for type safety
- Tailwind CSS for consistent styling with custom design system
- next-intl for internationalization routing (/de/, /en/)
- Mock data currently used - replace with real API integration
- Manual verification process designed for MVP phase

## MVP Success Criteria

- 50+ verified cleaners in Salzburg area  
- 200+ customer registrations
- 25+ successful job matches per week
- 80%+ customer satisfaction rate
- 4.0+ average cleaner rating

## Future Enhancements

- Real-time messaging system
- Payment integration
- Advanced filtering and search
- Rating and review system  
- Performance-based badges
- Mobile app development
- Expansion to additional Austrian cities