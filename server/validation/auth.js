import Joi from 'joi';

const firstName = Joi.string().min(3).max(128).trim().required().messages({
	'string.empty': `First Name cannot be an empty field`,
	'string.min': `First Name should have a minimum length of {#limit}`,
	'string.max': `First Name should have a maximum length of {#limit}`,
	'any.required': `First Name is  required!`,
});

const lastName = Joi.string().min(3).max(128).trim().required().messages({
	'string.empty': `Last Name cannot be an empty field`,
	'string.min': `Last Name should have a minimum length of {#limit}`,
	'string.max': `Last Name should have a maximum length of {#limit}`,
	'any.required': `Last Name is  required`,
});
const email = Joi.string()
	.email()
	.message('Invalid email')
	.min(8)
	.max(256)
	.lowercase()
	.trim()
	.required()
	.messages({
		'string.empty': `email cannot be an empty field`,
		'string.min': `email should have a minimum length of {#limit}`,
		'string.max': `email should have a maximum length of {#limit}`,
		'any.required': `email is  required`,
	});
const password = Joi.string()
	.min(8)
	.max(72, 'utf8')
	.regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Lu}])(?=.*?\d).*$/u)
	.message(
		`Password must contain at least one uppercase, one lowercase letter and one digit`
	)
	.required()
	.messages({
		'string.empty': `Password cannot be an empty field`,
		'string.min': `Password should have a minimum length of {#limit}`,
		'string.max': `Password should have a maximum length of {#limit}`,
		'any.required': `Password is  required`,
	});
const passwordConfirmation = Joi.valid(Joi.ref('password')).required();

const gender = Joi.string().required().messages({
	'string.empty': `Gender cannot be an empty field`,
	'any.required': `Gender is  required`,
});

const birthday = Joi.date().required().messages({
	'string.empty': `Birthday cannot be an empty field`,
	'any.required': `Birthday is  required`,
});

export const registerSchema = Joi.object({
	firstName,
	lastName,
	email,
	password,
	passwordConfirmation,
	gender,
	birthday,
});
