-- ============================================================================
-- Vibes of Egypt — Migration 003: Cloudinary Media Assets Registry Table
-- File: supabase/migrations/003_media_assets.sql
-- Description: Tracks all uploaded Cloudinary images (public_id, secure_url,
--              folder, dimensions, size, and uploader) while keeping fast
--              direct CDN URLs on catalog tables for zero-join public reads.
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id TEXT NOT NULL UNIQUE,
  secure_url TEXT NOT NULL,
  folder TEXT NOT NULL,
  format TEXT NULL,
  width INTEGER NULL CHECK (width IS NULL OR width > 0),
  height INTEGER NULL CHECK (height IS NULL OR height > 0),
  bytes INTEGER NULL CHECK (bytes IS NULL OR bytes >= 0),
  uploaded_by TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_media_assets_folder_created_at
  ON public.media_assets (folder, created_at DESC);

ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.media_assets FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.media_assets TO service_role;
