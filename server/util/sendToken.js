export const sendToken = function (user, statusCode, res) {
	const token = user.getToken();
	res.status(statusCode).json({ token });
};
