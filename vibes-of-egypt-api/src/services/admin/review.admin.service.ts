import { getSupabaseClient } from '../../config/supabase';
import { mapReview } from '../../mappers/review.mapper';
import { AppError } from '../../types/api';
import type { ReviewDto } from '../../types/catalog';
import type { ReviewRow } from '../../types/database';
import { throwDbError } from '../../utils/dbError';
import type {
  AdminReviewsQuery,
  CreateAdminReviewInput,
  UpdateAdminReviewInput,
} from '../../validators/admin/review.admin.validator';
import { validatePolymorphicTarget } from '../polymorphic.service';

export interface AdminReviewDto extends ReviewDto {
  reviewerName: string;
  reviewerCountry: string;
  title: string;
  content: string;
  isApproved: boolean;
  createdAt: string;
}

function toAdminReviewDto(row: ReviewRow): AdminReviewDto {
  return {
    ...mapReview(row),
    reviewerName: row.author_name,
    reviewerCountry: row.author_location ?? '',
    title: row.entity_title,
    content: row.comment,
    isApproved: row.is_approved,
    createdAt: row.created_at,
  };
}

export async function listAdminReviews(
  query: AdminReviewsQuery
): Promise<AdminReviewDto[]> {
  const supabase = getSupabaseClient();
  let req = supabase.from('reviews').select('*');

  if (query.approved !== undefined) {
    req = req.eq('is_approved', query.approved);
  }

  if (query.targetType) {
    req = req.eq('entity_type', query.targetType);
  }

  const { data, error } = await req.order('created_at', { ascending: false });
  if (error) throwDbError(error, 'Failed to list reviews');

  return ((data ?? []) as ReviewRow[]).map(toAdminReviewDto);
}

export async function createAdminReview(
  input: CreateAdminReviewInput
): Promise<AdminReviewDto> {
  let entityType: 'tour' | 'package' | 'cruise' | 'experience' | 'general' = 'general';
  let entitySlug: string | null = null;

  if (input.targetType && input.targetId) {
    const validated = await validatePolymorphicTarget(input.targetType, input.targetId, {
      allowUnpublished: true,
    });
    entityType = validated.targetType === 'destination' ? 'general' : validated.targetType;
    entitySlug = validated.slug;
  }

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('reviews')
    .insert({
      author_name: input.reviewerName,
      author_location: input.reviewerCountry ?? null,
      author_avatar_url: input.reviewerAvatar ?? null,
      rating: input.rating,
      comment: input.content,
      entity_type: entityType,
      entity_slug: entitySlug,
      entity_title: input.title,
      is_approved: input.isApproved,
      is_featured: input.isFeatured,
    })
    .select('*')
    .single();

  if (error || !data) {
    throwDbError(error ?? { message: 'Insert failed' }, 'Failed to create review');
  }

  return toAdminReviewDto(data as ReviewRow);
}

export async function updateAdminReview(
  id: string,
  input: UpdateAdminReviewInput
): Promise<AdminReviewDto> {
  const updates: Record<string, unknown> = {};

  if (input.reviewerName !== undefined) updates.author_name = input.reviewerName;
  if (input.reviewerCountry !== undefined) updates.author_location = input.reviewerCountry;
  if (input.reviewerAvatar !== undefined) updates.author_avatar_url = input.reviewerAvatar;
  if (input.rating !== undefined) updates.rating = input.rating;
  if (input.title !== undefined) updates.entity_title = input.title;
  if (input.content !== undefined) updates.comment = input.content;
  if (input.isApproved !== undefined) updates.is_approved = input.isApproved;
  if (input.isFeatured !== undefined) updates.is_featured = input.isFeatured;

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('reviews')
    .update(updates)
    .eq('id', id)
    .select('*')
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to update review');
  if (!data) throw new AppError(`Review "${id}" not found`, 404, 'NOT_FOUND');

  return toAdminReviewDto(data as ReviewRow);
}

export async function deleteAdminReview(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to delete review');
  if (!data) throw new AppError(`Review "${id}" not found`, 404, 'NOT_FOUND');
}
