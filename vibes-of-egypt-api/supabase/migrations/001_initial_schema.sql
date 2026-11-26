-- ============================================================================
-- Vibes of Egypt — Initial Supabase (PostgreSQL) Schema Migration
-- File: supabase/migrations/001_initial_schema.sql
-- Description: Creates all 12 core tables, constraints, indexes, updated_at
--              triggers, Row Level Security (RLS) policies, and role GRANTs.
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================================
-- 1. REUSABLE TRIGGER FUNCTION FOR updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- ============================================================================
-- 2. TABLES (12 CORE TABLES)
-- ============================================================================

-- 1. destinations
CREATE TABLE public.destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  arabic_name TEXT NULL,
  tagline TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  hero_image_url TEXT NOT NULL,
  starting_price NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (starting_price >= 0),
  short_description TEXT NULL,
  description TEXT NOT NULL,
  highlights TEXT[] NOT NULL DEFAULT '{}',
  gallery TEXT[] NOT NULL DEFAULT '{}',
  best_time_to_visit TEXT NULL,
  practical_info JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. tours
CREATE TABLE public.tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id UUID NOT NULL REFERENCES public.destinations(id) ON DELETE RESTRICT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subheadline TEXT NULL,
  category TEXT NOT NULL,
  city TEXT NULL,
  duration TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  rating NUMERIC(3, 2) NOT NULL DEFAULT 5.00 CHECK (rating >= 0 AND rating <= 5),
  reviews_count INTEGER NOT NULL DEFAULT 0 CHECK (reviews_count >= 0),
  badge TEXT NULL,
  image_url TEXT NOT NULL,
  gallery TEXT[] NOT NULL DEFAULT '{}',
  overview TEXT NULL,
  description TEXT NOT NULL,
  highlights TEXT[] NOT NULL DEFAULT '{}',
  included TEXT[] NOT NULL DEFAULT '{}',
  excluded TEXT[] NOT NULL DEFAULT '{}',
  itinerary JSONB NOT NULL DEFAULT '[]'::jsonb,
  inquiry_info TEXT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. packages
CREATE TABLE public.packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NULL,
  duration TEXT NOT NULL,
  duration_days INTEGER NOT NULL CHECK (duration_days > 0),
  duration_nights INTEGER NOT NULL CHECK (duration_nights >= 0),
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  rating NUMERIC(3, 2) NOT NULL DEFAULT 5.00 CHECK (rating >= 0 AND rating <= 5),
  reviews_count INTEGER NOT NULL DEFAULT 0 CHECK (reviews_count >= 0),
  badge TEXT NULL,
  image_url TEXT NOT NULL,
  gallery TEXT[] NOT NULL DEFAULT '{}',
  route TEXT NOT NULL,
  hotels TEXT NULL,
  overview TEXT NULL,
  description TEXT NOT NULL,
  highlights TEXT[] NOT NULL DEFAULT '{}',
  accommodation TEXT NULL,
  inclusions TEXT[] NOT NULL DEFAULT '{}',
  exclusions TEXT[] NOT NULL DEFAULT '{}',
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. package_destinations (join table)
CREATE TABLE public.package_destinations (
  package_id UUID NOT NULL REFERENCES public.packages(id) ON DELETE CASCADE,
  destination_id UUID NOT NULL REFERENCES public.destinations(id) ON DELETE RESTRICT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (package_id, destination_id)
);

-- 5. package_itinerary_days
CREATE TABLE public.package_itinerary_days (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES public.packages(id) ON DELETE CASCADE,
  destination_id UUID NULL REFERENCES public.destinations(id) ON DELETE SET NULL,
  day_number INTEGER NOT NULL CHECK (day_number > 0),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  meals TEXT NULL,
  accommodation TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_package_itinerary_days_package_day UNIQUE (package_id, day_number)
);

