import { type Repository } from "~/libs/types/types.js";
import { PointsOfInterestEntity } from "~/modules/points-of-interest/points-of-interest.entity.js";
import { type PointsOfInterestModel } from "~/modules/points-of-interest/points-of-interest.model.js";

class PointsOfInterestRepository implements Repository {
	private pointsOfInterestModel: typeof PointsOfInterestModel;

	public constructor(pointsOfInterestModel: typeof PointsOfInterestModel) {
		this.pointsOfInterestModel = pointsOfInterestModel;
	}

	public async create(
		entity: PointsOfInterestEntity,
	): Promise<PointsOfInterestEntity> {
		const { name } = entity.toNewObject();

		const pointOfInterest = await this.pointsOfInterestModel
			.query()
			.insert({
				name,
			})
			.returning("*")
			.execute();

		return PointsOfInterestEntity.initialize(pointOfInterest);
	}

	public async delete(id: number): Promise<boolean> {
		const deletedCount = await this.pointsOfInterestModel
			.query()
			.deleteById(id)
			.execute();

		return !!deletedCount;
	}

	public async find(id: number): Promise<null | PointsOfInterestEntity> {
		const pointOfInterest = await this.pointsOfInterestModel
			.query()
			.findById(id)
			.execute();

		return pointOfInterest
			? PointsOfInterestEntity.initialize(pointOfInterest)
			: null;
	}

	public async findAll(): Promise<PointsOfInterestEntity[]> {
		const pointsOfInterest = await this.pointsOfInterestModel.query().execute();

		return pointsOfInterest.map((pointOfInterest) =>
			PointsOfInterestEntity.initialize(pointOfInterest),
		);
	}

	public async findByName(
		name: string,
	): Promise<null | PointsOfInterestEntity> {
		const [point] = await this.pointsOfInterestModel
			.query()
			.where("name", "=", name)
			.execute();

		if (!point) {
			return null;
		}

		return PointsOfInterestEntity.initialize(point);
	}

	public async update(
		id: number,
		entity: PointsOfInterestEntity,
	): Promise<null | PointsOfInterestEntity> {
		const { name } = entity.toNewObject();

		const updatedPointOfInterest = await this.pointsOfInterestModel
			.query()
			.patchAndFetchById(id, {
				name,
			})
			.execute();

		return PointsOfInterestEntity.initialize(updatedPointOfInterest);
	}
}

export { PointsOfInterestRepository };
