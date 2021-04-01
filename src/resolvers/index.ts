import { HelloResolver } from './hello';
import { UserResolver } from './user';
import { AddressResolver } from './address';
import { RoleResolver } from './role';

export { HelloResolver, UserResolver, AddressResolver, RoleResolver };

export const resolvers = [
	HelloResolver,
	UserResolver,
	AddressResolver,
	RoleResolver,
];
