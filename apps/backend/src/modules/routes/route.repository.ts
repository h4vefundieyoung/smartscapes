import { SortingOrder } from "~/libs/enums/enums.js";
import {
	type EntityPagination,
	type Repository,
	type TransactionOptions,
} from "~/libs/types/types.js";

import { type PlannedPathModel } from "../planned-paths/planned-path.model.js";
import { UserRouteStatus } from "./libs/enums/enums.js";
import { type RouteFindAllOptions } from "./libs/types/types.js";
import { RouteEntity } from "./route.entity.js";
import { type RouteModel } from "./route.model.js";

const PAGE_NUMBER_OFFSET = 1;
class RouteRepository implements Repository {
	private plannedPathModel: typeof PlannedPathModel;

	private routesModel: typeof RouteModel;

	public constructor(
		routesModel: typeof RouteModel,
		plannedPathModel: typeof PlannedPathModel,
	) {
		this.plannedPathModel = plannedPathModel;
		this.routesModel = routesModel;
	}

	public async create(
		entity: RouteEntity,
		options?: TransactionOptions,
	): Promise<RouteEntity> {
		const insertData = entity.toNewObject();

		let query = this.routesModel.query();

		if (options?.transaction) {
			query = query.transacting(options.transaction);
		}

		const result = await query
			.insertGraph(insertData as RouteModel, { relate: ["pois"] })
			.returning([
				"id",
				"name",
				"description",
				"created_at",
				this.routesModel.raw("to_json(distance)::json as distance"),
				this.routesModel.raw("to_json(duration)::json as duration"),
				this.routesModel.raw("ST_AsGeoJSON(geometry)::json as geometry"),
				"created_by_user_id",
				this.routesModel.raw("'[]'::json as images"),
			]);

		return RouteEntity.initialize(result);
	}

	public async delete(id: number): Promise<boolean> {
		const isDeleted = await this.routesModel.query().deleteById(id).execute();

		return Boolean(isDeleted);
	}

	public async findAll(
		options: null | RouteFindAllOptions,
	): Promise<EntityPagination<RouteEntity>> {
		const { categories, latitude, longitude, name, page, perPage } =
			options ?? {};

		const hasLocationFilter = longitude !== undefined && latitude !== undefined;
		const hasPagination = page !== undefined && perPage !== undefined;

		const query = this.routesModel
			.query()
			.select([
				"routes.id",
				"routes.name",
				"routes.description",
				this.routesModel.raw("to_json(distance)::json as distance"),
				this.routesModel.raw("to_json(duration)::json as duration"),
				this.routesModel.raw("ST_AsGeoJSON(routes.geometry)::json as geometry"),
				"routes.created_by_user_id",
				"routes.created_at as createdAt",
			])
			.withGraphFetched("[pois(selectPoiData), images(selectFileData)]")
			.modifiers({
				selectFileData(builder) {
					builder.select("files.id", "files.url");
				},
				selectPoiData(builder) {
					builder.select(
						"points_of_interest.id",
						"points_of_interest.name",
						"routes_to_pois.visit_order",
					);
				},
			})
			.modify((builder) => {
				if (name) {
					builder.whereILike("routes.name", `%${name.trim()}%`);
				}

				if (categories?.length) {
					builder
						.joinRelated("categories")
						.whereIn("categories.key", categories as string[]);
				}

				if (hasLocationFilter) {
					builder
						.joinRelated("pois")
						.where("pois_join.visit_order", 0)
						.select(
							this.routesModel.raw(
								`ST_Distance(
									pois.location::geography,
									ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography
								) as distance_points`,
								[longitude, latitude],
							),
						)
						.orderBy("distance_points", SortingOrder.ASC);
				}

				builder.orderBy("routes.created_at", SortingOrder.DESC);
			});

		if (hasPagination) {
			const offset = (page - PAGE_NUMBER_OFFSET) * perPage;

			const [total, items] = await Promise.all([
				query.clone().resultSize(),
				query.clone().offset(offset).limit(perPage),
			]);

			return {
				items: items.map((item) => RouteEntity.initialize(item)),
				total,
			};
		}

		const items = await query;

		return {
			items: items.map((item) => RouteEntity.initialize(item)),
			total: items.length,
		};
	}

	public async findById(
		routeId: number,
		userId?: number,
	): Promise<null | RouteEntity> {
		const route = await this.routesModel
			.query()
			.withGraphFetched("[pois(selectPoi), images(selectFileData)]")
			.modifiers({
				selectFileData(builder) {
					builder.select("files.id", "files.url");
				},
				selectPoi(builder) {
					builder.select(
						"points_of_interest.id",
						"points_of_interest.name",
						"routes_to_pois.visit_order",
					);
				},
			})
			.modify((builder) => {
				if (userId) {
					builder.withGraphFetched("savedUserRoute(filtered)").modifiers({
						filtered(builder) {
							builder
								.select(
									"user_routes.id",
									"user_routes.status",
									"user_routes.user_id",
								)
								.where("user_routes.user_id", userId)
								.andWhere("user_routes.status", UserRouteStatus.NOT_STARTED);
						},
					});
				}
			})
			.select([
				"routes.id",
				"routes.name",
				"routes.description",
				this.routesModel.raw("to_json(distance)::json as distance"),
				this.routesModel.raw("to_json(duration)::json as duration"),
				this.routesModel.raw("ST_AsGeoJSON(routes.geometry)::json as geometry"),
				"routes.created_by_user_id",
			])
			.where("routes.id", routeId)
			.first();

		if (!route) {
			return null;
		}

		return RouteEntity.initialize(route);
	}

	public async patch(
		id: number,
		entity: Partial<RouteEntity["toObject"]>,
	): Promise<null | RouteEntity> {
		const [updatedRoute] = await this.routesModel
			.query()
			.patch(entity)
			.withGraphFetched("[pois(selectPoi), images(selectFileData)]")
			.modifiers({
				selectFileData(builder) {
					builder.select("files.id", "files.url");
				},
				selectPoi(builder) {
					builder.select("points_of_interest.id", "routes_to_pois.visit_order");
				},
			})
			.where({ id })
			.returning([
				"id",
				"name",
				"description",
				this.routesModel.raw("to_json(distance)::json as distance"),
				this.routesModel.raw("to_json(duration)::json as duration"),
				this.routesModel.raw("ST_AsGeoJSON(routes.geometry)::json as geometry"),
				"routes.created_by_user_id",
			])
			.execute();

		return updatedRoute ? RouteEntity.initialize(updatedRoute) : null;
	}
}

export { RouteRepository };
