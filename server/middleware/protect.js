import JWT from 'jsonwebtoken';
import { User } from '../models/index.js';
import { ErrorResponse } from '../util/index.js';
import { catchError } from './errors.js';

const { JWT_SECRET } = process.env;

export const protect = catchError(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return next(new ErrorResponse('Not Authorized', 401));
	}

	const decoded = JWT.verify(token, JWT_SECRET);

	const user = await User.findById(decoded.id);

	if (!user) {
		return next(new ErrorResponse('Not Found', 404));
	}

	req.user = user;

	next();
});
