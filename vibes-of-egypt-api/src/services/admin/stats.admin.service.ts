import { getSupabaseClient } from '../../config/supabase';
import { throwDbError } from '../../utils/dbError';

export interface CatalogCountKpi {
  total: number;
  published: number;
}

export interface AdminStatsDto {
  catalog: {
    destinations: CatalogCountKpi;
    tours: CatalogCountKpi;
    packages: CatalogCountKpi;
    cruises: CatalogCountKpi;
    experiences: CatalogCountKpi;
    journalArticles: CatalogCountKpi;
  };
  activeSpecialOffers: number;
  pendingReviews: number;
  newInquiries: number;
  newTripPlans: number;
}

async function countRows(
  table: string,
  filter?: { column: string; value: string | boolean }
): Promise<number> {
  const supabase = getSupabaseClient();
  let query = supabase.from(table).select('id', { count: 'exact', head: true });

  if (filter) {
    query = query.eq(filter.column, filter.value);
  }

  const { count, error } = await query;
  if (error) {
    throwDbError(error, `Failed to count rows in ${table}`);
  }
  return count ?? 0;
}

async function countCatalogTable(table: string): Promise<CatalogCountKpi> {
  const [total, published] = await Promise.all([
    countRows(table),
    countRows(table, { column: 'is_published', value: true }),
  ]);
  return { total, published };
}

export async function getAdminStats(): Promise<AdminStatsDto> {
  const [
    destinations,
    tours,
    packages,
    cruises,
    experiences,
    journalArticles,
    activeSpecialOffers,
    pendingReviews,
    newInquiries,
    newTripPlans,
  ] = await Promise.all([
    countCatalogTable('destinations'),
    countCatalogTable('tours'),
    countCatalogTable('packages'),
    countCatalogTable('cruises'),
    countCatalogTable('experiences'),
    countCatalogTable('journal_articles'),
    countRows('special_offers', { column: 'is_active', value: true }),
    countRows('reviews', { column: 'is_approved', value: false }),
    countRows('inquiries', { column: 'status', value: 'new' }),
    countRows('trip_plans', { column: 'status', value: 'new' }),
  ]);

  return {
    catalog: {
      destinations,
      tours,
      packages,
      cruises,
      experiences,
      journalArticles,
    },
    activeSpecialOffers,
    pendingReviews,
    newInquiries,
    newTripPlans,
  };
}
