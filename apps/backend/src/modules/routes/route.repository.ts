//

import { type Knex } from "knex";

import { type Repository } from "~/libs/types/types.js";

import { type PlannedPathModel } from "../planned-routes/planned-path.model.js";
import { type RouteFindAllOptions } from "./libs/types/types.js";
import { RouteEntity } from "./route.entity.js";
import { type RouteModel } from "./route.model.js";

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

	public async create(payload: {
		entity: RouteEntity;
		transaction: Knex.Transaction;
	}): Promise<RouteEntity> {
		const { entity, transaction } = payload;

		const insertData = entity.toNewObject();

		const RoutesModelTransaction = this.routesModel.bindKnex(transaction);

		const result = await RoutesModelTransaction.query()
			.insertGraph(insertData, { relate: ["pois"] })
			.returning([
				"id",
				"name",
				"description",
				RoutesModelTransaction.raw("to_json(distance)::json as distance"),
				RoutesModelTransaction.raw("to_json(duration)::json as duration"),
				RoutesModelTransaction.raw("ST_AsGeoJSON(geometry)::json as geometry"),
				"user_id",
			]);

		return RouteEntity.initialize(result);
	}

	public async delete(id: number): Promise<boolean> {
		const isDeleted = await this.routesModel.query().deleteById(id).execute();

		return Boolean(isDeleted);
	}

	public async findAll(
		options: null | RouteFindAllOptions,
	): Promise<RouteEntity[]> {
		const routes = await this.routesModel
			.query()
			.withGraphFetched("pois(selectPoiIdOrder)")
			.modifiers({
				selectPoiIdOrder(builder) {
					builder.select("points_of_interest.id", "routes_to_pois.visit_order");
				},
			})
			.select([
				"routes.id",
				"routes.name",
				"routes.description",
				this.routesModel.raw("to_json(distance)::json as distance"),
				this.routesModel.raw("to_json(duration)::json as duration"),
				this.routesModel.raw("ST_AsGeoJSON(routes.geometry)::json as geometry"),
				"routes.user_id",
			])
			.modify((builder) => {
				if (options?.name) {
					builder.whereILike("name", `%${options.name.trim()}%`);
				}
			});

		return routes.map((point) => RouteEntity.initializeList(point));
	}

	public async findById(id: number): Promise<null | RouteEntity> {
		const route = await this.routesModel
			.query()
			.withGraphFetched("pois(selectPoiIdOrder)")
			.modifiers({
				selectPoiIdOrder(builder) {
					builder.select("points_of_interest.id", "routes_to_pois.visit_order");
				},
			})
			.select([
				"routes.id",
				"routes.name",
				"routes.description",
				this.routesModel.raw("to_json(distance)::json as distance"),
				this.routesModel.raw("to_json(duration)::json as duration"),
				this.routesModel.raw("ST_AsGeoJSON(routes.geometry)::json as geometry"),
				"routes.user_id",
			])
			.where("routes.id", id)
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
			.withGraphFetched("pois(selectPoiIdOrder)")
			.modifiers({
				selectPoiIdOrder(builder) {
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
				"routes.user_id",
			])
			.execute();

		return updatedRoute ? RouteEntity.initialize(updatedRoute) : null;
	}
}

export { RouteRepository };
