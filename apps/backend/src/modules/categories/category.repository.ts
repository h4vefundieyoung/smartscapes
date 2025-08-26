import { type EntityPagination, type Repository } from "~/libs/types/types.js";

import { CategoryEntity } from "./category.entity.js";
import { type CategoryModel } from "./category.model.js";
import { type PaginationQuery } from "./libs/types/types.js";

const PAGE_NUMBER_OFFSET = 1;

class CategoryRepository implements Repository {
	private categoryModel: typeof CategoryModel;

	public constructor(categoryModel: typeof CategoryModel) {
		this.categoryModel = categoryModel;
	}

	public async create(entity: CategoryEntity): Promise<CategoryEntity> {
		const { key, name } = entity.toNewObject();

		const category = await this.categoryModel
			.query()
			.insert({ key, name })
			.returning("*")
			.execute();

		return CategoryEntity.initialize(category);
	}

	public async findAll(
		options: null | PaginationQuery,
	): Promise<EntityPagination<CategoryEntity>> {
		const { page, perPage } = options ?? {};

		const hasPagination = page !== undefined && perPage !== undefined;

		const query = this.categoryModel.query();

		if (hasPagination) {
			const offset = (page - PAGE_NUMBER_OFFSET) * perPage;

			const [total, items] = await Promise.all([
				query.clone().resultSize(),
				query.clone().offset(offset).limit(perPage),
			]);

			return {
				items: items.map((item) => CategoryEntity.initialize(item)),
				total,
			};
		}

		const items = await query.execute();

		return {
			items: items.map((item) => CategoryEntity.initialize(item)),
			total: items.length,
		};
	}

	public async findByKey(key: string): Promise<CategoryEntity | null> {
		const category = await this.categoryModel
			.query()
			.whereRaw("LOWER(key) LIKE ?", [`%${key.toLowerCase()}%`])
			.first()
			.execute();

		return category ? CategoryEntity.initialize(category) : null;
	}

	public async findByName(name: string): Promise<CategoryEntity | null> {
		const category = await this.categoryModel
			.query()
			.whereRaw("LOWER(name) LIKE ?", [`%${name.toLowerCase()}%`])
			.first()
			.execute();

		return category ? CategoryEntity.initialize(category) : null;
	}
}

export { CategoryRepository };
