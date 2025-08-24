import { type Repository } from "~/libs/types/types.js";

import { UserRouteEntity } from "./user-route.entity.js";
import { type UserRouteModel } from "./user-route.model.js";

type UserRouteFilters = Partial<ReturnType<UserRouteEntity["toObject"]>>;

class UserRouteRepository implements Repository {
	private userRouteModel: typeof UserRouteModel;

	public constructor(userRouteModel: typeof UserRouteModel) {
		this.userRouteModel = userRouteModel;
	}

	public async create(entity: UserRouteEntity): Promise<UserRouteEntity> {
		const insertData = entity.toNewObject();

		const userRoute = await this.userRouteModel
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

		return UserRouteEntity.initialize(userRoute);
	}

	public async deleteSavedRoute(
		routeId: number,
		userId: number,
	): Promise<boolean> {
		const isDeleted = await this.userRouteModel
			.query()
			.delete()
			.where({ routeId, userId })
			.execute();

		return Boolean(isDeleted);
	}

	public async findAllByUserId(userId: number): Promise<UserRouteEntity[]> {
		const userRoutes = await this.userRouteModel
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

		return userRoutes.map((item) => UserRouteEntity.initialize(item));
	}

	public async findByFilter(
		filters: UserRouteFilters,
		options?: { multiple?: boolean },
	): Promise<null | UserRouteEntity | UserRouteEntity[]> {
		const userRoutes = await this.userRouteModel
			.query()
			.where(filters)
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

		if (options?.multiple) {
			return userRoutes.map((item) => UserRouteEntity.initialize(item));
		}

		return userRoutes[0] ? UserRouteEntity.initialize(userRoutes[0]) : null;
	}

	public async patch(
		id: number,
		userId: number,
		entity: UserRouteEntity,
	): Promise<null | UserRouteEntity> {
		const updatedUserRoutes = entity.toNewObject();

		const [updated] = await this.userRouteModel
			.query()
			.where({
				id,
				userId,
			})
			.patch(updatedUserRoutes)
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
