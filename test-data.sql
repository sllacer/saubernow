-- SauberNow Test Data
-- Execute this in your Supabase SQL Editor after running the main schema
-- This file contains fake users, cleaners, and job announcements for testing

-- ============================================
-- CUSTOMER USERS DATA
-- ============================================

-- Create sample customer users in auth.users
INSERT INTO auth.users (id, email, raw_user_meta_data, email_confirmed_at, created_at, updated_at)
VALUES 
  ('c50e8400-e29b-41d4-a716-446655440001', 'thomas.bauer@gmail.com', '{"full_name": "Thomas Bauer", "user_type": "customer"}', NOW(), NOW(), NOW()),
  ('c50e8400-e29b-41d4-a716-446655440002', 'julia.zimmermann@hotmail.com', '{"full_name": "Julia Zimmermann", "user_type": "customer"}', NOW(), NOW(), NOW()),
  ('c50e8400-e29b-41d4-a716-446655440003', 'michael.wagner@outlook.com', '{"full_name": "Michael Wagner", "user_type": "customer"}', NOW(), NOW(), NOW()),
  ('c50e8400-e29b-41d4-a716-446655440004', 'sarah.hartmann@gmail.com', '{"full_name": "Sarah Hartmann", "user_type": "customer"}', NOW(), NOW(), NOW()),
  ('c50e8400-e29b-41d4-a716-446655440005', 'markus.fischer@yahoo.com', '{"full_name": "Markus Fischer", "user_type": "customer"}', NOW(), NOW(), NOW()),
  ('c50e8400-e29b-41d4-a716-446655440006', 'lisa.schneider@gmail.com', '{"full_name": "Lisa Schneider", "user_type": "customer"}', NOW(), NOW(), NOW()),
  ('c50e8400-e29b-41d4-a716-446655440007', 'david.brown@expat.com', '{"full_name": "David Brown", "user_type": "customer"}', NOW(), NOW(), NOW()),
  ('c50e8400-e29b-41d4-a716-446655440008', 'elena.rossi@italian.com', '{"full_name": "Elena Rossi", "user_type": "customer"}', NOW(), NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Create customer profiles
INSERT INTO profiles (id, full_name, email, phone, user_type, created_at, updated_at)
VALUES 
  ('c50e8400-e29b-41d4-a716-446655440001', 'Thomas Bauer', 'thomas.bauer@gmail.com', '+43 664 1234567', 'customer', NOW(), NOW()),
  ('c50e8400-e29b-41d4-a716-446655440002', 'Julia Zimmermann', 'julia.zimmermann@hotmail.com', '+43 650 9876543', 'customer', NOW(), NOW()),
  ('c50e8400-e29b-41d4-a716-446655440003', 'Michael Wagner', 'michael.wagner@outlook.com', '+43 676 5555123', 'customer', NOW(), NOW()),
  ('c50e8400-e29b-41d4-a716-446655440004', 'Sarah Hartmann', 'sarah.hartmann@gmail.com', '+43 699 4433221', 'customer', NOW(), NOW()),
  ('c50e8400-e29b-41d4-a716-446655440005', 'Markus Fischer', 'markus.fischer@yahoo.com', '+43 664 7890123', 'customer', NOW(), NOW()),
  ('c50e8400-e29b-41d4-a716-446655440006', 'Lisa Schneider', 'lisa.schneider@gmail.com', '+43 650 1112233', 'customer', NOW(), NOW()),
  ('c50e8400-e29b-41d4-a716-446655440007', 'David Brown', 'david.brown@expat.com', '+43 676 9998877', 'customer', NOW(), NOW()),
  ('c50e8400-e29b-41d4-a716-446655440008', 'Elena Rossi', 'elena.rossi@italian.com', '+43 699 5566778', 'customer', NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  user_type = EXCLUDED.user_type;

-- ============================================
-- CLEANER USERS DATA
-- ============================================

-- Create sample cleaner users in auth.users
INSERT INTO auth.users (id, email, raw_user_meta_data, email_confirmed_at, created_at, updated_at)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440001', 'maria.schmidt@example.com', '{"full_name": "Maria Schmidt", "user_type": "cleaner"}', NOW(), NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440002', 'anna.weber@example.com', '{"full_name": "Anna Weber", "user_type": "cleaner"}', NOW(), NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440003', 'stefan.mueller@example.com', '{"full_name": "Stefan Müller", "user_type": "cleaner"}', NOW(), NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440004', 'petra.hofmann@example.com', '{"full_name": "Petra Hofmann", "user_type": "cleaner"}', NOW(), NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440005', 'klaus.berger@example.com', '{"full_name": "Klaus Berger", "user_type": "cleaner"}', NOW(), NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440006', 'sabine.gruber@example.com', '{"full_name": "Sabine Gruber", "user_type": "cleaner"}', NOW(), NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440007', 'franz.eder@example.com', '{"full_name": "Franz Eder", "user_type": "cleaner"}', NOW(), NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440008', 'ingrid.steiner@example.com', '{"full_name": "Ingrid Steiner", "user_type": "cleaner"}', NOW(), NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440009', 'robert.mayer@example.com', '{"full_name": "Robert Mayer", "user_type": "cleaner"}', NOW(), NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440010', 'helena.novak@example.com', '{"full_name": "Helena Novak", "user_type": "cleaner"}', NOW(), NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Create cleaner profiles
INSERT INTO profiles (id, full_name, email, phone, user_type, created_at, updated_at)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440001', 'Maria Schmidt', 'maria.schmidt@example.com', '+43 664 1001001', 'cleaner', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440002', 'Anna Weber', 'anna.weber@example.com', '+43 650 2002002', 'cleaner', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440003', 'Stefan Müller', 'stefan.mueller@example.com', '+43 676 3003003', 'cleaner', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440004', 'Petra Hofmann', 'petra.hofmann@example.com', '+43 699 4004004', 'cleaner', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440005', 'Klaus Berger', 'klaus.berger@example.com', '+43 664 5005005', 'cleaner', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440006', 'Sabine Gruber', 'sabine.gruber@example.com', '+43 650 6006006', 'cleaner', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440007', 'Franz Eder', 'franz.eder@example.com', '+43 676 7007007', 'cleaner', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440008', 'Ingrid Steiner', 'ingrid.steiner@example.com', '+43 699 8008008', 'cleaner', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440009', 'Robert Mayer', 'robert.mayer@example.com', '+43 664 9009009', 'cleaner', NOW(), NOW()),
  ('550e8400-e29b-41d4-a716-446655440010', 'Helena Novak', 'helena.novak@example.com', '+43 650 1010101', 'cleaner', NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  user_type = EXCLUDED.user_type;

-- Create detailed cleaner profiles with Austrian-specific data
INSERT INTO cleaners (
  id, 
  bio, 
  hourly_rate, 
  location_city, 
  location_postal_code, 
  location_address,
  languages, 
  services_offered, 
  availability_days,
  verification_status, 
  average_rating, 
  total_reviews, 
  total_jobs_completed, 
  is_active
) VALUES 
  (
    '550e8400-e29b-41d4-a716-446655440001',
    'Erfahrene Reinigungskraft mit 8 Jahren Berufserfahrung. Spezialisiert auf umweltfreundliche Reinigungsmethoden und Tiefenreinigung. Zuverlässig, pünktlich und sehr detailgenau.',
    2800, -- €28/hour
    'Salzburg',
    '5020',
    'Mirabellplatz 4, 5020 Salzburg',
    ARRAY['de', 'en'],
    ARRAY['regular_cleaning', 'deep_cleaning'],
    ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    'verified',
    4.9,
    127,
    89,
    true
  ),
  (
    '550e8400-e29b-41d4-a716-446655440002',
    'Freundliche und zuverlässige Reinigungskraft. Besonders erfahren mit Haushalten mit Haustieren und Allergikern. Flexible Arbeitszeiten und sehr kundenorientiert.',
    2500, -- €25/hour
    'Salzburg',
    '5020',
    'Getreidegasse 15, 5020 Salzburg',
    ARRAY['de', 'it'],
    ARRAY['regular_cleaning', 'office_cleaning'],
    ARRAY['monday', 'wednesday', 'friday', 'saturday'],
    'verified',
    4.8,
    89,
    67,
    true
  ),
  (
    '550e8400-e29b-41d4-a716-446655440003',
    'Professioneller Reinigungsservice mit Fokus auf Qualität und Effizienz. Jahrelange Erfahrung in der Gebäudereinigung und Privathaushalt. Auch Fensterreinigung und Post-Renovation-Cleaning.',
    3000, -- €30/hour
    'Salzburg',
    '5026',
    'Hellbrunner Straße 34, 5026 Salzburg',
    ARRAY['de', 'en', 'fr'],
    ARRAY['deep_cleaning', 'office_cleaning', 'move_cleaning'],
    ARRAY['tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    'verified',
    4.7,
    156,
    112,
    true
  ),
  (
    '550e8400-e29b-41d4-a716-446655440004',
    'Gründliche Haushaltsreinigung mit persönlicher Note. 5 Jahre Erfahrung in Privathaushalten. Besonders sorgfältig bei Küchen und Badezimmern. Vertrauenswürdig und diskret.',
    2600, -- €26/hour
    'Salzburg',
    '5061',
    'Elisabethstraße 12, 5061 Elsbethen',
    ARRAY['de'],
    ARRAY['regular_cleaning', 'deep_cleaning'],
    ARRAY['monday', 'tuesday', 'thursday', 'friday'],
    'verified',
    4.6,
    78,
    52,
    true
  ),
  (
    '550e8400-e29b-41d4-a716-446655440005',
    'Erfahrener Gebäudereiniger mit Schwerpunkt auf Bürogebäuden und Praxen. Arbeitet auch am Wochenende. Sehr zuverlässig und hat alle notwendigen Versicherungen.',
    2700, -- €27/hour
    'Salzburg',
    '5023',
    'Ignaz-Harrer-Straße 79, 5023 Salzburg',
    ARRAY['de', 'en'],
    ARRAY['office_cleaning', 'regular_cleaning'],
    ARRAY['friday', 'saturday', 'sunday'],
    'verified',
    4.5,
    94,
    71,
    true
  ),
  (
    '550e8400-e29b-41d4-a716-446655440006',
    'Spezialisiert auf Endreinigung nach Umzügen und Renovierungen. Arbeitet schnell und effizient. Bringt eigene professionelle Ausrüstung mit. Auch für Notfall-Reinigungen verfügbar.',
    3200, -- €32/hour
    'Salzburg',
    '5071',
    'Wals-Siezenheim, Bergstraße 23, 5071 Wals',
    ARRAY['de', 'en', 'hr'],
    ARRAY['move_cleaning', 'deep_cleaning'],
    ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    'verified',
    4.8,
    143,
    98,
    true
  ),
  (
    '550e8400-e29b-41d4-a716-446655440007',
    'Traditioneller Handwerker mit 12 Jahren Erfahrung. Übernimmt auch kleinere Reparaturen während der Reinigung. Besonders gut bei älteren Häusern und historischen Gebäuden.',
    2900, -- €29/hour
    'Salzburg',
    '5020',
    'Linzer Gasse 41, 5020 Salzburg',
    ARRAY['de'],
    ARRAY['regular_cleaning', 'deep_cleaning', 'office_cleaning'],
    ARRAY['monday', 'tuesday', 'wednesday', 'thursday'],
    'verified',
    4.7,
    201,
    145,
    true
  ),
  (
    '550e8400-e29b-41d4-a716-446655440008',
    'Inhaberin eines kleinen Reinigungsunternehmens. Arbeitet meist in Teams für größere Projekte. Sehr organisiert und kann auch kurzfristige Termine anbieten.',
    2750, -- €27.50/hour
    'Salzburg',
    '5081',
    'Anif, Salzachtal Bundesstraße 7, 5081 Anif',
    ARRAY['de', 'en'],
    ARRAY['regular_cleaning', 'office_cleaning', 'deep_cleaning'],
    ARRAY['tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    'verified',
    4.9,
    167,
    123,
    true
  ),
  (
    '550e8400-e29b-41d4-a716-446655440009',
    'Junger, motivierter Reinigungsprofi. Besonders gut mit moderner Ausstattung und umweltfreundlichen Reinigungsmitteln. Sehr flexibel bei Terminen und lernt schnell neue Anforderungen.',
    2400, -- €24/hour
    'Salzburg',
    '5026',
    'Alpensiedlung 15, 5026 Salzburg',
    ARRAY['de', 'en', 'it'],
    ARRAY['regular_cleaning', 'office_cleaning'],
    ARRAY['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    'verified',
    4.4,
    45,
    32,
    true
  ),
  (
    '550e8400-e29b-41d4-a716-446655440010',
    'Bietet Premium-Reinigungsservice für anspruchsvolle Kunden. Arbeitet mit hochwertigen, allergikerfreundlichen Produkten. Sehr diskret und professionell. Auch Pflege von Luxusmöbeln.',
    3500, -- €35/hour
    'Salzburg',
    '5020',
    'Residenzplatz 1, 5020 Salzburg',
    ARRAY['de', 'en', 'sl'],
    ARRAY['regular_cleaning', 'deep_cleaning'],
    ARRAY['monday', 'tuesday', 'wednesday', 'thursday'],
    'verified',
    4.9,
    89,
    76,
    true
  )
ON CONFLICT (id) DO UPDATE SET
  bio = EXCLUDED.bio,
  hourly_rate = EXCLUDED.hourly_rate,
  location_city = EXCLUDED.location_city,
  location_postal_code = EXCLUDED.location_postal_code,
  location_address = EXCLUDED.location_address,
  languages = EXCLUDED.languages,
  services_offered = EXCLUDED.services_offered,
  availability_days = EXCLUDED.availability_days,
  verification_status = EXCLUDED.verification_status,
  average_rating = EXCLUDED.average_rating,
  total_reviews = EXCLUDED.total_reviews,
  total_jobs_completed = EXCLUDED.total_jobs_completed,
  is_active = EXCLUDED.is_active;

-- ============================================
-- JOB ANNOUNCEMENTS/POSTINGS DATA
-- ============================================

INSERT INTO jobs (
  id,
  customer_id,
  title,
  description,
  location_city,
  location_postal_code,
  location_address,
  job_type,
  frequency,
  preferred_date,
  estimated_hours,
  budget_min,
  budget_max,
  status
) VALUES 
  (
    '750e8400-e29b-41d4-a716-446655440001',
    'c50e8400-e29b-41d4-a716-446655440001',
    'Wöchentliche Wohnungsreinigung gesucht',
    'Suche zuverlässige Reinigungskraft für meine 3-Zimmer Wohnung. Wöchentliche Reinigung, alle Räume inklusive Bad und Küche. Wohnung ist in gutem Zustand, keine besonderen Anforderungen.',
    'Salzburg',
    '5020',
    'Mirabellplatz 10, 5020 Salzburg',
    'regular_cleaning',
    'weekly',
    '2024-01-15 10:00:00+00',
    3,
    7500, -- €75 minimum
    9000, -- €90 maximum
    'open'
  ),
  (
    '750e8400-e29b-41d4-a716-446655440002',
    'c50e8400-e29b-41d4-a716-446655440002',
    'Tiefenreinigung nach Renovierung',
    'Benötige professionelle Tiefenreinigung nach Badezimmer-Renovierung. Viel Staub und Schmutz von Bauarbeiten. Sollte erfahren sein mit Post-Renovation Cleaning.',
    'Salzburg',
    '5020',
    'Getreidegasse 25, 5020 Salzburg',
    'deep_cleaning',
    'one_time',
    '2024-01-20 08:00:00+00',
    6,
    15000, -- €150 minimum
    20000, -- €200 maximum
    'open'
  ),
  (
    '750e8400-e29b-41d4-a716-446655440003',
    'c50e8400-e29b-41d4-a716-446655440003',
    'Büroreinigung am Wochenende',
    'Kleine Anwaltskanzlei benötigt wöchentliche Reinigung. 4 Büros, 1 Konferenzraum, Küche und 2 WCs. Bevorzugt samstags oder sonntags. Diskretion wichtig.',
    'Salzburg',
    '5020',
    'Mozartplatz 5, 5020 Salzburg',
    'office_cleaning',
    'weekly',
    '2024-01-13 09:00:00+00',
    4,
    10000, -- €100 minimum
    12000, -- €120 maximum
    'open'
  ),
  (
    '750e8400-e29b-41d4-a716-446655440004',
    'c50e8400-e29b-41d4-a716-446655440004',
    'Endreinigung für Umzug',
    'Komplette Endreinigung einer 4-Zimmer Wohnung für Kautionsrückgabe. Alle Räume, Küche komplett, Badezimmer, Balkon. Muss sehr gründlich sein für Übergabe.',
    'Salzburg',
    '5026',
    'Hellbrunner Straße 50, 5026 Salzburg',
    'move_cleaning',
    'one_time',
    '2024-01-25 10:00:00+00',
    8,
    20000, -- €200 minimum
    28000, -- €280 maximum
    'open'
  ),
  (
    '750e8400-e29b-41d4-a716-446655440005',
    'c50e8400-e29b-41d4-a716-446655440005',
    'Monatliche Grundreinigung',
    'Suche für 2-Zimmer Wohnung monatliche Grundreinigung. Bin viel auf Geschäftsreise, daher brauche flexible Termine. Habe Katze, sollte tierlieb sein.',
    'Salzburg',
    '5061',
    'Glasenbach, Am Hang 12, 5061 Elsbethen',
    'regular_cleaning',
    'monthly',
    '2024-01-30 14:00:00+00',
    4,
    8000, -- €80 minimum
    11000, -- €110 maximum
    'open'
  ),
  (
    '750e8400-e29b-41d4-a716-446655440006',
    'c50e8400-e29b-41d4-a716-446655440006',
    'Reinigung für Ferienwohnung',
    'Ferienwohnung benötigt Reinigung zwischen Gästen. Meist 2-3 Mal pro Woche, je nach Buchungen. Schnell und gründlich, da Gäste oft am selben Tag ankommen.',
    'Salzburg',
    '5020',
    'Steingasse 33, 5020 Salzburg',
    'regular_cleaning',
    'bi_weekly',
    '2024-01-16 11:00:00+00',
    2,
    5000, -- €50 minimum
    7000, -- €70 maximum
    'open'
  ),
  (
    '750e8400-e29b-41d4-a716-446655440007',
    'c50e8400-e29b-41d4-a716-446655440007',
    'English-speaking cleaner needed',
    'Looking for English-speaking cleaner for our family home. We are expats and prefer communication in English. Weekly cleaning, 3 bedrooms, 2 bathrooms, kitchen.',
    'Salzburg',
    '5071',
    'International School Area, Wals 15, 5071 Wals',
    'regular_cleaning',
    'weekly',
    '2024-01-18 10:00:00+00',
    4,
    9000, -- €90 minimum
    12000, -- €120 maximum
    'open'
  ),
  (
    '750e8400-e29b-41d4-a716-446655440008',
    'c50e8400-e29b-41d4-a716-446655440008',
    'Pulizia casa con bambini piccoli',
    'Cerco persona affidabile per pulizie casa con bambini piccoli. Prodotti ecologici preferiti. Flessibilità con orari. Esperienza con famiglie importante.',
    'Salzburg',
    '5020',
    'Südtiroler Platz 8, 5020 Salzburg',
    'regular_cleaning',
    'weekly',
    '2024-01-22 09:00:00+00',
    3,
    7000, -- €70 minimum
    9000, -- €90 maximum
    'open'
  ),
  (
    '750e8400-e29b-41d4-a716-446655440009',
    'c50e8400-e29b-41d4-a716-446655440002',
    'Großreinigung für Gastronomiebetrieb',
    'Restaurant benötigt Tiefenreinigung nach Schädlingsbekämpfung. Sehr gründliche Arbeit erforderlich. Erfahrung im Gastronomiebereich von Vorteil. Arbeit am Montag (Ruhetag).',
    'Salzburg',
    '5020',
    'Judengasse 15, 5020 Salzburg',
    'deep_cleaning',
    'one_time',
    '2024-01-29 07:00:00+00',
    8,
    24000, -- €240 minimum
    32000, -- €320 maximum
    'open'
  ),
  (
    '750e8400-e29b-41d4-a716-446655440010',
    'c50e8400-e29b-41d4-a716-446655440003',
    'Reinigung für Seniorenwohnung',
    'Suche einfühlsame Reinigungskraft für meine Mutter (82 Jahre). Wöchentliche Hilfe, auch kleine Tätigkeiten wie Wäsche. Geduld und Freundlichkeit wichtig.',
    'Salzburg',
    '5026',
    'Nonntal, Petersbrunnstraße 3, 5026 Salzburg',
    'regular_cleaning',
    'weekly',
    '2024-01-17 10:00:00+00',
    3,
    6000, -- €60 minimum
    8500, -- €85 maximum
    'open'
  ),
  (
    '750e8400-e29b-41d4-a716-446655440011',
    'c50e8400-e29b-41d4-a716-446655440004',
    'Notfall-Reinigung nach Wasserschaden',
    'Wasserschaden in Wohnung, benötige sofortige professionelle Reinigung. Trocknungsarbeiten sind abgeschlossen, jetzt Grundreinigung nötig. Zeitkritisch!',
    'Salzburg',
    '5023',
    'Gnigl, Kendlerstraße 28, 5023 Salzburg',
    'deep_cleaning',
    'one_time',
    '2024-01-12 08:00:00+00',
    6,
    18000, -- €180 minimum
    24000, -- €240 maximum
    'open'
  ),
  (
    '750e8400-e29b-41d4-a716-446655440012',
    'c50e8400-e29b-41d4-a716-446655440005',
    'Praxisreinigung für Zahnarzt',
    'Zahnarztpraxis benötigt tägliche Reinigung (Mo-Fr). Strenge Hygienevorschriften, Erfahrung im Medizinbereich erforderlich. Sehr zuverlässig, da Patientenbetrieb.',
    'Salzburg',
    '5020',
    'Makartplatz 4, 5020 Salzburg',
    'office_cleaning',
    'weekly',
    '2024-01-15 18:00:00+00',
    2,
    6000, -- €60 minimum
    8000, -- €80 maximum
    'open'
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  location_city = EXCLUDED.location_city,
  location_postal_code = EXCLUDED.location_postal_code,
  location_address = EXCLUDED.location_address,
  job_type = EXCLUDED.job_type,
  frequency = EXCLUDED.frequency,
  preferred_date = EXCLUDED.preferred_date,
  estimated_hours = EXCLUDED.estimated_hours,
  budget_min = EXCLUDED.budget_min,
  budget_max = EXCLUDED.budget_max,
  status = EXCLUDED.status;

-- ============================================
-- SAMPLE JOB APPLICATIONS
-- ============================================

INSERT INTO job_applications (
  id,
  job_id,
  cleaner_id,
  message,
  proposed_rate,
  status
) VALUES 
  (
    '850e8400-e29b-41d4-a716-446655440001',
    '750e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440001',
    'Hallo! Ich habe Interesse an Ihrem wöchentlichen Reinigungsauftrag. Ich habe 8 Jahre Erfahrung und bin sehr zuverlässig. Ich kenne die Gegend um Mirabellplatz sehr gut.',
    2800,
    'pending'
  ),
  (
    '850e8400-e29b-41d4-a716-446655440002',
    '750e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440002',
    'Guten Tag! Für Ihre wöchentliche Wohnungsreinigung kann ich Ihnen sehr gerne helfen. Ich arbeite bereits in der Nähe und hätte passende Termine frei.',
    2500,
    'pending'
  ),
  (
    '850e8400-e29b-41d4-a716-446655440003',
    '750e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440003',
    'Sehr geehrte Damen und Herren, ich habe viel Erfahrung mit Post-Renovation Cleaning. Bringe professionelle Ausrüstung mit und arbeite sehr gründlich.',
    3000,
    'pending'
  ),
  (
    '850e8400-e29b-41d4-a716-446655440004',
    '750e8400-e29b-41d4-a716-446655440007',
    '550e8400-e29b-41d4-a716-446655440001',
    'Hello! I would be happy to help with your weekly cleaning needs. I speak fluent English and have experience working with expat families in Salzburg.',
    2800,
    'pending'
  ),
  (
    '850e8400-e29b-41d4-a716-446655440005',
    '750e8400-e29b-41d4-a716-446655440007',
    '550e8400-e29b-41d4-a716-446655440009',
    'Hi there! I am a reliable cleaner who speaks excellent English. I understand the needs of international families and am very flexible with scheduling.',
    2400,
    'pending'
  )
ON CONFLICT (id) DO UPDATE SET
  message = EXCLUDED.message,
  proposed_rate = EXCLUDED.proposed_rate,
  status = EXCLUDED.status;

-- ============================================
-- SAMPLE MESSAGES
-- ============================================

INSERT INTO messages (
  id,
  job_id,
  sender_id,
  recipient_id,
  content,
  is_read
) VALUES 
  (
    '950e8400-e29b-41d4-a716-446655440001',
    '750e8400-e29b-41d4-a716-446655440001',
    'c50e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440001',
    'Hallo Maria, vielen Dank für Ihre Bewerbung! Könnten Sie mir sagen, welche Reinigungsmittel Sie normalerweise verwenden? Wir haben kleine Kinder im Haushalt.',
    false
  ),
  (
    '950e8400-e29b-41d4-a716-446655440002',
    '750e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440001',
    'c50e8400-e29b-41d4-a716-446655440001',
    'Hallo Herr Bauer! Gerne verwende ich umweltfreundliche und kinderfreundliche Reinigungsmittel. Ich bringe diese immer selbst mit. Wann würde Ihnen ein Kennenlerntermin passen?',
    true
  ),
  (
    '950e8400-e29b-41d4-a716-446655440003',
    '750e8400-e29b-41d4-a716-446655440007',
    'c50e8400-e29b-41d4-a716-446655440007',
    '550e8400-e29b-41d4-a716-446655440001',
    'Hello Maria, thank you for applying for our cleaning position. Could we schedule a brief meeting this week to discuss the details? We are available most afternoons.',
    false
  )
ON CONFLICT (id) DO UPDATE SET
  content = EXCLUDED.content,
  is_read = EXCLUDED.is_read;

-- ============================================
-- SAMPLE REVIEWS
-- ============================================

-- First, let's create some completed jobs for reviews
UPDATE jobs SET 
  status = 'completed',
  assigned_cleaner_id = '550e8400-e29b-41d4-a716-446655440001',
  completed_at = NOW() - INTERVAL '5 days'
WHERE id = '750e8400-e29b-41d4-a716-446655440010';

UPDATE jobs SET 
  status = 'completed',
  assigned_cleaner_id = '550e8400-e29b-41d4-a716-446655440002',
  completed_at = NOW() - INTERVAL '10 days'
WHERE id = '750e8400-e29b-41d4-a716-446655440006';

INSERT INTO reviews (
  id,
  job_id,
  customer_id,
  cleaner_id,
  rating,
  comment
) VALUES 
  (
    'a50e8400-e29b-41d4-a716-446655440001',
    '750e8400-e29b-41d4-a716-446655440010',
    'c50e8400-e29b-41d4-a716-446655440003',
    '550e8400-e29b-41d4-a716-446655440001',
    5,
    'Maria war absolut fantastisch! Sehr einfühlsam im Umgang mit meiner Mutter und hat die Wohnung blitzsauber gemacht. Sehr zu empfehlen!'
  ),
  (
    'a50e8400-e29b-41d4-a716-446655440002',
    '750e8400-e29b-41d4-a716-446655440006',
    'c50e8400-e29b-41d4-a716-446655440006',
    '550e8400-e29b-41d4-a716-446655440002',
    4,
    'Anna hat schnell und gründlich gearbeitet. Die Ferienwohnung war perfekt für die nächsten Gäste vorbereitet. Gerne wieder!'
  )
ON CONFLICT (id) DO UPDATE SET
  rating = EXCLUDED.rating,
  comment = EXCLUDED.comment;