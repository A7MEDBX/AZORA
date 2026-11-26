import type { DestinationSummaryDto, PackageDto, PackageItineraryDayDto } from '../types/catalog';
import type { PackageRow } from '../types/database';
import { mapDestinationSummary, unwrapRelation } from './destination.mapper';

export function mapPackage(row: PackageRow): PackageDto {
  const joinedDestinations = Array.isArray(row.package_destinations)
    ? [...row.package_destinations]
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map((link) => unwrapRelation(link.destination))
        .filter((dest): dest is NonNullable<typeof dest> => {
          if (!dest) return false;
          return dest.is_published !== false;
        })
    : [];

  const destinationDetails: DestinationSummaryDto[] = joinedDestinations.map((dest) => ({
    id: dest.id,
    slug: dest.slug,
    name: dest.name,
    ...(dest.category ? { category: dest.category } : {}),
    ...(dest.image_url ? { image: dest.image_url } : {}),
  }));

  const destinationNames = destinationDetails.map((d) => d.name);

  const itineraryDays: PackageItineraryDayDto[] = Array.isArray(row.package_itinerary_days)
    ? [...row.package_itinerary_days]
        .sort((a, b) => a.day_number - b.day_number)
        .map((day) => {
          const dayDestination = mapDestinationSummary(day.destination);
          return {
            day: day.day_number,
            title: day.title,
            desc: day.description,
            ...(day.meals ? { meals: day.meals } : {}),
            ...(day.accommodation ? { accommodation: day.accommodation } : {}),
            ...(dayDestination ? { destination: dayDestination } : {}),
          };
        })
    : [];

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    duration: row.duration,
    durationDays: Number(row.duration_days),
    durationNights: Number(row.duration_nights),
    category: row.category ?? 'Classic',
    price: Number(row.price),
    rating: Number(row.rating),
    reviewsCount: Number(row.reviews_count ?? 0),
    ...(row.badge ? { badge: row.badge } : {}),
    image: row.image_url,
    images: Array.isArray(row.gallery) ? row.gallery : [],
    route: row.route,
    hotels: row.hotels ?? '',
    destinationsCovered: destinationNames,
    destinations: destinationNames,
    ...(destinationDetails.length > 0 ? { destinationDetails } : {}),
    ...(row.overview ? { overview: row.overview } : {}),
    description: row.description,
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    dailyItinerary: itineraryDays,
    itinerary: itineraryDays,
    accommodation: row.accommodation ?? '',
    inclusions: Array.isArray(row.inclusions) ? row.inclusions : [],
    exclusions: Array.isArray(row.exclusions) ? row.exclusions : [],
    featured: Boolean(row.is_featured),
  };
}
