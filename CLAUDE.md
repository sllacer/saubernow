# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SauberNow** is a cleaner marketplace platform targeting Austria (starting with Salzburg → Innsbruck expansion). The platform connects customers with verified local cleaning professionals through a commission-based marketplace model.

**Target Launch**: MVP in 3-4 months
**Business Model**: Connection platform evolving to commission-based marketplace
**Geographic Focus**: Austrian market with hyperlocal approach (Salzburg first)

## Key Project Context

This is currently in the planning/architecture phase with two main planning documents:
- `product-plan.md` - Comprehensive product requirements, user stories, and MVP scope
- `technical-architecture.md` - Technical specifications (currently minimal)

### Core Value Propositions
- **Customers**: Effortless booking of verified local cleaners with transparent pricing
- **Cleaners**: Steady work opportunities with flexible scheduling in their local area
- **Platform**: Commission-based revenue from successful matches

### Essential Features (MVP Phase 1)
- Location-based cleaner discovery
- Job posting flow (MyHammer-style)
- Manual cleaner verification system with "✓ Verified" badges
- Platform messaging system
- Basic admin dashboard for verification management

## Technical Requirements

### Localization Requirements
- **Primary Language**: German (Austrian German)
- **Secondary Language**: English (expat market)
- **Currency**: Euro display with "from €X/hour" format
- **Location Support**: Austrian address formats, postal codes, phone numbers
- **Date/Time**: European formats
- **Language Preferences**: Display for cleaners (German, English, other languages)

### Performance & Compliance
- Page load times < 3 seconds on mobile
- GDPR compliant data handling
- Austrian privacy law compliance
- Support for 1000+ concurrent users
- Mobile-first Progressive Web App (PWA)

### Core User Flows
1. **Customer Flow**: Location entry → Cleaner discovery → Job posting → Communication → Booking
2. **Cleaner Flow**: Profile creation → Document upload → Verification → Job browsing → Application → Communication
3. **Admin Flow**: User management → Manual verification → Analytics

## Development Approach

### MVP Success Criteria
- 50+ verified cleaners in Salzburg area
- 200+ customer registrations  
- 25+ successful job matches per week
- 80%+ customer satisfaction rate
- 4.0+ average cleaner rating

### Phase Development
- **Phase 1 (Months 1-3)**: Core connection platform
- **Phase 2 (Months 4-6)**: Enhanced marketplace features
- **Phase 3 (Months 7-12)**: Business optimization and revenue features

### Key Personas
- **Primary Customer**: Busy urban professional (25-45, €40k+ income, Salzburg area)
- **Primary Cleaner**: Local service provider (25-55, mix of professional/part-time)

## Important Considerations

- Start with manual processes, automate gradually
- Focus on trust and verification systems (manual admin review initially)
- Mobile-first design approach
- Real-time availability and location-based matching
- Multi-language support for Austrian market
- Strong emphasis on local community building in Salzburg area