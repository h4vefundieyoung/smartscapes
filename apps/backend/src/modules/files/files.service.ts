import { type AWSService } from "~/libs/modules/aws/base-aws.module.js";
import { type Service } from "~/libs/types/types.js";

import { FilesEntity } from "./files.entity.js";
import { type FilesRepository } from "./files.repository.js";
import {
	type FileCreateRecordRequestDto,
	type FileCreateRecordResponseDto,
	type FileGetUploadUrlRequestDto,
	type FileUploadUrlResponseDto,
} from "./libs/types/types.js";

class FilesService implements Service {
	private awsService: AWSService;
	private filesRepository: FilesRepository;

	public constructor(filesRepository: FilesRepository, awsService: AWSService) {
		this.filesRepository = filesRepository;
		this.awsService = awsService;
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

	public async getAll(): Promise<FileCreateRecordResponseDto[]> {
		const items = await this.filesRepository.findAll();

		return items.map((item) => item.toObject());
	}

	public async getUploadUrl(
		payload: FileGetUploadUrlRequestDto,
	): Promise<FileUploadUrlResponseDto> {
		const { fields, uploadUrl } = await this.awsService.getUploadUrl(payload);

		return {
			fields,
			uploadUrl,
		};
	}
}

export { FilesService };
