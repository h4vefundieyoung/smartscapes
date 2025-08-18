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
				"routeId",
				"userId",
				"status",
				"startedAt",
				"completedAt",
				this.userRouteModel.raw(
					"ST_AsGeoJSON(actual_geometry)::json as actualGeometry",
				),
				this.userRouteModel.raw(
					"ST_AsGeoJSON(planned_geometry)::json as plannedGeometry",
				),
			])
			.execute();

		return UserRouteEntity.initialize(result);
	}

	public async findById(id: number): Promise<null | UserRouteEntity> {
		const result = await this.userRouteModel
			.query()
			.findById(id)
			.returning([
				"id",
				"routeId",
				"userId",
				"status",
				"startedAt",
				"completedAt",
				this.userRouteModel.raw(
					"ST_AsGeoJSON(actual_geometry)::json as actualGeometry",
				),
				this.userRouteModel.raw(
					"ST_AsGeoJSON(planned_geometry)::json as plannedGeometry",
				),
			])
			.execute();

		return result ? UserRouteEntity.initialize(result) : null;
	}

	public async patch(
		id: number,
		entity: UserRouteEntity,
	): Promise<null | UserRouteEntity> {
		const updateData = entity.toNewObject();

		const [updated] = await this.userRouteModel
			.query()
			.where({ id })
			.patch(updateData)
			.returning([
				"id",
				"routeId",
				"userId",
				"status",
				"startedAt",
				"completedAt",
				this.userRouteModel.raw(
					"ST_AsGeoJSON(actual_geometry)::json as actualGeometry",
				),
				this.userRouteModel.raw(
					"ST_AsGeoJSON(planned_geometry)::json as plannedGeometry",
				),
			])
			.execute();

		return updated ? UserRouteEntity.initialize(updated) : null;
	}
}

export { UserRouteRepository };
