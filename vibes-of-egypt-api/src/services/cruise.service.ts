import { getSupabaseClient } from '../config/supabase';
import { mapCruise } from '../mappers/cruise.mapper';
import { AppError } from '../types/api';
import type { CruiseDto } from '../types/catalog';
import type { CruiseRow } from '../types/database';
import type { CruisesQuery } from '../validators/catalog.validator';

export async function listCruises(filters: CruisesQuery): Promise<CruiseDto[]> {
  const supabase = getSupabaseClient();

  let query = supabase
    .from('cruises')
    .select('*')
    .eq('is_published', true);

  if (filters.type && filters.type.toLowerCase() !== 'all') {
    query = query.ilike('cruise_type', `%${filters.type}%`);
  }

  if (filters.featured !== undefined) {
    query = query.eq('is_featured', filters.featured);
  }

  const { data, error } = await query
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    throw new AppError(`Failed to fetch cruises: ${error.message}`, 500, 'DATABASE_ERROR');
  }

  return ((data ?? []) as CruiseRow[]).map(mapCruise);
}

export async function getCruiseBySlug(slug: string): Promise<CruiseDto> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from('cruises')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error) {
    throw new AppError(`Failed to fetch cruise: ${error.message}`, 500, 'DATABASE_ERROR');
  }

  if (!data) {
    throw new AppError(`Cruise "${slug}" not found`, 404, 'NOT_FOUND');
  }

  return mapCruise(data as CruiseRow);
}
