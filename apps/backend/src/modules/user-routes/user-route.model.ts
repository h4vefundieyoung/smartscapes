import { type RelationMappings } from "objection";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { type LineStringGeometry } from "~/libs/types/types.js";

import { RouteModel } from "../routes/route.model.js";
import { type UserRouteStatusType } from "./libs/types/type.js";

class UserRouteModel extends AbstractModel {
	public static override get tableName(): string {
		return DatabaseTableName.USER_ROUTES;
	}

	public actualGeometry!: LineStringGeometry;

	public completedAt!: null | string;

	public plannedGeometry!: LineStringGeometry;

	public routeId!: number;

	public routeName!: string;

	public startedAt!: null | string;

	public status!: UserRouteStatusType;

	public userId!: number;

	public static readonly relationMappings = (): RelationMappings => ({
		routes: {
			join: {
				from: "user_routes.routeId",
				to: "routes.id",
			},
			modelClass: RouteModel,
			relation: this.BelongsToOneRelation,
		},
	});
}

export { UserRouteModel };
