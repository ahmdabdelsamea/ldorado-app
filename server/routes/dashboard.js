import express from 'express';

import { dashboardController } from '../controllers/index.js';
import { protect } from '../middleware/index.js';

const router = express.Router();

router.route('/').get(protect, dashboardController);

export default router;
