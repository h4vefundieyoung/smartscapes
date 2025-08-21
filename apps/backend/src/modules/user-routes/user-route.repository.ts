import {
	type LineStringGeometry,
	type Repository,
} from "~/libs/types/types.js";

import { UserRouteStatus } from "./libs/enums/enum.js";
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
					"ST_AsGeoJSON(actual_geometry)::json as actual_geometry",
				),
				this.userRouteModel.raw(
					"ST_AsGeoJSON(planned_geometry)::json as planned_geometry",
				),
			])
			.execute();

		return UserRouteEntity.initialize(result);
	}

	public async findAllByUserId(userId: number): Promise<UserRouteEntity[]> {
		const result = await this.userRouteModel
			.query()
			.where({ userId })
			.select([
				"id",
				"routeId",
				"userId",
				"status",
				"startedAt",
				"completedAt",
				this.userRouteModel.raw(
					"ST_AsGeoJSON(actual_geometry)::json as actual_geometry",
				),
				this.userRouteModel.raw(
					"ST_AsGeoJSON(planned_geometry)::json as planned_geometry",
				),
			])
			.execute();

		return result.map((item) => UserRouteEntity.initialize(item));
	}

	public async findByRouteId(routeId: number): Promise<null | UserRouteEntity> {
		const result = await this.userRouteModel
			.query()
			.where({ routeId })
			.select([
				"id",
				"routeId",
				"userId",
				"status",
				"startedAt",
				"completedAt",
				this.userRouteModel.raw(
					"ST_AsGeoJSON(actual_geometry)::json as actual_geometry",
				),
				this.userRouteModel.raw(
					"ST_AsGeoJSON(planned_geometry)::json as planned_geometry",
				),
			])
			.execute();

		return result[0] ? UserRouteEntity.initialize(result[0]) : null;
	}

	public async hasActiveRoute(userId: number): Promise<boolean> {
		const result = await this.userRouteModel
			.query()
			.where({ status: UserRouteStatus.ACTIVE, userId })
			.execute();

		return result.length > 0;
	}

	public async hasDublicateRoute(
		userId: number,
		geometry: LineStringGeometry,
	): Promise<boolean> {
		const result = await this.userRouteModel
			.query()
			.where("userId", userId)
			.where((builder) =>
				builder
					.where("status", UserRouteStatus.ACTIVE)
					.orWhere("status", UserRouteStatus.NOT_STARTED),
			)
			.whereRaw("ST_Equals(planned_geometry, ST_GeomFromGeoJSON(?))", [
				JSON.stringify(geometry),
			])
			.first();

		return Boolean(result);
	}

	public async patch(
		id: number,
		userId: number,
		entity: UserRouteEntity,
	): Promise<null | UserRouteEntity> {
		const updateData = entity.toNewObject();

		const [updated] = await this.userRouteModel
			.query()
			.where({
				id,
				userId,
			})
			.patch(updateData)
			.returning([
				"id",
				"routeId",
				"userId",
				"status",
				"startedAt",
				"completedAt",
				this.userRouteModel.raw(
					"ST_AsGeoJSON(actual_geometry)::json as actual_geometry",
				),
				this.userRouteModel.raw(
					"ST_AsGeoJSON(planned_geometry)::json as planned_geometry",
				),
			])
			.execute();

		return updated ? UserRouteEntity.initialize(updated) : null;
	}
}

export { UserRouteRepository };
