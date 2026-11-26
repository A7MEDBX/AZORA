import { getSupabaseClient } from '../../config/supabase';
import { mapSpecialOffer } from '../../mappers/offer.mapper';
import { AppError } from '../../types/api';
import type { SpecialOfferDto } from '../../types/catalog';
import type { SpecialOfferRow } from '../../types/database';
import { throwDbError } from '../../utils/dbError';
import type { AdminListQuery, AdminStatus } from '../../validators/admin/common.validator';
import type { CreateOfferInput, UpdateOfferInput } from '../../validators/admin/offer.validator';
import { validatePolymorphicTarget } from '../polymorphic.service';

export interface AdminOfferDto extends SpecialOfferDto {
  status: AdminStatus;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

function toAdminDto(row: SpecialOfferRow): AdminOfferDto {
  return {
    ...mapSpecialOffer(row),
    status: row.is_active ? 'published' : 'draft',
    isActive: row.is_active,
    displayOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listAdminOffers(query: AdminListQuery): Promise<AdminOfferDto[]> {
  const supabase = getSupabaseClient();
  let req = supabase.from('special_offers').select('*');

  if (query.status === 'published') {
    req = req.eq('is_active', true);
  } else if (query.status === 'draft' || query.status === 'archived') {
    req = req.eq('is_active', false);
  }

  const { data, error } = await req
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) throwDbError(error, 'Failed to list special offers');
  return ((data ?? []) as SpecialOfferRow[]).map(toAdminDto);
}

export async function getAdminOfferById(id: string): Promise<AdminOfferDto> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('special_offers')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to fetch special offer');
  if (!data) throw new AppError(`Special offer "${id}" not found`, 404, 'NOT_FOUND');

  return toAdminDto(data as SpecialOfferRow);
}

export async function createAdminOffer(input: CreateOfferInput): Promise<AdminOfferDto> {
  const target = await validatePolymorphicTarget(input.targetType, input.targetId, {
    allowUnpublished: true,
  });

  const isActive =
    input.status !== undefined ? input.status === 'published' : (input.isActive ?? true);

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('special_offers')
    .insert({
      slug: input.slug,
      title: input.title,
      discount_label: input.discount,
      description: input.description,
      original_price: input.originalPrice,
      discounted_price: input.discountedPrice,
      validity_label: input.validity ?? null,
      image_url: input.image,
      category: input.category,
      badge: input.badge ?? null,
      target_type: input.targetType,
      target_slug: target.slug,
      starts_at: input.startsAt ?? null,
      ends_at: input.endsAt ?? null,
      is_active: isActive,
      sort_order: input.displayOrder,
    })
    .select('*')
    .single();

  if (error || !data) {
    throwDbError(error ?? { message: 'Insert failed' }, 'Failed to create special offer');
  }

  return toAdminDto(data as SpecialOfferRow);
}

export async function updateAdminOffer(
  id: string,
  input: UpdateOfferInput
): Promise<AdminOfferDto> {
  const existing = await getAdminOfferById(id);

  const effectiveStartsAt = input.startsAt !== undefined ? input.startsAt : existing.startsAt ?? null;
  const effectiveEndsAt = input.endsAt !== undefined ? input.endsAt : existing.endsAt ?? null;

  if (effectiveStartsAt && effectiveEndsAt) {
    if (Date.parse(effectiveEndsAt) <= Date.parse(effectiveStartsAt)) {
      throw new AppError('endsAt must be strictly after startsAt', 400, 'VALIDATION_ERROR');
    }
  }

  const updates: Record<string, unknown> = {};

  if (input.targetType && input.targetId) {
    const target = await validatePolymorphicTarget(input.targetType, input.targetId, {
      allowUnpublished: true,
    });
    updates.target_type = input.targetType;
    updates.target_slug = target.slug;
  }

  if (input.slug !== undefined) updates.slug = input.slug;
  if (input.title !== undefined) updates.title = input.title;
  if (input.discount !== undefined) updates.discount_label = input.discount;
  if (input.description !== undefined) updates.description = input.description;
  if (input.originalPrice !== undefined) updates.original_price = input.originalPrice;
  if (input.discountedPrice !== undefined) updates.discounted_price = input.discountedPrice;
  if (input.validity !== undefined) updates.validity_label = input.validity;
  if (input.image !== undefined) updates.image_url = input.image;
  if (input.category !== undefined) updates.category = input.category;
  if (input.badge !== undefined) updates.badge = input.badge;
  if (input.startsAt !== undefined) updates.starts_at = input.startsAt;
  if (input.endsAt !== undefined) updates.ends_at = input.endsAt;
  if (input.displayOrder !== undefined) updates.sort_order = input.displayOrder;

  if (input.status !== undefined) {
    updates.is_active = input.status === 'published';
  } else if (input.isActive !== undefined) {
    updates.is_active = input.isActive;
  }

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('special_offers')
    .update(updates)
    .eq('id', id)
    .select('*')
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to update special offer');
  if (!data) throw new AppError(`Special offer "${id}" not found`, 404, 'NOT_FOUND');

  return toAdminDto(data as SpecialOfferRow);
}

export async function deleteAdminOffer(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('special_offers')
    .delete()
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to delete special offer');
  if (!data) throw new AppError(`Special offer "${id}" not found`, 404, 'NOT_FOUND');
}
