import { devPages } from './devPages';

export const whitelist = [
	...[process.env.NODE_ENV !== 'production' && devPages],
	process.env.CORS_ORIGIN,
];
