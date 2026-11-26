import { getSupabaseClient } from '../config/supabase';
import { mapReview } from '../mappers/review.mapper';
import { AppError } from '../types/api';
import type { ReviewDto } from '../types/catalog';
import type { ReviewRow } from '../types/database';
import type { ReviewsQuery } from '../validators/catalog.validator';

export async function listApprovedReviews(filters: ReviewsQuery): Promise<ReviewDto[]> {
  const supabase = getSupabaseClient();

  let query = supabase
    .from('reviews')
    .select('*')
    .eq('is_approved', true);

  if (filters.targetType) {
    query = query.eq('entity_type', filters.targetType);
  }

  if (filters.targetId) {
    query = query.eq('entity_slug', filters.targetId);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    throw new AppError(`Failed to fetch reviews: ${error.message}`, 500, 'DATABASE_ERROR');
  }

  return ((data ?? []) as ReviewRow[]).map(mapReview);
}
