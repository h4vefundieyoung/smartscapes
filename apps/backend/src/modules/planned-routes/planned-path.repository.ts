import { type Knex } from "knex";

import { type Repository } from "~/libs/types/types.js";

import { PlannedPathEntity } from "./planned-path.entity.js";
import { type PlannedPathModel } from "./planned-path.model.js";

class PlannedPathRepository implements Repository {
	private plannedPathModel: typeof PlannedPathModel;

	public constructor(plannedPathModel: typeof PlannedPathModel) {
		this.plannedPathModel = plannedPathModel;
	}

	public async create(entity: PlannedPathEntity): Promise<PlannedPathEntity> {
		const { distance, duration, geometry } = entity.toNewObject();

		const result = await this.plannedPathModel
			.query()
			.insert({
				distance,
				duration,
				geometry,
			})
			.returning([
				"id",
				this.plannedPathModel.raw("to_json(distance)::json as distance"),
				this.plannedPathModel.raw("to_json(duration)::json as duration"),
				this.plannedPathModel.raw("ST_AsGeoJSON(geometry)::json as geometry"),
			]);

		return PlannedPathEntity.initialize(result);
	}

	public async deleteWithTransaction(payload: {
		id: number;
		transaction: Knex.Transaction;
	}): Promise<boolean> {
		const { id, transaction } = payload;

		const PlannedPathModelTransaction =
			this.plannedPathModel.bindKnex(transaction);

		const isDeleted = await PlannedPathModelTransaction.query()
			.deleteById(id)
			.execute();

		return Boolean(isDeleted);
	}

	public async findById(id: number): Promise<null | PlannedPathEntity> {
		const plannedRoute = await this.plannedPathModel
			.query()
			.select([
				"id",
				this.plannedPathModel.raw("to_json(distance)::json as distance"),
				this.plannedPathModel.raw("to_json(duration)::json as duration"),
				this.plannedPathModel.raw("ST_AsGeoJSON(geometry)::json as geometry"),
			])
			.findById(id)
			.execute();

		if (!plannedRoute) {
			return null;
		}

		return PlannedPathEntity.initialize(plannedRoute);
	}
}

export { PlannedPathRepository };
