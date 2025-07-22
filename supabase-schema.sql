-- SauberNow Database Schema
-- Execute this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  user_type TEXT CHECK (user_type IN ('customer', 'cleaner')) NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (id)
);

-- Cleaners table (additional info for cleaner profiles)
CREATE TABLE cleaners (
  id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  bio TEXT,
  hourly_rate INTEGER, -- in cents (EUR)
  location_city TEXT NOT NULL DEFAULT 'Salzburg',
  location_postal_code TEXT,
  location_address TEXT,
  languages TEXT[], -- array of language codes: ['de', 'en']
  services_offered TEXT[], -- ['regular_cleaning', 'deep_cleaning', 'move_cleaning']
  availability_days TEXT[], -- ['monday', 'tuesday', etc.]
  verification_status TEXT CHECK (verification_status IN ('pending', 'verified', 'rejected')) NOT NULL DEFAULT 'pending',
  verification_documents TEXT[], -- URLs to uploaded documents
  average_rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  total_jobs_completed INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (id)
);

-- Jobs table
CREATE TABLE jobs (
  id UUID DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  location_city TEXT NOT NULL,
  location_postal_code TEXT,
  location_address TEXT NOT NULL,
  job_type TEXT CHECK (job_type IN ('regular_cleaning', 'deep_cleaning', 'move_cleaning', 'office_cleaning')) NOT NULL,
  frequency TEXT CHECK (frequency IN ('one_time', 'weekly', 'bi_weekly', 'monthly')),
  preferred_date TIMESTAMP WITH TIME ZONE,
  estimated_hours INTEGER, -- estimated hours for the job
  budget_min INTEGER, -- in cents (EUR)
  budget_max INTEGER, -- in cents (EUR)
  status TEXT CHECK (status IN ('open', 'assigned', 'in_progress', 'completed', 'cancelled')) NOT NULL DEFAULT 'open',
  assigned_cleaner_id UUID REFERENCES cleaners(id) ON DELETE SET NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (id)
);

-- Job applications table (cleaners applying for jobs)
CREATE TABLE job_applications (
  id UUID DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE NOT NULL,
  cleaner_id UUID REFERENCES cleaners(id) ON DELETE CASCADE NOT NULL,
  message TEXT,
  proposed_rate INTEGER, -- in cents (EUR) per hour
  status TEXT CHECK (status IN ('pending', 'accepted', 'rejected')) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE(job_id, cleaner_id) -- prevent duplicate applications
);

-- Messages table (in-app messaging)
CREATE TABLE messages (
  id UUID DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  recipient_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (id)
);

-- Reviews table
CREATE TABLE reviews (
  id UUID DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE NOT NULL,
  customer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  cleaner_id UUID REFERENCES cleaners(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE(job_id) -- one review per job
);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cleaners ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Cleaners policies
CREATE POLICY "Anyone can view verified cleaners" ON cleaners FOR SELECT USING (verification_status = 'verified' AND is_active = true);
CREATE POLICY "Cleaners can view and update their own profile" ON cleaners FOR ALL USING (auth.uid() = id);

-- Jobs policies
CREATE POLICY "Anyone can view open jobs" ON jobs FOR SELECT USING (status = 'open');
CREATE POLICY "Customers can manage their own jobs" ON jobs FOR ALL USING (auth.uid() = customer_id);
CREATE POLICY "Assigned cleaners can view their jobs" ON jobs FOR SELECT USING (auth.uid() = assigned_cleaner_id);

-- Job applications policies
CREATE POLICY "Cleaners can create applications" ON job_applications FOR INSERT WITH CHECK (auth.uid() = cleaner_id);
CREATE POLICY "Cleaners can view their applications" ON job_applications FOR SELECT USING (auth.uid() = cleaner_id);
CREATE POLICY "Job owners can view applications for their jobs" ON job_applications FOR SELECT USING (
  auth.uid() IN (SELECT customer_id FROM jobs WHERE id = job_id)
);

-- Messages policies
CREATE POLICY "Users can view messages they sent or received" ON messages FOR SELECT USING (
  auth.uid() = sender_id OR auth.uid() = recipient_id
);
CREATE POLICY "Users can send messages" ON messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Customers can create reviews for their jobs" ON reviews FOR INSERT WITH CHECK (auth.uid() = customer_id);

-- Functions and Triggers

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_cleaners_updated_at BEFORE UPDATE ON cleaners FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Function to update cleaner average rating
CREATE OR REPLACE FUNCTION update_cleaner_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE cleaners 
  SET 
    average_rating = (
      SELECT AVG(rating)::DECIMAL(3,2) 
      FROM reviews 
      WHERE cleaner_id = NEW.cleaner_id
    ),
    total_reviews = (
      SELECT COUNT(*) 
      FROM reviews 
      WHERE cleaner_id = NEW.cleaner_id
    )
  WHERE id = NEW.cleaner_id;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update cleaner rating when review is added
CREATE TRIGGER update_cleaner_rating_trigger 
  AFTER INSERT ON reviews 
  FOR EACH ROW 
  EXECUTE PROCEDURE update_cleaner_rating();

-- Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, user_type)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'full_name',
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'customer')
  );
  
  -- If user is a cleaner, also create cleaner record
  IF NEW.raw_user_meta_data->>'user_type' = 'cleaner' THEN
    INSERT INTO public.cleaners (id)
    VALUES (NEW.id);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Indexes for performance
CREATE INDEX idx_cleaners_location ON cleaners(location_city, location_postal_code);
CREATE INDEX idx_cleaners_verification ON cleaners(verification_status, is_active);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_location ON jobs(location_city, location_postal_code);
CREATE INDEX idx_jobs_customer ON jobs(customer_id);
CREATE INDEX idx_job_applications_job ON job_applications(job_id);
CREATE INDEX idx_job_applications_cleaner ON job_applications(cleaner_id);
CREATE INDEX idx_messages_participants ON messages(sender_id, recipient_id);
CREATE INDEX idx_messages_job ON messages(job_id);
CREATE INDEX idx_reviews_cleaner ON reviews(cleaner_id);