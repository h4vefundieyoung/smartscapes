import { HTTPCode } from "~/libs/modules/http/http.js";
import { type CollectionResult, type Service } from "~/libs/types/types.js";
import { PointsOfInterestEntity } from "~/modules/points-of-interest/points-of-interest.entity.js";
import { type PointsOfInterestRepository } from "~/modules/points-of-interest/points-of-interest.repository.js";

import { PointOfInterestExceptionMessage } from "./libs/enums/enums.js";
import { PointOfInterestError } from "./libs/exceptions/exceptions.js";
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
		await this.ensureNameIsUnique(payload.name);

		const { name } = payload;

		const item = await this.pointsOfInterestRepository.create(
			PointsOfInterestEntity.initializeNew({
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
		await this.ensureIdExists(id);

		return await this.pointsOfInterestRepository.delete(id);
	}

	public async find(id: number): Promise<PointsOfInterestResponseDto> {
		await this.ensureIdExists(id);

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
		await this.ensureIdExists(id);

		await this.ensureNameIsUnique(payload.name);

		const { name } = payload;

		const item = await this.pointsOfInterestRepository.update(
			id,
			PointsOfInterestEntity.initializeNew({
				name,
			}),
		);

		if (!item) {
			throw new PointOfInterestError({
				message: PointOfInterestExceptionMessage.UPDATE_FAILED,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}

		const object = item.toObject();

		return {
			...object,
			id: object.id,
		};
	}

	private async ensureIdExists(id: number): Promise<void> {
		const exists = await this.pointsOfInterestRepository.find(id);

		if (!exists) {
			throw new PointOfInterestError({
				message: PointOfInterestExceptionMessage.ID_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}
	}

	private async ensureNameIsUnique(name: string): Promise<void> {
		const existingPointOfInterest =
			await this.pointsOfInterestRepository.findByName(name);

		if (existingPointOfInterest) {
			throw new PointOfInterestError({
				message: PointOfInterestExceptionMessage.NAME_ALREADY_EXISTS,
				status: HTTPCode.CONFLICT,
			});
		}
	}
}

export { PointsOfInterestService };
