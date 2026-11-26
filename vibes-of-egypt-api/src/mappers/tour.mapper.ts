import type { TourDto, TourItineraryDayDto } from '../types/catalog';
import type { TourRow } from '../types/database';
import { mapDestinationSummary } from './destination.mapper';

export function mapTour(row: TourRow): TourDto {
  const destination = mapDestinationSummary(row.destination);
  const included = Array.isArray(row.included) ? row.included : [];
  const excluded = Array.isArray(row.excluded) ? row.excluded : [];
  const gallery = Array.isArray(row.gallery) ? row.gallery : [];
  const itinerary = Array.isArray(row.itinerary)
    ? (row.itinerary as TourItineraryDayDto[])
    : [];

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    ...(row.subheadline ? { subheadline: row.subheadline } : {}),
    category: row.category,
    ...(row.city ? { city: row.city } : {}),
    destinationId: row.destination_id,
    ...(destination ? { destinationSlug: destination.slug, destinationName: destination.name, destination } : {}),
    duration: row.duration,
    price: Number(row.price),
    rating: Number(row.rating),
    reviewsCount: Number(row.reviews_count ?? 0),
    ...(row.badge ? { badge: row.badge } : {}),
    image: row.image_url,
    images: gallery,
    ...(row.overview ? { overview: row.overview } : {}),
    description: row.description,
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    included,
    excluded,
    inclusions: included,
    itinerary,
    ...(row.inquiry_info ? { inquiryInfo: row.inquiry_info } : {}),
    featured: Boolean(row.is_featured),
  };
}
