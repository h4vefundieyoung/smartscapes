import { type MultipartFile } from "@fastify/multipart";

import { type AWSService } from "~/libs/modules/aws/base-aws.module.js";
import { type Service } from "~/libs/types/types.js";

import { FilesEntity } from "./files.entity.js";
import { type FilesRepository } from "./files.repository.js";
import {
	type FileContentType,
	type FileUploadUrlResponseDto,
} from "./libs/types/types.js";

class FilesService implements Service {
	private awsService: AWSService;
	private filesRepository: FilesRepository;

	public constructor(filesRepository: FilesRepository, awsService: AWSService) {
		this.filesRepository = filesRepository;
		this.awsService = awsService;
	}

	public async create(payload: {
		contentType: FileContentType;
		url: string;
	}): Promise<FileUploadUrlResponseDto> {
		const { contentType, url } = payload;

		const item = await this.filesRepository.create(
			FilesEntity.initializeNew({
				contentType,
				url,
			}),
		);

		return item.toObject();
	}

	public async getAll(): Promise<FileUploadUrlResponseDto[]> {
		const items = await this.filesRepository.findAll();

		return items.map((item) => item.toObject());
	}

	public async uploadFile(
		file: MultipartFile,
	): Promise<FileUploadUrlResponseDto> {
		const { filename, mimetype } = file;
		const buffer = await file.toBuffer();

		const url = await this.awsService.uploadFile(buffer, filename, mimetype);

		const savedFile = await this.filesRepository.create(
			FilesEntity.initializeNew({
				contentType: mimetype as FileContentType,
				url,
			}),
		);

		return savedFile.toObject();
	}
}

export { FilesService };
