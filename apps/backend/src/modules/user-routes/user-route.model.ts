import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { type LineStringGeometry } from "~/libs/types/types.js";

import { type UserRouteStatusType } from "./libs/types/type.js";

class UserRouteModel extends AbstractModel {
	public static override get tableName(): string {
		return DatabaseTableName.USER_ROUTES;
	}

	public actualGeometry!: LineStringGeometry;
	public completedAt!: null | string;
	public plannedGeometry!: LineStringGeometry;
	public routeId!: number;
	public startedAt!: string;
	public status!: UserRouteStatusType;
	public userId!: number;
}

export { UserRouteModel };
