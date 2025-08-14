import { type Repository } from "~/libs/types/types.js";

import { PlannedRoutesEntity } from "./planned-routes.entity.js";
import { type PlannedRoutesModel } from "./planned-routes.model.js";

class PlannedRoutesRepository implements Repository {
	private plannedRoutesModel: typeof PlannedRoutesModel;

	public constructor(plannedRoutesModel: typeof PlannedRoutesModel) {
		this.plannedRoutesModel = plannedRoutesModel;
	}

	public async create(
		entity: PlannedRoutesEntity,
	): Promise<PlannedRoutesEntity> {
		const { distance, duration, geometry, userId } = entity.toNewObject();

		const result = await this.plannedRoutesModel
			.query()
			.insert({
				distance,
				duration,
				geometry,
				userId,
			})
			.returning([
				"id",
				"userId",
				"distance",
				"duration",
				this.plannedRoutesModel.raw("ST_AsGeoJSON(geometry)::json as geometry"),
			]);

		return PlannedRoutesEntity.initialize(result);
	}

	public async delete(id: number): Promise<boolean> {
		const isDeleted = await this.plannedRoutesModel
			.query()
			.deleteById(id)
			.execute();

		return Boolean(isDeleted);
	}

	public async findById(id: number): Promise<null | PlannedRoutesEntity> {
		const plannedRoute = await this.plannedRoutesModel
			.query()
			.select([
				"id",
				"userId",
				"distance",
				"duration",
				this.plannedRoutesModel.raw("ST_AsGeoJSON(geometry)::json as geometry"),
			])
			.findById(id)
			.execute();

		if (!plannedRoute) {
			return null;
		}

		return PlannedRoutesEntity.initialize(plannedRoute);
	}

	public async findByUserId(userId: number): Promise<PlannedRoutesEntity[]> {
		const plannedRoutes = await this.plannedRoutesModel
			.query()
			.select([
				"id",
				"userId",
				"distance",
				"duration",
				this.plannedRoutesModel.raw("ST_AsGeoJSON(geometry)::json as geometry"),
			])
			.where("userId", userId);

		return plannedRoutes.map((route) => PlannedRoutesEntity.initialize(route));
	}
}

export { PlannedRoutesRepository };
