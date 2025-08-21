import { Model, type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { UserModel } from "../users/user.model.js";
import { type UserAuthResponseDto } from "../users/users.js";

class ReviewModel extends AbstractModel {
	public static override get tableName(): string {
		return DatabaseTableName.REVIEWS;
	}

	public content!: string;

	public likesCount!: number;

	public poiId!: null | number;

	public routeId!: null | number;

	public user!: Pick<
		UserAuthResponseDto,
		"avatarUrl" | "firstName" | "id" | "lastName"
	>;

	public userId!: number;

	public static relationMappings(): RelationMappings {
		return {
			user: {
				join: {
					from: `${DatabaseTableName.REVIEWS}.user_id`,
					to: `${DatabaseTableName.USERS}.id`,
				},
				modelClass: UserModel,
				relation: Model.BelongsToOneRelation,
			},
		};
	}
}

export { ReviewModel };
