import { Router } from 'express';
import adminRoutes from './admin';
import cruisesRoutes from './cruises.routes';
import destinationsRoutes from './destinations.routes';
import experiencesRoutes from './experiences.routes';
import healthRoutes from './health.routes';
import inquiriesRoutes from './inquiries.routes';
import journalRoutes from './journal.routes';
import offersRoutes from './offers.routes';
import packagesRoutes from './packages.routes';
import reviewsRoutes from './reviews.routes';
import searchRoutes from './search.routes';
import toursRoutes from './tours.routes';
import tripPlansRoutes from './tripPlans.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/destinations', destinationsRoutes);
router.use('/tours', toursRoutes);
router.use('/packages', packagesRoutes);
router.use('/cruises', cruisesRoutes);
router.use('/experiences', experiencesRoutes);
router.use('/journal', journalRoutes);
router.use('/special-offers', offersRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/search', searchRoutes);
router.use('/inquiries', inquiriesRoutes);
router.use('/trip-plans', tripPlansRoutes);
router.use('/admin', adminRoutes);

export default router;
