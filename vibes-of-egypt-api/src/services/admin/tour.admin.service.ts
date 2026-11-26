import { getSupabaseClient } from '../../config/supabase';
import { mapTour } from '../../mappers/tour.mapper';
import { AppError } from '../../types/api';
import type { TourDto } from '../../types/catalog';
import type { TourRow } from '../../types/database';
import { throwDbError } from '../../utils/dbError';
import {
  resolveIsPublished,
  type AdminListQuery,
  type AdminStatus,
} from '../../validators/admin/common.validator';
import type { CreateTourInput, UpdateTourInput } from '../../validators/admin/tour.validator';

export interface AdminTourDto extends TourDto {
  status: AdminStatus;
  isPublished: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

const TOUR_SELECT = '*, destination:destinations(id, slug, name, category, image_url)';

function toAdminDto(row: TourRow): AdminTourDto {
  return {
    ...mapTour(row),
    status: row.is_published ? 'published' : 'draft',
    isPublished: row.is_published,
    displayOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listAdminTours(query: AdminListQuery): Promise<AdminTourDto[]> {
  const supabase = getSupabaseClient();
  let req = supabase.from('tours').select(TOUR_SELECT);

  if (query.status === 'published') {
    req = req.eq('is_published', true);
  } else if (query.status === 'draft' || query.status === 'archived') {
    req = req.eq('is_published', false);
  }

  const { data, error } = await req
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) throwDbError(error, 'Failed to list tours');
  return ((data ?? []) as TourRow[]).map(toAdminDto);
}

export async function getAdminTourById(id: string): Promise<AdminTourDto> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('tours')
    .select(TOUR_SELECT)
    .eq('id', id)
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to fetch tour');
  if (!data) throw new AppError(`Tour "${id}" not found`, 404, 'NOT_FOUND');

  return toAdminDto(data as TourRow);
}

export async function createAdminTour(input: CreateTourInput): Promise<AdminTourDto> {
  const supabase = getSupabaseClient();
  const isPublished = resolveIsPublished(input) ?? false;

  const { data, error } = await supabase
    .from('tours')
    .insert({
      destination_id: input.destinationId,
      slug: input.slug,
      title: input.title,
      subheadline: input.subheadline ?? null,
      category: input.category,
      city: input.city ?? null,
      duration: input.duration,
      price: input.price,
      rating: input.rating,
      reviews_count: input.reviewsCount,
      badge: input.badge ?? null,
      image_url: input.image,
      gallery: input.images,
      overview: input.overview ?? null,
      description: input.description,
      highlights: input.highlights,
      included: input.included,
      excluded: input.excluded,
      itinerary: input.itinerary,
      inquiry_info: input.inquiryInfo ?? null,
      is_featured: input.featured,
      is_published: isPublished,
      sort_order: input.displayOrder,
    })
    .select(TOUR_SELECT)
    .single();

  if (error || !data) throwDbError(error ?? { message: 'Insert failed' }, 'Failed to create tour');
  return toAdminDto(data as TourRow);
}

export async function updateAdminTour(id: string, input: UpdateTourInput): Promise<AdminTourDto> {
  const supabase = getSupabaseClient();
  const updates: Record<string, unknown> = {};

  if (input.destinationId !== undefined) updates.destination_id = input.destinationId;
  if (input.slug !== undefined) updates.slug = input.slug;
  if (input.title !== undefined) updates.title = input.title;
  if (input.subheadline !== undefined) updates.subheadline = input.subheadline;
  if (input.category !== undefined) updates.category = input.category;
  if (input.city !== undefined) updates.city = input.city;
  if (input.duration !== undefined) updates.duration = input.duration;
  if (input.price !== undefined) updates.price = input.price;
  if (input.rating !== undefined) updates.rating = input.rating;
  if (input.reviewsCount !== undefined) updates.reviews_count = input.reviewsCount;
  if (input.badge !== undefined) updates.badge = input.badge;
  if (input.image !== undefined) updates.image_url = input.image;
  if (input.images !== undefined) updates.gallery = input.images;
  if (input.overview !== undefined) updates.overview = input.overview;
  if (input.description !== undefined) updates.description = input.description;
  if (input.highlights !== undefined) updates.highlights = input.highlights;
  if (input.included !== undefined) updates.included = input.included;
  if (input.excluded !== undefined) updates.excluded = input.excluded;
  if (input.itinerary !== undefined) updates.itinerary = input.itinerary;
  if (input.inquiryInfo !== undefined) updates.inquiry_info = input.inquiryInfo;
  if (input.featured !== undefined) updates.is_featured = input.featured;
  if (input.displayOrder !== undefined) updates.sort_order = input.displayOrder;

  const isPublished = resolveIsPublished(input);
  if (isPublished !== undefined) updates.is_published = isPublished;

  const { data, error } = await supabase
    .from('tours')
    .update(updates)
    .eq('id', id)
    .select(TOUR_SELECT)
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to update tour');
  if (!data) throw new AppError(`Tour "${id}" not found`, 404, 'NOT_FOUND');

  return toAdminDto(data as TourRow);
}

export async function deleteAdminTour(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('tours')
    .delete()
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to delete tour');
  if (!data) throw new AppError(`Tour "${id}" not found`, 404, 'NOT_FOUND');
}
