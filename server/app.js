import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import path from 'path';

import { connectDB } from './config/index.js';
import { errorHandler, notFound } from './middleware/index.js';

import auth from './routes/auth.js';
import invest from './routes/invest.js';
import sell from './routes/sell.js';
import dashboard from './routes/dashboard.js';
import funds from './routes/funds.js';

//DB connection
connectDB();

// app config
const app = express();
const __dirname = path.resolve();

// middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use('/', auth);
app.use('/invest', invest);
app.use('/sell', sell);
app.use('/dashboard', dashboard);
app.use('/', funds);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client', 'build')));

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	});
}

// errors
app.use(notFound);
app.use(errorHandler);

export default app;
