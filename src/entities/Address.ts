import { ObjectType, Field } from 'type-graphql';
import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
	BaseEntity,
	OneToMany,
} from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class Address extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column({ unique: true })
	address!: string;

	@Field(() => [User], { nullable: true })
	@OneToMany(() => User, (user) => user.address, {
		cascade: true,
		onDelete: 'CASCADE',
		orphanedRowAction: 'delete',
	})
	users: User[];

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;
}
