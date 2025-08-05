import { type Repository } from "~/libs/types/types.js";
import {
	type UserGetByIdItemResponseDto,
	type UserPasswordDetails,
} from "~/modules/users/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserModel } from "~/modules/users/user.model.js";

import { groupService } from "../groups/group.js";
import { type GroupService } from "../groups/group.service.js";
import { GroupExceptionMessage, GroupKey } from "../groups/libs/enums/enums.js";

class UserRepository implements Repository {
	private groupService: GroupService;
	private userModel: typeof UserModel;

	public constructor(userModel: typeof UserModel) {
		this.userModel = userModel;
		this.groupService = groupService;
	}

	public async create(entity: UserEntity): Promise<UserEntity> {
		const { email, firstName, lastName, passwordHash, passwordSalt } =
			entity.toNewObject();

		const group = await this.groupService
			.findByKey(GroupKey.USERS)
			.catch(() => {
				throw new Error(GroupExceptionMessage.GROUP_NOT_FOUND);
			});

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

	public async findAll(): Promise<UserEntity[]> {
		const users = await this.userModel.query().execute();

		return users.map((user) => UserEntity.initialize(user));
	}

	public async findByEmail(email: string): Promise<null | UserEntity> {
		const user = await this.userModel.query().where("email", email).first();

		return user ? UserEntity.initialize(user) : null;
	}

	public async findById(
		id: number,
	): Promise<null | UserGetByIdItemResponseDto> {
		const user = await this.userModel
			.query()
			.findById(id)
			.withGraphJoined("group.permissions")
			.first();

		if (!user || !user.group) {
			return null;
		}

		return {
			email: user.email,
			firstName: user.firstName,
			group: {
				id: user.group.id,
				key: user.group.key,
				name: user.group.name,
				permissions:
					user.group.permissions?.map((permission) => ({
						id: permission.id,
						key: permission.key,
						name: permission.name,
					})) || [],
			},
			groupId: user.groupId,
			id: user.id,
			lastName: user.lastName,
		};
	}

	public async findPasswordDetails(
		email: string,
	): Promise<null | UserPasswordDetails> {
		const user = await this.userModel
			.query()
			.select("users.id", "passwordHash", "passwordSalt", "groupId")
			.withGraphJoined("group")
			.where("email", email)
			.first();

		if (!user || !user.group) {
			return null;
		}

		return {
			group: {
				id: user.group.id,
				key: user.group.key,
				name: user.group.name,
			},
			groupId: user.groupId,
			id: user.id,
			key: user.group.key,
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
		};
	}
}

export { UserRepository };
