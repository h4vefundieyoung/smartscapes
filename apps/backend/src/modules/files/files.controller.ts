import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type FilesService } from "~/modules/files/files.service.js";
import {
	type FileCreateRecordRequestDto,
	type FileCreateRecordResponseDto,
	type FileGetUploadUrlRequestDto,
	type FileUploadUrlResponseDto,
} from "~/modules/files/libs/types/types.js";
import {
	fileCreateValidationSchema,
	fileGetUploadUrlValidationSchema,
} from "~/modules/files/libs/validation-schemas/validation-sxhemas.js";

import { FilesApiPath } from "./libs/enums/enums.js";

class FilesController extends BaseController {
	private filesService: FilesService;

	public constructor(logger: Logger, filesService: FilesService) {
		super(logger, APIPath.FILES);
		this.filesService = filesService;

		this.addRoute({
			handler: this.createRecord.bind(this),
			method: "POST",
			path: FilesApiPath.ROOT,
			validation: {
				body: fileCreateValidationSchema,
			},
		});

		this.addRoute({
			handler: this.getUploadUrl.bind(this),
			method: "POST",
			path: FilesApiPath.UPLOAD_URL,
			validation: {
				body: fileGetUploadUrlValidationSchema,
			},
		});
	}

	public async createRecord(
		options: APIHandlerOptions<{
			body: FileCreateRecordRequestDto;
		}>,
	): Promise<APIHandlerResponse<FileCreateRecordResponseDto>> {
		const { body } = options;
		const file = await this.filesService.create(body);

		return {
			payload: { data: file },
			status: HTTPCode.CREATED,
		};
	}

	public async getUploadUrl(
		options: APIHandlerOptions<{
			body: FileGetUploadUrlRequestDto;
		}>,
	): Promise<APIHandlerResponse<FileUploadUrlResponseDto>> {
		const { body } = options;

		const result = await this.filesService.getUploadUrl(body);

		// eslint-disable-next-line no-console
		console.log("Controller returning result:", result);

		return {
			payload: { data: result },
			status: HTTPCode.OK,
		};
	}
}

export { FilesController };
