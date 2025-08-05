import {
	type RoutesRequestPatchDto,
	type RoutesResponseDto,
} from "@smartscapes/shared";
import { type QueryBuilder } from "objection";

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
			.first()) as unknown as RoutesResponseDto | undefined;

		if (!route) {
			return null;
		}

		return route;
	}

	public async patch(
		id: number,
		entity: RoutesRequestPatchDto,
	): Promise<RoutesResponseDto> {
		await this.routesModel
			.query()
			.patchAndFetchById(id, entity as Partial<RoutesModel>)
			.execute();

		return (await this.findById(id)) as RoutesResponseDto;
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
