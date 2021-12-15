import { catchError } from '../middleware/index.js';
import { Property, User } from '../models/index.js';

const { COMMISSION_PERCENTAGE, TOTAL_SHARES } = process.env;

export const addProperty = catchError(async (req, res, next) => {
	const {
		overview,
		realEstateType,
		subType,
		propertyNumber,
		street,
		city,
		state,
		country,
		zip,
		area,
		measurement,
		noBeds,
		noBath,
		flooring,
		heating,
		cooling,
		parking,
		appliances,
		laundry,
		interiorFeatures,
		exteriorFeatures,
		parcelNumber,
		yearBuilt,
		totalPrice,
		rentalPrice,
		taxes,
		insurance,
		hov,
		utilities,
		more,
		files,
		listedBy,
		rentalProperty,
	} = req.body;

	const newValuation = Number(totalPrice * (1 + COMMISSION_PERCENTAGE / 100));
	const newSharePrice = Number(newValuation / TOTAL_SHARES);

	let imgUrls = [];

	if (files.length > 0) {
		files.map((file) => imgUrls.push({ image: file.url }));
	} else {
		imgUrls = [{ image: 'https://source.unsplash.com/kn-UmDZQDjM/1600x1100' }];
	}

	const creator = await User.findById(req.user._id, 'firstName lastName');
	const creatorName = creator.firstName + ' ' + creator.lastName;

	const property = await Property.create({
		overview,
		realEstateType,
		subType,
		propertyNumber,
		street,
		city,
		state,
		country,
		zip,
		area,
		measurement,
		noBeds,
		noBath,
		flooring,
		heating,
		cooling,
		parking,
		appliances,
		laundry,
		interiorFeatures,
		exteriorFeatures,
		parcelNumber,
		yearBuilt,
		totalPrice,
		rentalPrice,
		taxes,
		insurance,
		hov,
		utilities,
		more,
		files: imgUrls,
		listedBy,
		rentalProperty,
		createdById: req.user._id,
		createdBy: creatorName,
		valuation: newValuation,
		sharePrice: newSharePrice,
	});

	if (property) {
		res.status(200).json({ property });
	} else {
		res.status(400);
		throw new Error(`Something Went Wrong!`);
	}
});
