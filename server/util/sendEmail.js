import nodemailer from 'nodemailer';

const { EMAIL_SERVICE, EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_FROM } =
	process.env;

export const sendEmail = (options) => {
	const transport = nodemailer.createTransport({
		service: EMAIL_SERVICE,
		auth: {
			user: EMAIL_USERNAME,
			pass: EMAIL_PASSWORD,
		},
	});

	const mailOptions = {
		from: EMAIL_FROM,
		to: options.to,
		subject: options.subject,
		html: options.html,
	};

	transport.sendMail(mailOptions, function (err, info) {
		if (err) {
			console.log(err);
		} else {
			console.log(info);
		}
	});
};

// import sendgrid from '@sendgrid/mail';

// const { SENDGRID_API_KEY } = process.env;

// sendgrid.setApiKey(SENDGRID_API_KEY);

// export const sendEmail = ({ to, from, subject, text, html }) => {
// 	const msg = { to, from, subject, text, html };
// 	return sendgrid.send(msg);
// };
