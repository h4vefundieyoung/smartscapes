import { type Service } from "~/libs/types/types.js";

import { FilesEntity } from "./files.entity.js";
import { type FilesRepository } from "./files.repository.js";
import {
	type FileCreateRecordRequestDto,
	type FileCreateRecordResponseDto,
} from "./libs/types/types.js";

class FilesService implements Service {
	private filesRepository: FilesRepository;

	public constructor(filesRepository: FilesRepository) {
		this.filesRepository = filesRepository;
	}

	public async create(
		payload: FileCreateRecordRequestDto,
	): Promise<FileCreateRecordResponseDto> {
		const { contentType, url } = payload;

		const item = await this.filesRepository.create(
			FilesEntity.initializeNew({
				contentType,
				url,
			}),
		);

		return item.toObject();
	}
}

export { FilesService };
