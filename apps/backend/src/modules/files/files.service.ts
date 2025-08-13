import { type MultipartFile } from "@fastify/multipart";

import { type AWSFileService } from "~/libs/modules/aws/aws.js";
import { type Service } from "~/libs/types/types.js";

import { FilesEntity } from "./files.entity.js";
import { type FileRepository } from "./files.repository.js";
import {
	type FileMimeType,
	type FileUploadRequestDto,
	type FileUploadResponseDto,
} from "./libs/types/types.js";

class FileService implements Service {
	private awsFileService: AWSFileService;
	private fileRepository: FileRepository;

	public constructor(
		fileRepository: FileRepository,
		awsFileService: AWSFileService,
	) {
		this.fileRepository = fileRepository;
		this.awsFileService = awsFileService;
	}

	public async create(payload: {
		contentType: FileMimeType;
		url: string;
	}): Promise<FileUploadResponseDto> {
		const { contentType, url } = payload;

		const item = await this.fileRepository.create(
			FilesEntity.initializeNew({
				contentType,
				url,
			}),
		);

		return item.toObject();
	}

	public async getAll(): Promise<FileUploadResponseDto[]> {
		const items = await this.fileRepository.findAll();

		return items.map((item) => item.toObject());
	}

	public async uploadFile(
		payload: FileUploadRequestDto<MultipartFile>,
	): Promise<FileUploadResponseDto> {
		const { file, folder } = payload;
		const { filename, mimetype } = file;
		const buffer = await file.toBuffer();
		const generatedFileName = this.generateFileName(folder, filename);

		const url = await this.awsFileService.uploadFile(
			buffer,
			generatedFileName,
			mimetype as FileMimeType,
		);

		const savedFile = await this.fileRepository.create(
			FilesEntity.initializeNew({
				contentType: mimetype as FileMimeType,
				url,
			}),
		);

		return savedFile.toObject();
	}

	private generateFileName = (folder: string, fileName: string): string => {
		const dotIndex = fileName.lastIndexOf(".");
		const name = fileName.slice(0, dotIndex);
		const extension = fileName.slice(dotIndex);
		const timestamp = String(Date.now());

		return `${folder}/${name}-${timestamp}${extension}`;
	};
}

export { FileService };
