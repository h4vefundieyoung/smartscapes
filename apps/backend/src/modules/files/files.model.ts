import { type FileContentType } from "@smartscapes/shared";

import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";

class FilesModel extends AbstractModel {
	public static override get tableName(): string {
		return DatabaseTableName.FILES;
	}

	public contentType!: FileContentType;
	public url!: string;
}

export { FilesModel };
