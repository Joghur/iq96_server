import 'reflect-metadata';
import 'dotenv-safe/config';
import { __prod__, PORT } from './constants';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
// import session from 'express-session';
// import cors from 'cors';
import { createConnection } from 'typeorm';
import path from 'path';
import { Address, User, Role } from './entities';
import {
	HelloResolver,
	UserResolver,
	AddressResolver,
	RoleResolver,
} from './resolvers';
import { fillDB } from './utils/fillDB';
// import { cleanDB } from './utils/fillDB';

const main = async () => {
	const conn = await createConnection({
		type: 'postgres',
		url: process.env.DATABASE_URL,
		logging: !__prod__,
		synchronize: !__prod__,
		migrations: [path.join(__dirname, './src/migrations/*')],
		entities: [User, Role, Address],
	});
	// await cleanDB();
	await conn.runMigrations();

	// filling db with fakedate
	fillDB();

	const app = express();

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [
				HelloResolver,
				UserResolver,
				AddressResolver,
				RoleResolver,
			],
			validate: false,
		}),
		context: ({ req, res }) => ({
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
	console.error(err);
});
