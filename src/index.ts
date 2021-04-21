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
const puppeteer = require('puppeteer');

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

	app.get('/IQlist.pdf', async function (req, res) {
		console.log('UserResolver - IQlist.pdf');
		// launch and create a new page
		const browser = await puppeteer.launch();
		const page = await browser.newPage(); // go to page in resumeonly mode, wait for any network events to settle
		await page.goto(
			'http://localhost:3000/users?pdfonly=true&rowspage=25',
			{
				waitUntil: 'networkidle2',
			},
		); // output to a local file
		const buffer = await page.pdf({
			format: 'Letter',
			printBackground: true,
		}); // close
		await browser.close();
		console.log('buffer-----------', buffer);
		// return buffer;
		res.send(buffer);
	});

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver, RoleResolver],
			validate: false,
		}),
		context: ({ req, res }) => ({
			firebaseToken: req.headers.authorization,
			req,
			res,
		}),
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
