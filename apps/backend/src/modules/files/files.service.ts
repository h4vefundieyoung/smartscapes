import { type Service } from "~/libs/types/types.js";
import { type S3Service } from "~/modules/s3/s3.js";

import { FilesEntity } from "./files.entity.js";
import { type FilesRepository } from "./files.repository.js";
import {
	type FileCreateRecordRequestDto,
	type FileCreateRecordResponseDto,
	type FileGetUploadUrlRequestDto,
	type FileUploadUrlResponseDto,
} from "./libs/types/types.js";

class FilesService implements Service {
	private filesRepository: FilesRepository;
	private s3Service: S3Service;

	public constructor(filesRepository: FilesRepository, s3Service: S3Service) {
		this.filesRepository = filesRepository;
		this.s3Service = s3Service;
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

	public async getUploadUrl(
		payload: FileGetUploadUrlRequestDto,
	): Promise<FileUploadUrlResponseDto> {
		const { expiresIn, fileKey, uploadUrl } =
			await this.s3Service.getUploadUrl(payload);

		return {
			expiresIn,
			fileKey,
			uploadUrl,
		};
	}
}

export { FilesService };
