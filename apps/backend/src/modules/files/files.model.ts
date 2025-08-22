import {
	AbstractModel,
	DatabaseTableName,
} from "~/libs/modules/database/database.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type FileFolderName } from "./libs/enums/enums.js";
import { type FileMimeType } from "./libs/types/types.js";

class FileModel extends AbstractModel {
	public static override get tableName(): string {
		return DatabaseTableName.FILES;
	}

	public contentType!: FileMimeType;

	public entityId!: number;

	public folder!: ValueOf<typeof FileFolderName>;

	public url!: string;
}

export { FileModel };
