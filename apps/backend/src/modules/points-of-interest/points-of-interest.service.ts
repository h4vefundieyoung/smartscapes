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
		await this.assertIdExists(id);

		return await this.pointsOfInterestRepository.delete(id);
	}

	public async find(id: number): Promise<PointsOfInterestResponseDto> {
		await this.assertIdExists(id);

		const item = (await this.pointsOfInterestRepository.find(
			id,
		)) as PointsOfInterestEntity;

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
	): Promise<PointsOfInterestResponseDto> {
		await this.assertIdExists(id);

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
			throw new Error(`Point of interest with id=${id.toString()} not updated`);
		}

		const object = item.toObject();

		return {
			...object,
			id: object.id,
		};
	}

	private async assertIdExists(id: number): Promise<void> {
		const exists = await this.isIdExists(id);

		if (!exists) {
			throw new Error(`Point of interest with id=${id.toString()} not found`);
		}
	}

	private async isIdExists(id: number): Promise<boolean> {
		const item = await this.pointsOfInterestRepository.find(id);

		return item !== null;
	}
}

export { PointsOfInterestService };
