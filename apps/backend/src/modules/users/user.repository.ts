import { transaction } from "objection";

import { type Repository } from "~/libs/types/types.js";
import {
	type AuthenticatedUserPatchRequestDto,
	type UserDetailsWithPassword,
	type UserPublicProfileResponseDto,
} from "~/modules/users/libs/types/types.js";
import { UserEntity } from "~/modules/users/user.entity.js";
import { type UserModel } from "~/modules/users/user.model.js";

import { GroupEntity } from "../groups/group.entity.js";
import { PermissionEntity } from "../permission/permission.entity.js";

class UserRepository implements Repository {
	private userModel: typeof UserModel;

	public constructor(userModel: typeof UserModel) {
		this.userModel = userModel;
	}

	public async create(entity: UserEntity): Promise<UserEntity> {
		const {
			email,
			firstName,
			groupId,
			isVisibleProfile,
			lastName,
			passwordHash,
			passwordSalt,
		} = entity.toNewObject();

		return await transaction(this.userModel, async (UserModel) => {
			const { id: userId } = await UserModel.query().insert({
				email,
				firstName,
				groupId,
				isVisibleProfile,
				lastName,
				passwordHash,
				passwordSalt,
			});

			const user = (await UserModel.query()
				.where("users.id", userId)
				.withGraphJoined("group.permissions")
				.first()) as UserModel;

			const group = user.group as NonNullable<typeof user.group>;
			const permissions = group.permissions as NonNullable<
				typeof group.permissions
			>;

			return UserEntity.initialize({
				avatarUrl: null,
				email: user.email,
				firstName: user.firstName,
				group: GroupEntity.initializeWithPermissions({
					id: group.id,
					key: group.key,
					name: group.name,
					permissions: permissions.map((permission) =>
						PermissionEntity.initialize(permission).toObject(),
					),
				}).toObject(),
				groupId: user.groupId,
				id: user.id,
				isVisibleProfile: user.isVisibleProfile,
				lastName: user.lastName,
				passwordHash: user.passwordHash,
				passwordSalt: user.passwordSalt,
			});
		});
	}

	public async findAll(): Promise<UserEntity[]> {
		const users = await this.userModel
			.query()
			.withGraphJoined("group.permissions")
			.withGraphJoined("avatar")
			.execute();

		return users.map((user) => {
			const group = user.group as NonNullable<typeof user.group>;
			const permissions = user.group?.permissions as NonNullable<
				typeof group.permissions
			>;
			const { avatar } = user;

			return UserEntity.initialize({
				avatarUrl: avatar ? avatar.url : null,
				email: user.email,
				firstName: user.firstName,
				group: GroupEntity.initializeWithPermissions({
					id: group.id,
					key: group.key,
					name: group.name,
					permissions: permissions.map((permission) =>
						PermissionEntity.initialize(permission).toObject(),
					),
				}).toObject(),
				groupId: user.groupId,
				id: user.id,
				isVisibleProfile: user.isVisibleProfile,
				lastName: user.lastName,
				passwordHash: user.passwordHash,
				passwordSalt: user.passwordSalt,
			});
		});
	}

	public async findByEmail(email: string): Promise<null | UserEntity> {
		const user = await this.userModel
			.query()
			.where("email", email)
			.withGraphJoined("group.permissions")
			.withGraphJoined("avatar")
			.first();

		if (!user) {
			return null;
		}

		const group = user.group as NonNullable<typeof user.group>;
		const permissions = user.group?.permissions as NonNullable<
			typeof group.permissions
		>;
		const { avatar } = user;

		return UserEntity.initialize({
			avatarUrl: avatar ? avatar.url : null,
			email: user.email,
			firstName: user.firstName,
			group: GroupEntity.initializeWithPermissions({
				id: group.id,
				key: group.key,
				name: group.name,
				permissions: permissions.map((permission) =>
					PermissionEntity.initialize(permission).toObject(),
				),
			}).toObject(),
			groupId: user.groupId,
			id: user.id,
			isVisibleProfile: user.isVisibleProfile,
			lastName: user.lastName,
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
		});
	}

