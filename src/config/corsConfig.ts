// CORS setup
const whitelist = ['http://localhost:3000', process.env.CORS_ORIGIN];
export const corsOptions = {
	origin: function (origin: any, callback: any) {
		console.log('origin-----', origin);
		console.log('callback-----', callback);
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
};
