import { apiPost, USE_MOCK_DATA } from '@/api/client';

export interface ContactInquiryRequest {
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
  subject?: string;
  message: string;
  inquiryType?: string;
  targetType?: 'destination' | 'tour' | 'package' | 'cruise' | 'experience';
  targetId?: string;
}

export interface TripPlanRequest {
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
  travelStartDate?: string;
  travelEndDate?: string;
  isDatesFlexible?: boolean;
  durationDays?: number;
  adultsCount: number;
  childrenCount: number;
  preferredDestinations?: string[];
  interests?: string[];
  accommodationPreference?: string;
  budgetPerPerson?: string;
  additionalNotes?: string;
}

export interface SubmissionConfirmation {
  id: string;
  status: string;
  createdAt: string;
  message: string;
  mode: 'production' | 'dev';
}

interface SubmissionApiResponse {
  data: {
    id: string;
    status: string;
    createdAt: string;
    message: string;
  };
}

export async function submitContactInquiry(
  payload: ContactInquiryRequest
): Promise<SubmissionConfirmation> {
  if (USE_MOCK_DATA) {
    console.info('[Vibes of Egypt] Mock Inquiry Submitted:', payload);
    await new Promise((resolve) => setTimeout(resolve, 350));
    return {
      id: `mock-inq-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString(),
      message: 'Inquiry received in mock mode.',
      mode: 'dev',
    };
  }

  const cleanPayload: ContactInquiryRequest = {
    fullName: payload.fullName.trim(),
    email: payload.email.trim(),
    message: payload.message.trim(),
    ...(payload.phone?.trim() ? { phone: payload.phone.trim() } : {}),
    ...(payload.country?.trim() ? { country: payload.country.trim() } : {}),
    ...(payload.subject?.trim() ? { subject: payload.subject.trim() } : {}),
    ...(payload.inquiryType ? { inquiryType: payload.inquiryType } : { inquiryType: 'general' }),
    ...(payload.targetType && payload.targetId
      ? { targetType: payload.targetType, targetId: payload.targetId }
      : {}),
  };

  const response = await apiPost<SubmissionApiResponse>('/inquiries', cleanPayload);
  return {
    ...response.data,
    mode: 'production',
  };
}

export async function submitTripPlan(
  payload: TripPlanRequest
): Promise<SubmissionConfirmation> {
  if (USE_MOCK_DATA) {
    console.info('[Vibes of Egypt] Mock Trip Plan Submitted:', payload);
    await new Promise((resolve) => setTimeout(resolve, 350));
    return {
      id: `mock-plan-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString(),
      message: 'Trip plan received in mock mode.',
      mode: 'dev',
    };
  }

  const cleanPayload: TripPlanRequest = {
    fullName: payload.fullName.trim(),
    email: payload.email.trim(),
    adultsCount: Math.max(1, payload.adultsCount),
    childrenCount: Math.max(0, payload.childrenCount),
    ...(payload.phone?.trim() ? { phone: payload.phone.trim() } : {}),
    ...(payload.country?.trim() ? { country: payload.country.trim() } : {}),
    ...(payload.travelStartDate ? { travelStartDate: payload.travelStartDate } : {}),
    ...(payload.travelEndDate ? { travelEndDate: payload.travelEndDate } : {}),
    ...(payload.isDatesFlexible !== undefined ? { isDatesFlexible: payload.isDatesFlexible } : {}),
    ...(payload.durationDays ? { durationDays: payload.durationDays } : {}),
    ...(payload.preferredDestinations?.length
      ? { preferredDestinations: payload.preferredDestinations.slice(0, 20) }
      : {}),
    ...(payload.interests?.length ? { interests: payload.interests.slice(0, 20) } : {}),
    ...(payload.accommodationPreference?.trim()
      ? { accommodationPreference: payload.accommodationPreference.trim() }
      : {}),
    ...(payload.budgetPerPerson?.trim()
      ? { budgetPerPerson: payload.budgetPerPerson.trim() }
      : {}),
    ...(payload.additionalNotes?.trim()
      ? { additionalNotes: payload.additionalNotes.trim() }
      : {}),
  };

  const response = await apiPost<SubmissionApiResponse>('/trip-plans', cleanPayload);
  return {
    ...response.data,
    mode: 'production',
  };
}
