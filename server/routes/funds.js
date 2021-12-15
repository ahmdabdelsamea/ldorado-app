import express from 'express';
import bodyParser from 'body-parser';

import { protect } from '../middleware/index.js';
import {
	getPublishableKey,
	stripeAddFunds,
	stripeWebhook,
} from '../controllers/index.js';

const router = express.Router();

router.route('/getPublishableKey').get(getPublishableKey);
router.route('/create-payment-intent').post(protect, stripeAddFunds);
router.post(
	'/webhook',
	bodyParser.raw({ type: 'application/json' }),
	stripeWebhook
);

export default router;
