import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class UserFollowsModel extends AbstractModel {
	public static override get tableName(): string {
		return DatabaseTableName.USER_FOLLOWS;
	}

	private followerId!: number;

	private followingId!: number;
}

export { UserFollowsModel };
