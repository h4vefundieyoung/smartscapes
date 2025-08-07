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
} from "~/modules/files/libs/types/types.js";
import { fileCreateValidationSchema } from "~/modules/files/libs/validation-schemas/validation-sxhemas.js";

class FilesController extends BaseController {
	private filesService: FilesService;

	public constructor(logger: Logger, filesService: FilesService) {
		super(logger, APIPath.FILES);
		this.filesService = filesService;

		this.addRoute({
			handler: this.createRecord.bind(this),
			method: "POST",
			path: "/",
			validation: {
				body: fileCreateValidationSchema,
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
}

export { FilesController };
