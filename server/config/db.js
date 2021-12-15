import mongoose from 'mongoose';

const { MONGO_URI } = process.env;

const MONGO_OPTIONS = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(MONGO_URI, MONGO_OPTIONS);

		console.log(`MongoDB Connected`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
};
