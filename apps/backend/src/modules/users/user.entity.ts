import { type Entity } from "~/libs/types/types.js";

class UserEntity implements Entity {
	private email: string;

	private firstName: string;

	private groupId: null | number;

	private id: null | number;

	private lastName: string;

	private passwordHash: string;

	private passwordSalt: string;

	private constructor({
		email,
		firstName,
		groupId,
		id,
		lastName,
		passwordHash,
		passwordSalt,
	}: {
		email: string;
		firstName: string;
		groupId: null | number;
		id: null | number;
		lastName: string;
		passwordHash: string;
		passwordSalt: string;
	}) {
		this.id = id;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.passwordHash = passwordHash;
		this.passwordSalt = passwordSalt;
		this.groupId = groupId;
	}

	public static initialize({
		email,
		firstName,
		groupId,
		id,
		lastName,
		passwordHash,
		passwordSalt,
	}: {
		email: string;
		firstName: string;
		groupId: number;
		id: number;
		lastName: string;
		passwordHash: string;
		passwordSalt: string;
	}): UserEntity {
		return new UserEntity({
			email,
			firstName,
			groupId,
			id,
			lastName,
			passwordHash,
			passwordSalt,
		});
	}

	public static initializeNew({
		email,
		firstName,
		lastName,
		passwordHash,
		passwordSalt,
	}: {
		email: string;
		firstName: string;
		lastName: string;
		passwordHash: string;
		passwordSalt: string;
	}): UserEntity {
		return new UserEntity({
			email,
			firstName,
			groupId: null,
			id: null,
			lastName,
			passwordHash,
			passwordSalt,
		});
	}

	public toNewObject(): {
		email: string;
		firstName: string;
		lastName: string;
		passwordHash: string;
		passwordSalt: string;
	} {
		return {
			email: this.email,
			firstName: this.firstName,
			lastName: this.lastName,
			passwordHash: this.passwordHash,
			passwordSalt: this.passwordSalt,
		};
	}

	public toObject(): {
		email: string;
		firstName: string;
		groupId: null | number;
		id: number;
		lastName: string;
	} {
		return {
			email: this.email,
			firstName: this.firstName,
			groupId: this.groupId,
			id: this.id as number,
			lastName: this.lastName,
		};
	}
}

export { UserEntity };
