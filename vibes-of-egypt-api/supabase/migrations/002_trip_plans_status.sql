-- ============================================================================
-- Vibes of Egypt — Migration 002: Expand trip_plans.status check constraint
-- Supports Admin Phase 2 workflow statuses alongside initial statuses.
-- ============================================================================

ALTER TABLE public.trip_plans
  DROP CONSTRAINT IF EXISTS trip_plans_status_check;

ALTER TABLE public.trip_plans
  ADD CONSTRAINT trip_plans_status_check
  CHECK (
    status IN (
      'new',
      'reviewing',
      'contacted',
      'completed',
      'cancelled',
      'in_progress',
      'responded',
      'closed'
    )
  );
