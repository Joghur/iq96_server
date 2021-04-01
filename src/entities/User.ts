import { ObjectType, Field } from 'type-graphql';
import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
	BaseEntity,
	ManyToOne,
	JoinTable,
	ManyToMany,
} from 'typeorm';
import { Address, Role } from '../entities';

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => String, { nullable: true })
	@Column()
	name!: string;

	@Field()
	@Column({ unique: true })
	username!: string;

	@Field()
	@Column({ unique: true })
	email!: string;

	// onDelete set to CASCADE so user will be deleted when address is deleted
	// this is just a testcase
	@Field(() => Address, { nullable: true })
	@ManyToOne(() => Address, (address) => address.users, {
		onDelete: 'CASCADE',
	})
	address: Address;

	@Field(() => [Role], { nullable: true })
	@ManyToMany(() => Role, (role) => role.users)
	@JoinTable()
	roles: Role[];

	// @Column({ type: 'varchar', length: 100, nullable: false })
	// password!: string;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;

	// @BeforeInsert()
	// async setPassword(password: string) {
	// 	const salt = await bcrypt.genSalt();
	// 	this.password = await bcrypt.hash(password || this.password, salt);
	// }
}
