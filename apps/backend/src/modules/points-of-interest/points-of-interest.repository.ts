import { SortingOrder } from "~/libs/enums/enums.js";
import { type EntityPagination, type Repository } from "~/libs/types/types.js";
import { type PointsOfInterestGetAllOptions } from "~/modules/points-of-interest/libs/types/types.js";
import { PointsOfInterestEntity } from "~/modules/points-of-interest/points-of-interest.entity.js";
import { type PointsOfInterestModel } from "~/modules/points-of-interest/points-of-interest.model.js";

const PAGE_NUMBER_OFFSET = 1;

class PointsOfInterestRepository implements Repository {
	private pointsOfInterestModel: typeof PointsOfInterestModel;

	public constructor(pointsOfInterestModel: typeof PointsOfInterestModel) {
		this.pointsOfInterestModel = pointsOfInterestModel;
	}

	public async create(
		entity: PointsOfInterestEntity,
	): Promise<PointsOfInterestEntity> {
		const { description, location, name } = entity.toNewObject();

		const pointOfInterest = await this.pointsOfInterestModel
			.query()
			.insert({
				description,
				location,
				name,
			})
			.returning([
				"id",
				"name",
				"description",
				"created_at",
				"updated_at",
				"description",
				this.pointsOfInterestModel.raw(
					"ST_AsGeoJSON(location)::json as location",
				),
			])
			.execute();

		return PointsOfInterestEntity.initialize(pointOfInterest);
	}

	public async delete(id: number): Promise<boolean> {
		const deletedCount = await this.pointsOfInterestModel
			.query()
			.deleteById(id)
			.execute();

		return Boolean(deletedCount);
	}

	public async findAll(
		options: null | PointsOfInterestGetAllOptions,
	): Promise<EntityPagination<PointsOfInterestEntity>> {
		const { ids, latitude, longitude, search, page, perPage, radius } =
			options ?? {};

		const hasLocationFilter = longitude !== undefined && latitude !== undefined;
		const hasPagination = page !== undefined && perPage !== undefined;

		const baseQuery = this.pointsOfInterestModel
			.query()
			.select([
				"id",
				"name",
				"created_at",
				this.pointsOfInterestModel.raw(
					"ST_AsGeoJSON(location)::json as location",
				),
			])
			.modify((builder) => {
				if (search) {
					builder.whereILike("name", `%${search}%`);
				}

				if (ids) {
					builder.whereIn("id", ids);
				}

				if (hasLocationFilter) {
					builder.select(
						this.pointsOfInterestModel.raw(
							"ST_Distance(location::geography, ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography) as distance",
							[longitude, latitude],
						),
					);

					if (radius) {
						builder.whereRaw(
							"ST_DWithin(location::geography, ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography, ?)",
							[longitude, latitude, radius],
						);
					}

					builder.orderBy("distance", SortingOrder.ASC);
				}

				builder.orderBy("created_at", SortingOrder.DESC);
			});

		if (hasPagination) {
			const offset = (page - PAGE_NUMBER_OFFSET) * perPage;

			const [total, items] = await Promise.all([
				baseQuery.clone().resultSize(),
				baseQuery.clone().offset(offset).limit(perPage),
			]);

			return {
				items: items.map((item) => PointsOfInterestEntity.initialize(item)),
				total,
			};
		}

		const items = await baseQuery.execute();

		return {
			items: items.map((item) => PointsOfInterestEntity.initialize(item)),
			total: items.length,
		};
	}

	public async findById(id: number): Promise<null | PointsOfInterestEntity> {
		const pointOfInterest = await this.pointsOfInterestModel
			.query()
			.select([
				"id",
				"name",
				"description",
				"created_at",
				this.pointsOfInterestModel.raw(
					"ST_AsGeoJSON(location)::json as location",
				),
			])
			.findById(id)
			.execute();

		if (!pointOfInterest) {
			return null;
		}

		return PointsOfInterestEntity.initialize(pointOfInterest);
	}

	public async findByName(
		name: string,
	): Promise<null | PointsOfInterestEntity> {
		const pointOfInterest = await this.pointsOfInterestModel
			.query()
			.select([
				"id",
				"name",
				"description",
				"created_at",
				this.pointsOfInterestModel.raw(
					"ST_AsGeoJSON(location)::json as location",
				),
			])
			.where("name", "ilike", name)
			.first();

		if (!pointOfInterest) {
			return null;
		}

		return PointsOfInterestEntity.initialize(pointOfInterest);
	}

	public async patch(
		id: number,
		entity: Partial<PointsOfInterestEntity["toObject"]>,
	): Promise<null | PointsOfInterestEntity> {
		const [updatedPointOfInterest] = await this.pointsOfInterestModel
			.query()
			.patch(entity)
			.where("id", "=", id)
			.returning([
				"id",
				"name",
				"created_at",
				this.pointsOfInterestModel.raw(
					"ST_AsGeoJSON(location)::json as location",
				),
			])
			.execute();

		if (!updatedPointOfInterest) {
			return null;
		}

		return PointsOfInterestEntity.initialize(updatedPointOfInterest);
	}
}

export { PointsOfInterestRepository };
