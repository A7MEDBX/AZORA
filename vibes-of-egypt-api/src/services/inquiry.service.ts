import { getSupabaseClient } from '../config/supabase';
import { AppError } from '../types/api';
import type { CreateInquiryInput } from '../validators/inquiry.validator';
import { validatePolymorphicTarget } from './polymorphic.service';

export interface InquiryConfirmationDto {
  id: string;
  status: 'new';
  createdAt: string;
  message: string;
}

const VALID_DB_INQUIRY_TYPES = new Set([
  'general',
  'tour',
  'package',
  'cruise',
  'experience',
  'offer',
  'concierge',
]);

function resolveDbInquiryType(
  requestedType?: string,
  targetType?: string
): string {
  if (requestedType) {
    const normalized = requestedType.toLowerCase();
    if (VALID_DB_INQUIRY_TYPES.has(normalized)) {
      return normalized;
    }
  }
  if (targetType && VALID_DB_INQUIRY_TYPES.has(targetType.toLowerCase())) {
    return targetType.toLowerCase();
  }
  return 'general';
}

export async function createInquiry(
  input: CreateInquiryInput
): Promise<InquiryConfirmationDto> {
  let targetSlug: string | null = null;
  let targetTitle: string | null = null;

  if (input.targetType && input.targetId) {
    const validatedTarget = await validatePolymorphicTarget(
      input.targetType,
      input.targetId
    );
    targetSlug = validatedTarget.slug;
    targetTitle = validatedTarget.title;
  }

  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from('inquiries')
    .insert({
      full_name: input.fullName,
      email: input.email,
      phone: input.phone ?? null,
      country: input.country ?? null,
      subject: input.subject ?? null,
      message: input.message,
      inquiry_type: resolveDbInquiryType(input.inquiryType, input.targetType),
      target_slug: targetSlug,
      target_title: targetTitle,
      preferred_travel_date: input.preferredTravelDate ?? null,
      travelers_count: input.travelersCount ?? null,
      preferred_language: input.preferredLanguage ?? 'en',
      status: 'new',
    })
    .select('id, status, created_at')
    .single();

  if (error || !data) {
    throw new AppError(
      `Failed to submit inquiry: ${error?.message ?? 'Unknown database error'}`,
      500,
      'DATABASE_ERROR'
    );
  }

  return {
    id: data.id as string,
    status: 'new',
    createdAt: data.created_at as string,
    message: 'Your inquiry has been received. Our Egypt concierge team will respond shortly.',
  };
}