-- 6. cruises
CREATE TABLE public.cruises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  profile_name TEXT NULL,
  profile_title TEXT NULL,
  cruise_type TEXT NOT NULL,
  vessel_type TEXT NOT NULL,
  route TEXT NOT NULL,
  capacity TEXT NOT NULL,
  duration TEXT NOT NULL,
  duration_nights INTEGER NOT NULL CHECK (duration_nights > 0),
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  rating NUMERIC(3, 2) NOT NULL DEFAULT 5.00 CHECK (rating >= 0 AND rating <= 5),
  reviews_count INTEGER NOT NULL DEFAULT 0 CHECK (reviews_count >= 0),
  badge TEXT NULL,
  image_url TEXT NOT NULL,
  gallery TEXT[] NOT NULL DEFAULT '{}',
  lead TEXT NULL,
  description TEXT NOT NULL,
  highlights TEXT[] NOT NULL DEFAULT '{}',
  cabins TEXT NULL,
  amenities TEXT[] NOT NULL DEFAULT '{}',
  ship_info JSONB NOT NULL DEFAULT '{}'::jsonb,
  itinerary JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. experiences
CREATE TABLE public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_id UUID NULL REFERENCES public.destinations(id) ON DELETE SET NULL,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  duration TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  rating NUMERIC(3, 2) NOT NULL DEFAULT 5.00 CHECK (rating >= 0 AND rating <= 5),
  reviews_count INTEGER NOT NULL DEFAULT 0 CHECK (reviews_count >= 0),
  badge TEXT NULL,
  image_url TEXT NOT NULL,
  gallery TEXT[] NOT NULL DEFAULT '{}',
  description TEXT NOT NULL,
  highlights TEXT[] NOT NULL DEFAULT '{}',
  practical_info JSONB NOT NULL DEFAULT '{}'::jsonb,
  inquiry_cta TEXT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. special_offers
CREATE TABLE public.special_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  discount_label TEXT NOT NULL,
  description TEXT NOT NULL,
  original_price NUMERIC(10, 2) NOT NULL CHECK (original_price >= 0),
  discounted_price NUMERIC(10, 2) NOT NULL CHECK (discounted_price >= 0 AND discounted_price <= original_price),
  validity_label TEXT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  badge TEXT NULL,
  target_type TEXT NOT NULL CHECK (target_type IN ('tour', 'package', 'cruise', 'experience')),
  target_slug TEXT NOT NULL,
  starts_at TIMESTAMPTZ NULL,
  ends_at TIMESTAMPTZ NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_special_offers_date_window CHECK (
    starts_at IS NULL OR ends_at IS NULL OR ends_at > starts_at
  )
);

-- 9. journal_articles
CREATE TABLE public.journal_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  read_time TEXT NOT NULL,
  published_date DATE NOT NULL DEFAULT CURRENT_DATE,
  author_name TEXT NOT NULL,
  author_role TEXT NULL,
  author_avatar_url TEXT NULL,
  content JSONB NOT NULL DEFAULT '[]'::jsonb,
  tags TEXT[] NOT NULL DEFAULT '{}',
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. reviews
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT NOT NULL,
  author_location TEXT NULL,
  author_avatar_url TEXT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_date DATE NOT NULL DEFAULT CURRENT_DATE,
  comment TEXT NOT NULL,
  entity_type TEXT NULL CHECK (
    entity_type IS NULL OR entity_type IN ('tour', 'package', 'cruise', 'experience', 'general')
  ),
  entity_slug TEXT NULL,
  entity_title TEXT NOT NULL,
  is_approved BOOLEAN NOT NULL DEFAULT FALSE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. inquiries
CREATE TABLE public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NULL,
  country TEXT NULL,
  subject TEXT NULL,
  message TEXT NOT NULL,
  inquiry_type TEXT NOT NULL DEFAULT 'general' CHECK (
    inquiry_type IN ('general', 'tour', 'package', 'cruise', 'experience', 'offer', 'concierge')
  ),
  target_slug TEXT NULL,
  target_title TEXT NULL,
  preferred_travel_date DATE NULL,
  travelers_count INTEGER NULL CHECK (travelers_count IS NULL OR travelers_count >= 1),
  preferred_language TEXT NOT NULL DEFAULT 'en',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'responded', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. trip_plans
