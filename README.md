# SauberNow - Cleaner Marketplace Platform

SauberNow is a cleaner marketplace platform targeting Austria, starting with Salzburg. The platform connects customers with verified local cleaning professionals through a commission-based marketplace model.

## 🚀 Recent Major Updates (January 2025)

### Enhanced Job Posting Flow
- **5-Step Process**: Redesigned from 4-step to 5-step flow with visual progress indicator
- **Equipment Selection**: New step for selecting cleaning equipment and special services
- **Visual Enhancement**: Icons, improved layouts, and professional UI design
- **Seamless Authentication**: Integrated login/registration without losing form data

### Advanced Authentication System
- **Dual-Purpose Modal**: Single modal for both login and registration
- **Phone Validation**: Austrian phone number format validation
- **Form State Management**: Preserves job posting data during authentication
- **Success Callbacks**: Seamless integration with other application flows

### Universal Navigation Behavior
- **Scroll-Based Navigation**: Hide/show navigation on scroll across all pages
- **Dynamic Styling**: Different styles for homepage vs. other pages
- **Smooth Transitions**: 300ms animations for better user experience
- **Mobile Optimized**: Touch-friendly navigation with responsive behavior

### Complete Internationalization
- **150+ Translation Keys**: Comprehensive German and English support
- **No Hardcoded Strings**: All user-facing text uses translation system
- **Professional Quality**: Contextually appropriate translations for Austrian market
- **Easy Maintenance**: Centralized translation management

### Homepage Redesign
- **Dark Hero Section**: Professional dark theme with glassmorphism effects
- **Improved Layout**: Better visual hierarchy and component organization
- **Enhanced CTAs**: More prominent call-to-action buttons
- **Trust Elements**: Verification badges and social proof

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with custom flows
- **Internationalization**: next-intl with route-based localization
- **Icons**: Lucide React
- **Phone Input**: react-phone-number-input for Austrian numbers
- **Deployment**: Vercel (ready for production)

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sllacer/saubernow.git
   cd saubernow
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   ```bash
   cp .env.example .env.local
   # Add your Supabase keys and other environment variables
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality
- `npm run typecheck` - Run TypeScript type checking

## 📁 Project Structure

```
src/
├── app/[locale]/              # Next.js app router with internationalization
│   ├── page.tsx              # Homepage with hero section and CTAs
│   ├── post-job/             # Enhanced 5-step job posting flow
│   ├── find-cleaner/         # Cleaner discovery and filtering
│   ├── become-cleaner/       # Cleaner registration and verification
│   ├── profile/              # User profile management
│   └── signup/               # Customer registration
├── components/               # Reusable React components
│   ├── Navigation.tsx        # Universal scroll navigation
│   ├── HeroSection.tsx       # Homepage hero with dark theme
│   ├── LoginModal.tsx        # Dual login/registration modal
│   ├── ProcessCarousel.tsx   # How-it-works carousel
│   └── CleanerCard.tsx       # Cleaner profile display
├── contexts/                 # React context providers
│   └── AuthContext.tsx       # Authentication state management
├── locales/                  # Internationalization files
│   ├── de.json              # German translations (150+ keys)
│   └── en.json              # English translations (150+ keys)
├── lib/                      # Utilities and configurations
│   ├── supabase.ts          # Database client configuration
│   └── austrianLocations.ts # Austrian location data
└── types/                    # TypeScript type definitions
```

## 🎯 Key Features

### For Customers
- **Location-Based Discovery**: Find cleaners in Salzburg area
- **Advanced Job Posting**: 5-step flow with equipment selection
- **Transparent Pricing**: Clear hourly rates and cost estimates
- **Verification Trust**: Only verified cleaners with trust badges
- **Seamless Booking**: In-app messaging and booking system

### For Cleaners
- **Professional Profiles**: Showcase skills, rates, and availability
- **Job Browsing**: Find suitable cleaning jobs in service area
- **Verification System**: Manual admin verification for trust
- **Flexible Scheduling**: Set availability and preferred job types
- **Secure Platform**: Safe communication and payment processing

### For Admins
- **User Management**: Approve and verify cleaner applications
- **Platform Monitoring**: Track activity and success metrics
- **Content Management**: Update translations and site content

## 🔄 User Flows

### Enhanced Customer Flow
1. **Discovery**: Enter location on homepage to find cleaners
2. **Job Posting**: Use 5-step flow (Room Size → Equipment → Location → Budget → Summary)
3. **Authentication**: Seamless login/registration without losing progress
4. **Cleaner Selection**: Review applications from verified cleaners
5. **Communication**: Message and book through platform

### Cleaner Registration Flow
1. **Application**: Submit personal and professional information
2. **Verification**: Upload required documents for admin review
3. **Approval**: Wait for manual verification (24-48 hours)
4. **Profile Setup**: Complete profile with rates and services
5. **Job Browsing**: Start responding to customer job postings

## 🌍 Internationalization

The application provides complete bilingual support:

### German (Primary - Austrian German)
- Default language for Austrian market
- Professional cleaning industry terminology
- Austrian address and phone formats
- Euro currency formatting
- European date/time formats

### English (Secondary - Expat Market)
- Complete feature parity with German
- Professional service industry language
- International user-friendly terminology
- Consistent UI translations

### Translation Management
- **Centralized**: All text in `/src/locales/` JSON files
- **Type-Safe**: TypeScript integration for translation keys
- **Easy Updates**: Add new languages by creating new locale files
- **No Hardcoding**: All user-facing text uses translation system

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones for trust and professionalism
- **Secondary**: Green accents for verification and success
- **Neutral**: Gray scale for text and backgrounds
- **Semantic**: Red for errors, green for success, yellow for warnings

### Typography
- **Headings**: Bold, clear hierarchy for easy scanning
- **Body**: Readable fonts optimized for Austrian German text
- **Buttons**: Prominent CTAs with consistent styling
- **Mobile**: Optimized for small screens and touch interaction

### Components
- **Cards**: Clean, shadow-based design for content organization
- **Modals**: Overlay system for authentication and forms
- **Navigation**: Scroll-based behavior with smooth transitions
- **Forms**: Multi-step layouts with visual progress indicators

## 🔧 Development Workflow

### Working with Claude Code
This project has been developed with extensive Claude Code assistance. Key practices:

1. **Translation Management**: Use Claude to maintain translation consistency
2. **Component Enhancement**: Leverage Claude for UI/UX improvements
3. **Code Quality**: Regular refactoring with Claude assistance
4. **Documentation**: Keep README updated with Claude help

### Git Workflow
```bash
# Always pull latest changes before starting work
git pull origin main

