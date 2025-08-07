import { UserFollowsModel } from "~/modules/user-follows/user-follows.model.js";

class UserFollowsRepository {
	private userFollowsModel: typeof UserFollowsModel;

	public constructor(userFollowsModel: typeof UserFollowsModel) {
		this.userFollowsModel = userFollowsModel;
	}

	public async checkIsUserFollowing(
		followerId: number,
		followingId: number,
	): Promise<boolean> {
		const relation = await UserFollowsModel.query()
			.where({ followerId, followingId })
			.first();

		return Boolean(relation);
	}

	public async followUser(
		followerId: number,
		followingId: number,
	): Promise<void> {
		await UserFollowsModel.query().insert({
			followerId,
			followingId,
		} as Partial<UserFollowsModel>);
	}

	public async unfollowUser(
		followerId: number,
		followingId: number,
	): Promise<number> {
		const deleteCount = await UserFollowsModel.query().delete().where({
			followerId,
			followingId,
		});

		return deleteCount;
	}
}

export { UserFollowsRepository };
