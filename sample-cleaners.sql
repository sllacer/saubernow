-- Sample cleaners data for testing
-- Execute this in your Supabase SQL Editor after running the main schema

-- First, let's create some sample users (these would normally be created through signup)
INSERT INTO auth.users (id, email, raw_user_meta_data, email_confirmed_at, created_at, updated_at)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440001', 'maria.schmidt@example.com', '{"full_name": "Maria Schmidt", "user_type": "cleaner"}', NOW(), NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440002', 'anna.weber@example.com', '{"full_name": "Anna Weber", "user_type": "cleaner"}', NOW(), NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440003', 'stefan.mueller@example.com', '{"full_name": "Stefan Müller", "user_type": "cleaner"}', NOW(), NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Create profiles for these users
INSERT INTO profiles (id, full_name, email, user_type, created_at, updated_at)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440001', 'Maria Schmidt', 'maria.schmidt@example.com', 'cleaner', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440002', 'Anna Weber', 'anna.weber@example.com', 'cleaner', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440003', 'Stefan Müller', 'stefan.mueller@example.com', 'cleaner', NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  email = EXCLUDED.email,
  user_type = EXCLUDED.user_type;

-- Create cleaner profiles
INSERT INTO cleaners (
  id, 
  bio, 
  hourly_rate, 
  location_city, 
  location_postal_code, 
  languages, 
  services_offered, 
  verification_status, 
  average_rating, 
  total_reviews, 
  total_jobs_completed, 
  is_active
) VALUES 
  (
    '550e8400-e29b-41d4-a716-446655440001',
    'Erfahrene Reinigungskraft mit 8 Jahren Berufserfahrung. Spezialisiert auf umweltfreundliche Reinigungsmethoden und Tiefenreinigung. Zuverlässig, pünktlich und sehr detailgenau.',
    2800, -- €28/hour in cents
    'Salzburg',
    '5020',
    ARRAY['de', 'en'],
    ARRAY['regular_cleaning', 'deep_cleaning'],
    'verified',
    4.9,
    127,
    89,
    true
  ),
  (
    '550e8400-e29b-41d4-a716-446655440002',
    'Freundliche und zuverlässige Reinigungskraft. Besonders erfahren mit Haushalten mit Haustieren und Allergikern. Flexible Arbeitszeiten und sehr kundenorientiert.',
    2500, -- €25/hour in cents
    'Salzburg',
    '5020',
    ARRAY['de', 'it'],
    ARRAY['regular_cleaning', 'office_cleaning'],
    'verified',
    4.8,
    89,
    67,
    true
  ),
  (
    '550e8400-e29b-41d4-a716-446655440003',
    'Professioneller Reinigungsservice mit Fokus auf Qualität und Effizienz. Jahrelange Erfahrung in der Gebäudereinigung und Privathaushalt. Auch Fensterreinigung und Post-Renovation-Cleaning.',
    3000, -- €30/hour in cents
    'Salzburg',
    '5026',
    ARRAY['de', 'en', 'fr'],
    ARRAY['deep_cleaning', 'office_cleaning', 'move_cleaning'],
    'verified',
    4.7,
    156,
    112,
    true
  )
ON CONFLICT (id) DO UPDATE SET
  bio = EXCLUDED.bio,
  hourly_rate = EXCLUDED.hourly_rate,
  location_city = EXCLUDED.location_city,
  location_postal_code = EXCLUDED.location_postal_code,
  languages = EXCLUDED.languages,
  services_offered = EXCLUDED.services_offered,
  verification_status = EXCLUDED.verification_status,
  average_rating = EXCLUDED.average_rating,
  total_reviews = EXCLUDED.total_reviews,
  total_jobs_completed = EXCLUDED.total_jobs_completed,
  is_active = EXCLUDED.is_active;