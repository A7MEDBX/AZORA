import { Router } from 'express';
import * as catalogController from '../controllers/catalog.controller';
import { validate } from '../middleware/validate';
import { asyncHandler } from '../utils/asyncHandler';
import { reviewsQuerySchema } from '../validators/catalog.validator';

const router = Router();

router.get(
  '/',
  validate({ query: reviewsQuerySchema }),
  asyncHandler(catalogController.getReviews)
);

export default router;
