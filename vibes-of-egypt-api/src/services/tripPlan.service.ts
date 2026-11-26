import { getSupabaseClient } from '../config/supabase';
import { AppError } from '../types/api';
import type { CreateTripPlanInput } from '../validators/tripPlan.validator';

export interface TripPlanConfirmationDto {
  id: string;
  status: 'new';
  createdAt: string;
  message: string;
}

const VALID_TRAVEL_STYLES = new Set([
  'Ultra Luxury',
  'Classic Luxury',
  'Family Comfort',
  'Tailor Made',
]);

function computeDurationDays(input: CreateTripPlanInput): number {
  if (input.durationDays !== undefined) {
    return input.durationDays;
  }
  if (input.travelStartDate && input.travelEndDate) {
    const startMs = Date.parse(input.travelStartDate);
    const endMs = Date.parse(input.travelEndDate);
    if (!Number.isNaN(startMs) && !Number.isNaN(endMs) && endMs >= startMs) {
      const diffDays = Math.round((endMs - startMs) / (1000 * 60 * 60 * 24)) + 1;
      return Math.max(1, diffDays);
    }
  }
  return 7;
}

function resolveTravelStyle(input: CreateTripPlanInput): string {
  if (input.travelStyle && VALID_TRAVEL_STYLES.has(input.travelStyle)) {
    return input.travelStyle;
  }
  if (
    input.accommodationPreference &&
    VALID_TRAVEL_STYLES.has(input.accommodationPreference)
  ) {
    return input.accommodationPreference;
  }
  return 'Tailor Made';
}

function buildAdditionalNotes(input: CreateTripPlanInput): string | null {
  const parts: string[] = [];
  if (
    input.accommodationPreference &&
    !VALID_TRAVEL_STYLES.has(input.accommodationPreference)
  ) {
    parts.push(`Accommodation Preference: ${input.accommodationPreference}`);
  }
  if (input.additionalNotes) {
    parts.push(input.additionalNotes);
  }
  return parts.length > 0 ? parts.join('\n\n') : null;
}

export async function createTripPlan(
  input: CreateTripPlanInput
): Promise<TripPlanConfirmationDto> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from('trip_plans')
    .insert({
      destinations: input.preferredDestinations ?? [],
      travel_start_date: input.travelStartDate ?? null,
      travel_end_date: input.travelEndDate ?? null,
      is_dates_flexible: input.isDatesFlexible ?? false,
      duration_days: computeDurationDays(input),
      adults_count: input.adultsCount,
      children_count: input.childrenCount,
      interests: input.interests ?? [],
      travel_style: resolveTravelStyle(input),
      budget_per_person: input.budgetPerPerson ?? 'Not specified',
      full_name: input.fullName,
      email: input.email,
      phone: input.phone ?? 'Not provided',
      country: input.country ?? 'Not specified',
      additional_notes: buildAdditionalNotes(input),
      preferred_language: input.preferredLanguage ?? 'en',
      status: 'new',
    })
    .select('id, status, created_at')
    .single();

  if (error || !data) {
    throw new AppError(
      `Failed to submit trip plan: ${error?.message ?? 'Unknown database error'}`,
      500,
      'DATABASE_ERROR'
    );
  }

  return {
    id: data.id as string,
    status: 'new',
    createdAt: data.created_at as string,
    message:
      'Your bespoke trip plan request has been received. A dedicated travel specialist will prepare your itinerary shortly.',
  };
}
