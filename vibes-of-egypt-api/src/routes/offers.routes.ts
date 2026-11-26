import { Router } from 'express';
import * as catalogController from '../controllers/catalog.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(catalogController.getSpecialOffers));

export default router;
