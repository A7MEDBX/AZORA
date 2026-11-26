import { getSupabaseClient } from '../config/supabase';
import { mapTour } from '../mappers/tour.mapper';
import { AppError } from '../types/api';
import type { TourDto } from '../types/catalog';
import type { TourRow } from '../types/database';
import type { ToursQuery } from '../validators/catalog.validator';

export async function listTours(filters: ToursQuery): Promise<TourDto[]> {
  const supabase = getSupabaseClient();

  let destinationIdFilter: string | undefined;

  if (filters.destination && filters.destination.toLowerCase() !== 'all') {
    const { data: dest, error: destError } = await supabase
      .from('destinations')
      .select('id')
      .eq('slug', filters.destination.toLowerCase())
      .eq('is_published', true)
      .maybeSingle();

    if (destError) {
      throw new AppError(`Failed to resolve destination filter: ${destError.message}`, 500, 'DATABASE_ERROR');
    }

    if (!dest) {
      return [];
    }

    destinationIdFilter = (dest as { id: string }).id;
  }

  let query = supabase
    .from('tours')
    .select('*, destination:destinations(id, slug, name, category, image_url)')
    .eq('is_published', true);

  if (filters.category && filters.category.toLowerCase() !== 'all') {
    query = query.ilike('category', `%${filters.category}%`);
  }

  if (destinationIdFilter) {
    query = query.eq('destination_id', destinationIdFilter);
  }

  if (filters.featured !== undefined) {
    query = query.eq('is_featured', filters.featured);
  }

  const { data, error } = await query
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    throw new AppError(`Failed to fetch tours: ${error.message}`, 500, 'DATABASE_ERROR');
  }

  return ((data ?? []) as TourRow[]).map(mapTour);
}

export async function getTourBySlug(slug: string): Promise<TourDto> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from('tours')
    .select('*, destination:destinations(id, slug, name, category, image_url)')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error) {
    throw new AppError(`Failed to fetch tour: ${error.message}`, 500, 'DATABASE_ERROR');
  }

  if (!data) {
    throw new AppError(`Tour "${slug}" not found`, 404, 'NOT_FOUND');
  }

  return mapTour(data as TourRow);
}
