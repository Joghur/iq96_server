import 'reflect-metadata';
import 'dotenv-safe/config';
import { __prod__, PORT } from './constants';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
// import session from 'express-session';
import cors from 'cors';
import { createConnection } from 'typeorm';
import path from 'path';
import { User, Role } from './entities';
import { UserResolver, RoleResolver } from './resolvers';
// import { corsOptions } from './config/corsConfig';
import { corsOptionsDelegate } from './config/corsConfig';
// import helmet from 'helmet';
// import { fillDB } from './utils/fillDB';
// import { cleanDB } from './utils/fillDB';
import firebaseAdmin from 'firebase-admin';
import { v4 as uuid_v4 } from 'uuid';
const puppeteer = require('puppeteer');
const serviceAccount = require('../serviceAccountKey.json');

let _token = uuid_v4();

// handling token state used for onetime pdf access
export const uuidToken = {
	get: () => _token,
	clear: () => (_token = ''),
};

firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.cert(serviceAccount),
});

const validateAuthorization = async (token: string): Promise<any> => {
	return firebaseAdmin
		.auth()
		.verifyIdToken(token)
		.then((decodedToken) => {
			const uid = decodedToken.uid;
			console.log('uid', uid);
			return { uid, validated: true };
		})
		.catch((error) => {
			console.log('error', error);
			return { error, validated: false };
		});
};

const main = async () => {
	const conn = await createConnection({
		type: 'postgres',
		url: process.env.DATABASE_URL,
		logging: !__prod__,
		synchronize: !__prod__,
		migrations: [path.join(__dirname, './src/migrations/*')],
		entities: [User, Role],
	});
	// await cleanDB();
	await conn.runMigrations();

	// filling db with fakedate
	// fillDB();

	const app = express();

	// app.use(helmet());
	app.use(cors(corsOptionsDelegate));

	app.get('/pdf', async function (req: any, res: any) {
		console.log('pdf 55 - pdf');
		const valid = await validateAuthorization(req.headers.authorization);
		console.log('valid 56', valid);
		console.log('pdf 57 - _token', _token);

		if (valid.validated) {
			// launch and create a new page
			const browser = await puppeteer.launch();
			const page = await browser.newPage(); // go to page in resume only mode, wait for any network events to settle
			const url = `http://localhost:3000/users?pdfonly=true&rowspage=25&pdftoken=${_token}`;
			console.log('url', url);
			await page.goto(url, {
				waitUntil: 'networkidle2',
			});
			const buffer = await page.pdf({
				format: 'Letter',
				printBackground: true,
			});
			await browser.close(); // close
			res.send(buffer);
		}
	});

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver, RoleResolver],
			validate: false,
		}),
		context: async ({ req, res }) => {
			let _token: any = '';
			if (req) _token = req.headers.authorization;
			return {
				valid: await validateAuthorization(_token),
				pdf: req.headers.pdf,
				req,
				res,
			};
		},
	});

	apolloServer.applyMiddleware({
		app,
		cors: false,
	});

	app.listen(PORT),
		() => {
			console.log(`server started on localhost:${PORT}`);
		};
};

main().catch((err) => {
	console.error('-----------error', err);
});
