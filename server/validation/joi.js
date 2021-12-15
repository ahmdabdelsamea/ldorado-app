import { ErrorResponse } from '../util/index.js';

export const validate = async (schema, payload) => {
	try {
		await schema.validateAsync(payload, { abortEarly: false });
	} catch (error) {
		throw new ErrorResponse(error.message, error.status);
	}
};
