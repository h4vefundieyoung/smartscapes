import { type Repository } from "~/libs/types/types.js";

import { CategoryEntity } from "../categories/category.entity.js";
import { type CategoryModel } from "../categories/category.model.js";

class RouteCategoryRepository implements Repository {
	private routeCategoryModel: typeof CategoryModel;

	public constructor(routeCategoryModel: typeof CategoryModel) {
		this.routeCategoryModel = routeCategoryModel;
	}

	public async create(entity: CategoryEntity): Promise<CategoryEntity> {
		const { key, name } = entity.toNewObject();

		const routeCategory = await this.routeCategoryModel
			.query()
			.insert({ key, name })
			.returning("*")
			.execute();

		return CategoryEntity.initialize(routeCategory);
	}

	public async findAll(): Promise<CategoryEntity[]> {
		const routeCategories = await this.routeCategoryModel
			.query()
			.debug()
			.execute();

		return routeCategories.map((routeCategory) =>
			CategoryEntity.initialize(routeCategory),
		);
	}

	public async findByName(name: string): Promise<CategoryEntity | null> {
		const routeCategory = await this.routeCategoryModel
			.query()
			.whereRaw("LOWER(name) LIKE ?", [`%${name.toLowerCase()}%`])
			.first()
			.execute();

		return routeCategory ? CategoryEntity.initialize(routeCategory) : null;
	}
}

export { RouteCategoryRepository };
