import { type Repository } from "~/libs/types/types.js";

import { FilesEntity } from "./files.entity.js";
import { type FilesModel } from "./files.model.js";

class FilesRepository implements Repository {
	private filesModel: typeof FilesModel;

	public constructor(filesModel: typeof FilesModel) {
		this.filesModel = filesModel;
	}

	public async create(entity: FilesEntity): Promise<FilesEntity> {
		const { contentType, url } = entity.toNewObject();

		const file = await this.filesModel
			.query()
			.insert({
				contentType,
				url,
			})
			.returning(["id", "contentType", "url", "createdAt", "updatedAt"])
			.execute();

		return FilesEntity.initialize(file);
	}
}

export { FilesRepository };
