import type { ExperienceDto, ExperiencePracticalInfoDto } from '../types/catalog';
import type { ExperienceRow } from '../types/database';
import { mapDestinationSummary } from './destination.mapper';

export function mapExperience(row: ExperienceRow): ExperienceDto {
  const destination = mapDestinationSummary(row.destination);

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    location: row.location,
    category: row.category,
    ...(row.destination_id ? { destinationId: row.destination_id } : {}),
    ...(destination ? { destination } : {}),
    duration: row.duration,
    price: Number(row.price),
    rating: Number(row.rating),
    reviewsCount: Number(row.reviews_count ?? 0),
    image: row.image_url,
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    ...(row.badge ? { badge: row.badge } : {}),
    description: row.description,
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    practicalInfo: (row.practical_info ?? {}) as ExperiencePracticalInfoDto,
    ...(row.inquiry_cta ? { inquiryCta: row.inquiry_cta } : {}),
    featured: Boolean(row.is_featured),
  };
}
