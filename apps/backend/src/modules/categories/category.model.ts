import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class CategoryModel extends AbstractModel {
	public static override get tableName(): string {
		return DatabaseTableName.CATEGORIES;
	}

	public key!: string;

	public name!: string;
}

export { CategoryModel };
