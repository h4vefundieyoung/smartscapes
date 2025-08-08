import { config } from "~/libs/modules/config/config.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { S3Service } from "~/modules/s3/s3.js";

import { FilesController } from "./files.controller.js";
import { FilesModel } from "./files.model.js";
import { FilesRepository } from "./files.repository.js";
import { FilesService } from "./files.service.js";

const s3Service = new S3Service(config, logger);
const filesRepository = new FilesRepository(FilesModel);
const filesService = new FilesService(filesRepository, s3Service);
const filesController = new FilesController(logger, filesService);

export { filesController };
export {
	type FileGetUploadUrlRequestDto,
	type FileUploadUrlResponseDto,
} from "./libs/types/types.js";
