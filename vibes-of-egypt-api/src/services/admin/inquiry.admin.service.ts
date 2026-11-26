import { getSupabaseClient } from '../../config/supabase';
import { AppError } from '../../types/api';
import { throwDbError } from '../../utils/dbError';
import type {
  AdminInquiriesQuery,
  InquiryStatus,
  UpdateInquiryStatusInput,
} from '../../validators/admin/inquiry.admin.validator';

interface InquiryRow {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  country: string | null;
  subject: string | null;
  message: string;
  inquiry_type: string;
  target_slug: string | null;
  target_title: string | null;
  preferred_travel_date: string | null;
  travelers_count: number | null;
  preferred_language: string;
  status: InquiryStatus;
  created_at: string;
}

export interface AdminInquiryDto {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  country: string | null;
  subject: string | null;
  message: string;
  inquiryType: string;
  targetSlug: string | null;
  targetTitle: string | null;
  preferredTravelDate: string | null;
  travelersCount: number | null;
  preferredLanguage: string;
  status: InquiryStatus;
  createdAt: string;
}

function mapAdminInquiry(row: InquiryRow): AdminInquiryDto {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    country: row.country,
    subject: row.subject,
    message: row.message,
    inquiryType: row.inquiry_type,
    targetSlug: row.target_slug,
    targetTitle: row.target_title,
    preferredTravelDate: row.preferred_travel_date,
    travelersCount: row.travelers_count,
    preferredLanguage: row.preferred_language,
    status: row.status,
    createdAt: row.created_at,
  };
}

function sanitizeSearchPattern(raw: string): string {
  const clean = raw.replace(/[,()]/g, ' ').replace(/[%_\\]/g, '\\$&').trim();
  return `%${clean}%`;
}

export async function listAdminInquiries(
  query: AdminInquiriesQuery
): Promise<AdminInquiryDto[]> {
  const supabase = getSupabaseClient();
  let req = supabase.from('inquiries').select('*');

  if (query.status) {
    req = req.eq('status', query.status);
  }

  if (query.q) {
    const pattern = sanitizeSearchPattern(query.q);
    req = req.or(`full_name.ilike.${pattern},email.ilike.${pattern},subject.ilike.${pattern}`);
  }

  const { data, error } = await req.order('created_at', { ascending: false });
  if (error) throwDbError(error, 'Failed to list inquiries');

  return ((data ?? []) as InquiryRow[]).map(mapAdminInquiry);
}

export async function getAdminInquiryById(id: string): Promise<AdminInquiryDto> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to fetch inquiry');
  if (!data) throw new AppError(`Inquiry "${id}" not found`, 404, 'NOT_FOUND');

  return mapAdminInquiry(data as InquiryRow);
}

export async function updateAdminInquiryStatus(
  id: string,
  input: UpdateInquiryStatusInput
): Promise<AdminInquiryDto> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('inquiries')
    .update({ status: input.status })
    .eq('id', id)
    .select('*')
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to update inquiry status');
  if (!data) throw new AppError(`Inquiry "${id}" not found`, 404, 'NOT_FOUND');

  return mapAdminInquiry(data as InquiryRow);
}

export async function deleteAdminInquiry(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('inquiries')
    .delete()
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to delete inquiry');
  if (!data) throw new AppError(`Inquiry "${id}" not found`, 404, 'NOT_FOUND');
}
