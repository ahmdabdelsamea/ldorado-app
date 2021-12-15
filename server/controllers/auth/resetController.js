import { createHash } from 'crypto';
import { User } from '../../models/index.js';
import { catchError } from '../../middleware/index.js';
import { ErrorResponse } from '../../util/index.js';

export const resetController = catchError(async (req, res, next) => {
	const resetToken = req.params.resetToken;
	const resetPasswordToken = createHash('sha256')
		.update(resetToken)
		.digest('hex');

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(new ErrorResponse('Invalid Token', 400));
	}

	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	res.status(201).json({ success: true, data: 'Reset password success' });
});
