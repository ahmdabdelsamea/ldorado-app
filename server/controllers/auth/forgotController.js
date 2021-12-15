import { catchError } from '../../middleware/index.js';
import { ErrorResponse, sendEmail } from '../../util/index.js';
import { User } from '../../models/index.js';

const { CLIENT_DOMAIN } = process.env;

export const forgotController = catchError(async (req, res, next) => {
	const { email } = req.body;

	const user = await User.findOne({ email });

	if (!user) {
		return next(new ErrorResponse('Could not send a link to your email', 404));
	}

	const resetToken = user.getResetPasswordToken();

	await user.save();

	const resetUrl = `${CLIENT_DOMAIN}/reset/${resetToken}`;

	const message = `
		<h1> Password Reset </h1>
		<a href=${resetUrl} clicktracking=off>${resetUrl}</a>
	`;

	try {
		await sendEmail({
			to: user.email,
			subject: 'Reset Password',
			html: message,
		});

		res.status(200).json({ success: true, data: 'email have been sent' });
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save();

		return next(new ErrorResponse('Could not send a link to your email', 500));
	}
});
