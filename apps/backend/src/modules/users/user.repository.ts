import { type Repository } from "~/libs/types/types.js";
import {
	type UserGetByIdItemResponseDto,
	type UserPasswordDetails,
} from "~/modules/users/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserModel } from "~/modules/users/user.model.js";

import { type GroupService } from "../groups/group.service.js";
import { GroupExceptionMessage, GroupKey } from "../groups/libs/enums/enums.js";

class UserRepository implements Repository {
	private groupService: GroupService;
	private userModel: typeof UserModel;

	public constructor(userModel: typeof UserModel, groupService: GroupService) {
		this.userModel = userModel;
		this.groupService = groupService;
	}

	public async create(entity: UserEntity): Promise<UserEntity> {
		const { email, firstName, lastName, passwordHash, passwordSalt } =
			entity.toNewObject();

		const group = await this.groupService.findByKey(GroupKey.USERS);

		if (!group) {
			throw new Error(GroupExceptionMessage.GROUP_NOT_FOUND);
		}

		const user = await this.userModel
			.query()
			.insert({
				email,
				firstName,
				groupId: group.id,
				lastName,
				passwordHash,
				passwordSalt,
			})
			.returning("*")
			.execute();

		return UserEntity.initialize(user);
	}

	public async findAll(): Promise<UserGetByIdItemResponseDto[]> {
		const users = await this.userModel
			.query()
			.select([
				"users.id",
				"firstName",
				"lastName",
				"users.group_id as groupId",
				"email",
				"groups.id",
				"groups.key as groupKey",
				"groups.name as groupName",
			])
			.innerJoin("groups", "users.group_id", "groups.id")
			.leftJoin(
				"groups_to_permissions",
				"groups.id",
				"groups_to_permissions.group_id",
			)
			.leftJoin(
				"permissions",
				"groups_to_permissions.permission_id",
				"permissions.id",
			)
			.castTo<UserGetByIdItemResponseDto[]>()
			.execute();

		return users;
	}

	public async findByEmail(
		email: string,
	): Promise<null | UserGetByIdItemResponseDto> {
		const user = await this.userModel
			.query()
			.where("email", email)
			.withGraphJoined("group.permissions")
			.first();

		if (!user || !user.group || !user.group.permissions) {
			return null;
		}

		return this.mapUserModelToDto(user);
	}

	public async findById(
		id: number,
	): Promise<null | UserGetByIdItemResponseDto> {
		const user = await this.userModel
			.query()
			.findById(id)
			.withGraphJoined("group.permissions")
			.first();

		if (!user || !user.group || !user.group.permissions) {
			return null;
		}

		return this.mapUserModelToDto(user);
	}

	public async findPasswordDetails(
		email: string,
	): Promise<null | UserPasswordDetails> {
		const user = await this.userModel
			.query()
			.select(
				"users.id",
				"users.first_name",
				"users.last_name",
				"users.password_hash as passwordHash",
				"users.password_salt as passwordSalt",
				"users.group_id as groupId",
			)
			.withGraphJoined("group.permissions")
			.where("users.email", email)
			.first();

		if (!user || !user.group || !user.group.permissions) {
			return null;
		}

		return {
			firstName: user.firstName,
			group: {
				id: user.group.id,
				key: user.group.key,
				name: user.group.name,
				permissions: user.group.permissions.map((permission) => ({
					id: permission.id,
					key: permission.key,
					name: permission.name,
				})),
			},
			groupId: user.groupId,
			id: user.id,
			lastName: user.lastName,
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
		};
	}

	private mapUserModelToDto(
		user: UserModel,
	): null | UserGetByIdItemResponseDto {
		if (!user.group || !user.group.permissions) {
			return null;
		}

		return {
			email: user.email,
			firstName: user.firstName,
			group: {
				id: user.group.id,
				key: user.group.key,
				name: user.group.name,
				permissions: user.group.permissions.map((p) => ({
					id: p.id,
					key: p.key,
					name: p.name,
				})),
			},
			groupId: user.groupId,
			id: user.id,
			lastName: user.lastName,
		};
	}
}

export { UserRepository };
