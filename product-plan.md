# Cleaner Marketplace App - Product Plan

## Project Overview

**Product Name**: SauberNow
**Market**: Austria (hyperlocal focus: Salzburg → Innsbruck)
**Business Model**: Connection platform → Commission-based marketplace
**Target Launch**: MVP in 3-4 months

### Value Propositions

- **For Customers**: Effortless booking of verified local cleaners with transparent pricing
- **For Cleaners**: Steady work opportunities in their local area with flexible scheduling
- **For Platform**: Commission-based revenue from successful matches

---

## Verification & Badge System (MVP)

### Simple Verification Process

- **Manual Review**: Platform admin manually verifies each cleaner
- **Single Badge**: "✓ Verified" badge for approved cleaners
- **Review Timeline**: 24-48 hour verification turnaround

### Verification Criteria

- Clean application with complete profile information
- Responsive communication during verification process
- Verification call with Admin

### Future Expansion (Post-MVP)

- Performance-based badges (Top Rated, Quick Responder, etc.)
- Automated verification processes
- Tiered verification levels
- Special recognition programs

---

## User Personas

### Primary Customer: Busy Urban Professional

- Age: 25-45
- Income: €40,000+ annually
- Lives in: Salzburg city center or surrounding areas
- Pain Points: No time for cleaning, unreliable current solutions
- Behaviors: Mobile-first, values convenience and trust

### Primary Cleaner: Local Service Provider

- Age: 25-55
- Experience: Mix of professionals and part-time workers
- Geographic: Lives/works in Salzburg area
- Pain Points: Inconsistent work, finding new clients, payment delays
- Behaviors: Values steady income, flexible scheduling

---

## Core User Stories

### Epic 1: Customer Discovery & Engagement

#### Landing Page Experience

- **As a visitor**, I want to see available cleaners in my area immediately so I can gauge service availability
- **As a visitor**, I want to enter just my location to see relevant cleaners without signup friction
- **As a visitor**, I want to see cleaner profiles (photo, name, rating, lowest price rate, languages spoken) so I can assess quality and communication compatibility
  As a visitor, I want to see verification badges and status badges (like Superhost) so I can identify quality cleaners

#### Job Posting Flow (MyHammer-style)

- **As a customer**, I want to describe my cleaning needs through simple visual selections (apartment size, cleaning type, frequency)
- **As a customer**, I want to specify my location so cleaners in my area can see my request
- **As a customer**, I want to specify when I need the service without complex scheduling
- **As a customer**, I want to provide contact information only after I'm engaged with the process
- **As a customer**, I want my cleaning request to be posted immediately and visible to all cleaners in my area

#### Communication & Booking

- **As a customer**, I want to receive cleaner responses through the platform messaging system for centralized communication
- **As a customer**, I want to compare multiple cleaner proposals with their status badges and ratings
- **As a customer**, I want to message cleaners directly within the platform before making a decision
- **As a customer**, I want to confirm bookings with a simple acceptance process
- **As a customer**, I want push notifications when cleaners respond to my job postings

### Epic 2: Cleaner Business Management

#### Profile & Registration

- **As a cleaner**, I want to create an attractive profile with photos and descriptions so customers choose me
- **As a cleaner**, I want to set my service areas (including Salzburg and surrounding municipalities), rates, and availability
- **As a cleaner**, I want to upload verification documents (ID, insurance) to earn verification badges
- **As a cleaner**, I want to specify my specialties (eco-friendly, pet-friendly, deep cleaning) and languages spoken for better matching
- **As a cleaner**, I want to submit documents for manual verification to earn the verified badge and increase customer trust

#### Job Discovery & Application

- **As a cleaner**, I want to see new job postings in my service area immediately via in-app notifications
- **As a cleaner**, I want to browse available jobs with clear details about location, customer requirements, and distance from me
- **As a cleaner**, I want to respond to job postings with my availability, pricing, and a personalized message
- **As a cleaner**, I want to use the in-platform messaging system to communicate with customers efficiently
- **As a cleaner**, I want my status badges to be visible when I apply for jobs to increase my chances

#### Schedule & Business Management

- **As a cleaner**, I want a calendar view of my confirmed bookings so I can manage my time
- **As a cleaner**, I want to track my earnings and job history for business planning
- **As a cleaner**, I want to manage my availability and block off time when needed
- **As a cleaner**, I want to reschedule or cancel bookings with proper notice

