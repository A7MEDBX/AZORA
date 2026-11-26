import { getSupabaseClient } from '../../config/supabase';
import { mapPackage } from '../../mappers/package.mapper';
import { AppError } from '../../types/api';
import type { PackageDto } from '../../types/catalog';
import type { PackageRow } from '../../types/database';
import { throwDbError } from '../../utils/dbError';
import {
  resolveIsPublished,
  type AdminListQuery,
  type AdminStatus,
} from '../../validators/admin/common.validator';
import type {
  CreatePackageInput,
  PackageDestinationLinkInput,
  PackageItineraryDayInput,
  UpdatePackageInput,
} from '../../validators/admin/package.validator';

export interface AdminPackageDto extends PackageDto {
  status: AdminStatus;
  isPublished: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

const PACKAGE_FULL_SELECT = `
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

function toAdminDto(row: PackageRow): AdminPackageDto {
  return {
    ...mapPackage(row),
    status: row.is_published ? 'published' : 'draft',
    isPublished: row.is_published,
    displayOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function syncPackageDestinations(
  packageId: string,
  links: PackageDestinationLinkInput[]
): Promise<void> {
  const supabase = getSupabaseClient();

  const { error: deleteError } = await supabase
    .from('package_destinations')
    .delete()
    .eq('package_id', packageId);

  if (deleteError) {
    throwDbError(deleteError, 'Failed to replace package destinations');
  }

  if (links.length === 0) return;

  const deduped = new Map<string, number>();
  for (const link of links) {
    if (!deduped.has(link.destinationId)) {
      deduped.set(link.destinationId, link.displayOrder);
    }
  }

  const rows = Array.from(deduped.entries()).map(([destinationId, sortOrder]) => ({
    package_id: packageId,
    destination_id: destinationId,
    sort_order: sortOrder,
  }));

  const { error: insertError } = await supabase.from('package_destinations').insert(rows);
  if (insertError) {
    throwDbError(insertError, 'Failed to save package destinations');
  }
}

async function syncPackageItineraryDays(
  packageId: string,
  days: PackageItineraryDayInput[]
): Promise<void> {
  const supabase = getSupabaseClient();

  const { error: deleteError } = await supabase
    .from('package_itinerary_days')
    .delete()
    .eq('package_id', packageId);

  if (deleteError) {
    throwDbError(deleteError, 'Failed to replace package itinerary days');
  }

  if (days.length === 0) return;

  const rows = days.map((day) => ({
    package_id: packageId,
    destination_id: day.destinationId ?? null,
    day_number: day.dayNumber,
    title: day.title,
    description: day.description,
    meals: day.meals ?? null,
    accommodation: day.accommodation ?? day.overnightLocation ?? null,
  }));

  const { error: insertError } = await supabase.from('package_itinerary_days').insert(rows);
  if (insertError) {
    throwDbError(insertError, 'Failed to save package itinerary days');
  }
}

export async function listAdminPackages(query: AdminListQuery): Promise<AdminPackageDto[]> {
  const supabase = getSupabaseClient();
  let req = supabase.from('packages').select(PACKAGE_FULL_SELECT);

  if (query.status === 'published') {
    req = req.eq('is_published', true);
  } else if (query.status === 'draft' || query.status === 'archived') {
    req = req.eq('is_published', false);
  }

  const { data, error } = await req
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) throwDbError(error, 'Failed to list packages');
  return ((data ?? []) as PackageRow[]).map(toAdminDto);
}

export async function getAdminPackageById(id: string): Promise<AdminPackageDto> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('packages')
    .select(PACKAGE_FULL_SELECT)
    .eq('id', id)
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to fetch package');
  if (!data) throw new AppError(`Package "${id}" not found`, 404, 'NOT_FOUND');

  return toAdminDto(data as PackageRow);
}

export async function createAdminPackage(input: CreatePackageInput): Promise<AdminPackageDto> {
  const supabase = getSupabaseClient();
  const isPublished = resolveIsPublished(input) ?? false;

  const { data, error } = await supabase
    .from('packages')
    .insert({
      slug: input.slug,
      title: input.title,
      category: input.category ?? null,
      duration: input.duration,
      duration_days: input.durationDays,
      duration_nights: input.durationNights,
      price: input.price,
      rating: input.rating,
      reviews_count: input.reviewsCount,
      badge: input.badge ?? null,
      image_url: input.image,
      gallery: input.images,
      route: input.route,
      hotels: input.hotels ?? null,
      overview: input.overview ?? null,
      description: input.description,
      highlights: input.highlights,
      accommodation: input.accommodation ?? null,
      inclusions: input.inclusions,
      exclusions: input.exclusions,
      is_featured: input.featured,
      is_published: isPublished,
      sort_order: input.displayOrder,
    })
    .select('id')
    .single();

  if (error || !data) {
    throwDbError(error ?? { message: 'Insert failed' }, 'Failed to create package');
  }

  const packageId = (data as { id: string }).id;

  if (input.packageDestinations !== undefined) {
    await syncPackageDestinations(packageId, input.packageDestinations);
  }
  if (input.packageItineraryDays !== undefined) {
    await syncPackageItineraryDays(packageId, input.packageItineraryDays);
  }

  return getAdminPackageById(packageId);
}

export async function updateAdminPackage(
  id: string,
  input: UpdatePackageInput
): Promise<AdminPackageDto> {
  const supabase = getSupabaseClient();
  const updates: Record<string, unknown> = {};

  if (input.slug !== undefined) updates.slug = input.slug;
  if (input.title !== undefined) updates.title = input.title;
  if (input.category !== undefined) updates.category = input.category;
  if (input.duration !== undefined) updates.duration = input.duration;
  if (input.durationDays !== undefined) updates.duration_days = input.durationDays;
  if (input.durationNights !== undefined) updates.duration_nights = input.durationNights;
  if (input.price !== undefined) updates.price = input.price;
  if (input.rating !== undefined) updates.rating = input.rating;
  if (input.reviewsCount !== undefined) updates.reviews_count = input.reviewsCount;
  if (input.badge !== undefined) updates.badge = input.badge;
  if (input.image !== undefined) updates.image_url = input.image;
  if (input.images !== undefined) updates.gallery = input.images;
  if (input.route !== undefined) updates.route = input.route;
  if (input.hotels !== undefined) updates.hotels = input.hotels;
  if (input.overview !== undefined) updates.overview = input.overview;
  if (input.description !== undefined) updates.description = input.description;
  if (input.highlights !== undefined) updates.highlights = input.highlights;
  if (input.accommodation !== undefined) updates.accommodation = input.accommodation;
  if (input.inclusions !== undefined) updates.inclusions = input.inclusions;
  if (input.exclusions !== undefined) updates.exclusions = input.exclusions;
  if (input.featured !== undefined) updates.is_featured = input.featured;
  if (input.displayOrder !== undefined) updates.sort_order = input.displayOrder;

  const isPublished = resolveIsPublished(input);
  if (isPublished !== undefined) updates.is_published = isPublished;

  if (Object.keys(updates).length > 0) {
    const { data, error } = await supabase
      .from('packages')
      .update(updates)
      .eq('id', id)
      .select('id')
      .maybeSingle();

    if (error) throwDbError(error, 'Failed to update package');
    if (!data) throw new AppError(`Package "${id}" not found`, 404, 'NOT_FOUND');
  } else {
    // Ensure package exists before updating nested relations
    await getAdminPackageById(id);
  }

  if (input.packageDestinations !== undefined) {
    await syncPackageDestinations(id, input.packageDestinations);
  }
  if (input.packageItineraryDays !== undefined) {
    await syncPackageItineraryDays(id, input.packageItineraryDays);
  }

  return getAdminPackageById(id);
}

export async function deleteAdminPackage(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('packages')
    .delete()
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to delete package');
  if (!data) throw new AppError(`Package "${id}" not found`, 404, 'NOT_FOUND');
}
