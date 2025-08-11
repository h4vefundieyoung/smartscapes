import { type MultipartFile } from "@fastify/multipart";

import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type FilesService } from "~/modules/files/files.service.js";

import { type FileFolderName, FilesApiPath } from "./libs/enums/enums.js";
import { type FileUploadResponseDto } from "./libs/types/types.js";
import { fileUploadUrlValidationSchema } from "./libs/validation-schemas/validation-schemas.js";

class FilesController extends BaseController {
	private filesService: FilesService;

	public constructor(logger: Logger, filesService: FilesService) {
		super(logger, APIPath.FILES);
		this.filesService = filesService;

		this.addRoute({
			handler: this.uploadFile.bind(this),
			method: "POST",
			path: FilesApiPath.UPLOAD,
			validation: {
				params: fileUploadUrlValidationSchema,
			},
		});

		this.addRoute({
			handler: this.getAll.bind(this),
			method: "GET",
			path: FilesApiPath.ROOT,
		});
	}

	public async getAll(): Promise<APIHandlerResponse<FileUploadResponseDto[]>> {
		const result = await this.filesService.getAll();

		return {
			payload: { data: result },
			status: HTTPCode.OK,
		};
	}

	public async uploadFile(
		options: APIHandlerOptions<{
			body: MultipartFile;
			params: { folder: ValueOf<typeof FileFolderName> };
		}>,
	): Promise<APIHandlerResponse<FileUploadResponseDto>> {
		const { folder } = options.params;

		const file = options.body;

		const result = await this.filesService.uploadFile({
			file,
			folder,
		});

		return {
			payload: { data: result },
			status: HTTPCode.CREATED,
		};
	}
}

export { FilesController };
