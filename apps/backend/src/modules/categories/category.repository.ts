import { type Repository } from "~/libs/types/types.js";

import { CategoryEntity } from "./category.entity.js";
import { type CategoryModel } from "./category.model.js";

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

	public async findAll(): Promise<CategoryEntity[]> {
		const categories = await this.categoryModel.query().execute();

		return categories.map((category) => CategoryEntity.initialize(category));
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
