/*
# Update superadmin email check

1. Purpose
- Updates the `is_revantage_superadmin()` function to also recognize `admin@revantagehbs.com` as a superadmin email.
- The original `mgoel@revantagehbs.com` user had auth issues, so a new admin user was created via the proper Supabase auth API.

2. Security
- No table changes.
- The function remains SECURITY DEFINER and restricted to authenticated role.
*/

CREATE OR REPLACE FUNCTION public.is_revantage_superadmin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT lower(coalesce(auth.jwt() ->> 'email', '')) IN ('mgoel@revantagehbs.com', 'admin@revantagehbs.com');
$$;

REVOKE EXECUTE ON FUNCTION public.is_revantage_superadmin() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_revantage_superadmin() TO authenticated;
