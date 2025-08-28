import { SortingOrder } from "~/libs/enums/enums.js";
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
		const reviewJoinCondition = `
		"reviews"."route_id" = "user_routes"."route_id"
		AND "reviews"."user_id" = ?
		`;
		const knex = this.userRouteModel.knex();

		const userRoutes = await this.userRouteModel
			.query()
			.where("user_routes.user_id", userId)
			.leftJoin("reviews", function () {
				this.on(knex.raw(reviewJoinCondition, [userId]));
			})
			.leftJoin("routes", "routes.id", "user_routes.route_id")
			.select([
				"user_routes.id",
				"user_routes.route_id",
				"user_routes.user_id",
				"user_routes.status",
				"user_routes.started_at",
				"user_routes.completed_at",
				knex.raw(
					"ST_AsGeoJSON(user_routes.actual_geometry)::json as actual_geometry",
				),
				knex.raw(
					"ST_AsGeoJSON(user_routes.planned_geometry)::json as planned_geometry",
				),
				"reviews.content as review_comment",
				"routes.name as route_name",
				"routes.distance",
			])
			.execute();

		return userRoutes.map((item) => UserRouteEntity.initialize(item));
	}

	public async findByFilter(
		filters: UserRouteFilters,
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
				"distance",
			])
			.execute();

		return userRoutes.map((item) => UserRouteEntity.initialize(item));
	}

	public async findPopular(): Promise<UserRouteEntity[]> {
		const LIMIT = 10;

		const popularRoutes = await this.userRouteModel
			.query()
			.select([
				"routes.id as routeId",
				"routes.name as routeName",
				"routes.geometry as plannedGeometry",
			])
			.count("user_routes.id as totalCount")
			.join("routes", "routes.id", "user_routes.routeId")
			.where("user_routes.status", UserRouteStatus.COMPLETED)
			.groupBy("routes.id", "routes.name", "routes.geometry")
			.orderBy("totalCount", "desc")
			.limit(LIMIT);

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