CREATE TABLE public.trip_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  destinations TEXT[] NOT NULL DEFAULT '{}',
  travel_start_date DATE NULL,
  travel_end_date DATE NULL,
  is_dates_flexible BOOLEAN NOT NULL DEFAULT FALSE,
  duration_days INTEGER NOT NULL CHECK (duration_days > 0),
  adults_count INTEGER NOT NULL DEFAULT 2 CHECK (adults_count >= 1),
  children_count INTEGER NOT NULL DEFAULT 0 CHECK (children_count >= 0),
  interests TEXT[] NOT NULL DEFAULT '{}',
  travel_style TEXT NOT NULL CHECK (
    travel_style IN ('Ultra Luxury', 'Classic Luxury', 'Family Comfort', 'Tailor Made')
  ),
  budget_per_person TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  additional_notes TEXT NULL,
  preferred_language TEXT NOT NULL DEFAULT 'en',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'responded', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_trip_plans_date_range CHECK (
    travel_start_date IS NULL OR travel_end_date IS NULL OR travel_end_date >= travel_start_date
  )
);

-- ============================================================================
-- 3. INDEXES (FOREIGN KEYS, STATUS, AND COMPOSITE QUERY INDEXES)
-- ============================================================================

-- destinations
CREATE INDEX idx_destinations_published_featured_sort
  ON public.destinations (is_published, is_featured DESC, sort_order ASC);
CREATE INDEX idx_destinations_category_published
  ON public.destinations (category, is_published);

-- tours
CREATE INDEX idx_tours_destination_id
  ON public.tours (destination_id);
CREATE INDEX idx_tours_destination_published
  ON public.tours (destination_id, is_published, sort_order ASC);
CREATE INDEX idx_tours_category_published
  ON public.tours (category, is_published);
CREATE INDEX idx_tours_published_featured_sort
  ON public.tours (is_published, is_featured DESC, sort_order ASC);

-- packages
CREATE INDEX idx_packages_category_published
  ON public.packages (category, is_published);
CREATE INDEX idx_packages_published_featured_sort
  ON public.packages (is_published, is_featured DESC, sort_order ASC);
CREATE INDEX idx_packages_duration_days_published
  ON public.packages (duration_days, is_published);

-- package_destinations
CREATE INDEX idx_package_destinations_destination_id
  ON public.package_destinations (destination_id);
CREATE INDEX idx_package_destinations_package_sort
  ON public.package_destinations (package_id, sort_order ASC);

-- package_itinerary_days
CREATE INDEX idx_package_itinerary_days_package_id
  ON public.package_itinerary_days (package_id);
CREATE INDEX idx_package_itinerary_days_destination_id
  ON public.package_itinerary_days (destination_id);

-- cruises
CREATE INDEX idx_cruises_cruise_type_published
  ON public.cruises (cruise_type, is_published);
CREATE INDEX idx_cruises_published_featured_sort
  ON public.cruises (is_published, is_featured DESC, sort_order ASC);

-- experiences
CREATE INDEX idx_experiences_destination_id
  ON public.experiences (destination_id);
CREATE INDEX idx_experiences_category_published
  ON public.experiences (category, is_published);
CREATE INDEX idx_experiences_published_featured_sort
  ON public.experiences (is_published, is_featured DESC, sort_order ASC);

-- special_offers
CREATE INDEX idx_special_offers_active_window
  ON public.special_offers (is_active, starts_at, ends_at, sort_order ASC);
CREATE INDEX idx_special_offers_target
  ON public.special_offers (target_type, target_slug);

-- journal_articles
CREATE INDEX idx_journal_articles_published_date
  ON public.journal_articles (is_published, published_date DESC);
CREATE INDEX idx_journal_articles_category_published
  ON public.journal_articles (category, is_published);

-- reviews
CREATE INDEX idx_reviews_approved_featured_date
  ON public.reviews (is_approved, is_featured DESC, review_date DESC);
CREATE INDEX idx_reviews_entity
  ON public.reviews (entity_type, entity_slug)
  WHERE is_approved = TRUE;

-- inquiries
CREATE INDEX idx_inquiries_status_created_at
  ON public.inquiries (status, created_at DESC);
CREATE INDEX idx_inquiries_email
  ON public.inquiries (email);

-- trip_plans
CREATE INDEX idx_trip_plans_status_created_at
  ON public.trip_plans (status, created_at DESC);
CREATE INDEX idx_trip_plans_email
  ON public.trip_plans (email);

-- ============================================================================
-- 4. UPDATED_AT TRIGGERS
-- ============================================================================

