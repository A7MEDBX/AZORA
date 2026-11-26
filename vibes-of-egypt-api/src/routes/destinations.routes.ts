import { Router } from 'express';
import * as catalogController from '../controllers/catalog.controller';
import { validate } from '../middleware/validate';
import { asyncHandler } from '../utils/asyncHandler';
import { slugParamSchema } from '../validators/catalog.validator';

const router = Router();

router.get('/', asyncHandler(catalogController.getDestinations));
router.get(
  '/:slug',
  validate({ params: slugParamSchema }),
  asyncHandler(catalogController.getDestinationBySlug)
);

export default router;
