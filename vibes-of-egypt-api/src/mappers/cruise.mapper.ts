import type { CruiseDto, CruiseItineraryDayDto, CruiseShipInfoDto } from '../types/catalog';
import type { CruiseRow } from '../types/database';

export function mapCruise(row: CruiseRow): CruiseDto {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    ...(row.profile_name ? { profileName: row.profile_name } : {}),
    ...(row.profile_title ? { profileTitle: row.profile_title } : {}),
    cruiseType: row.cruise_type,
    vesselType: row.vessel_type,
    type: row.cruise_type,
    route: row.route,
    capacity: row.capacity,
    duration: row.duration,
    durationNights: Number(row.duration_nights),
    price: Number(row.price),
    rating: Number(row.rating),
    reviewsCount: Number(row.reviews_count ?? 0),
    ...(row.badge ? { badge: row.badge } : {}),
    image: row.image_url,
    images: Array.isArray(row.gallery) ? row.gallery : [],
    ...(row.lead ? { lead: row.lead } : {}),
    description: row.description,
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    cabins: row.cabins ?? '',
    amenities: Array.isArray(row.amenities) ? row.amenities : [],
    shipInfo: (row.ship_info ?? {}) as CruiseShipInfoDto,
    itinerary: Array.isArray(row.itinerary)
      ? (row.itinerary as CruiseItineraryDayDto[])
      : [],
    featured: Boolean(row.is_featured),
  };
}
