/*
# Create RCM Company Website Schema

## Overview
Full schema for a premium employee-focused India website for a US-based Medical Billing & Healthcare RCM company.
Supports public content (jobs, stories, events, leadership, departments) and admin/CMS management.

## New Tables
1. `departments` — RCM departments (AR, Billing, Payment Posting, etc.)
2. `jobs` — Open positions with searchable/filterable fields
3. `employee_stories` — Employee testimonials and stories
4. `leadership` — Leadership team members
5. `events` — Company events and culture activities
6. `job_applications` — Applications submitted by candidates
7. `contact_submissions` — Contact form submissions

## Security
- Public content tables: SELECT open to anon+authenticated; INSERT/UPDATE/DELETE restricted to authenticated (admin)
- Application/contact tables: INSERT open to anon (public submission); SELECT/UPDATE restricted to authenticated (admin)
- RLS enabled on all tables
*/

-- Departments table
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon text DEFAULT 'Activity',
  display_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  department text NOT NULL,
  location text NOT NULL DEFAULT 'India',
  job_type text NOT NULL DEFAULT 'Full-time',
  experience_level text,
  description text NOT NULL,
  responsibilities text[],
  requirements text[],
  qualifications text[],
  benefits text[],
  is_active boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Employee stories table
CREATE TABLE IF NOT EXISTS employee_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  department text,
  years_at_company int,
  image_url text,
  quote text NOT NULL,
  story text,
  display_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Leadership table
CREATE TABLE IF NOT EXISTS leadership (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  bio text,
  image_url text,
  display_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  event_date date,
  image_url text,
  category text DEFAULT 'Culture',
  display_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Job applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id) ON DELETE SET NULL,
  job_title text,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  resume_url text,
  cover_letter text,
  linkedin_url text,
  experience_years int,
  current_company text,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE leadership ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- ============ Departments policies ============
DROP POLICY IF EXISTS "public_read_departments" ON departments;
CREATE POLICY "public_read_departments" ON departments FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_departments" ON departments;
CREATE POLICY "admin_insert_departments" ON departments FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_departments" ON departments;
CREATE POLICY "admin_update_departments" ON departments FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_departments" ON departments;
CREATE POLICY "admin_delete_departments" ON departments FOR DELETE
  TO authenticated USING (true);

-- ============ Jobs policies ============
DROP POLICY IF EXISTS "public_read_jobs" ON jobs;
CREATE POLICY "public_read_jobs" ON jobs FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_jobs" ON jobs;
CREATE POLICY "admin_insert_jobs" ON jobs FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_jobs" ON jobs;
CREATE POLICY "admin_update_jobs" ON jobs FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_jobs" ON jobs;
CREATE POLICY "admin_delete_jobs" ON jobs FOR DELETE
  TO authenticated USING (true);

-- ============ Employee stories policies ============
DROP POLICY IF EXISTS "public_read_stories" ON employee_stories;
CREATE POLICY "public_read_stories" ON employee_stories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_stories" ON employee_stories;
CREATE POLICY "admin_insert_stories" ON employee_stories FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_stories" ON employee_stories;
CREATE POLICY "admin_update_stories" ON employee_stories FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_stories" ON employee_stories;
CREATE POLICY "admin_delete_stories" ON employee_stories FOR DELETE
  TO authenticated USING (true);

-- ============ Leadership policies ============
DROP POLICY IF EXISTS "public_read_leadership" ON leadership;
CREATE POLICY "public_read_leadership" ON leadership FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_leadership" ON leadership;
CREATE POLICY "admin_insert_leadership" ON leadership FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_leadership" ON leadership;
CREATE POLICY "admin_update_leadership" ON leadership FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_leadership" ON leadership;
CREATE POLICY "admin_delete_leadership" ON leadership FOR DELETE
  TO authenticated USING (true);

-- ============ Events policies ============
DROP POLICY IF EXISTS "public_read_events" ON events;
CREATE POLICY "public_read_events" ON events FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_events" ON events;
CREATE POLICY "admin_insert_events" ON events FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_events" ON events;
CREATE POLICY "admin_update_events" ON events FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_events" ON events;
CREATE POLICY "admin_delete_events" ON events FOR DELETE
  TO authenticated USING (true);

-- ============ Job applications policies ============
DROP POLICY IF EXISTS "public_insert_applications" ON job_applications;
CREATE POLICY "public_insert_applications" ON job_applications FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_read_applications" ON job_applications;
CREATE POLICY "admin_read_applications" ON job_applications FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_applications" ON job_applications;
CREATE POLICY "admin_update_applications" ON job_applications FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_applications" ON job_applications;
CREATE POLICY "admin_delete_applications" ON job_applications FOR DELETE
  TO authenticated USING (true);

-- ============ Contact submissions policies ============
DROP POLICY IF EXISTS "public_insert_contacts" ON contact_submissions;
CREATE POLICY "public_insert_contacts" ON contact_submissions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_read_contacts" ON contact_submissions;
CREATE POLICY "admin_read_contacts" ON contact_submissions FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_delete_contacts" ON contact_submissions;
CREATE POLICY "admin_delete_contacts" ON contact_submissions FOR DELETE
  TO authenticated USING (true);

-- ============ Indexes ============
CREATE INDEX IF NOT EXISTS idx_jobs_department ON jobs(department);
CREATE INDEX IF NOT EXISTS idx_jobs_active ON jobs(is_active);
CREATE INDEX IF NOT EXISTS idx_jobs_featured ON jobs(is_featured);
CREATE INDEX IF NOT EXISTS idx_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created ON job_applications(created_at DESC);
