import type { ReviewDto } from '../types/catalog';
import type { ReviewRow } from '../types/database';

function formatReviewDate(isoDate: string): string {
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) {
    return isoDate;
  }
  return parsed.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function mapReview(row: ReviewRow): ReviewDto {
  return {
    id: row.id,
    author: row.author_name,
    rating: Number(row.rating),
    date: formatReviewDate(row.review_date),
    location: row.author_location ?? '',
    text: row.comment,
    tourOrCruiseName: row.entity_title,
    ...(row.author_avatar_url ? { avatar: row.author_avatar_url } : {}),
    ...(row.entity_type ? { targetType: row.entity_type } : {}),
    ...(row.entity_slug ? { targetId: row.entity_slug } : {}),
    featured: Boolean(row.is_featured),
  };
}