# Create feature branches for new work
git checkout -b feature/your-feature-name

# Make atomic commits with descriptive messages
git commit -m "feat: add new feature description"

# Push changes and create pull requests
git push origin feature/your-feature-name
```

### Code Quality Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Configured for React and Next.js best practices
- **Prettier**: Automatic code formatting
- **Translation Keys**: Always use `t()` function, never hardcode text
- **Mobile-First**: Design for mobile, enhance for desktop

## 📱 Mobile & PWA

### Progressive Web App Features
- **App Manifest**: Installable on mobile devices
- **Service Worker**: Offline capability for core features
- **Responsive Design**: Mobile-first approach
- **Touch Optimization**: Gesture-friendly interface
- **Performance**: Optimized for mobile networks

### Mobile-Specific Features
- **Location Services**: GPS integration for local cleaner discovery
- **Phone Integration**: Click-to-call functionality
- **Camera Access**: Photo upload for verification documents
- **Push Notifications**: Job alerts and booking reminders

## 🚀 Deployment

### Production Environment
- **Platform**: Vercel (recommended)
- **Database**: Supabase hosted PostgreSQL
- **CDN**: Vercel Edge Network for global performance
- **SSL**: Automatic HTTPS certificates
- **Domain**: Custom domain ready

### Environment Variables
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Build Process
```bash
# Production build
npm run build

# Type checking
npm run typecheck

# Linting
npm run lint

# Deploy to Vercel
vercel --prod
```

## 📊 MVP Success Criteria

### User Acquisition Targets
- **50+ verified cleaners** in Salzburg area
- **200+ customer registrations**
- **25+ successful job matches** per week
- **80%+ customer satisfaction** rate
- **4.0+ average cleaner rating**

### Technical Performance
- **Page load times < 3 seconds** on mobile
- **GDPR compliant** data handling
- **1000+ concurrent users** support
- **99% uptime** during business hours

## 🔮 Future Enhancements

### Phase 2 Features (Months 4-6)
- **Real-time Messaging**: WebSocket-based chat system
- **Payment Integration**: Stripe for secure transactions
- **Advanced Search**: AI-powered cleaner matching
- **Rating System**: Comprehensive review and rating platform
- **Performance Badges**: Gamification for top cleaners

### Phase 3 Features (Months 7-12)
- **Mobile Apps**: Native iOS and Android applications
- **Geographic Expansion**: Innsbruck and other Austrian cities
- **API Platform**: Third-party integrations
- **Advanced Analytics**: Business intelligence dashboard
- **White-label Solution**: Franchise opportunities

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** with proper TypeScript types
4. **Add translations** for any new user-facing text
5. **Test thoroughly** on mobile and desktop
6. **Commit your changes**: `git commit -m 'feat: add amazing feature'`
7. **Push to the branch**: `git push origin feature/amazing-feature`
8. **Open a Pull Request**

### Development Guidelines
- **Always use translation keys** - never hardcode text
- **Mobile-first design** - test on mobile devices
- **TypeScript strict mode** - no `any` types
- **Accessibility** - follow WCAG guidelines
- **Performance** - optimize for Core Web Vitals

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For questions about the platform or technical issues:
- **Email**: support@saubernow.at
- **GitHub Issues**: [Report bugs or request features](https://github.com/sllacer/saubernow/issues)
- **Documentation**: Check the `/docs` folder for detailed guides

---

Built with ❤️ for the Austrian cleaning service market