import { HTTPCode } from "~/libs/modules/http/http.js";
import { type CollectionResult, type Service } from "~/libs/types/types.js";

import { CategoryEntity } from "../categories/category.entity.js";
import { RouteCategoryExceptionMessage } from "./libs/enums/enums.js";
import { RouteCategoryError } from "./libs/exceptions/exceptions.js";
import {
	type RouteCategoryCreateRequestDto,
	type RouteCategoryGetAllItemResponseDto,
} from "./libs/types/types.js";
import { type RouteCategoryRepository } from "./route-category.repository.js";

class RouteCategoryService implements Service {
	private routeCategoryRepository: RouteCategoryRepository;

	public constructor(routeCategoryRepository: RouteCategoryRepository) {
		this.routeCategoryRepository = routeCategoryRepository;
	}

	public async create(
		payload: RouteCategoryCreateRequestDto,
	): Promise<RouteCategoryGetAllItemResponseDto> {
		const { key, name } = payload;

		const existingRouteCategory =
			await this.routeCategoryRepository.findByName(name);

		if (existingRouteCategory) {
			throw new RouteCategoryError({
				message: RouteCategoryExceptionMessage.ALREADY_EXISTS,
				status: HTTPCode.CONFLICT,
			});
		}

		const item = await this.routeCategoryRepository.create(
			CategoryEntity.initializeNew({ key, name }),
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
		const item = await this.routeCategoryRepository.findByName(name);

		if (!item) {
			throw new RouteCategoryError({
				message: RouteCategoryExceptionMessage.NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return item.toObject();
	}
}

export { RouteCategoryService };
