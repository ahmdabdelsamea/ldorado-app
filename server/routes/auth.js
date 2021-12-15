import express from 'express';

import {
	registerController,
	loginController,
	forgotController,
	resetController,
	verifyController,
	updateController,
} from '../controllers/index.js';
import { protect } from '../middleware/index.js';

const router = express.Router();

router.route('/register').post(registerController);
router.route('/login').post(loginController);
router.route('/forgot').post(forgotController);
router.route('/reset').post(resetController);
router.route('/verify').post(verifyController);
router.route('/update').put(protect, updateController);

export default router;
