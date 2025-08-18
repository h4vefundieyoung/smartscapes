import { type Repository } from "~/libs/types/types.js";

import { UserRouteEntity } from "./user-route.entity.js";
import { type UserRouteModel } from "./user-route.model.js";

class UserRouteRepository implements Repository {
	private userRouteModel: typeof UserRouteModel;

	public constructor(userRouteModel: typeof UserRouteModel) {
		this.userRouteModel = userRouteModel;
	}

	public async create(entity: UserRouteEntity): Promise<UserRouteEntity> {
		const insertData = entity.toNewObject();

		const result = await this.userRouteModel
			.query()
			.insert(insertData)
			.returning([
				"id",
				this.userRouteModel.raw(
					"ST_AsGeoJSON(actual_geometry)::json as actualGeometry",
				),
				"completedAt",
				this.userRouteModel.raw(
					"ST_AsGeoJSON(planned_geometry)::json as plannedGeometry",
				),
				"routeId",
				"startedAt",
				"status",
				"userId",
			])
			.execute();

		const initialized = UserRouteEntity.initialize(result);

		return initialized;
	}
}

export { UserRouteRepository };
