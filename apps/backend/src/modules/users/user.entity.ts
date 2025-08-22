import { type Entity } from "~/libs/types/types.js";

import { type GroupEntity } from "../groups/group.entity.js";

class UserEntity implements Entity {
	private avatarUrl: null | string;

	private email: string;

	private firstName: string;

	private group: null | ReturnType<GroupEntity["toObject"]>;

	private groupId: number;

	private id: null | number;

	private isVisibleProfile: boolean;

	private lastName: string;

	private passwordHash: string;

	private passwordSalt: string;

	private constructor({
		avatarUrl,
		email,
		firstName,
		group,
		groupId,
		id,
		isVisibleProfile,
		lastName,
		passwordHash,
		passwordSalt,
	}: {
		avatarUrl: null | string;
		email: string;
		firstName: string;
		group: null | ReturnType<GroupEntity["toObject"]>;
		groupId: number;
		id: null | number;
		isVisibleProfile: boolean;
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
		this.group = group;
		this.groupId = groupId;
		this.avatarUrl = avatarUrl;
		this.isVisibleProfile = isVisibleProfile;
	}

	public static initialize({
		avatarUrl,
		email,
		firstName,
		group,
		groupId,
		id,
		isVisibleProfile,
		lastName,
		passwordHash,
		passwordSalt,
	}: {
		avatarUrl: null | string;
		email: string;
		firstName: string;
		group: null | ReturnType<GroupEntity["toObject"]>;
		groupId: number;
		id: number;
		isVisibleProfile: boolean;
		lastName: string;
		passwordHash: string;
		passwordSalt: string;
	}): UserEntity {
		return new UserEntity({
			avatarUrl,
			email,
			firstName,
			group,
			groupId,
			id,
			isVisibleProfile,
			lastName,
			passwordHash,
			passwordSalt,
		});
	}

	public static initializeNew({
		email,
		firstName,
		groupId,
		isVisibleProfile,
		lastName,
		passwordHash,
		passwordSalt,
	}: {
		email: string;
		firstName: string;
		groupId: number;
		isVisibleProfile: boolean;
		lastName: string;
		passwordHash: string;
		passwordSalt: string;
	}): UserEntity {
		return new UserEntity({
			avatarUrl: null,
			email,
			firstName,
			group: null,
			groupId,
			id: null,
			isVisibleProfile,
			lastName,
			passwordHash,
			passwordSalt,
		});
	}

	public toNewObject(): {
		email: string;
		firstName: string;
		groupId: number;
		isVisibleProfile: boolean;
		lastName: string;
		passwordHash: string;
		passwordSalt: string;
	} {
		return {
			email: this.email,
			firstName: this.firstName,
			groupId: this.groupId,
			isVisibleProfile: this.isVisibleProfile,
			lastName: this.lastName,
			passwordHash: this.passwordHash,
			passwordSalt: this.passwordSalt,
		};
	}

	public toObject(): {
		avatarUrl: null | string;
		email: string;
		firstName: string;
		group: ReturnType<GroupEntity["toObject"]>;
		groupId: number;
		id: number;
		isVisibleProfile: boolean;
		lastName: string;
	} {
		return {
			avatarUrl: this.avatarUrl,
			email: this.email,
			firstName: this.firstName,
			group: this.group as ReturnType<GroupEntity["toObject"]>,
			groupId: this.groupId,
			id: this.id as number,
			isVisibleProfile: this.isVisibleProfile,
			lastName: this.lastName,
		};
	}
}

export { UserEntity };
