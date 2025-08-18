import { SortingOrder } from "~/libs/enums/enums.js";
import { type Repository } from "~/libs/types/types.js";

import {
	type RouteFindAllNearbyOptions,
	type RouteFindAllOptions,
} from "./libs/types/types.js";
import { RouteEntity } from "./route.entity.js";
import { type RouteModel } from "./route.model.js";

class RouteRepository implements Repository {
	private routesModel: typeof RouteModel;

	public constructor(routesModel: typeof RouteModel) {
		this.routesModel = routesModel;
	}

	public async create(entity: RouteEntity): Promise<RouteEntity> {
		const insertData = entity.toNewObject();

		const result = await this.routesModel
			.query()
			.insertGraph(insertData, { relate: ["pois"] })
			.returning(["id", "name", "description"]);

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
			.select("routes.id", "routes.name")
			.modify((builder) => {
				if (options?.name) {
					builder.whereILike("name", `%${options.name.trim()}%`);
				}
			});

		return routes.map((point) => RouteEntity.initializeList(point));
	}

	public async findAllNearby(
		options: RouteFindAllNearbyOptions,
	): Promise<RouteEntity[]> {
		const { latitude, longitude } = options;

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
				this.routesModel.raw(
					"ST_AsGeoJSON(poi.location)::json as first_poi_location",
				),
				this.routesModel.raw(
					`ST_Distance(
					poi.location::geography,
					ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography
					) as distance`,
					[longitude, latitude],
				),
			])
			.joinRaw(
				`JOIN routes_to_pois ON routes.id = routes_to_pois.route_id
				JOIN points_of_interest AS poi ON poi.id = routes_to_pois.poi_id AND routes_to_pois.visit_order = 0`,
			)
			.orderBy("distance", SortingOrder.ASC);

		return routes.map((route) => RouteEntity.initialize(route));
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
			.select("routes.id", "routes.name", "routes.description")
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
			.returning(["id", "name", "description"])
			.execute();

		return updatedRoute ? RouteEntity.initialize(updatedRoute) : null;
	}
}

export { RouteRepository };
