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
		const userRepository = getConnection().getRepository(User);
		const users = await userRepository.find({
			relations: ['roles'],
		});
		console.log('users', users);
		return { users };
	}

	@Query(() => UserResponse, { nullable: true })
	async user(@Arg('id', () => Int) id: number): Promise<UserResponse> {
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
		console.log('user', user);
		return {
			user,
		};
	}

	@Mutation(() => Boolean)
	async deleteUser(
		@Arg('id', () => Int) id: number,
		@Ctx() {},
	): Promise<boolean> {
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
