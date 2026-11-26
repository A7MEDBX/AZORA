import { Router } from 'express';
import * as catalogController from '../controllers/catalog.controller';
import { validate } from '../middleware/validate';
import { asyncHandler } from '../utils/asyncHandler';
import { slugParamSchema, toursQuerySchema } from '../validators/catalog.validator';

const router = Router();

router.get(
  '/',
  validate({ query: toursQuerySchema }),
  asyncHandler(catalogController.getTours)
);
router.get(
  '/:slug',
  validate({ params: slugParamSchema }),
  asyncHandler(catalogController.getTourBySlug)
);

export default router;
