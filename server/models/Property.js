import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
	{
		overview: {
			type: String,
			// // required: [true, 'Overview is required!'],
		},
		realEstateType: {
			type: String,
			// required: true,
		},
		subType: {
			type: String,
			// required: true,
		},
		propertyNumber: {
			type: String,
			// required: true,
		},
		street: {
			type: String,
			// required: true,
		},
		city: {
			type: String,
			// required: true,
		},
		state: {
			type: String,
			uppercase: true,
			// required: true,
		},
		country: {
			type: String,
			// required: true,
			default: 'United States',
		},
		zip: {
			type: Number,
			// required: true,
		},
		area: {
			type: Number,
			// // required: [true, 'Area is required!'],
		},
		measurement: {
			type: String,
		},
		noBeds: {
			type: Number,
		},
		noBath: {
			type: Number,
		},
		flooring: {
			type: String,
		},
		heating: {
			type: String,
		},
		cooling: {
			type: String,
		},
		parking: {
			type: String,
		},
		appliances: {
			type: String,
		},
		laundry: {
			type: String,
		},
		interiorFeatures: {
			type: String,
		},
		exteriorFeatures: {
			type: String,
		},
		parcelNumber: {
			type: Number,
		},
		yearBuilt: {
			type: String,
		},
		totalPrice: {
			type: Number,
			// required: true,
		},
		rentalPrice: {
			type: Number,
		},
		taxes: {
			type: Number,
		},
		insurance: {
			type: Number,
		},
		hov: {
			type: Number,
		},
		utilities: {
			type: Number,
		},
		more: {
			type: String,
		},
		files: [],
		listedBy: {
			type: String,
			// required: true,
		},
		rentalProperty: {
			type: String,
		},
		createdById: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		createdBy: {
			type: String,
		},
		totalShares: {
			type: Number,
			default: 1000000,
		},
		noSharesLeft: {
			type: Number,
			default: 1000000,
		},
		valuation: {
			type: Number,
		},
		sharePrice: {
			type: Number,
		},
		investments: [
			{
				investor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
				ownedShares: { type: Number },
				totalInvestment: { type: Number },
			},
		],
	},
	{
		timestamps: true,
	}
);

export const Property = mongoose.model('Property', propertySchema);
