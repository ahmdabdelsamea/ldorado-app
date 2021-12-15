import JWT from 'jsonwebtoken';
import { catchError } from '../../middleware/index.js';
import { User } from '../../models/index.js';

const { JWT_SECRET } = process.env;

export const userController = catchError(async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({ message: 'Not Authorized!' });
	}

	const token = authorization.split(' ')[1];

	JWT.verify(token, JWT_SECRET, async (err, decoded) => {
		if (err) return res.status(401).json({ message: 'Unable to verify token' });

		// const { id, isVerified } = decoded;

		const { id } = decoded;

		// if (id !== userId) return res.status(403).json({ message: 'Not Allowed' });

		// if (!isVerified)
		// 	return res.status(403).json({
		// 		message:
		// 			'You need to verify your email first',
		// 	});

		const result = await User.findById(id);

		// const db = getDbConnection('react-auth-db');
		// const result = await db
		// 	.collection('users')
		// 	.findOneAndUpdate(
		// 		{ _id: ObjectId(id) },
		// 		{ $set: { info: updates } },
		// 		{ returnOriginal: false }
		// 	);
		const { firstName, lastName } = result;
		res.status(200).json({ firstName, lastName });

		// JWT.sign(
		// 	{ id, email, isVerified, info },
		// 	process.env.JWT_SECRET,
		// 	{ expiresIn: '2d' },
		// 	(err, token) => {
		// 		if (err) {
		// 			return res.status(200).json(err);
		// 		}
		// 		res.status(200).json({ token });
		// 	}
		// );
	});
});
