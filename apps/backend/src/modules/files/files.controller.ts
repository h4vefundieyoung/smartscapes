import { type MultipartFile } from "@fastify/multipart";
import {
	type FileUploadUrlResponseDto,
} from "@smartscapes/shared/src/modules/files/files.js";

import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type FilesService } from "~/modules/files/files.service.js";
import {} from "~/modules/files/libs/validation-schemas/validation-schemas.js";

import { FilesApiPath } from "./libs/enums/enums.js";

class FilesController extends BaseController {
	private filesService: FilesService;

	public constructor(logger: Logger, filesService: FilesService) {
		super(logger, APIPath.FILES);
		this.filesService = filesService;

		this.addRoute({
			handler: this.uploadFile.bind(this),
			method: "POST",
			path: FilesApiPath.UPLOAD,
		});

		this.addRoute({
			handler: this.getAll.bind(this),
			method: "GET",
			path: FilesApiPath.ROOT,
		});
	}

	public async getAll(): Promise<
		APIHandlerResponse<FileUploadUrlResponseDto[]>
	> {
		const result = await this.filesService.getAll();

		return {
			payload: { data: result },
			status: HTTPCode.OK,
		};
	}

	public async uploadFile(
		options: APIHandlerOptions<{
			body: MultipartFile;
		}>,
	): Promise<APIHandlerResponse<FileUploadUrlResponseDto>> {
		const result = await this.filesService.uploadFile(options.body);

		return {
			payload: { data: result },
			status: HTTPCode.CREATED,
		};
	}
}

export { FilesController };
