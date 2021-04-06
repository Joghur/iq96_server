// CORS setup
const whitelist = [
	'http://localhost:3000',
	'http://localhost:4000',
	// undefined,
	process.env.CORS_ORIGIN,
];
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

export const corsOptionsDelegate = function (req: any, callback: any) {
	var corsOptions;
	if (whitelist.indexOf(req.header('Origin')) !== -1) {
		corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
	} else {
		corsOptions = { origin: false }; // disable CORS for this request
	}
	callback(null, corsOptions); // callback expects two parameters: error and options
};
