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
import { User, Role } from '../entities';
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
	async createUser(
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
		@Arg('roles', () => [Int]) roles: [number],
		@Arg('password') password: string,
		@Ctx() {},
	): Promise<User> {
		const user: any = {};

		// todo encrypt password
		// updating normal fields
		user.active = active;
		user.name = name;
		user.username = username;
		user.birthday = birthday;
		user.address = address;
		user.email = email;
		user.phone = phone;
		user.mobile = mobile;
		user.work = work;
		user.workemail = workemail;
		user.workphone = workphone;
		user.size = size;
		user.password = password;

		// many-to-many relations
		let _roles: (Role | undefined)[] = [];
		roles.map(async (id: number) => {
			const role = await getConnection()
				.getRepository(Role)
				.findOne({ id });
			_roles.push(role);
			user.roles = _roles;
		});

		const madeUser = await getConnection().getRepository(User).save(user);
		console.log('madeUser', madeUser);

		return madeUser;
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
		@Arg('roles', () => [Int]) roles: [number],
		@Ctx() {},
	): Promise<User> {
		const user: any = await getConnection()
			.getRepository(User)
			.findOne(
				{ id },
				{
					relations: ['roles'],
				},
			);

		// updating normal fields
		user.active = active;
		user.name = name;
		user.username = username;
		user.birthday = birthday;
		user.address = address;
		user.email = email;
		user.phone = phone;
		user.mobile = mobile;
		user.work = work;
		user.workemail = workemail;
		user.workphone = workphone;
		user.size = size;

		console.log('roles----------------------', roles);
		// updating many-to-many relations
		let _roles: (Role | undefined)[] = [];
		roles.map(async (id: number) => {
			const role = await getConnection()
				.getRepository(Role)
				.findOne({ id });
			_roles.push(role);
			user.roles = _roles;
		});

		await getConnection().getRepository(User).save(user);

		const updated: any = await getConnection()
			.getRepository(User)
			.findOne(
				{ id },
				{
					relations: ['roles'],
				},
			);
		console.log('updated', updated);
		return updated;
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
