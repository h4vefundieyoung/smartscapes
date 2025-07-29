import { DatabaseTableName } from "~/libs/modules/database/database.js";
import { type Repository } from "~/libs/types/types.js";

import { RouteEntity } from "./routes.entity.js";
import { type RoutesModel } from "./routes.model.js";

class RoutesRepository implements Repository {
	private routesModel: typeof RoutesModel;

	public constructor(routesModel: typeof RoutesModel) {
		this.routesModel = routesModel;
	}

	public async create(entity: RouteEntity): Promise<RouteEntity> {
		const { description, name, pois } = entity.toNewObject();

		const route = await this.routesModel
			.query()
			.insert({ description, name })
			.returning("*")
			.execute();

		const routeObject = Array.isArray(route)
			? (route[0] as RoutesModel)
			: route;

		if (pois.length > 0) {
			const joinRows = pois.map((poi) => ({
				poi_id: poi.id,
				route_id: (routeObject as { id: number }).id,
				visit_order: poi.visitOrder,
			}));

			await this.routesModel
				.knex()
				.insert(joinRows)
				.into(DatabaseTableName.ROUTES_TO_POIS);
		}

		const routePois = await this.getRoutePois(
			(routeObject as { id: number }).id,
		);

		return RouteEntity.initialize({
			...(routeObject as { description: string; id: number; name: string }),
			pois: routePois,
		});
	}

	public async delete(id: number): Promise<boolean> {
		await this.routesModel
			.knex()
			.table(DatabaseTableName.ROUTES_TO_POIS)
			.where("route_id", id)
			.del();

		const deletedCount = await this.routesModel
			.query()
			.deleteById(id)
			.execute();

		return !!deletedCount;
	}

	public async find(id: number): Promise<null | RouteEntity> {
		const route = await this.routesModel.query().findById(id).execute();

		if (!route) {
			return null;
		}

		const pois = await this.getRoutePois(id);

		return RouteEntity.initialize({
			description: route.description,
			id: route.id,
			name: route.name,
			pois,
		});
	}

	public async findAll(): Promise<RouteEntity[]> {
		const routes = await this.routesModel.query().execute();

		const routesWithPois = await Promise.all(
			routes.map(async (route) => {
				const pois = await this.getRoutePois(route.id);

				return {
					description: route.description,
					id: route.id,
					name: route.name,
					pois,
				};
			}),
		);

		return routesWithPois.map((route) =>
			RouteEntity.initialize({
				description: route.description,
				id: route.id,
				name: route.name,
				pois: route.pois,
			}),
		);
	}

	public async update(
		id: number,
		entity: RouteEntity,
	): Promise<null | RouteEntity> {
		const { description, name, pois } = entity.toNewObject();

		const updatedRoute = await this.routesModel
			.query()
			.patchAndFetchById(id, { description, name })
			.execute();

		await this.routesModel
			.knex()
			.table(DatabaseTableName.ROUTES_TO_POIS)
			.where("route_id", id)
			.del();

		if (pois.length > 0) {
			const joinRows = pois.map((poi) => ({
				poi_id: poi.id,
				route_id: id,
				visit_order: poi.visitOrder,
			}));

			await this.routesModel
				.knex()
				.insert(joinRows)
				.into(DatabaseTableName.ROUTES_TO_POIS);
		}

		const updatedPois = await this.getRoutePois(id);

		return RouteEntity.initialize({
			description: updatedRoute.description,
			id: updatedRoute.id,
			name: updatedRoute.name,
			pois: updatedPois,
		});
	}

	private async getRoutePois(
		routeId: number,
	): Promise<Array<{ id: number; visitOrder: number }>> {
		const pois = await this.routesModel
			.knex()
			.select(
				`${DatabaseTableName.POINTS_OF_INTEREST}.id`,
				`${DatabaseTableName.ROUTES_TO_POIS}.visit_order as visitOrder`,
			)
			.from(DatabaseTableName.ROUTES_TO_POIS)
			.where("route_id", routeId)
			.join(
				DatabaseTableName.POINTS_OF_INTEREST,
				`${DatabaseTableName.ROUTES_TO_POIS}.poi_id`,
				`${DatabaseTableName.POINTS_OF_INTEREST}.id`,
			)
			.orderBy("visit_order", "asc");

		return pois.map((poi) => ({
			id: (poi as { id: number }).id,
			visitOrder: (poi as { visitOrder: number }).visitOrder,
		}));
	}
}

export { RoutesRepository };
