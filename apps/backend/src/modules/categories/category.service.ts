import { HTTPCode } from "~/libs/modules/http/http.js";
import { type CollectionResult, type Service } from "~/libs/types/types.js";

import { CategoryEntity } from "./category.entity.js";
import { type CategoryRepository } from "./category.repository.js";
import { CategoryExceptionMessage } from "./libs/enums/enums.js";
import { CategoryError } from "./libs/exceptions/exceptions.js";
import { changeStringCase } from "./libs/helpers/helpers.js";
import {
	type CategoryCreateRequestDto,
	type CategoryGetItemResponseDto,
} from "./libs/types/types.js";

class CategoryService implements Service {
	private categoryRepository: CategoryRepository;

	public constructor(categoryRepository: CategoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	public async create(
		payload: CategoryCreateRequestDto,
	): Promise<CategoryGetItemResponseDto> {
		const { name } = payload;

		const key = changeStringCase(name);

		const existingCategory = await this.categoryRepository.findByKey(key);

		if (existingCategory) {
			throw new CategoryError({
				message: CategoryExceptionMessage.ALREADY_EXISTS,
				status: HTTPCode.CONFLICT,
			});
		}

		const item = await this.categoryRepository.create(
			CategoryEntity.initializeNew({ key, name }),
		);

		return item.toObject();
	}

	public async findAll(): Promise<
		CollectionResult<CategoryGetItemResponseDto>
	> {
		const items = await this.categoryRepository.findAll();

		return { items: items.map((item) => item.toObject()) };
	}

	public async findByName(name: string): Promise<CategoryGetItemResponseDto> {
		const item = await this.categoryRepository.findByName(name);

		if (!item) {
			throw new CategoryError({
				message: CategoryExceptionMessage.NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		return item.toObject();
	}
}

export { CategoryService };
