// import JWT from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

import { User } from '../../models/index.js';
import { catchError } from '../../middleware/index.js';
import { validate, registerSchema } from '../../validation/index.js';
import { ErrorResponse, sendToken } from '../../util/index.js';
// import { sendEmail, ErrorResponse, sendToken } from '../util';

// const { JWT_SECRET } = process.env;

export const registerController = catchError(async (req, res, next) => {
	await validate(registerSchema, req.body);

	const { firstName, lastName, email, password, gender, birthday } = req.body;

	const userExists = await User.exists({ email });

	if (userExists) {
		throw new ErrorResponse('email already taken!', 400);
	}

	const verificationString = uuid();

	const user = await User.create({
		firstName,
		lastName,
		email,
		password,
		gender,
		birthday,
		isVerified: false,
		verificationString,
	});

	sendToken(user, 201, res);

	// await sendEmail({
	// 	to: email,
	// 	from: 'ahmedbanna6@gmail.com',
	// 	subject: 'Please verify your email',
	// 	text: `
	//                 Thanks for signing up! To verify your email, click here:
	//                 http://localhost:3000/verify-email/${verificationString}
	//             `,
	// });

	// const { insertedId } = user;

	// JWT.sign(
	// 	{
	// 		id: insertedId,
	// 		email,
	// 		isVerified: false,
	// 	},
	// 	encodeURIComponent(JWT_SECRET),
	// 	{
	// 		expiresIn: '7d',
	// 	},
	// 	(err, token) => {
	// 		if (err) {
	// 			return res.status(500).send(err);
	// 		}
	// 		res.status(200).json({ token });
	// 	}
	// );
});
