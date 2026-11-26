import { getSupabaseClient } from '../../config/supabase';
import { AppError } from '../../types/api';
import { throwDbError } from '../../utils/dbError';
import type {
  AdminTripPlansQuery,
  UpdateTripPlanStatusInput,
} from '../../validators/admin/tripPlan.admin.validator';

interface TripPlanRow {
  id: string;
  destinations: string[] | null;
  travel_start_date: string | null;
  travel_end_date: string | null;
  is_dates_flexible: boolean;
  duration_days: number;
  adults_count: number;
  children_count: number;
  interests: string[] | null;
  travel_style: string;
  budget_per_person: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  additional_notes: string | null;
  preferred_language: string;
  status: string;
  created_at: string;
}

export interface AdminTripPlanDto {
  id: string;
  preferredDestinations: string[];
  travelStartDate: string | null;
  travelEndDate: string | null;
  isDatesFlexible: boolean;
  durationDays: number;
  adultsCount: number;
  childrenCount: number;
  interests: string[];
  travelStyle: string;
  budgetPerPerson: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  additionalNotes: string | null;
  preferredLanguage: string;
  status: string;
  createdAt: string;
}

function mapAdminTripPlan(row: TripPlanRow): AdminTripPlanDto {
  return {
    id: row.id,
    preferredDestinations: Array.isArray(row.destinations) ? row.destinations : [],
    travelStartDate: row.travel_start_date,
    travelEndDate: row.travel_end_date,
    isDatesFlexible: row.is_dates_flexible,
    durationDays: row.duration_days,
    adultsCount: row.adults_count,
    childrenCount: row.children_count,
    interests: Array.isArray(row.interests) ? row.interests : [],
    travelStyle: row.travel_style,
    budgetPerPerson: row.budget_per_person,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    country: row.country,
    additionalNotes: row.additional_notes,
    preferredLanguage: row.preferred_language,
    status: row.status,
    createdAt: row.created_at,
  };
}

function sanitizeSearchPattern(raw: string): string {
  const clean = raw.replace(/[,()]/g, ' ').replace(/[%_\\]/g, '\\$&').trim();
  return `%${clean}%`;
}

export async function listAdminTripPlans(
  query: AdminTripPlansQuery
): Promise<AdminTripPlanDto[]> {
  const supabase = getSupabaseClient();
  let req = supabase.from('trip_plans').select('*');

  if (query.status) {
    req = req.eq('status', query.status);
  }

  if (query.q) {
    const pattern = sanitizeSearchPattern(query.q);
    req = req.or(`full_name.ilike.${pattern},email.ilike.${pattern}`);
  }

  const { data, error } = await req.order('created_at', { ascending: false });
  if (error) throwDbError(error, 'Failed to list trip plans');

  return ((data ?? []) as TripPlanRow[]).map(mapAdminTripPlan);
}

export async function getAdminTripPlanById(id: string): Promise<AdminTripPlanDto> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('trip_plans')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to fetch trip plan');
  if (!data) throw new AppError(`Trip plan "${id}" not found`, 404, 'NOT_FOUND');

  return mapAdminTripPlan(data as TripPlanRow);
}

export async function updateAdminTripPlanStatus(
  id: string,
  input: UpdateTripPlanStatusInput
): Promise<AdminTripPlanDto> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('trip_plans')
    .update({ status: input.status })
    .eq('id', id)
    .select('*')
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to update trip plan status');
  if (!data) throw new AppError(`Trip plan "${id}" not found`, 404, 'NOT_FOUND');

  return mapAdminTripPlan(data as TripPlanRow);
}

export async function deleteAdminTripPlan(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('trip_plans')
    .delete()
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to delete trip plan');
  if (!data) throw new AppError(`Trip plan "${id}" not found`, 404, 'NOT_FOUND');
}
