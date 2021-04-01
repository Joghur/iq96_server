import { ObjectType, Field } from 'type-graphql';
import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
	BaseEntity,
	JoinTable,
	ManyToMany,
	BeforeInsert,
} from 'typeorm';
import bcrypt from 'bcrypt';
import { Role } from '../entities';

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => String, { nullable: true })
	@Column()
	firstname!: string;

	@Field(() => String, { nullable: true })
	@Column()
	lastname!: string;

	@Field()
	@Column({ unique: true })
	username!: string;

	@Field(() => String)
	@CreateDateColumn()
	birthday: Date;

	@Field()
	@Column({ unique: true })
	address!: string;

	@Field()
	@Column({ unique: true })
	emails!: string;

	@Field()
	@Column({ unique: true })
	phones!: string;

	@Field()
	@Column({ unique: true })
	size!: string;

	@Field()
	@Column({ unique: true })
	front!: string;

	@Field()
	@Column({ unique: true })
	back!: string;

	@Field(() => [Role], { nullable: true })
	@ManyToMany(() => Role, (role) => role.users)
	@JoinTable()
	roles: Role[];

	@Column({ type: 'varchar', length: 100, nullable: false })
	password!: string;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;

	@BeforeInsert()
	async setPassword(password: string) {
		const salt = await bcrypt.genSalt();
		this.password = await bcrypt.hash(password || this.password, salt);
	}
}
