import { Router } from 'express';
import * as catalogController from '../controllers/catalog.controller';
import { validate } from '../middleware/validate';
import { asyncHandler } from '../utils/asyncHandler';
import { packagesQuerySchema, slugParamSchema } from '../validators/catalog.validator';

const router = Router();

router.get(
  '/',
  validate({ query: packagesQuerySchema }),
  asyncHandler(catalogController.getPackages)
);
router.get(
  '/:slug',
  validate({ params: slugParamSchema }),
  asyncHandler(catalogController.getPackageBySlug)
);

export default router;
