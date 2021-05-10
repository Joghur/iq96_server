// CORS setup
const whitelist = [
	'http://localhost:3000',
	'http://localhost:4000',
	'http://sandersolutions.dk:4000',
	'https://sandersolutions.dk',
	'https://iq96.dk',
	undefined,
	process.env.CORS_ORIGIN,
];
export const corsOptions = {
	origin: function (origin: any, callback: any) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
};

export const corsOptionsDelegate = function (req: any, callback: any) {
	let corsOptions;
	if (whitelist.indexOf(req.header('Origin')) !== -1) {
		corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
	} else {
		corsOptions = { origin: false }; // disable CORS for this request
	}
	callback(null, corsOptions); // callback expects two parameters: error and options
};
