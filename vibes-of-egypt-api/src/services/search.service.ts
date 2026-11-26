import { getSupabaseClient } from '../config/supabase';
import { mapCruise } from '../mappers/cruise.mapper';
import { mapDestination } from '../mappers/destination.mapper';
import { mapExperience } from '../mappers/experience.mapper';
import { mapJournalArticle } from '../mappers/journal.mapper';
import { mapPackage } from '../mappers/package.mapper';
import { mapTour } from '../mappers/tour.mapper';
import { AppError } from '../types/api';
import type {
  CruiseDto,
  DestinationDto,
  ExperienceDto,
  JournalArticleDto,
  PackageDto,
  TourDto,
} from '../types/catalog';
import type {
  CruiseRow,
  DestinationRow,
  ExperienceRow,
  JournalArticleRow,
  PackageRow,
  TourRow,
} from '../types/database';
import type { SearchQuery, SearchType } from '../validators/search.validator';

export interface SearchResultsResponse {
  query: string;
  type: SearchType;
  total: number;
  results: {
    destinations: DestinationDto[];
    tours: TourDto[];
    packages: PackageDto[];
    cruises: CruiseDto[];
    experiences: ExperienceDto[];
    journal: JournalArticleDto[];
  };
}

/**
 * Sanitizes search term for PostgREST ilike inside .or() filter strings.
 */
function buildIlikePattern(raw: string): string {
  const sanitized = raw.replace(/[,()]/g, ' ').replace(/[%_\\]/g, '\\$&').trim();
  return `%${sanitized}%`;
}

export async function searchCatalog(params: SearchQuery): Promise<SearchResultsResponse> {
  const supabase = getSupabaseClient();
  const pattern = buildIlikePattern(params.q);
  const targetType = params.type;

  const shouldSearch = (t: Exclude<SearchType, 'all'>): boolean =>
    targetType === 'all' || targetType === t;

  const [destinations, tours, packages, cruises, experiences, journal] = await Promise.all([
    shouldSearch('destination')
      ? (async (): Promise<DestinationDto[]> => {
          const { data, error } = await supabase
            .from('destinations')
            .select('*')
            .eq('is_published', true)
            .or(
              `name.ilike.${pattern},tagline.ilike.${pattern},short_description.ilike.${pattern},description.ilike.${pattern},category.ilike.${pattern}`
            )
            .order('sort_order', { ascending: true })
            .order('created_at', { ascending: false });

          if (error) {
            throw new AppError(`Search destinations failed: ${error.message}`, 500, 'DATABASE_ERROR');
          }
          return ((data ?? []) as DestinationRow[]).map((row) => mapDestination(row, 0));
        })()
      : Promise.resolve<DestinationDto[]>([]),

    shouldSearch('tour')
      ? (async (): Promise<TourDto[]> => {
          const { data, error } = await supabase
            .from('tours')
            .select('*, destination:destinations(id, slug, name, category, image_url)')
            .eq('is_published', true)
            .or(
              `title.ilike.${pattern},subheadline.ilike.${pattern},overview.ilike.${pattern},description.ilike.${pattern},category.ilike.${pattern}`
            )
            .order('sort_order', { ascending: true })
            .order('created_at', { ascending: false });

          if (error) {
            throw new AppError(`Search tours failed: ${error.message}`, 500, 'DATABASE_ERROR');
          }
          return ((data ?? []) as TourRow[]).map(mapTour);
        })()
      : Promise.resolve<TourDto[]>([]),

    shouldSearch('package')
      ? (async (): Promise<PackageDto[]> => {
          const { data, error } = await supabase
            .from('packages')
            .select(
              `
              *,
              package_destinations (
                sort_order,
                destination:destinations (id, slug, name, category, image_url, is_published)
              )
            `
            )
            .eq('is_published', true)
            .or(
              `title.ilike.${pattern},overview.ilike.${pattern},description.ilike.${pattern},route.ilike.${pattern},category.ilike.${pattern}`
            )
            .order('sort_order', { ascending: true })
            .order('created_at', { ascending: false });

          if (error) {
            throw new AppError(`Search packages failed: ${error.message}`, 500, 'DATABASE_ERROR');
          }
          return ((data ?? []) as PackageRow[]).map(mapPackage);
        })()
      : Promise.resolve<PackageDto[]>([]),

    shouldSearch('cruise')
      ? (async (): Promise<CruiseDto[]> => {
          const { data, error } = await supabase
            .from('cruises')
            .select('*')
            .eq('is_published', true)
            .or(
              `title.ilike.${pattern},lead.ilike.${pattern},description.ilike.${pattern},route.ilike.${pattern},cruise_type.ilike.${pattern}`
            )
            .order('sort_order', { ascending: true })
            .order('created_at', { ascending: false });

          if (error) {
            throw new AppError(`Search cruises failed: ${error.message}`, 500, 'DATABASE_ERROR');
          }
          return ((data ?? []) as CruiseRow[]).map(mapCruise);
        })()
      : Promise.resolve<CruiseDto[]>([]),

    shouldSearch('experience')
      ? (async (): Promise<ExperienceDto[]> => {
          const { data, error } = await supabase
            .from('experiences')
            .select('*, destination:destinations(id, slug, name, category, image_url)')
            .eq('is_published', true)
            .or(
              `title.ilike.${pattern},location.ilike.${pattern},description.ilike.${pattern},category.ilike.${pattern}`
            )
            .order('sort_order', { ascending: true })
            .order('created_at', { ascending: false });

          if (error) {
            throw new AppError(`Search experiences failed: ${error.message}`, 500, 'DATABASE_ERROR');
          }
          return ((data ?? []) as ExperienceRow[]).map(mapExperience);
        })()
      : Promise.resolve<ExperienceDto[]>([]),

    shouldSearch('journal')
      ? (async (): Promise<JournalArticleDto[]> => {
          const { data, error } = await supabase
            .from('journal_articles')
            .select('*')
            .eq('is_published', true)
            .or(
              `title.ilike.${pattern},excerpt.ilike.${pattern},category.ilike.${pattern}`
            )
            .order('published_date', { ascending: false })
            .order('created_at', { ascending: false });

          if (error) {
            throw new AppError(`Search journal failed: ${error.message}`, 500, 'DATABASE_ERROR');
          }
          return ((data ?? []) as JournalArticleRow[]).map(mapJournalArticle);
        })()
      : Promise.resolve<JournalArticleDto[]>([]),
  ]);

  const total =
    destinations.length +
    tours.length +
    packages.length +
    cruises.length +
    experiences.length +
    journal.length;

  return {
    query: params.q,
    type: targetType,
    total,
    results: {
      destinations,
      tours,
      packages,
      cruises,
      experiences,
      journal,
    },
  };
}