	public async findById(id: number): Promise<null | UserEntity> {
		const user = await this.userModel
			.query()
			.findById(id)
			.withGraphJoined("group.permissions")
			.withGraphJoined("avatar")
			.first();

		if (!user) {
			return null;
		}

		const group = user.group as NonNullable<typeof user.group>;
		const permissions = user.group?.permissions as NonNullable<
			typeof group.permissions
		>;
		const { avatar } = user;

		return UserEntity.initialize({
			avatarUrl: avatar ? avatar.url : null,
			email: user.email,
			firstName: user.firstName,
			group: GroupEntity.initializeWithPermissions({
				id: group.id,
				key: group.key,
				name: group.name,
				permissions: permissions.map((permission) =>
					PermissionEntity.initialize(permission).toObject(),
				),
			}).toObject(),
			groupId: user.groupId,
			id: user.id,
			isVisibleProfile: user.isVisibleProfile,
			lastName: user.lastName,
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
		});
	}

	public async findPasswordDetails(
		email: string,
	): Promise<null | UserDetailsWithPassword> {
		const user = await this.userModel
			.query()
			.where("email", email)
			.select(
				"users.id",
				"users.first_name",
				"users.email",
				"users.last_name",
				"users.is_visible_profile",
				"users.password_hash as passwordHash",
				"users.password_salt as passwordSalt",
				"users.group_id as groupId",
			)
			.withGraphJoined("group.permissions")
			.withGraphJoined("avatar")
			.where("users.email", email)
			.first();

		if (!user) {
			return null;
		}

		const group = user.group as NonNullable<typeof user.group>;
		const permissions = user.group?.permissions as NonNullable<
			typeof group.permissions
		>;
		const { avatar } = user;

		return {
			avatarUrl: avatar ? avatar.url : null,
			email: user.email,
			firstName: user.firstName,
			group: GroupEntity.initializeWithPermissions({
				id: group.id,
				key: group.key,
				name: group.name,
				permissions: permissions.map((permission) =>
					PermissionEntity.initialize(permission).toObject(),
				),
			}).toObject(),
			groupId: user.groupId,
			id: user.id,
			isVisibleProfile: user.isVisibleProfile,
			lastName: user.lastName,
			passwordHash: user.passwordHash,
			passwordSalt: user.passwordSalt,
		};
	}

	public async getUserProfile(
		id: number,
		currentUserId: number,
	): Promise<null | UserPublicProfileResponseDto> {
		const profileData = await this.userModel
			.query()
			.findById(id)
			.select(
				"users.id",
				"users.firstName",
				"users.lastName",
				"users.isVisibleProfile",
				this.userModel
					.raw(
						"(SELECT COUNT(*) FROM user_follows uf WHERE uf.following_id = users.id)",
					)
					.as("followersCount"),
				this.userModel
					.raw(
						`EXISTS (
					SELECT 1
					FROM user_follows uf2
					WHERE uf2.following_id = users.id
					AND uf2.follower_id = ?
				)`,
						[currentUserId],
					)
					.as("isFollowed"),
			)
			.withGraphJoined("avatar")
			.first();

		if (!profileData) {
			return null;
		}

		const userProfile = profileData as UserModel & {
			followersCount: number;
			isFollowed: boolean;
		};

		const { avatar } = userProfile;

		return {
			avatarUrl: avatar ? avatar.url : null,
			firstName: userProfile.firstName,
			followersCount: Number(userProfile.followersCount),
			id: userProfile.id,
			isFollowed: Boolean(userProfile.isFollowed),
			isVisibleProfile: Boolean(userProfile.isVisibleProfile),
			lastName: userProfile.lastName,
		};
	}

	public async patch(
		id: number,
		payload: AuthenticatedUserPatchRequestDto,
	): Promise<null | UserEntity> {
		return await transaction(this.userModel, async (UserModel) => {
			const [updatedRow] = await UserModel.query()
				.patch(payload)
				.where("id", "=", id)
				.returning("*")
				.execute();

			if (!updatedRow) {
				return null;
			}

			const user = (await UserModel.query()
				.where("users.id", updatedRow.id)
				.withGraphJoined("group.permissions")
				.withGraphJoined("avatar")
				.first()) as UserModel;

			const group = user.group as NonNullable<typeof user.group>;
			const permissions = group.permissions as NonNullable<
				typeof group.permissions
			>;
			const { avatar } = user;

			return UserEntity.initialize({
				avatarUrl: avatar ? avatar.url : null,
				email: user.email,
				firstName: user.firstName,
				group: GroupEntity.initializeWithPermissions({
					id: group.id,
					key: group.key,
					name: group.name,
					permissions: permissions.map((permission) =>
						PermissionEntity.initialize(permission).toObject(),
					),
				}).toObject(),
				groupId: user.groupId,

				id: user.id,
				isVisibleProfile: user.isVisibleProfile,
				lastName: user.lastName,
				passwordHash: user.passwordHash,
				passwordSalt: user.passwordSalt,
			});
		});
	}
}

export { UserRepository };
