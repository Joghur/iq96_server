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
import { User, Role } from './entities';
import { UserResolver, RoleResolver } from './resolvers';
import helmet from 'helmet';
// import { fillDB } from './utils/fillDB';
// import { cleanDB } from './utils/fillDB';

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

	// helps securing Express app
	app.use(helmet());

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver, RoleResolver],
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
