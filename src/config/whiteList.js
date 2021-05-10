const devPages = [
	'http://localhost:3000',
	'http://localhost:4000',
	'https://sandersolutions.dk',
	undefined,
]

export const whitelist = [
	(process.env.NODE_ENV!=="production" && ...devPages),
	process.env.CORS_ORIGIN,
];
