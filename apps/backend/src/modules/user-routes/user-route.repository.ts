import { type Repository } from "~/libs/types/types.js";

import { UserRouteEntity } from "./user-route.entity.js";
import { type UserRouteModel } from "./user-route.model.js";

class UserRouteRepository implements Repository {
	private userRouteModel: typeof UserRouteModel;

	public constructor(userRouteModel: typeof UserRouteModel) {
		this.userRouteModel = userRouteModel;
	}

	public async create(entity: UserRouteEntity): Promise<UserRouteEntity> {
		const {
			actualGeometry,
			actualPath,
			completedAt,
			plannedGeometry,
			routeId,
			startedAt,
			status,
			userId,
		} = entity.toNewObject();

		const result = await this.userRouteModel
			.query()
			.insert({
				actualGeometry,
				actualPath,
				completedAt,
				plannedGeometry,
				routeId,
				startedAt,
				status,
				userId,
			})
			.returning([
				"id",
				this.userRouteModel.raw(
					"ST_AsGeoJSON(actual_geometry)::json as actualGeometry",
				),
				"actualPath",
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

		return UserRouteEntity.initialize(result);
	}
}

export { UserRouteRepository };

