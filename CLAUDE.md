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

## Development Workflow

### Git Commit Guidelines

- **Always commit changes properly** following professional development practices
- Run linting and type checking before committing (e.g., `npm run lint`, `npm run typecheck`)
- Use conventional commit message format:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `refactor:` for code refactoring
  - `docs:` for documentation changes
  - `style:` for formatting changes
  - `test:` for test additions/modifications
- Include meaningful commit messages that explain the "why" not just the "what"
- Stage relevant files with `git add` before committing
- Verify commit success with `git status` after committing
- **IMPORTANT**: Proactively propose commits when logical groups of related changes are completed

### Git Branch Workflow

- **ALWAYS pull latest changes** before creating any new branch: `git pull origin main`
- Create new branches from main: `git checkout main && git pull origin main && git checkout -b feature/branch-name`
- Use descriptive branch names following convention: `feature/`, `fix/`, `refactor/`, `docs/`
- Keep feature branches up to date by regularly pulling main: `git pull origin main`
- Never work on outdated code - always ensure you have the latest changes before starting work
- Delete branches after merging to keep repository clean

### Code Quality Standards

- Ensure all tests pass before committing
- Follow existing code conventions and patterns
- Maintain consistent formatting and style
- Add appropriate error handling and validation

## Important Considerations

- Start with manual processes, automate gradually
- Focus on trust and verification systems (manual admin review initially)
- Mobile-first design approach
- Real-time availability and location-based matching
- Multi-language support for Austrian market
- Strong emphasis on local community building in Salzburg area
