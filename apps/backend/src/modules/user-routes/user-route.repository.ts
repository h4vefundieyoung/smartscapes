import { SortingOrder } from "~/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";

import { UserRouteStatus } from "./libs/enums/enum.js";
import { type UserRouteFilter } from "./libs/types/type.js";
import { UserRouteEntity } from "./user-route.entity.js";
import { type UserRouteModel } from "./user-route.model.js";

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
				"user_routes.id",
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

	public async deleteSavedRoute(id: number, userId: number): Promise<boolean> {
		const isDeleted = await this.userRouteModel
			.query()
			.delete()
			.where({ id, userId })
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
		filters: UserRouteFilter,
	): Promise<UserRouteEntity[]> {
		const userRoutes = await this.userRouteModel
			.query()
			.where(filters)
			.skipUndefined()
			.orderBy("user_routes.id", SortingOrder.DESC)
			.withGraphJoined("routes")
			.select([
				"user_routes.id as id",
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
				"name as routeName",
			])
			.execute();

		return userRoutes.map((item) => UserRouteEntity.initialize(item));
	}

	public async findPopular(): Promise<UserRouteEntity[]> {
		const LIMIT = 10;

		const popularRoutes = await this.userRouteModel
			.query()
			.select([
				"popular_routes.routeId",
				"name as routeName",
				"geometry as plannedGeometry",
			])
			.from(
				this.userRouteModel
					.query()
					.select("routeId")
					.count("id as totalCount")
					.where("status", UserRouteStatus.COMPLETED)
					.groupBy("routeId")
					.orderBy("totalCount", "desc")
					.limit(LIMIT)
					.as("popular_routes"),
			)
			.join("routes", "popular_routes.routeId", "=", "routes.id")
			.orderBy("popular_routes.totalCount", "desc");

		return popularRoutes.map((item) => UserRouteEntity.initialize(item));
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
