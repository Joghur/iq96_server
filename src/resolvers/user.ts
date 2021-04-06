import {
	Resolver,
	Field,
	ObjectType,
	Query,
	Int,
	Arg,
	Ctx,
	Mutation,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { User } from '../entities';
const puppeteer = require('puppeteer');

@ObjectType()
class UserFieldError {
	@Field()
	field: string;
	@Field()
	message: string;
}

@ObjectType()
class UserResponse {
	@Field(() => [UserFieldError], { nullable: true })
	errors?: UserFieldError[];

	@Field(() => User, { nullable: true })
	user?: User;
}

@ObjectType()
class Users {
	@Field(() => [User])
	users: User[];
}

@Resolver(Users)
export class UserResolver {
	@Query(() => Users, { nullable: true })
	async allUsers(): Promise<Users> {
		console.log('UserResolver - allUsers');
		const userRepository = getConnection().getRepository(User);
		const users = await userRepository.find({
			relations: ['roles'],
		});
		return { users };
	}

	@Query(() => String, { nullable: true })
	async pdf(): Promise<string> {
		console.log('UserResolver - pdf');
		// launch and create a new page
		const browser = await puppeteer.launch();
		const page = await browser.newPage(); // go to page in resumeonly mode, wait for any network events to settle
		await page.goto('http://localhost:3000/?pdfonly=true&rowspage=6', {
			waitUntil: 'networkidle2',
		}); // output to a local file
		await page.pdf({
			path: 'pdfonly.pdf',
			format: 'Letter',
			printBackground: true,
		}); // close
		await browser.close();
		return 'ok';
	}

	@Query(() => UserResponse, { nullable: true })
	async user(@Arg('id', () => Int) id: number): Promise<UserResponse> {
		console.log('UserResolver - user');
		let user;
		const userRepository = getConnection().getRepository(User);
		try {
			user = await userRepository.findOneOrFail(id, {
				relations: ['roles'],
			});
		} catch (error) {
			return {
				errors: [
					{
						field: 'id',
						message: 'Could not find user',
					},
				],
			};
		}
		return {
			user,
		};
	}

	@Mutation(() => Boolean)
	async deleteUser(
		@Arg('id', () => Int) id: number,
		@Ctx() {},
	): Promise<boolean> {
		console.log('UserResolver - deleteUser');
		await User.delete({ id });
		try {
			await User.findOneOrFail({ id });
		} catch (error) {
			// user doesn't exists (or never did)
			return true;
		}
		// user still exists
		return false;
	}
}
