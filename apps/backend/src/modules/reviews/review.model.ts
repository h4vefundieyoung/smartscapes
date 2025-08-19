import { Model } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { UserModel } from "../users/user.model.js";

class ReviewModel extends AbstractModel {
	public static readonly relationMappings = {
		user: {
			join: {
				from: `${DatabaseTableName.REVIEWS}.user_id`,
				to: `${DatabaseTableName.USERS}.id`,
			},
			modelClass: UserModel,
			relation: Model.BelongsToOneRelation,
		},
	};

	public static override get tableName(): string {
		return DatabaseTableName.REVIEWS;
	}

	public content!: string;
	public likesCount!: number;
	public poiId!: null | number;
	public routeId!: null | number;
	public user!: { firstName: string; id: number; lastName: string };
	public userId!: number;
}

export { ReviewModel };
