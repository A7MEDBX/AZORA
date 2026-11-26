import { Router } from 'express';
import { handleCreateTripPlan } from '../controllers/tripPlan.controller';
import { submissionRateLimiter } from '../middleware/rateLimiter';
import { validate } from '../middleware/validate';
import { asyncHandler } from '../utils/asyncHandler';
import { createTripPlanSchema } from '../validators/tripPlan.validator';

const router = Router();

// Public submission endpoint ONLY (no GET/PUT/PATCH/DELETE exposed)
router.post(
  '/',
  submissionRateLimiter,
  validate({ body: createTripPlanSchema }),
  asyncHandler(handleCreateTripPlan)
);

export default router;
