import { type Repository } from "~/libs/types/types.js";

import { UserRouteStatus } from "./libs/enums/enum.js";
import { UserRouteEntity } from "./user-route.entity.js";
import { type UserRouteModel } from "./user-route.model.js";

type UserRouteFilters = Partial<ReturnType<UserRouteEntity["toObject"]>>;

class UserRouteRepository implements Repository {
	private userRouteModel: typeof UserRouteModel;

	public constructor(userRouteModel: typeof UserRouteModel) {
		this.userRouteModel = userRouteModel;
	}

	public async checkHasActiveRoute(userId: number): Promise<boolean> {
		const [userRoute] = await this.userRouteModel
			.query()
			.where({ status: UserRouteStatus.ACTIVE, userId })
			.execute();

		return userRoute ? true : false;
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

	public async findByFilter(
		filters: UserRouteFilters,
	): Promise<UserRouteEntity[]> {
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

		return userRoutes.map((item) => UserRouteEntity.initialize(item));
	}

	public async patch(
		id: number,
		userId: number,
		entity: UserRouteEntity,
	): Promise<null | UserRouteEntity> {
		const updatedUserData = entity.toNewObject();

		const [updatedUserRoute] = await this.userRouteModel
			.query()
			.where({
				id,
				userId,
			})
			.patch(updatedUserData)
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

		return updatedUserRoute
			? UserRouteEntity.initialize(updatedUserRoute)
			: null;
	}
}

export { UserRouteRepository };
