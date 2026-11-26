import type { DestinationDto, DestinationSummaryDto, PracticalInfoDto } from '../types/catalog';
import type { DestinationRow, DestinationSummaryRow } from '../types/database';

export function unwrapRelation<T>(value: T | T[] | null | undefined): T | null {
  if (!value) return null;
  return Array.isArray(value) ? (value[0] ?? null) : value;
}

export function mapDestinationSummary(
  row: DestinationSummaryRow | DestinationSummaryRow[] | null | undefined
): DestinationSummaryDto | undefined {
  const dest = unwrapRelation(row);
  if (!dest) return undefined;

  return {
    id: dest.id,
    slug: dest.slug,
    name: dest.name,
    ...(dest.category ? { category: dest.category } : {}),
    ...(dest.image_url ? { image: dest.image_url } : {}),
  };
}

export function mapDestination(row: DestinationRow, tourCount = 0): DestinationDto {
  const practicalInfo =
    row.practical_info && Object.keys(row.practical_info).length > 0
      ? (row.practical_info as PracticalInfoDto)
      : undefined;

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    ...(row.arabic_name ? { arabicName: row.arabic_name } : {}),
    tagline: row.tagline,
    category: row.category,
    image: row.image_url,
    heroImage: row.hero_image_url,
    tourCount,
    startingPrice: Number(row.starting_price),
    ...(row.short_description ? { shortDescription: row.short_description } : {}),
    description: row.description,
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    bestTimeToVisit: row.best_time_to_visit ?? '',
    ...(practicalInfo ? { practicalInfo } : {}),
    featured: Boolean(row.is_featured),
  };
}
