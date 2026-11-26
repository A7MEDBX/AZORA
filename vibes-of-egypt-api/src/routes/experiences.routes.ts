import { Router } from 'express';
import * as catalogController from '../controllers/catalog.controller';
import { validate } from '../middleware/validate';
import { asyncHandler } from '../utils/asyncHandler';
import { experiencesQuerySchema, slugParamSchema } from '../validators/catalog.validator';

const router = Router();

router.get(
  '/',
  validate({ query: experiencesQuerySchema }),
  asyncHandler(catalogController.getExperiences)
);
router.get(
  '/:slug',
  validate({ params: slugParamSchema }),
  asyncHandler(catalogController.getExperienceBySlug)
);

export default router;
