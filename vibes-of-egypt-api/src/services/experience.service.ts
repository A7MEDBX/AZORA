import { getSupabaseClient } from '../config/supabase';
import { mapExperience } from '../mappers/experience.mapper';
import { AppError } from '../types/api';
import type { ExperienceDto } from '../types/catalog';
import type { ExperienceRow } from '../types/database';
import type { ExperiencesQuery } from '../validators/catalog.validator';

export async function listExperiences(filters: ExperiencesQuery): Promise<ExperienceDto[]> {
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
    .from('experiences')
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
    throw new AppError(`Failed to fetch experiences: ${error.message}`, 500, 'DATABASE_ERROR');
  }

  return ((data ?? []) as ExperienceRow[]).map(mapExperience);
}

export async function getExperienceBySlug(slug: string): Promise<ExperienceDto> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from('experiences')
    .select('*, destination:destinations(id, slug, name, category, image_url)')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error) {
    throw new AppError(`Failed to fetch experience: ${error.message}`, 500, 'DATABASE_ERROR');
  }

  if (!data) {
    throw new AppError(`Experience "${slug}" not found`, 404, 'NOT_FOUND');
  }

  return mapExperience(data as ExperienceRow);
}
