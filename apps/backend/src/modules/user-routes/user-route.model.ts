import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { type LineStringGeometry } from "~/libs/types/types.js";

class UserRouteModel extends AbstractModel {
	public static override get tableName(): string {
		return DatabaseTableName.USER_ROUTES;
	}

	public actualGeometry!: LineStringGeometry;
	public actualPath!: string;
	public completedAt!: string;
	public plannedGeometry!: LineStringGeometry;
	public routeId!: number;
	public startedAt!: string;
	public status!: string;
	public userId!: number;
}

export { UserRouteModel };
