import { Router } from 'express';
import { handleCreateInquiry } from '../controllers/inquiry.controller';
import { submissionRateLimiter } from '../middleware/rateLimiter';
import { validate } from '../middleware/validate';
import { asyncHandler } from '../utils/asyncHandler';
import { createInquirySchema } from '../validators/inquiry.validator';

const router = Router();

// Public submission endpoint ONLY (no GET/PUT/PATCH/DELETE exposed)
router.post(
  '/',
  submissionRateLimiter,
  validate({ body: createInquirySchema }),
  asyncHandler(handleCreateInquiry)
);

export default router;
