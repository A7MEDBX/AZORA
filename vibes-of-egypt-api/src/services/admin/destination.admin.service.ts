import { getSupabaseClient } from '../../config/supabase';
import { mapDestination } from '../../mappers/destination.mapper';
import { AppError } from '../../types/api';
import type { DestinationDto } from '../../types/catalog';
import type { DestinationRow } from '../../types/database';
import { throwDbError } from '../../utils/dbError';
import {
  resolveIsPublished,
  type AdminListQuery,
  type AdminStatus,
} from '../../validators/admin/common.validator';
import type {
  CreateDestinationInput,
  UpdateDestinationInput,
} from '../../validators/admin/destination.validator';

export interface AdminDestinationDto extends DestinationDto {
  status: AdminStatus;
  isPublished: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

function toAdminDto(row: DestinationRow): AdminDestinationDto {
  return {
    ...mapDestination(row, 0),
    status: row.is_published ? 'published' : 'draft',
    isPublished: row.is_published,
    displayOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listAdminDestinations(
  query: AdminListQuery
): Promise<AdminDestinationDto[]> {
  const supabase = getSupabaseClient();
  let req = supabase.from('destinations').select('*');

  if (query.status === 'published') {
    req = req.eq('is_published', true);
  } else if (query.status === 'draft' || query.status === 'archived') {
    req = req.eq('is_published', false);
  }

  const { data, error } = await req
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) throwDbError(error, 'Failed to list destinations');
  return ((data ?? []) as DestinationRow[]).map(toAdminDto);
}

export async function getAdminDestinationById(id: string): Promise<AdminDestinationDto> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to fetch destination');
  if (!data) throw new AppError(`Destination "${id}" not found`, 404, 'NOT_FOUND');

  return toAdminDto(data as DestinationRow);
}

export async function createAdminDestination(
  input: CreateDestinationInput
): Promise<AdminDestinationDto> {
  const supabase = getSupabaseClient();
  const isPublished = resolveIsPublished(input) ?? false;

  const { data, error } = await supabase
    .from('destinations')
    .insert({
      slug: input.slug,
      name: input.name,
      arabic_name: input.arabicName ?? null,
      tagline: input.tagline,
      category: input.category,
      image_url: input.image,
      hero_image_url: input.heroImage,
      starting_price: input.startingPrice,
      short_description: input.shortDescription ?? null,
      description: input.description,
      highlights: input.highlights,
      gallery: input.gallery,
      best_time_to_visit: input.bestTimeToVisit ?? null,
      practical_info: input.practicalInfo ?? {},
      is_featured: input.featured,
      is_published: isPublished,
      sort_order: input.displayOrder,
    })
    .select('*')
    .single();

  if (error || !data) {
    throwDbError(error ?? { message: 'Insert failed' }, 'Failed to create destination');
  }

  return toAdminDto(data as DestinationRow);
}

export async function updateAdminDestination(
  id: string,
  input: UpdateDestinationInput
): Promise<AdminDestinationDto> {
  const supabase = getSupabaseClient();
  const updates: Record<string, unknown> = {};

  if (input.slug !== undefined) updates.slug = input.slug;
  if (input.name !== undefined) updates.name = input.name;
  if (input.arabicName !== undefined) updates.arabic_name = input.arabicName;
  if (input.tagline !== undefined) updates.tagline = input.tagline;
  if (input.category !== undefined) updates.category = input.category;
  if (input.image !== undefined) updates.image_url = input.image;
  if (input.heroImage !== undefined) updates.hero_image_url = input.heroImage;
  if (input.startingPrice !== undefined) updates.starting_price = input.startingPrice;
  if (input.shortDescription !== undefined) updates.short_description = input.shortDescription;
  if (input.description !== undefined) updates.description = input.description;
  if (input.highlights !== undefined) updates.highlights = input.highlights;
  if (input.gallery !== undefined) updates.gallery = input.gallery;
  if (input.bestTimeToVisit !== undefined) updates.best_time_to_visit = input.bestTimeToVisit;
  if (input.practicalInfo !== undefined) updates.practical_info = input.practicalInfo;
  if (input.featured !== undefined) updates.is_featured = input.featured;
  if (input.displayOrder !== undefined) updates.sort_order = input.displayOrder;

  const isPublished = resolveIsPublished(input);
  if (isPublished !== undefined) updates.is_published = isPublished;

  const { data, error } = await supabase
    .from('destinations')
    .update(updates)
    .eq('id', id)
    .select('*')
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to update destination');
  if (!data) throw new AppError(`Destination "${id}" not found`, 404, 'NOT_FOUND');

  return toAdminDto(data as DestinationRow);
}

export async function deleteAdminDestination(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('destinations')
    .delete()
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to delete destination');
  if (!data) throw new AppError(`Destination "${id}" not found`, 404, 'NOT_FOUND');
}