### Epic 3: Trust & Safety System

#### Manual Verification System (MVP)

- **As a customer**, I want to see a "verified" badge on cleaner profiles so I trust they've been reviewed by the platform
- **As a cleaner**, I want a simple verification process where I submit required documents for manual review
- **As a cleaner**, I want to know my verification status and any missing requirements clearly
- **As a cleaner**, I want to see my progress toward the next badge level with clear metrics and goals
- **As a platform admin**, I want to verify cleaner documents and award verification badges efficiently
- **As a platform admin**, I want to manually review cleaner documents and approve/reject applications
- **As a platform admin**, I want a simple workflow to track pending verifications and communicate with cleaners

#### Reviews & Ratings

- **As a customer**, I want to rate and review cleaners after service completion
- **As a customer**, I want to see status badges (Top Rated, Pro Cleaner, Rising Star) to identify exceptional cleaners
- **As a cleaner**, I want to rate customers to build a mutual trust system
- **As anyone**, I want to see authentic reviews with details about punctuality, quality, and communication
- **As anyone**, I want to report problematic behavior with easy-to-use tools

### Epic 4: Platform Management (Admin)

#### User Management

- **As an admin**, I want to monitor customer and cleaner registrations and activity
- **As an admin**, I want to handle disputes between customers and cleaners
- **As an admin**, I want to manage the verification process for new cleaners
- **As an admin**, I want to track platform metrics (matches, success rates, user growth)

#### Business Intelligence

- **As an admin**, I want to see geographic coverage and demand patterns
- **As an admin**, I want to monitor pricing trends and competition
- **As an admin**, I want to track customer satisfaction and retention
- **As an admin**, I want to identify top-performing cleaners for potential partnerships

---

## Technical Requirements

### Performance Requirements

- Page load times < 3 seconds on mobile
- Real-time availability updates
- Offline capability for viewing bookings
- Support for 1000+ concurrent users

### Security & Compliance

- GDPR compliant data handling
- Secure file upload for verification documents
- Encrypted personal data storage
- Austrian privacy law compliance

### Localization & Multi-language Support

- German language interface (Austrian German)
- English language support for expat market
- European date/time formats
- Euro currency display with "from €X/hour" pricing format
- Austrian address format and postal codes (including Salzburg and surrounding municipalities)
- Support for Austrian phone number formats
- Language preferences display for cleaners (German, English, other languages)

### Mobile-First Design

- Progressive Web App (PWA) capabilities
- Touch-optimized interface
- Location services integration
- Push notifications for job matches

---

## MVP Feature Scope

### Phase 1: Core Connection Platform (Months 1-3)

**Customer Features:**

- Location-based cleaner discovery
- Job posting flow
- Basic messaging system
- Email notifications

**Cleaner Features:**

- Profile creation with language preferences
- Document upload for manual verification
- Job browsing and application
- Basic calendar view
- Customer communication through platform messaging

**Admin Features:**

- User management dashboard
- Basic analytics
- Manual verification process

### Phase 2: Enhanced Marketplace (Months 4-6)

**Additional Features:**

- Advanced filtering and search
- In-app messaging with file sharing
- Rating and review system
- Automated matching suggestions
- Payment integration planning

### Phase 3: Business Optimization (Months 7-12)

**Revenue Features:**

- Commission structure implementation
- Premium cleaner features
- Advanced analytics
- Mobile app development

---

## Success Metrics

### MVP Success Criteria

- 50+ verified cleaners in Salzburg area
- 200+ customer registrations
- 25+ successful job matches per week
- 80%+ customer satisfaction rate
- 4.0+ average cleaner rating

### Growth Targets (6 months)

- 150+ active cleaners
- 1000+ registered customers
- 100+ bookings per week
- Expand to 2 additional Austrian cities

---

## Risk Analysis

### Technical Risks

- Scaling challenges with location-based matching
- Real-time availability synchronization
- GDPR compliance complexity

### Business Risks

- Chicken-and-egg problem (customers vs cleaners)
- Competition from established players
- Quality control without interviews
- Seasonal demand fluctuations

### Mitigation Strategies

- Start with manual processes, automate gradually
- Focus on quality over quantity in early stages
- Build strong community and trust systems
- Develop seasonal marketing strategies
