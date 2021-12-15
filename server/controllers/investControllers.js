import { catchError } from '../middleware/index.js';
import { Property, User } from '../models/index.js';

export const investController = catchError(async (req, res, next) => {
	const property = await Property.find({});
	res.status(200).json(property);
});

export const getPropertyById = catchError(async (req, res, next) => {
	const id = req.params.id;

	const property = await Property.findById(id);

	if (property) {
		res.json(property);
	} else {
		res.status(404);
		throw new Error(`Property Not Found`);
	}
});

export const buyShares = catchError(async (req, res, next) => {
	const propertyId = req.params.id;
	const investorId = req.user._id;
	const { shares } = req.body;

	if (propertyId && investorId && shares) {
		const { noSharesLeft, sharePrice } = await Property.findById(propertyId);

		if (noSharesLeft && sharePrice) {
			const investedMoney = sharePrice * parseInt(shares);
			const newSharesLeft = noSharesLeft - parseInt(shares);

			const { wallet } = await User.findById(investorId);

			if (wallet < investedMoney) {
				res
					.status(400)
					.json({ message: 'Wallet has not enough money: Add Funds' });
			} else {
				const newWallet = wallet - investedMoney;

				const investmentExists = await Property.findOne({
					_id: propertyId,
					'investments.investor': investorId,
				});

				if (investmentExists) {
					const { investments } = investmentExists;

					const ownedShares = investments[0].ownedShares;
					const totalInvestment = investments[0].totalInvestment;

					const newOwnedShares = ownedShares + parseInt(shares);
					const newTotalInvestment = totalInvestment + investedMoney;

					const newInvestment = await Property.findOneAndUpdate(
						{ _id: propertyId, 'investments.investor': investorId },
						{
							$set: {
								noSharesLeft: newSharesLeft,
								'investments.$.ownedShares': newOwnedShares,
								'investments.$.totalInvestment': newTotalInvestment,
							},
						},
						{ new: true }
					);

					const updateInvestorWallet = await User.findOneAndUpdate(
						{ _id: investorId },
						{ $set: { wallet: newWallet } },
						{ new: true }
					);

					res.status(200).json({
						newInvestment,
					});
				} else {
					const investment = {
						investor: investorId,
						ownedShares: parseInt(shares),
						totalInvestment: investedMoney,
					};
					const newInvestment = await Property.findOneAndUpdate(
						{ _id: propertyId },
						{ $push: { investments: investment } },
						{ new: true }
					);

					const { noSharesLeft } = await Property.findOneAndUpdate(
						{ _id: propertyId },
						{ $set: { noSharesLeft: newSharesLeft } },
						{ new: true }
					);

					const updateInvestorWallet = await User.findOneAndUpdate(
						{ _id: investorId },
						{ $set: { wallet: newWallet } },
						{ new: true }
					);

					res.status(200).json({
						newInvestment,
					});
				}
			}
		} else {
			res.status(400);
			throw new Error(`Something Went Wrong!`);
		}
	} else {
		res.status(404);
		throw new Error(`Not Found`);
	}
});
