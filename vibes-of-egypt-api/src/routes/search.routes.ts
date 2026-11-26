import { Router } from 'express';
import { handleSearch } from '../controllers/search.controller';
import { validate } from '../middleware/validate';
import { asyncHandler } from '../utils/asyncHandler';
import { searchQuerySchema } from '../validators/search.validator';

const router = Router();

router.get('/', validate({ query: searchQuerySchema }), asyncHandler(handleSearch));

export default router;
