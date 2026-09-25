export interface Department {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  display_order: number;
}

export interface Job {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  job_type: string;
  experience_level: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  qualifications: string[];
  benefits: string[];
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface EmployeeStory {
  id: string;
  name: string;
  role: string;
  department: string;
  years_at_company: number;
  image_url: string | null;
  quote: string;
  story: string;
  display_order: number;
  is_active: boolean;
}

export interface LeadershipMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  event_date: string;
  image_url: string | null;
  category: string;
  display_order: number;
  is_active: boolean;
}

export interface JobApplication {
  id: string;
  job_id: string | null;
  job_title: string;
  name: string;
  email: string;
  phone: string;
  resume_url: string | null;
  cover_letter: string | null;
  linkedin_url: string | null;
  experience_years: number | null;
  current_company: string | null;
  status: string;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
}

export interface SocialPost {
  id: string;
  platform: 'LinkedIn' | 'Instagram';
  title: string;
  excerpt: string;
  post_url: string;
  image_url: string | null;
  published_at: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  image_url: string;
  alt_text: string;
  category: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: number;
  hero_title: string;
  hero_subtitle: string;
  hero_badge: string;
  stat_1_value: string;
  stat_1_label: string;
  stat_1_icon: string;
  stat_1_color: string;
  stat_2_value: string;
  stat_2_label: string;
  stat_2_icon: string;
  stat_2_color: string;
  stat_3_value: string;
  stat_3_label: string;
  stat_3_icon: string;
  stat_3_color: string;
  stat_4_value: string;
  stat_4_label: string;
  stat_4_icon: string;
  stat_4_color: string;
  company_description: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  linkedin_url: string;
  instagram_url: string;
  updated_at: string;
}

export interface PageContent {
  id: string;
  page_key: string;
  section_key: string;
  title: string;
  subtitle: string;
  body: string;
  image_url: string;
  metadata: Record<string, unknown>;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
