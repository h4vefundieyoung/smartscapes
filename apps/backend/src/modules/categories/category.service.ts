import { HTTPCode } from "~/libs/modules/http/http.js";
import {
	type CollectionResult,
	type PaginationMeta,
	type Service,
} from "~/libs/types/types.js";

import { CategoryEntity } from "./category.entity.js";
import { type CategoryRepository } from "./category.repository.js";
import { CategoryExceptionMessage } from "./libs/enums/enums.js";
import { CategoryError } from "./libs/exceptions/exceptions.js";
import { changeStringCase } from "./libs/helpers/helpers.js";
import {
	type CategoryCreateRequestDto,
	type CategoryGetAllItemResponseDto,
	type PaginationQuery,
} from "./libs/types/types.js";

class CategoryService implements Service {
	private categoryRepository: CategoryRepository;

	public constructor(categoryRepository: CategoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	public async create(
		payload: CategoryCreateRequestDto,
	): Promise<CategoryGetAllItemResponseDto> {
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

	public async findAll(
		options: null | PaginationQuery,
	): Promise<CollectionResult<CategoryGetAllItemResponseDto, PaginationMeta>> {
		const DEFAULT_PAGE = 1;

		const { page, perPage } = options ?? {};

		const { items, total } = await this.categoryRepository.findAll(options);

		const totalPages = Math.ceil(total / (perPage ?? total));

		return {
			items: items.map((item) => item.toObject()),
			meta: {
				currentPage: page ?? DEFAULT_PAGE,
				itemsPerPage: perPage ?? total,
				total,
				totalPages,
			},
		};
	}

	public async findByName(
		name: string,
	): Promise<CategoryGetAllItemResponseDto> {
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
