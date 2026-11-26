import { getSupabaseClient } from '../../config/supabase';
import { mapExperience } from '../../mappers/experience.mapper';
import { AppError } from '../../types/api';
import type { ExperienceDto } from '../../types/catalog';
import type { ExperienceRow } from '../../types/database';
import { throwDbError } from '../../utils/dbError';
import {
  resolveIsPublished,
  type AdminListQuery,
  type AdminStatus,
} from '../../validators/admin/common.validator';
import type {
  CreateExperienceInput,
  UpdateExperienceInput,
} from '../../validators/admin/experience.validator';

export interface AdminExperienceDto extends ExperienceDto {
  status: AdminStatus;
  isPublished: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

const EXPERIENCE_SELECT = '*, destination:destinations(id, slug, name, category, image_url)';

function toAdminDto(row: ExperienceRow): AdminExperienceDto {
  return {
    ...mapExperience(row),
    status: row.is_published ? 'published' : 'draft',
    isPublished: row.is_published,
    displayOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listAdminExperiences(query: AdminListQuery): Promise<AdminExperienceDto[]> {
  const supabase = getSupabaseClient();
  let req = supabase.from('experiences').select(EXPERIENCE_SELECT);

  if (query.status === 'published') {
    req = req.eq('is_published', true);
  } else if (query.status === 'draft' || query.status === 'archived') {
    req = req.eq('is_published', false);
  }

  const { data, error } = await req
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) throwDbError(error, 'Failed to list experiences');
  return ((data ?? []) as ExperienceRow[]).map(toAdminDto);
}

export async function getAdminExperienceById(id: string): Promise<AdminExperienceDto> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('experiences')
    .select(EXPERIENCE_SELECT)
    .eq('id', id)
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to fetch experience');
  if (!data) throw new AppError(`Experience "${id}" not found`, 404, 'NOT_FOUND');

  return toAdminDto(data as ExperienceRow);
}

export async function createAdminExperience(
  input: CreateExperienceInput
): Promise<AdminExperienceDto> {
  const supabase = getSupabaseClient();
  const isPublished = resolveIsPublished(input) ?? false;

  const { data, error } = await supabase
    .from('experiences')
    .insert({
      destination_id: input.destinationId ?? null,
      slug: input.slug,
      title: input.title,
      location: input.location,
      category: input.category,
      duration: input.duration,
      price: input.price,
      rating: input.rating,
      reviews_count: input.reviewsCount,
      badge: input.badge ?? null,
      image_url: input.image,
      gallery: input.gallery,
      description: input.description,
      highlights: input.highlights,
      practical_info: input.practicalInfo ?? {},
      inquiry_cta: input.inquiryCta ?? null,
      is_featured: input.featured,
      is_published: isPublished,
      sort_order: input.displayOrder,
    })
    .select(EXPERIENCE_SELECT)
    .single();

  if (error || !data) {
    throwDbError(error ?? { message: 'Insert failed' }, 'Failed to create experience');
  }

  return toAdminDto(data as ExperienceRow);
}

export async function updateAdminExperience(
  id: string,
  input: UpdateExperienceInput
): Promise<AdminExperienceDto> {
  const supabase = getSupabaseClient();
  const updates: Record<string, unknown> = {};

  if (input.destinationId !== undefined) updates.destination_id = input.destinationId;
  if (input.slug !== undefined) updates.slug = input.slug;
  if (input.title !== undefined) updates.title = input.title;
  if (input.location !== undefined) updates.location = input.location;
  if (input.category !== undefined) updates.category = input.category;
  if (input.duration !== undefined) updates.duration = input.duration;
  if (input.price !== undefined) updates.price = input.price;
  if (input.rating !== undefined) updates.rating = input.rating;
  if (input.reviewsCount !== undefined) updates.reviews_count = input.reviewsCount;
  if (input.badge !== undefined) updates.badge = input.badge;
  if (input.image !== undefined) updates.image_url = input.image;
  if (input.gallery !== undefined) updates.gallery = input.gallery;
  if (input.description !== undefined) updates.description = input.description;
  if (input.highlights !== undefined) updates.highlights = input.highlights;
  if (input.practicalInfo !== undefined) updates.practical_info = input.practicalInfo;
  if (input.inquiryCta !== undefined) updates.inquiry_cta = input.inquiryCta;
  if (input.featured !== undefined) updates.is_featured = input.featured;
  if (input.displayOrder !== undefined) updates.sort_order = input.displayOrder;

  const isPublished = resolveIsPublished(input);
  if (isPublished !== undefined) updates.is_published = isPublished;

  const { data, error } = await supabase
    .from('experiences')
    .update(updates)
    .eq('id', id)
    .select(EXPERIENCE_SELECT)
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to update experience');
  if (!data) throw new AppError(`Experience "${id}" not found`, 404, 'NOT_FOUND');

  return toAdminDto(data as ExperienceRow);
}

export async function deleteAdminExperience(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('experiences')
    .delete()
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to delete experience');
  if (!data) throw new AppError(`Experience "${id}" not found`, 404, 'NOT_FOUND');
}