CREATE TRIGGER trg_destinations_set_updated_at
  BEFORE UPDATE ON public.destinations
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_tours_set_updated_at
  BEFORE UPDATE ON public.tours
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_packages_set_updated_at
  BEFORE UPDATE ON public.packages
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_cruises_set_updated_at
  BEFORE UPDATE ON public.cruises
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_experiences_set_updated_at
  BEFORE UPDATE ON public.experiences
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_special_offers_set_updated_at
  BEFORE UPDATE ON public.special_offers
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_journal_articles_set_updated_at
  BEFORE UPDATE ON public.journal_articles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- 5. ROW LEVEL SECURITY (RLS) & POLICIES
-- ============================================================================

ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_itinerary_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cruises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.special_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_plans ENABLE ROW LEVEL SECURITY;

-- Public read policies for published catalog tables
CREATE POLICY "Public can read published destinations"
  ON public.destinations
  FOR SELECT
  TO anon, authenticated
  USING (is_published = TRUE);

CREATE POLICY "Public can read published tours"
  ON public.tours
  FOR SELECT
  TO anon, authenticated
  USING (is_published = TRUE);

CREATE POLICY "Public can read published packages"
  ON public.packages
  FOR SELECT
  TO anon, authenticated
  USING (is_published = TRUE);

CREATE POLICY "Public can read package destinations for published packages"
  ON public.package_destinations
  FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.packages p
      WHERE p.id = package_destinations.package_id
        AND p.is_published = TRUE
    )
  );

CREATE POLICY "Public can read itinerary days for published packages"
  ON public.package_itinerary_days
  FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.packages p
      WHERE p.id = package_itinerary_days.package_id
        AND p.is_published = TRUE
    )
  );

CREATE POLICY "Public can read published cruises"
  ON public.cruises
  FOR SELECT
  TO anon, authenticated
  USING (is_published = TRUE);

CREATE POLICY "Public can read published experiences"
  ON public.experiences
  FOR SELECT
  TO anon, authenticated
  USING (is_published = TRUE);

CREATE POLICY "Public can read active special offers"
  ON public.special_offers
  FOR SELECT
  TO anon, authenticated
  USING (
    is_active = TRUE
    AND (starts_at IS NULL OR starts_at <= NOW())
    AND (ends_at IS NULL OR ends_at > NOW())
  );

CREATE POLICY "Public can read published journal articles"
  ON public.journal_articles
  FOR SELECT
  TO anon, authenticated
  USING (is_published = TRUE);

CREATE POLICY "Public can read approved reviews"
  ON public.reviews
  FOR SELECT
  TO anon, authenticated
  USING (is_approved = TRUE);

-- Public INSERT-only policies for lead capture tables (no SELECT/UPDATE/DELETE)
CREATE POLICY "Public can submit inquiries"
  ON public.inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (status = 'new');

CREATE POLICY "Public can submit trip plans"
  ON public.trip_plans
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (status = 'new');

-- ============================================================================
-- 6. EXPLICIT ROLE PERMISSIONS (GRANT / REVOKE)
-- ============================================================================

REVOKE ALL ON TABLE
  public.destinations,
  public.tours,
  public.packages,
  public.package_destinations,
  public.package_itinerary_days,
  public.cruises,
  public.experiences,
  public.special_offers,
  public.journal_articles,
  public.reviews,
  public.inquiries,
  public.trip_plans
FROM PUBLIC, anon, authenticated;

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- Read-only grants for public catalog & approved reviews
GRANT SELECT ON TABLE
  public.destinations,
  public.tours,
  public.packages,
  public.package_destinations,
  public.package_itinerary_days,
  public.cruises,
  public.experiences,
  public.special_offers,
  public.journal_articles,
  public.reviews
TO anon, authenticated;

-- Insert-only grants for inquiries & trip_plans
GRANT INSERT ON TABLE
  public.inquiries,
  public.trip_plans
TO anon, authenticated;

-- Full access for service_role (backend API)
GRANT ALL ON TABLE
  public.destinations,
  public.tours,
  public.packages,
  public.package_destinations,
  public.package_itinerary_days,
  public.cruises,
  public.experiences,
  public.special_offers,
  public.journal_articles,
  public.reviews,
  public.inquiries,
  public.trip_plans
TO service_role;
