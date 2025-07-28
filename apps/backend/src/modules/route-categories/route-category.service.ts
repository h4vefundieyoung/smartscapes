import { HTTPCode } from "~/libs/modules/http/http.js";
import { type CollectionResult, type Service } from "~/libs/types/types.js";

import { RouteCategoryExceptionMessage } from "./libs/enums/enums.js";
import { RouteCategoryError } from "./libs/exceptions/exceptions.js";
import {
	type RouteCategoryGetAllItemResponseDto,
	type RouteCategoryRequestDto,
} from "./libs/types/types.js";
import { RouteCategoryEntity } from "./route-category.entity.js";
import { type RouteCategoryRepository } from "./route-category.repository.js";

class RouteCategoryService implements Service {
	private routeCategoryRepository: RouteCategoryRepository;

	public constructor(routeCategoryRepository: RouteCategoryRepository) {
		this.routeCategoryRepository = routeCategoryRepository;
	}

	public async create(
		payload: RouteCategoryRequestDto,
	): Promise<RouteCategoryGetAllItemResponseDto> {
		const normalizedName = this.normalizeName(payload.name);

		const existingRouteCategory =
			await this.routeCategoryRepository.findByName(normalizedName);

		if (existingRouteCategory) {
			throw new RouteCategoryError({
				message: RouteCategoryExceptionMessage.ALREADY_EXISTS,
				status: HTTPCode.CONFLICT,
			});
		}

		const item = await this.routeCategoryRepository.create(
			RouteCategoryEntity.initializeNew({ name: normalizedName }),
		);

		return item.toObject();
	}

	public async findAll(): Promise<
		CollectionResult<RouteCategoryGetAllItemResponseDto>
	> {
		const items = await this.routeCategoryRepository.findAll();

		return { items: items.map((item) => item.toObject()) };
	}

	public async findByName(
		name: string,
	): Promise<RouteCategoryGetAllItemResponseDto> {
		const normalizedName = this.normalizeName(name);

		const item = await this.routeCategoryRepository.findByName(normalizedName);

		if (!item) {
			throw new Error(RouteCategoryExceptionMessage.NOT_FOUND);
		}

		return item.toObject();
	}

	private normalizeName(name: string): string {
		return name.toLowerCase();
	}
}

export { RouteCategoryService };
