/*
# Create site_settings and page_content tables for CMS

1. New Tables
- `site_settings` — single-row table for global site content (hero title, subtitle, stats, company info, contact details, social links)
  - `id` (int, primary key, always 1)
  - `hero_title` (text) — main hero heading
  - `hero_subtitle` (text) — hero subheading
  - `hero_badge` (text) — small badge text above hero
  - `stat_1_value` through `stat_4_value` (text) — stat numbers
  - `stat_1_label` through `stat_4_label` (text) — stat labels
  - `stat_1_icon` through `stat_4_icon` (text) — lucide icon names
  - `stat_1_color` through `stat_4_color` (text) — hex colors
  - `company_description` (text) — about section text
  - `contact_email`, `contact_phone`, `contact_address` (text)
  - `linkedin_url`, `instagram_url` (text)
  - `updated_at` (timestamptz)

- `page_content` — editable content blocks for any page
  - `id` (uuid, primary key)
  - `page_key` (text) — which page (e.g. 'home', 'about', 'careers')
  - `section_key` (text) — which section (e.g. 'mission', 'values')
  - `title` (text)
  - `subtitle` (text)
  - `body` (text)
  - `image_url` (text)
  - `metadata` (jsonb) — flexible extra fields
  - `display_order` (int)
  - `is_active` (boolean)
  - `updated_at` (timestamptz)

2. Security
- Both tables have RLS enabled.
- Public read access (anon + authenticated) for site_settings and active page_content.
- Superadmin-only write access via is_revantage_superadmin() check.
*/

CREATE TABLE IF NOT EXISTS site_settings (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  hero_title text NOT NULL DEFAULT 'Build a Career That Matters in Healthcare RCM',
  hero_subtitle text NOT NULL DEFAULT 'A global healthcare RCM and technology workplace where every role creates meaningful impact.',
  hero_badge text NOT NULL DEFAULT 'We are Revantage',
  stat_1_value text NOT NULL DEFAULT '50+',
  stat_1_label text NOT NULL DEFAULT 'Employees',
  stat_1_icon text NOT NULL DEFAULT 'Users',
  stat_1_color text NOT NULL DEFAULT '#2DCB3B',
  stat_2_value text NOT NULL DEFAULT '40+',
  stat_2_label text NOT NULL DEFAULT 'US Clients',
  stat_2_icon text NOT NULL DEFAULT 'ShieldCheck',
  stat_2_color text NOT NULL DEFAULT '#D60808',
  stat_3_value text NOT NULL DEFAULT '3+',
  stat_3_label text NOT NULL DEFAULT 'Years of RCM',
  stat_3_icon text NOT NULL DEFAULT 'Star',
  stat_3_color text NOT NULL DEFAULT '#F5B835',
  stat_4_value text NOT NULL DEFAULT '45+',
  stat_4_label text NOT NULL DEFAULT 'Years Ops Leadership',
  stat_4_icon text NOT NULL DEFAULT 'Network',
  stat_4_color text NOT NULL DEFAULT '#4B52D8',
  company_description text NOT NULL DEFAULT 'Revantage Systems India is a healthcare Revenue Cycle Management company powered by decades of operational leadership.',
  contact_email text NOT NULL DEFAULT 'info@revantagehbs.com',
  contact_phone text NOT NULL DEFAULT '+91 80 1234 5678',
  contact_address text NOT NULL DEFAULT 'Bangalore, India',
  linkedin_url text NOT NULL DEFAULT '',
  instagram_url text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_site_settings" ON site_settings;
CREATE POLICY "public_read_site_settings" ON site_settings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "superadmin_update_site_settings" ON site_settings;
CREATE POLICY "superadmin_update_site_settings" ON site_settings FOR UPDATE
  TO authenticated USING (is_revantage_superadmin()) WITH CHECK (is_revantage_superadmin());

CREATE TABLE IF NOT EXISTS page_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key text NOT NULL,
  section_key text NOT NULL,
  title text NOT NULL DEFAULT '',
  subtitle text DEFAULT '',
  body text DEFAULT '',
  image_url text DEFAULT '',
  metadata jsonb DEFAULT '{}'::jsonb,
  display_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_page_content" ON page_content;
CREATE POLICY "public_read_page_content" ON page_content FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "superadmin_insert_page_content" ON page_content;
CREATE POLICY "superadmin_insert_page_content" ON page_content FOR INSERT
  TO authenticated WITH CHECK (is_revantage_superadmin());

DROP POLICY IF EXISTS "superadmin_update_page_content" ON page_content;
CREATE POLICY "superadmin_update_page_content" ON page_content FOR UPDATE
  TO authenticated USING (is_revantage_superadmin()) WITH CHECK (is_revantage_superadmin());

DROP POLICY IF EXISTS "superadmin_delete_page_content" ON page_content;
CREATE POLICY "superadmin_delete_page_content" ON page_content FOR DELETE
  TO authenticated USING (is_revantage_superadmin());

CREATE INDEX IF NOT EXISTS idx_page_content_page_key ON page_content(page_key);
CREATE INDEX IF NOT EXISTS idx_page_content_display_order ON page_content(display_order);

-- Seed default site_settings row
INSERT INTO site_settings (id) VALUES (1)
  ON CONFLICT (id) DO NOTHING;
