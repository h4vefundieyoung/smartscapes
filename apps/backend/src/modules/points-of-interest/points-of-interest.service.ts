import { type CollectionResult, type Service } from "~/libs/types/types.js";
import { PointsOfInterestEntity } from "~/modules/points-of-interest/points-of-interest.entity.js";
import { type PointsOfInterestRepository } from "~/modules/points-of-interest/points-of-interest.repository.js";

import {
	type PointsOfInterestRequestDto,
	type PointsOfInterestResponseDto,
} from "./libs/types/type.js";

class PointsOfInterestService implements Service {
	private pointsOfInterestRepository: PointsOfInterestRepository;

	public constructor(pointsOfInterestRepository: PointsOfInterestRepository) {
		this.pointsOfInterestRepository = pointsOfInterestRepository;
	}

	public async create(
		payload: PointsOfInterestRequestDto,
	): Promise<PointsOfInterestResponseDto> {
		const { latitude, longitude, name } = payload;

		const item = await this.pointsOfInterestRepository.create(
			PointsOfInterestEntity.initializeNew({
				latitude,
				longitude,
				name,
			}),
		);

		const object = item.toObject();

		return {
			...object,
			id: object.id,
		};
	}

	public async delete(id: number): Promise<boolean> {
		return await this.pointsOfInterestRepository.delete(id);
	}

	public async find(id: number): Promise<null | PointsOfInterestResponseDto> {
		const item = await this.pointsOfInterestRepository.find(id);

		if (!item) {
			return null;
		}

		const object = item.toObject();

		return {
			...object,
			id: object.id,
		};
	}

	public async findAll(): Promise<
		CollectionResult<PointsOfInterestResponseDto>
	> {
		const items = await this.pointsOfInterestRepository.findAll();

		return {
			items: items.map((item) => {
				const object = item.toObject();

				return {
					...object,
					id: object.id,
				};
			}),
		};
	}

	public async update(
		id: number,
		payload: PointsOfInterestRequestDto,
	): Promise<null | PointsOfInterestResponseDto> {
		const { latitude, longitude, name } = payload;

		const item = await this.pointsOfInterestRepository.update(
			id,
			PointsOfInterestEntity.initializeNew({
				latitude,
				longitude,
				name,
			}),
		);

		if (!item) {
			return null;
		}

		const object = item.toObject();

		return {
			...object,
			id: object.id,
		};
	}
}

export { PointsOfInterestService };
