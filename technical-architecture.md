# Saubernow - Technical Architecture Document

## 1. Executive Summary

**Product**: Hyperlocal cleaner marketplace for Austria (Salzburg → Innsbruck expansion)
**Architecture**: Cost-optimized monolithic design with PWA capabilities
**Target**: MVP launch with 50-200 cleaners, 1000+ concurrent users
**Budget**: €0-15/month for MVP phase

## 2. Refined Technology Stack

### 2.1 Frontend Architecture

```
┌─────────────────────────────────────────────────────────┐
│                Next.js 14+ App Router                  │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐ │
│ │  Customer   │ │   Cleaner   │ │   Admin (Simple)    │ │
│ │   Portal    │ │   Portal    │ │    Verification     │ │
│ └─────────────┘ └─────────────┘ └─────────────────────┘ │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │              PWA Layer                              │ │
│ │ • Service Worker  • Offline Cache  • Push Notifs   │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

**Core Technologies:**

- **Next.js 14+** with App Router (SSR + CSR hybrid)
- **TypeScript** for type safety
- **Tailwind CSS + Shadcn/ui** (Revolut-inspired design system)
- **PWA capabilities** with service worker
- **React Context + useReducer** for state management

### 2.2 Backend Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  API Layer (Next.js)                   │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐ │
│ │    Auth     │ │    Jobs     │ │    Verification     │ │
│ │  /api/auth  │ │  /api/jobs  │ │   /api/verify       │ │
│ └─────────────┘ └─────────────┘ └─────────────────────┘ │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐ │
│ │   Users     │ │   Search    │ │      Upload         │ │
│ │ /api/users  │ │ /api/search │ │   /api/upload       │ │
│ └─────────────┘ └─────────────┘ └─────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │   Supabase DB     │
                    │   PostgreSQL      │
                    │  + File Storage   │
                    └───────────────────┘
```

**Core Technologies:**

- **Node.js** (built into Next.js)
- **Prisma ORM** with PostgreSQL
- **NextAuth.js** for authentication
- **Supabase** for database + file storage

### 2.3 Infrastructure (Ultra-Low Cost)

```
┌─────────────────────────────────────────────────────────┐
│                    Vercel Platform                     │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐ │
│ │   Hosting   │ │     CDN     │ │    Edge Caching     │ │
│ │   (Free)    │ │   (Built-in)│ │     (Built-in)      │ │
│ └─────────────┘ └─────────────┘ └─────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │   Supabase        │
                    │ • PostgreSQL DB   │
                    │ • File Storage    │
                    │ • Real-time       │
                    │  (500MB Free)     │
                    └───────────────────┘
```

## 3. MVP Feature Decisions & Rationale

### ✅ **Confirmed MVP Features**

#### 3.1 Real-time Features - **SIMPLIFIED**

**Decision**: Email notifications + periodic page refresh
**Rationale**:

- Saves WebSocket complexity
- Email notifications work for job alerts
- Manual refresh acceptable for MVP user base
- **Implementation**: Email via Resend (free tier) + polling every 30 seconds on active pages

#### 3.2 Search - **PostgreSQL Full-Text**

**Decision**: PostgreSQL built-in search
**Rationale**:

- 50-200 cleaners easily handled by PostgreSQL
- Full-text search + GIN indexes sufficient
- No separate infrastructure needed
- **Implementation**: `to_tsvector()` with German language support

#### 3.3 File Upload - **Profile Only**

**Decision**: Profile photo only for MVP
**Rationale**:

- Documents verified during admin call instead of upload
- Reduces storage costs and complexity
- ID verification handled verbally/visually during call
- Insurance proof can be requested verbally
- **Implementation**: Single profile image upload via Supabase Storage

#### 3.4 Language Support - **German Primary**

**Decision**: German-only for MVP, English in Phase 2
**Rationale**:

- Austrian market primarily German-speaking
- Faster development
- i18n library ready for future expansion
- **Implementation**: Austrian German with proper formatting

#### 3.5 Geolocation - **City-Level**

**Decision**: Municipality selection instead of GPS
**Rationale**:

- Simpler than radius calculations
- Privacy-friendly
- Matches Austrian administrative divisions
- **Implementation**: Dropdown with Salzburg municipalities

#### 3.6 Admin Dashboard - **Manual Verification Workflow**

**Decision**: Call-based verification with simple admin interface
**Rationale**:

- Human verification builds trust faster than automated systems
- Personal touch differentiates from competitors
- Quality control through direct interaction
- Better fraud detection through voice/video calls
- **Implementation**:
  - Admin dashboard shows pending cleaner applications
  - Admin schedules verification calls (phone/video)
  - Manual status update after successful verification
  - Call notes stored for quality assurance

## 4. Detailed System Design

### 4.1 Database Schema (Prisma)

```sql
-- Core Tables
User (id, email, role, createdAt, updatedAt)
├── CustomerProfile (userId, firstName, lastName, phone, address)
├── CleanerProfile (userId, firstName, lastName, phone, serviceAreas, hourlyRate, bio)
└── VerificationRecord (userId, status, submittedAt, callScheduledFor, callNotes, verifiedAt, verifiedBy)

Job (id, customerId, title, description, address, scheduledFor, status)
├── JobApplication (id, jobId, cleanerId, message, status, createdAt)
└── JobAssignment (id, jobId, cleanerId, assignedAt, completedAt)

-- Simple badge system
CleanerBadge (cleanerId, badgeType, awardedAt)
```

