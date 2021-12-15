import { catchError } from '../../middleware/index.js';
import { ErrorResponse, sendToken } from '../../util/index.js';
import { User } from '../../models/index.js';

export const loginController = catchError(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(
			new ErrorResponse('Please provide an email and password!', 400)
		);
	}

	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return next(new ErrorResponse('Invalid Credentials!', 401));
	}

	const isCorrect = await user.comparePassword(password);

	if (!isCorrect) {
		return next(new ErrorResponse('Invalid Credentials!', 401));
	}

	sendToken(user, 200, res);
});
