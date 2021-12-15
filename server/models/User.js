import mongoose from 'mongoose';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, 'First Name is required!'],
		},
		lastName: {
			type: String,
			required: [true, 'Last Name is required!'],
		},
		email: {
			type: String,
			required: [true, 'email is required!'],
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				'Invalid email',
			],
		},
		password: {
			type: String,
			required: [true, 'Password is required!'],
			minlength: 8,
			select: false,
		},
		gender: {
			type: String,
			enum: ['male', 'female'],
			required: [true, 'gender is required!'],
		},
		birthday: {
			type: Date,
			required: [true, 'Birthday is required!'],
		},
		role: {
			type: String,
			enum: ['user', 'admin'],
			required: true,
			default: 'user',
		},
		stripeCustomerId: {
			type: String,
		},
		wallet: {
			type: Number,
			default: 10,
		},

		isVerified: Boolean,
		resetPasswordToken: String,
		resetPasswordExpire: Date,
	},
	{
		timestamps: true,
	}
);

userSchema.pre('save', async function () {
	if (!this.isModified('password')) {
		next();
	}
	const salt = await bcrypt.genSalt(12);
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.getToken = function () {
	return JWT.sign({ id: this._id }, encodeURIComponent(JWT_SECRET), {
		expiresIn: JWT_EXPIRES_IN,
	});
};

userSchema.methods.getResetPasswordToken = function () {
	const resetToken = crypto.randomBytes(20).toString('hex');

	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

	return resetToken;
};

export const User = mongoose.model('User', userSchema);
