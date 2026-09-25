/*
# Add secured superadmin CMS content

1. Purpose
- Adds social media posts and reusable media assets for the public website.
- Restricts CMS mutations to the requested Revantage superadmin email.
- Keeps public content readable while protecting applications, contacts, and all CMS writes.

2. New tables
- `social_posts`: LinkedIn and Instagram posts with captions, images, links, dates, and visibility.
- `media_assets`: Reusable image records for events, stories, leadership, and other site content.

3. Security
- Adds `is_revantage_superadmin()` using the authenticated email claim.
- Enables RLS on both new tables.
- Public users can only read active social posts and media assets.
- Only the requested superadmin can create, edit, or delete CMS content.
- Existing CMS write policies are replaced with superadmin-only policies.
- Application and contact records remain insertable publicly but readable only by the superadmin.
- Creates a public `site-media` bucket for website images; only the superadmin can upload, update, or delete files.

4. Important notes
- The browser still uses Supabase email/password authentication; database rules enforce the CMS boundary independently of the UI.
- Existing rows are preserved. No tables, columns, or user data are dropped.
*/

CREATE OR REPLACE FUNCTION public.is_revantage_superadmin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT lower(coalesce(auth.jwt() ->> 'email', '')) = 'mgoel@revantagehbs.com';
$$;

REVOKE EXECUTE ON FUNCTION public.is_revantage_superadmin() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_revantage_superadmin() TO authenticated;

CREATE TABLE IF NOT EXISTS public.social_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL CHECK (platform IN ('LinkedIn', 'Instagram')),
  title text NOT NULL,
  excerpt text NOT NULL,
  post_url text NOT NULL UNIQUE,
  image_url text,
  published_at timestamptz NOT NULL DEFAULT now(),
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image_url text NOT NULL,
  alt_text text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'General',
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_social_posts" ON public.social_posts;
CREATE POLICY "public_read_social_posts" ON public.social_posts FOR SELECT
  TO anon, authenticated USING (is_active = true);
DROP POLICY IF EXISTS "superadmin_insert_social_posts" ON public.social_posts;
CREATE POLICY "superadmin_insert_social_posts" ON public.social_posts FOR INSERT
  TO authenticated WITH CHECK (public.is_revantage_superadmin());
DROP POLICY IF EXISTS "superadmin_update_social_posts" ON public.social_posts;
CREATE POLICY "superadmin_update_social_posts" ON public.social_posts FOR UPDATE
  TO authenticated USING (public.is_revantage_superadmin()) WITH CHECK (public.is_revantage_superadmin());
DROP POLICY IF EXISTS "superadmin_delete_social_posts" ON public.social_posts;
CREATE POLICY "superadmin_delete_social_posts" ON public.social_posts FOR DELETE
  TO authenticated USING (public.is_revantage_superadmin());

DROP POLICY IF EXISTS "public_read_media_assets" ON public.media_assets;
CREATE POLICY "public_read_media_assets" ON public.media_assets FOR SELECT
  TO anon, authenticated USING (is_active = true);
DROP POLICY IF EXISTS "superadmin_insert_media_assets" ON public.media_assets;
CREATE POLICY "superadmin_insert_media_assets" ON public.media_assets FOR INSERT
  TO authenticated WITH CHECK (public.is_revantage_superadmin());
DROP POLICY IF EXISTS "superadmin_update_media_assets" ON public.media_assets;
CREATE POLICY "superadmin_update_media_assets" ON public.media_assets FOR UPDATE
  TO authenticated USING (public.is_revantage_superadmin()) WITH CHECK (public.is_revantage_superadmin());
DROP POLICY IF EXISTS "superadmin_delete_media_assets" ON public.media_assets;
CREATE POLICY "superadmin_delete_media_assets" ON public.media_assets FOR DELETE
  TO authenticated USING (public.is_revantage_superadmin());

DROP POLICY IF EXISTS "admin_insert_departments" ON public.departments;
DROP POLICY IF EXISTS "admin_update_departments" ON public.departments;
DROP POLICY IF EXISTS "admin_delete_departments" ON public.departments;
CREATE POLICY "superadmin_insert_departments" ON public.departments FOR INSERT TO authenticated WITH CHECK (public.is_revantage_superadmin());
CREATE POLICY "superadmin_update_departments" ON public.departments FOR UPDATE TO authenticated USING (public.is_revantage_superadmin()) WITH CHECK (public.is_revantage_superadmin());
CREATE POLICY "superadmin_delete_departments" ON public.departments FOR DELETE TO authenticated USING (public.is_revantage_superadmin());

DROP POLICY IF EXISTS "admin_insert_jobs" ON public.jobs;
DROP POLICY IF EXISTS "admin_update_jobs" ON public.jobs;
DROP POLICY IF EXISTS "admin_delete_jobs" ON public.jobs;
CREATE POLICY "superadmin_insert_jobs" ON public.jobs FOR INSERT TO authenticated WITH CHECK (public.is_revantage_superadmin());
CREATE POLICY "superadmin_update_jobs" ON public.jobs FOR UPDATE TO authenticated USING (public.is_revantage_superadmin()) WITH CHECK (public.is_revantage_superadmin());
CREATE POLICY "superadmin_delete_jobs" ON public.jobs FOR DELETE TO authenticated USING (public.is_revantage_superadmin());

