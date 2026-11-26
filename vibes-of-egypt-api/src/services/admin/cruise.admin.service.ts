import { getSupabaseClient } from '../../config/supabase';
import { mapCruise } from '../../mappers/cruise.mapper';
import { AppError } from '../../types/api';
import type { CruiseDto } from '../../types/catalog';
import type { CruiseRow } from '../../types/database';
import { throwDbError } from '../../utils/dbError';
import {
  resolveIsPublished,
  type AdminListQuery,
  type AdminStatus,
} from '../../validators/admin/common.validator';
import type { CreateCruiseInput, UpdateCruiseInput } from '../../validators/admin/cruise.validator';

export interface AdminCruiseDto extends CruiseDto {
  status: AdminStatus;
  isPublished: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

function toAdminDto(row: CruiseRow): AdminCruiseDto {
  return {
    ...mapCruise(row),
    status: row.is_published ? 'published' : 'draft',
    isPublished: row.is_published,
    displayOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listAdminCruises(query: AdminListQuery): Promise<AdminCruiseDto[]> {
  const supabase = getSupabaseClient();
  let req = supabase.from('cruises').select('*');

  if (query.status === 'published') {
    req = req.eq('is_published', true);
  } else if (query.status === 'draft' || query.status === 'archived') {
    req = req.eq('is_published', false);
  }

  const { data, error } = await req
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) throwDbError(error, 'Failed to list cruises');
  return ((data ?? []) as CruiseRow[]).map(toAdminDto);
}

export async function getAdminCruiseById(id: string): Promise<AdminCruiseDto> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('cruises').select('*').eq('id', id).maybeSingle();

  if (error) throwDbError(error, 'Failed to fetch cruise');
  if (!data) throw new AppError(`Cruise "${id}" not found`, 404, 'NOT_FOUND');

  return toAdminDto(data as CruiseRow);
}

export async function createAdminCruise(input: CreateCruiseInput): Promise<AdminCruiseDto> {
  const supabase = getSupabaseClient();
  const isPublished = resolveIsPublished(input) ?? false;

  const { data, error } = await supabase
    .from('cruises')
    .insert({
      slug: input.slug,
      title: input.title,
      profile_name: input.profileName ?? null,
      profile_title: input.profileTitle ?? null,
      cruise_type: input.cruiseType,
      vessel_type: input.vesselType,
      route: input.route,
      capacity: input.capacity,
      duration: input.duration,
      duration_nights: input.durationNights,
      price: input.price,
      rating: input.rating,
      reviews_count: input.reviewsCount,
      badge: input.badge ?? null,
      image_url: input.image,
      gallery: input.images,
      lead: input.lead ?? null,
      description: input.description,
      highlights: input.highlights,
      cabins: input.cabins ?? null,
      amenities: input.amenities,
      ship_info: input.shipInfo ?? {},
      itinerary: input.itinerary,
      is_featured: input.featured,
      is_published: isPublished,
      sort_order: input.displayOrder,
    })
    .select('*')
    .single();

  if (error || !data) {
    throwDbError(error ?? { message: 'Insert failed' }, 'Failed to create cruise');
  }

  return toAdminDto(data as CruiseRow);
}

export async function updateAdminCruise(
  id: string,
  input: UpdateCruiseInput
): Promise<AdminCruiseDto> {
  const supabase = getSupabaseClient();
  const updates: Record<string, unknown> = {};

  if (input.slug !== undefined) updates.slug = input.slug;
  if (input.title !== undefined) updates.title = input.title;
  if (input.profileName !== undefined) updates.profile_name = input.profileName;
  if (input.profileTitle !== undefined) updates.profile_title = input.profileTitle;
  if (input.cruiseType !== undefined) updates.cruise_type = input.cruiseType;
  if (input.vesselType !== undefined) updates.vessel_type = input.vesselType;
  if (input.route !== undefined) updates.route = input.route;
  if (input.capacity !== undefined) updates.capacity = input.capacity;
  if (input.duration !== undefined) updates.duration = input.duration;
  if (input.durationNights !== undefined) updates.duration_nights = input.durationNights;
  if (input.price !== undefined) updates.price = input.price;
  if (input.rating !== undefined) updates.rating = input.rating;
  if (input.reviewsCount !== undefined) updates.reviews_count = input.reviewsCount;
  if (input.badge !== undefined) updates.badge = input.badge;
  if (input.image !== undefined) updates.image_url = input.image;
  if (input.images !== undefined) updates.gallery = input.images;
  if (input.lead !== undefined) updates.lead = input.lead;
  if (input.description !== undefined) updates.description = input.description;
  if (input.highlights !== undefined) updates.highlights = input.highlights;
  if (input.cabins !== undefined) updates.cabins = input.cabins;
  if (input.amenities !== undefined) updates.amenities = input.amenities;
  if (input.shipInfo !== undefined) updates.ship_info = input.shipInfo;
  if (input.itinerary !== undefined) updates.itinerary = input.itinerary;
  if (input.featured !== undefined) updates.is_featured = input.featured;
  if (input.displayOrder !== undefined) updates.sort_order = input.displayOrder;

  const isPublished = resolveIsPublished(input);
  if (isPublished !== undefined) updates.is_published = isPublished;

  const { data, error } = await supabase
    .from('cruises')
    .update(updates)
    .eq('id', id)
    .select('*')
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to update cruise');
  if (!data) throw new AppError(`Cruise "${id}" not found`, 404, 'NOT_FOUND');

  return toAdminDto(data as CruiseRow);
}

export async function deleteAdminCruise(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('cruises')
    .delete()
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to delete cruise');
  if (!data) throw new AppError(`Cruise "${id}" not found`, 404, 'NOT_FOUND');
}
