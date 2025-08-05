import {
	type RoutesRequestPatchDto,
	type RoutesResponseDto,
} from "@smartscapes/shared";
import { type QueryBuilder } from "objection";

import { DatabaseTableName } from "~/libs/modules/database/database.js";
import { type Repository } from "~/libs/types/types.js";

import { type RouteEntity } from "./routes.entity.js";
import { type RoutesModel } from "./routes.model.js";

class RoutesRepository implements Repository {
	private routesModel: typeof RoutesModel;

	public constructor(routesModel: typeof RoutesModel) {
		this.routesModel = routesModel;
	}

	public async create(entity: RouteEntity): Promise<RoutesResponseDto> {
		const insertData = entity.toNewObject();

		const result = (await this.routesModel
			.query()
			.insertGraph(insertData, { relate: ["pois"] })
			.returning([
				"id",
				"name",
				"description",
			])) as unknown as RoutesResponseDto;

		return result;
	}

	public async delete(id: number): Promise<boolean> {
		await this.deleteRoutePois(id);

		const isDeleted = await this.routesModel.query().deleteById(id).execute();

		return Boolean(isDeleted);
	}

	public async findAll(): Promise<RoutesResponseDto[]> {
		const routesWithPois = await this.queryRoute();

		return routesWithPois as unknown as RoutesResponseDto[];
	}

	public async findById(id: number): Promise<null | RoutesResponseDto> {
		const route = (await this.queryRoute()
			.where("routes.id", id)
			.first()) as unknown as RoutesResponseDto;

		if (!JSON.stringify(route)) {
			return null;
		}

		return route;
	}

	public async patch(
		id: number,
		entity: RoutesRequestPatchDto,
	): Promise<RoutesResponseDto> {
		const { description, name } = entity;

		const patchData = Object.fromEntries(
			Object.entries({ description, name }).filter(
				([, value]) => value !== undefined,
			),
		);

		await this.routesModel.query().patchAndFetchById(id, patchData).execute();

		return (await this.findById(id)) as RoutesResponseDto;
	}

	private async deleteRoutePois(routeId: number): Promise<void> {
		await this.routesModel
			.knex()
			.table(DatabaseTableName.ROUTES_TO_POIS)
			.where("route_id", routeId)
			.del();
	}

	private queryRoute(): QueryBuilder<RoutesModel, RoutesModel[]> {
		return this.routesModel
			.query()
			.withGraphFetched("pois(selectIdOrder)")
			.modifiers({
				selectIdOrder(builder) {
					builder.select("points_of_interest.id", "routes_to_pois.visit_order");
				},
			})
			.select("routes.id", "routes.name", "routes.description");
	}
}

export { RoutesRepository };