### 4.2 API Routes Structure

```
/api/auth/
├── [...nextauth].js          # NextAuth configuration
├── register.js               # User registration
└── verify-email.js          # Email verification

/api/users/
├── profile.js               # Get/Update user profile
├── cleaner/[id].js         # Public cleaner profiles
└── cleaner/availability.js  # Update availability

/api/jobs/
├── index.js                # List/Create jobs
├── [id].js                 # Get/Update specific job
├── apply.js                # Apply to job
└── assign.js               # Assign job to cleaner

/api/search/
├── cleaners.js             # Search cleaners by location/criteria
└── jobs.js                 # Search jobs (for cleaners)

/api/admin/
├── pending-verifications.js # List cleaners awaiting verification
├── update-status.js        # Update verification status
└── schedule-call.js        # Admin notes for call scheduling
```

### 4.3 Austrian-Specific Implementations

#### Location Handling

```javascript
// Austrian municipality data
const AUSTRIAN_REGIONS = {
  salzburg: [
    "Salzburg Stadt",
    "Hallein",
    "Sankt Johann im Pongau",
    "Zell am See",
    // ... complete list
  ],
};
```

#### Formatting & Validation

- **Phone**: Austrian format (+43 xxx xxx xxxx)
- **Addresses**: Austrian postal code validation (4-5 digits)
- **Currency**: Euro formatting (€XX,XX)
- **Dates**: DD.MM.YYYY format
- **Language**: Austrian German terminology

### 4.4 Progressive Web App Features

```javascript
// Service Worker capabilities
- Offline job viewing
- Push notifications for job matches
- App-like installation on mobile
- Background sync for job applications
```

## 5. Performance & Security

### 5.1 Performance Optimizations

- **Next.js App Router** with streaming
- **Image optimization** via Next.js Image component
- **Static generation** for public pages
- **Edge caching** via Vercel
- **Database indexing** on search fields

### 5.2 Security Implementation

- **GDPR compliance** via Prisma + proper data deletion
- **File upload security** via Supabase RLS policies
- **Authentication** via NextAuth with secure sessions
- **Data encryption** at rest (Supabase default)
- **Rate limiting** via Vercel edge functions

### 5.3 GDPR Compliance Strategy

```javascript
// Data retention policies
- User profiles: Retain until deletion request
- Job history: 2 years retention
- Verification docs: 1 year after account closure
- Audit logs: 3 years (legal requirement)

// Right to deletion implementation
- Soft delete with anonymization
- Cascade deletion of personal data
- Retention of anonymized analytics data
```

## 6. Deployment & Monitoring

### 6.1 MVP Deployment Pipeline

```
GitHub Repository
      ↓
Vercel Auto-Deploy
      ↓
Production Environment
      ↓
Supabase Database
```

### 6.2 Monitoring & Analytics (Free Tier)

- **Vercel Analytics** for performance monitoring
- **Supabase Dashboard** for database monitoring
- **Simple logging** via console.log + Vercel logs
- **Error tracking** via built-in Next.js error boundaries

### 6.3 Cost Breakdown (Monthly)

```
✅ Vercel (Hosting): €0 (Hobby tier)
✅ Supabase (Database): €0 (500MB free)
✅ Domain: €1 (€10/year)
✅ Resend (Email): €0 (3,000 emails/month free)
✅ Google Maps API: €5-10 (pay-per-use)

Total: €6-11/month for MVP
```

## 7. Future Scalability Path

### Phase 2 Enhancements

- **Payment integration** (Stripe for Austrian market)
- **English language support**
- **Advanced search filters**
- **Real-time messaging**
- **Mobile app** (React Native)
- **Performance badges**
- **Insurance verification**

### Scaling Triggers

- **1000+ cleaners**: Consider microservices
- **10,000+ users**: Implement Redis caching
- **Multiple cities**: Add CDN optimization
- **International**: Full i18n implementation

## 9. Manual Verification Workflow

### 9.1 Cleaner Onboarding Process

```
1. Cleaner Registration
   ↓
2. Profile Completion (+ photo upload)
   ↓
3. Status: "Pending Verification"
   ↓
4. Admin Dashboard Alert
   ↓
5. Admin Schedules Verification Call
   ↓
6. Verification Call Conducted
   ↓
7. Status Updated: "Verified" or "Rejected"
   ↓
8. Email Notification to Cleaner
```

### 9.2 Admin Verification Dashboard Features

- **Pending Queue**: List of cleaners awaiting verification
- **Call Scheduling**: Calendar interface for scheduling verification calls
- **Cleaner Profiles**: Quick access to submitted profile information
- **Status Management**: One-click verification status updates
- **Notes System**: Admin notes for each verification attempt
- **Communication Log**: Track all interactions with pending cleaners

### 9.3 Verification Call Checklist (Built-in)

```javascript
const VERIFICATION_CHECKLIST = {
  identity: ["Photo ID verification", "Name/address confirmation"],
  experience: ["Cleaning experience discussion", "Availability confirmation"],
  insurance: ["Insurance status inquiry", "Coverage verification"],
  communication: ["German language proficiency", "Professional demeanor"],
  location: ["Service area confirmation", "Transportation method"],
};
```

### 9.4 Email Templates (Automated)

- **Verification Scheduled**: "Your verification call is scheduled for..."
- **Verification Complete**: "Congratulations! You're now verified..."
- **Verification Failed**: "Thank you for your interest. Unfortunately..."
- **Resubmission Required**: "Please update your profile and reapply..."
