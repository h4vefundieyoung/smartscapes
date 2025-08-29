import { SortingOrder } from "~/libs/enums/enums.js";
import { type EntityPagination, type Repository } from "~/libs/types/types.js";
import { type PointsOfInterestGetAllOptions } from "~/modules/points-of-interest/libs/types/types.js";
import { PointsOfInterestEntity } from "~/modules/points-of-interest/points-of-interest.entity.js";
import { type PointsOfInterestModel } from "~/modules/points-of-interest/points-of-interest.model.js";

import { RouteEntity } from "../routes/route.entity.js";

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
			.insert({ description, location, name })
			.returning([
				"id",
				"name",
				"description",
				"created_at",
				"updated_at",
				this.pointsOfInterestModel.raw(
					"ST_AsGeoJSON(location)::json as location",
				),
			])
			.execute();

		return PointsOfInterestEntity.initialize({
			createdAt: pointOfInterest.createdAt,
			description: pointOfInterest.description,
			id: pointOfInterest.id,
			location: pointOfInterest.location,
			name: pointOfInterest.name,
			routes: [],
			updatedAt: pointOfInterest.updatedAt,
		});
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
		const { ids, latitude, longitude, page, perPage, radius, search } =
			options ?? {};

		const hasLocationFilter = longitude !== undefined && latitude !== undefined;
		const hasPagination = page !== undefined && perPage !== undefined;

		const baseQuery = this.pointsOfInterestModel
			.query()
			.select([
				"id",
				"name",
				"created_at",
				"updated_at",
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
				items: items.map((item) =>
					PointsOfInterestEntity.initialize({
						createdAt: item.createdAt,
						description: item.description,
						id: item.id,
						location: item.location,
						name: item.name,
						routes: [],
						updatedAt: item.updatedAt,
					}),
				),
				total,
			};
		}

		const items = await baseQuery.execute();

		return {
			items: items.map((item) =>
				PointsOfInterestEntity.initialize({
					createdAt: item.createdAt,
					description: item.description,
					id: item.id,
					location: item.location,
					name: item.name,
					routes: [],
					updatedAt: item.updatedAt,
				}),
			),
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
				"updated_at",
				this.pointsOfInterestModel.raw(
					"ST_AsGeoJSON(location)::json as location",
				),
			])
			.findById(id)
			.withGraphFetched(
				"[routes(formatRoute).[images(pickCoverImage), pois(formatPois)]]",
			)
			.modifiers({
				formatPois: (builder) => {
					builder.select(
						"points_of_interest.id",
						this.pointsOfInterestModel.raw(
							"ST_AsGeoJSON(points_of_interest.location)::json as location",
						),
					);
				},
				formatRoute: (builder) => {
					builder.select(
						"routes.id as id",
						"routes.name",
						this.pointsOfInterestModel.raw(
							"ST_AsGeoJSON(routes.geometry)::json as geometry",
						),
					);
				},
				pickCoverImage: (builder) => {
					builder.orderBy("createdAt", SortingOrder.ASC);
				},
			})
			.execute();

		if (!pointOfInterest) {
			return null;
		}

		const routes = pointOfInterest.routes.map((routeModel) =>
			RouteEntity.initialize(routeModel).toObject(),
		);

		return PointsOfInterestEntity.initialize({
			createdAt: pointOfInterest.createdAt,
			description: pointOfInterest.description,
			id: pointOfInterest.id,
			location: pointOfInterest.location,
			name: pointOfInterest.name,
			routes,
			updatedAt: pointOfInterest.updatedAt,
		});
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
				"updated_at",
				this.pointsOfInterestModel.raw(
					"ST_AsGeoJSON(location)::json as location",
				),
			])
			.where("name", "ilike", name)
			.first();

		if (!pointOfInterest) {
			return null;
		}

		return PointsOfInterestEntity.initialize({
			createdAt: pointOfInterest.createdAt,
			description: pointOfInterest.description,
			id: pointOfInterest.id,
			location: pointOfInterest.location,
			name: pointOfInterest.name,
			routes: [],
			updatedAt: pointOfInterest.updatedAt,
		});
	}

	public async patch(
		id: number,
		entity: Partial<PointsOfInterestEntity["toObject"]>,
	): Promise<null | PointsOfInterestEntity> {
		const [pointOfInterest] = await this.pointsOfInterestModel
			.query()
			.patch(entity)
			.where("id", "=", id)
			.returning([
				"id",
				"name",
				"created_at",
				"updated_at",
				"description",
				this.pointsOfInterestModel.raw(
					"ST_AsGeoJSON(location)::json as location",
				),
			])
			.execute();

		if (!pointOfInterest) {
			return null;
		}

		return PointsOfInterestEntity.initialize({
			createdAt: pointOfInterest.createdAt,
			description: pointOfInterest.description,
			id: pointOfInterest.id,
			location: pointOfInterest.location,
			name: pointOfInterest.name,
			routes: [],
			updatedAt: pointOfInterest.updatedAt,
		});
	}
}

export { PointsOfInterestRepository };
