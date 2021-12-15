import { catchError } from '../middleware/index.js';
import { User, Property } from '../models/index.js';

export const dashboardController = catchError(async (req, res, next) => {
	const id = req.user._id;

	const { _id, firstName, lastName, wallet, investments } = await User.findById(
		id
	);

	const listedProperties = await Property.find({ createdById: _id });

	const investedInProperties = await Property.find({
		'investments.investor': id,
	});

	res.status(200).json({
		firstName,
		lastName,
		wallet,
		investedInProperties,
		listedProperties,
	});
});
