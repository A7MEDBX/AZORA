import { z } from 'zod';

export const INQUIRY_STATUSES = ['new', 'in_progress', 'responded', 'closed'] as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

export const adminInquiriesQuerySchema = z.object({
  status: z.enum(INQUIRY_STATUSES).optional(),
  q: z.string().trim().min(1).max(100).optional(),
});

export const updateInquiryStatusSchema = z
  .object({
    status: z.enum(INQUIRY_STATUSES),
  })
  .strict();

export type AdminInquiriesQuery = z.infer<typeof adminInquiriesQuerySchema>;
export type UpdateInquiryStatusInput = z.infer<typeof updateInquiryStatusSchema>;
