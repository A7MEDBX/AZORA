import { Router } from 'express';
import * as catalogController from '../controllers/catalog.controller';
import { validate } from '../middleware/validate';
import { asyncHandler } from '../utils/asyncHandler';
import { journalQuerySchema, slugParamSchema } from '../validators/catalog.validator';

const router = Router();

router.get(
  '/',
  validate({ query: journalQuerySchema }),
  asyncHandler(catalogController.getJournalArticles)
);
router.get(
  '/:slug',
  validate({ params: slugParamSchema }),
  asyncHandler(catalogController.getJournalArticleBySlug)
);

export default router;
