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
 * is a valid UUID referring to an existing, published record in that table.
 */
export async function validatePolymorphicTarget(
  targetType: string,
  targetId: string
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

  const { data, error } = await supabase
    .from(table)
    .select(`id, slug, ${titleColumn}`)
    .eq('id', targetId)
    .eq('is_published', true)
    .maybeSingle();

  if (error) {
    throw new AppError(
      `Failed to validate ${typedTarget} reference: ${error.message}`,
      500,
      'DATABASE_ERROR'
    );
  }

  if (!data) {
    throw new AppError(
      `Referenced ${typedTarget} with id "${targetId}" does not exist or is not published.`,
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