DROP POLICY IF EXISTS "admin_insert_stories" ON public.employee_stories;
DROP POLICY IF EXISTS "admin_update_stories" ON public.employee_stories;
DROP POLICY IF EXISTS "admin_delete_stories" ON public.employee_stories;
CREATE POLICY "superadmin_insert_stories" ON public.employee_stories FOR INSERT TO authenticated WITH CHECK (public.is_revantage_superadmin());
CREATE POLICY "superadmin_update_stories" ON public.employee_stories FOR UPDATE TO authenticated USING (public.is_revantage_superadmin()) WITH CHECK (public.is_revantage_superadmin());
CREATE POLICY "superadmin_delete_stories" ON public.employee_stories FOR DELETE TO authenticated USING (public.is_revantage_superadmin());

DROP POLICY IF EXISTS "admin_insert_leadership" ON public.leadership;
DROP POLICY IF EXISTS "admin_update_leadership" ON public.leadership;
DROP POLICY IF EXISTS "admin_delete_leadership" ON public.leadership;
CREATE POLICY "superadmin_insert_leadership" ON public.leadership FOR INSERT TO authenticated WITH CHECK (public.is_revantage_superadmin());
CREATE POLICY "superadmin_update_leadership" ON public.leadership FOR UPDATE TO authenticated USING (public.is_revantage_superadmin()) WITH CHECK (public.is_revantage_superadmin());
CREATE POLICY "superadmin_delete_leadership" ON public.leadership FOR DELETE TO authenticated USING (public.is_revantage_superadmin());

DROP POLICY IF EXISTS "admin_insert_events" ON public.events;
DROP POLICY IF EXISTS "admin_update_events" ON public.events;
DROP POLICY IF EXISTS "admin_delete_events" ON public.events;
CREATE POLICY "superadmin_insert_events" ON public.events FOR INSERT TO authenticated WITH CHECK (public.is_revantage_superadmin());
CREATE POLICY "superadmin_update_events" ON public.events FOR UPDATE TO authenticated USING (public.is_revantage_superadmin()) WITH CHECK (public.is_revantage_superadmin());
CREATE POLICY "superadmin_delete_events" ON public.events FOR DELETE TO authenticated USING (public.is_revantage_superadmin());

DROP POLICY IF EXISTS "admin_read_applications" ON public.job_applications;
DROP POLICY IF EXISTS "admin_update_applications" ON public.job_applications;
DROP POLICY IF EXISTS "admin_delete_applications" ON public.job_applications;
CREATE POLICY "superadmin_read_applications" ON public.job_applications FOR SELECT TO authenticated USING (public.is_revantage_superadmin());
CREATE POLICY "superadmin_update_applications" ON public.job_applications FOR UPDATE TO authenticated USING (public.is_revantage_superadmin()) WITH CHECK (public.is_revantage_superadmin());
CREATE POLICY "superadmin_delete_applications" ON public.job_applications FOR DELETE TO authenticated USING (public.is_revantage_superadmin());

DROP POLICY IF EXISTS "admin_read_contacts" ON public.contact_submissions;
DROP POLICY IF EXISTS "admin_delete_contacts" ON public.contact_submissions;
CREATE POLICY "superadmin_read_contacts" ON public.contact_submissions FOR SELECT TO authenticated USING (public.is_revantage_superadmin());
CREATE POLICY "superadmin_delete_contacts" ON public.contact_submissions FOR DELETE TO authenticated USING (public.is_revantage_superadmin());

INSERT INTO storage.buckets (id, name, public)
VALUES ('site-media', 'site-media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "public_read_site_media" ON storage.objects;
CREATE POLICY "public_read_site_media" ON storage.objects FOR SELECT
  TO anon, authenticated USING (bucket_id = 'site-media');
DROP POLICY IF EXISTS "superadmin_insert_site_media" ON storage.objects;
CREATE POLICY "superadmin_insert_site_media" ON storage.objects FOR INSERT
  TO authenticated WITH CHECK (bucket_id = 'site-media' AND public.is_revantage_superadmin());
DROP POLICY IF EXISTS "superadmin_update_site_media" ON storage.objects;
CREATE POLICY "superadmin_update_site_media" ON storage.objects FOR UPDATE
  TO authenticated USING (bucket_id = 'site-media' AND public.is_revantage_superadmin())
  WITH CHECK (bucket_id = 'site-media' AND public.is_revantage_superadmin());
DROP POLICY IF EXISTS "superadmin_delete_site_media" ON storage.objects;
CREATE POLICY "superadmin_delete_site_media" ON storage.objects FOR DELETE
  TO authenticated USING (bucket_id = 'site-media' AND public.is_revantage_superadmin());

INSERT INTO public.social_posts (platform, title, excerpt, post_url, image_url, published_at, display_order)
VALUES
  ('LinkedIn', 'People who make the difference', 'A look at the teams, ideas, and everyday wins shaping healthcare revenue cycle work from India.', 'https://www.linkedin.com/company/revantage-healthcare/', NULL, now(), 1),
  ('Instagram', 'Life inside Revantage', 'Behind the scenes from celebrations, learning moments, team rituals, and the people who make our culture feel like home.', 'https://www.instagram.com/revantage_healthcare/', NULL, now() - interval '1 day', 2)
ON CONFLICT (post_url) DO NOTHING;

CREATE INDEX IF NOT EXISTS idx_social_posts_active_order ON public.social_posts (is_active, display_order, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_media_assets_active_order ON public.media_assets (is_active, category, display_order);
