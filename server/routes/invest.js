import express from 'express';

import {
	investController,
	getPropertyById,
	buyShares,
} from '../controllers/index.js';
import { protect } from '../middleware/index.js';

const router = express.Router();

router.route('/').get(investController);
router.route('/:id').get(getPropertyById);
router.route('/:id').post(protect, buyShares);

export default router;
