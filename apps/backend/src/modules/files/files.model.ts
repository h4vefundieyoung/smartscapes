import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

import { type FileMimeType } from "./libs/types/types.js";

class FilesModel extends AbstractModel {
	public static override get tableName(): string {
		return DatabaseTableName.FILES;
	}

	public contentType!: FileMimeType;
	public url!: string;
}

export { FilesModel };
