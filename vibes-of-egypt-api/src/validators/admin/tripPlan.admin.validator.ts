import { z } from 'zod';

export const TRIP_PLAN_STATUSES = [
  'new',
  'reviewing',
  'contacted',
  'completed',
  'cancelled',
] as const;
export type TripPlanStatus = (typeof TRIP_PLAN_STATUSES)[number];

export const adminTripPlansQuerySchema = z.object({
  status: z.enum(TRIP_PLAN_STATUSES).optional(),
  q: z.string().trim().min(1).max(100).optional(),
});

export const updateTripPlanStatusSchema = z
  .object({
    status: z.enum(TRIP_PLAN_STATUSES),
  })
  .strict();

export type AdminTripPlansQuery = z.infer<typeof adminTripPlansQuerySchema>;
export type UpdateTripPlanStatusInput = z.infer<typeof updateTripPlanStatusSchema>;
