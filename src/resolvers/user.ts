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
// const puppeteer = require('puppeteer');

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

	@Mutation(() => User)
	async updateUser(
		@Arg('id', () => Int) id: number,
		@Arg('active') active: boolean,
		@Arg('name') name: string,
		@Arg('username') username: string,
		@Arg('birthday') birthday: string,
		@Arg('address') address: string,
		@Arg('email') email: string,
		@Arg('phone') phone: string,
		@Arg('mobile') mobile: string,
		@Arg('work') work: string,
		@Arg('workemail') workemail: string,
		@Arg('workphone') workphone: string,
		@Arg('size') size: string,
		@Ctx() {},
	): Promise<User | null> {
		const result = await getConnection()
			.createQueryBuilder()
			.update(User)
			.set({
				active,
				name,
				username,
				birthday,
				address,
				email,
				phone,
				mobile,
				work,
				workemail,
				workphone,
				size,
			})
			.where('id = :id ', {
				id,
			})
			.returning('*')
			.execute();

		console.log('result ----------', result);
		return result.raw[0];
	}

	// @Mutation(() => Post)
	// @UseMiddleware(isAuth)
	// async createPost(
	//   @Arg("input") input: PostInput,
	//   @Ctx() { req }: MyContext
	// ): Promise<Post> {
	//   return Post.create({
	// 	...input,
	// 	creatorId: req.session.userId,
	//   }).save();
	// }

	// @Mutation(() => Post, { nullable: true })
	// @UseMiddleware(isAuth)
	// async updatePost(
	//   @Arg("id", () => Int) id: number,
	//   @Arg("title") title: string,
	//   @Arg("text") text: string,
	//   @Ctx() { req }: MyContext
	// ): Promise<Post | null> {
	//   const result = await getConnection()
	// 	.createQueryBuilder()
	// 	.update(Post)
	// 	.set({ title, text })
	// 	.where('id = :id and "creatorId" = :creatorId', {
	// 	  id,
	// 	  creatorId: req.session.userId,
	// 	})
	// 	.returning("*")
	// 	.execute();

	//   return result.raw[0];
	// }
}
