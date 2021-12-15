import { ErrorResponse } from '../util/index.js';

export const catchError =
	(handler) =>
	(...args) =>
		handler(...args).catch(args[2]);

export const errorHandler = (err, req, res, next) => {
	let error = { ...err };

	error.message = err.message;

	if (err.code === 11000) {
		const message = `Duplicate field value entered`;
		error = new ErrorResponse(message, 400);
	}

	if (err.name === 'Validation Error') {
		const message = Object.values(err.errors).map((value) => value.message);
		error = new ErrorResponse(message, 400);
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || 'Internal Server Error',
	});
};

export const notFound = (req, res, next) => {
	res.status(404).json({ message: 'Not Found' });
};
