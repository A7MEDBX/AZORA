import { getSupabaseClient } from '../config/supabase';
import { mapDestination } from '../mappers/destination.mapper';
import { mapTour } from '../mappers/tour.mapper';
import { AppError } from '../types/api';
import type { DestinationDetailDto, DestinationDto } from '../types/catalog';
import type { DestinationRow, TourRow } from '../types/database';

export async function listDestinations(): Promise<DestinationDto[]> {
  const supabase = getSupabaseClient();

  const { data: destinationRows, error } = await supabase
    .from('destinations')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    throw new AppError(`Failed to fetch destinations: ${error.message}`, 500, 'DATABASE_ERROR');
  }

  const { data: tourRows, error: toursError } = await supabase
    .from('tours')
    .select('destination_id')
    .eq('is_published', true);

  if (toursError) {
    throw new AppError(`Failed to count destination tours: ${toursError.message}`, 500, 'DATABASE_ERROR');
  }

  const tourCountByDest = new Map<string, number>();
  for (const row of tourRows ?? []) {
    const destId = (row as { destination_id: string }).destination_id;
    tourCountByDest.set(destId, (tourCountByDest.get(destId) ?? 0) + 1);
  }

  return ((destinationRows ?? []) as DestinationRow[]).map((row) =>
    mapDestination(row, tourCountByDest.get(row.id) ?? 0)
  );
}

export async function getDestinationBySlug(slug: string): Promise<DestinationDetailDto> {
  const supabase = getSupabaseClient();

  const { data: destRow, error } = await supabase
    .from('destinations')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error) {
    throw new AppError(`Failed to fetch destination: ${error.message}`, 500, 'DATABASE_ERROR');
  }

  if (!destRow) {
    throw new AppError(`Destination "${slug}" not found`, 404, 'NOT_FOUND');
  }

  const destination = destRow as DestinationRow;

  const { data: tourRows, error: toursError } = await supabase
    .from('tours')
    .select('*, destination:destinations(id, slug, name, category, image_url)')
    .eq('destination_id', destination.id)
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (toursError) {
    throw new AppError(`Failed to fetch destination tours: ${toursError.message}`, 500, 'DATABASE_ERROR');
  }

  const tours = ((tourRows ?? []) as TourRow[]).map(mapTour);

  return {
    ...mapDestination(destination, tours.length),
    tours,
  };
}
