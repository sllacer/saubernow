# Salva's Independent Tasks - SauberNow Setup Guide

## 🚀 Priority 1: Supabase Setup (Complete Before Next Coding Session)

### Step 1: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with your email or GitHub account
4. Verify your email address

### Step 2: Create New Project

1. Once logged in, click "New Project"
2. Choose your organization (or create a new one)
3. Fill in project details:
   - **Project Name**: `saubernow-production` (or similar)
   - **Database Password**: Generate a strong password and **save it securely**
   - **Region**: Choose Europe (Frankfurt or Ireland for best performance in Austria)
4. Click "Create new project"
5. Wait 2-3 minutes for project initialization

### Step 3: Get Project Credentials

1. Go to Project Settings (gear icon in sidebar)
2. Navigate to "API" section
3. Copy and save these values **securely**:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)
   - **Service role key** (starts with `eyJ...`) - Keep this **SECRET**

### Step 4: Enable Authentication

1. Go to "Authentication" in the sidebar
2. Go to "Settings" tab
3. Configure:
   - **Site URL**: Set to `http://localhost:3000` for now
   - **Email confirmations**: Enable (for production security)
   - **Email auth**: Ensure it's enabled
4. In "URL Configuration":
   - Add `http://localhost:3000/**` to redirect URLs
   - Add to site URLs

### Step 5: Email Configuration (Optional for MVP)

For now, you can use Supabase's built-in email service. Later, you may want to configure:

- SMTP settings for custom email provider
- Email templates customization

### Step 6: Create Environment File Template

Create a file called `.env.local.template` in your project root with:

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Step 7: Security Setup

1. In Supabase dashboard, go to "Settings" → "API"
2. Note the JWT Settings - we'll need these later
3. Keep your service role key **extremely secure** - never commit it to git

## 📋 Priority 2: Legal Content Creation

### Terms of Service & Privacy Policy

**Action Required**: Create basic legal documents

- Research Austrian/EU legal requirements for marketplace platforms
- Consider using templates from:
  - [Termly](https://termly.io)
  - [PrivacyPolicies.com]
  - Or consult with an Austrian business lawyer

**Key Points to Address**:

- Data processing (GDPR compliance)
- User responsibilities and platform rules
- Commission structure and payment terms
- Liability limitations
- Dispute resolution process
- Austrian law jurisdiction

### Cleaner Onboarding Guide

**Content needed**:

- Welcome message and platform overview
- Step-by-step profile completion guide
- Document upload requirements
- Verification process explanation
- How to browse and apply for jobs
- Payment and commission structure
- Best practices for customer communication
- Safety guidelines and insurance recommendations

## 💳 Priority 3: Payment Research (Lower Priority)

### Stripe for Austria

**Research Tasks**:

1. Create Stripe account (choose Austria as business location)
2. Research Stripe's requirements for marketplace platforms
3. Understand:
   - Stripe Connect for multi-party payments
   - Commission handling
   - Austrian tax requirements
   - SEPA payment methods (popular in Austria)
   - Required business documentation

**Key Considerations**:

- Marketplace vs. direct payment model
- Commission collection methods
- Payout schedules for cleaners
- Transaction fees structure
- Currency handling (EUR)

## 🧪 Priority 4: User Testing Preparation

### Test User Recruitment

- Identify 5-10 potential testers in Salzburg area
- Mix of potential customers and cleaners
- Prepare testing scenarios and feedback forms

### Market Research

- Research local cleaning service prices in Salzburg
- Identify main competitors (local and online)
- Understand local preferences and regulations

## 🚀 Priority 5: Deployment Planning

### Domain and Hosting

- Choose domain name (saubernow.at or .com)
- Research hosting options:
  - Vercel (recommended for Next.js)
  - Netlify
  - Traditional hosting providers
- Consider CDN for Austrian market

### Production Environment

- Plan production Supabase project setup
- SSL certificate requirements
- Backup and monitoring strategies

---

## ✅ Next Steps After Supabase Setup

Once you complete the Supabase setup:

1. Share the project credentials securely (not via plain text)
2. We'll configure the Next.js app to connect to Supabase
3. Start implementing real authentication and database functionality

## 🔐 Security Reminders

- Never share service role keys publicly
- Use environment variables for all sensitive data
- Keep database passwords secure
- Enable Row Level Security (RLS) in Supabase for production

**Questions or issues?** Let me know and we can troubleshoot together!
