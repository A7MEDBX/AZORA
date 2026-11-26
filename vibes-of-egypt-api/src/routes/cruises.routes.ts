import { Router } from 'express';
import * as catalogController from '../controllers/catalog.controller';
import { validate } from '../middleware/validate';
import { asyncHandler } from '../utils/asyncHandler';
import { cruisesQuerySchema, slugParamSchema } from '../validators/catalog.validator';

const router = Router();

router.get(
  '/',
  validate({ query: cruisesQuerySchema }),
  asyncHandler(catalogController.getCruises)
);
router.get(
  '/:slug',
  validate({ params: slugParamSchema }),
  asyncHandler(catalogController.getCruiseBySlug)
);

export default router;
