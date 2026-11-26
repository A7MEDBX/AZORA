import { getSupabaseClient } from '../config/supabase';
import { mapPackage } from '../mappers/package.mapper';
import { AppError } from '../types/api';
import type { PackageDto } from '../types/catalog';
import type { PackageRow } from '../types/database';
import type { PackagesQuery } from '../validators/catalog.validator';

const PACKAGE_LIST_SELECT = `
  *,
  package_destinations (
    sort_order,
    destination:destinations (
      id,
      slug,
      name,
      category,
      image_url,
      is_published
    )
  )
`;

const PACKAGE_DETAIL_SELECT = `
  *,
  package_destinations (
    sort_order,
    destination:destinations (
      id,
      slug,
      name,
      category,
      image_url,
      is_published
    )
  ),
  package_itinerary_days (
    id,
    package_id,
    destination_id,
    day_number,
    title,
    description,
    meals,
    accommodation,
    created_at,
    destination:destinations (
      id,
      slug,
      name,
      category,
      image_url
    )
  )
`;

export async function listPackages(filters: PackagesQuery): Promise<PackageDto[]> {
  const supabase = getSupabaseClient();

  let query = supabase
    .from('packages')
    .select(PACKAGE_LIST_SELECT)
    .eq('is_published', true);

  if (filters.category && filters.category.toLowerCase() !== 'all') {
    query = query.ilike('category', `%${filters.category}%`);
  }

  if (filters.featured !== undefined) {
    query = query.eq('is_featured', filters.featured);
  }

  const { data, error } = await query
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    throw new AppError(`Failed to fetch packages: ${error.message}`, 500, 'DATABASE_ERROR');
  }

  return ((data ?? []) as PackageRow[]).map(mapPackage);
}

export async function getPackageBySlug(slug: string): Promise<PackageDto> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from('packages')
    .select(PACKAGE_DETAIL_SELECT)
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error) {
    throw new AppError(`Failed to fetch package: ${error.message}`, 500, 'DATABASE_ERROR');
  }

  if (!data) {
    throw new AppError(`Package "${slug}" not found`, 404, 'NOT_FOUND');
  }

  return mapPackage(data as PackageRow);
}
