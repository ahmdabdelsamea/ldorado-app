import express from 'express';

import { protect } from '../middleware/index.js';
import { addProperty } from '../controllers/index.js';

const router = express.Router();

router.route('/add').post(protect, addProperty);

export default router;
