import { Router } from 'express';
import { getHealthInsights, postHealthInsightsConfig } from '../controllers/healthInsightsController';

const router = Router();

// Route to get health insights data
router.get('/health-insights', getHealthInsights);

// Route to post configuration for health insights API
router.post('/health-insights/config', postHealthInsightsConfig);

export default router;