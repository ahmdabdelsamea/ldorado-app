const { STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET } =
	process.env;

import { User } from '../models/index.js';
import { catchError } from '../middleware/index.js';
import { v4 as uuidv4 } from 'uuid';

import Stripe from 'stripe';
const stripe = new Stripe(STRIPE_SECRET_KEY);

export const getPublishableKey = catchError(async (req, res, next) => {
	const publishableKey = STRIPE_PUBLISHABLE_KEY;
	res.json({ publishableKey });
});

export const stripeAddFunds = catchError(async (req, res, next) => {
	const id = req.user._id;
	const { dollars } = req.body;
	const idempotencyKey = uuidv4();

	const { email, stripeCustomerId } = await User.findById(id);

	if (stripeCustomerId) {
		const paymentIntent = await stripe.paymentIntents.create(
			{
				amount: dollars * 100,
				currency: 'usd',
				payment_method_types: ['card'],
				customer: stripeCustomerId,
			},
			{
				idempotencyKey,
			}
		);

		res.send({ client_secret: paymentIntent.client_secret });
	} else {
		const customer = await stripe.customers.create({ email });

		const newCustomerId = await User.findOneAndUpdate(
			{ _id: id },
			{ $set: { stripeCustomerId: customer.id } },
			{ new: true }
		);

		const paymentIntent = await stripe.paymentIntents.create(
			{
				amount: dollars * 100,
				currency: 'usd',
				payment_method_types: ['card'],
				customer: customer.id,
			},
			{
				idempotencyKey,
			}
		);

		res.send({ client_secret: paymentIntent.client_secret });
	}
});

// const endpointSecret = STRIPE_WEBHOOK_SECRET || 'whsec_YMESsqPLjBKTLlZrEQW2Ifb2if9l8HJV';

export const stripeWebhook = catchError(async (req, res) => {
	// let event;

	// try {
	// 	event = stripe.webhooks.constructEvent(
	// 		req.body,
	// 		sig,
	// 		STRIPE_WEBHOOK_SECRET
	// 	);
	// } catch (err) {
	// 	res.status(400).send(`Webhook Error: ${err.message}`);
	// }

	const event = req.body;

	if (event.type === 'payment_intent.succeeded') {
		const paymentIntent = event.data.object;
		const { amount, customer } = paymentIntent;
		const funds = amount / 100;

		if (customer) {
			const { email } = await stripe.customers.retrieve(customer);

			const { wallet } = await User.findOne({ email });

			const newWallet = await User.findOneAndUpdate(
				{ email },
				{ $set: { wallet: wallet + funds } },
				{ new: true }
			);
		}
	}

	res.json({ received: true });
});
