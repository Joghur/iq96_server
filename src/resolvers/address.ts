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
import { Address } from '../entities';

@ObjectType()
class AddressFieldError {
	@Field()
	field: string;
	@Field()
	message: string;
}

@ObjectType()
class AddressResponse {
	@Field(() => [AddressFieldError], { nullable: true })
	errors?: AddressFieldError[];

	@Field(() => Address, { nullable: true })
	address?: Address;

	@Field(() => Boolean, { nullable: true })
	ok?: Boolean;
}

@ObjectType()
class Addresses {
	@Field(() => [Address])
	addresses: Address[];
}

@Resolver(Addresses)
export class AddressResolver {
	@Query(() => Addresses, { nullable: true })
	async allAddresses(): Promise<Addresses> {
		const addressRepository = getConnection().getRepository(Address);
		const addresses = await addressRepository.find({
			relations: ['users', 'users.roles'],
		});
		return { addresses };
	}

	@Query(() => AddressResponse, { nullable: true })
	async address(@Arg('id', () => Int) id: number): Promise<AddressResponse> {
		let address;
		try {
			address = await Address.findOneOrFail(id);
		} catch (error) {
			return {
				errors: [
					{
						field: 'id',
						message: 'Could not find address',
					},
				],
			};
		}
		return {
			address,
		};
	}

	@Mutation(() => AddressResponse)
	async deleteAddress(
		@Arg('id', () => Int) id: number,
		@Ctx() {},
	): Promise<AddressResponse> {
		try {
			await Address.delete({ id });
			await Address.findOneOrFail({ id });
		} catch (error) {
			console.log('delete code', error.code);
			console.log('delete message', error.message);
			if (
				error.message.includes('violates foreign key constraint') ||
				error.code === '23503'
			) {
				return {
					errors: [
						{
							field: 'code 23503',
							message: 'violates foreign key constraint',
						},
					],
					ok: false,
				};
			}
			// address doesn't exists (or never did)
			if (error.message.includes('Could not find any entity')) {
				return {
					ok: true,
				};
			}
			return {
				errors: [
					{
						field: `unknown error ${error.code}`,
						message: error.message,
					},
				],
				ok: false,
			};
		}
		// role still exists
		return {
			errors: [
				{
					field: 'address',
					message: 'deletion failed, adress still exists',
				},
			],
			ok: false,
		};
	}
}
