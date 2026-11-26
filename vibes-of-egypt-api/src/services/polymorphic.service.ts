import { z } from 'zod';
import { getSupabaseClient } from '../config/supabase';
import { AppError } from '../types/api';
import {
  POLYMORPHIC_TARGET_TYPES,
  type PolymorphicTargetType,
} from '../validators/inquiry.validator';

export interface ValidatedPolymorphicTarget {
  targetType: PolymorphicTargetType;
  targetId: string;
  slug: string;
  title: string;
}

export interface ValidatePolymorphicOptions {
  allowUnpublished?: boolean;
}

const uuidValidator = z.string().uuid();

const TARGET_TABLE_MAP: Record<
  PolymorphicTargetType,
  { table: string; titleColumn: 'name' | 'title' }
> = {
  destination: { table: 'destinations', titleColumn: 'name' },
  tour: { table: 'tours', titleColumn: 'title' },
  package: { table: 'packages', titleColumn: 'title' },
  cruise: { table: 'cruises', titleColumn: 'title' },
  experience: { table: 'experiences', titleColumn: 'title' },
};

/**
 * Verifies that targetType is a supported catalog entity type and that targetId
 * is a valid UUID referring to an existing record in that table.
 * By default requires the target record to be published (`allowUnpublished: false`).
 */
export async function validatePolymorphicTarget(
  targetType: string,
  targetId: string,
  options: ValidatePolymorphicOptions = {}
): Promise<ValidatedPolymorphicTarget> {
  if (!POLYMORPHIC_TARGET_TYPES.includes(targetType as PolymorphicTargetType)) {
    throw new AppError(
      `Invalid targetType "${targetType}". Must be one of: ${POLYMORPHIC_TARGET_TYPES.join(', ')}`,
      400,
      'INVALID_TARGET_TYPE'
    );
  }

  if (!uuidValidator.safeParse(targetId).success) {
    throw new AppError(
      `Invalid targetId "${targetId}". Must be a valid UUID.`,
      400,
      'INVALID_TARGET_ID'
    );
  }

  const typedTarget = targetType as PolymorphicTargetType;
  const { table, titleColumn } = TARGET_TABLE_MAP[typedTarget];
  const supabase = getSupabaseClient();

  let query = supabase
    .from(table)
    .select(`id, slug, ${titleColumn}`)
    .eq('id', targetId);

  if (!options.allowUnpublished) {
    query = query.eq('is_published', true);
  }

  const { data, error } = await query.maybeSingle();

  if (error) {
    throw new AppError(
      `Failed to validate ${typedTarget} reference: ${error.message}`,
      500,
      'DATABASE_ERROR'
    );
  }

  if (!data) {
    const suffix = options.allowUnpublished ? 'does not exist.' : 'does not exist or is not published.';
    throw new AppError(
      `Referenced ${typedTarget} with id "${targetId}" ${suffix}`,
      400,
      'INVALID_TARGET_REFERENCE'
    );
  }

  const row = data as unknown as Record<string, string>;

  return {
    targetType: typedTarget,
    targetId: row.id,
    slug: row.slug,
    title: row[titleColumn],
  };
}
