import { awsFileService } from "~/libs/modules/aws/aws.js";
import { logger } from "~/libs/modules/logger/logger.js";

import { FilesController } from "./files.controller.js";
import { FilesModel } from "./files.model.js";
import { FileRepository } from "./files.repository.js";
import { FileService } from "./files.service.js";

const fileRepository = new FileRepository(FilesModel);
const fileService = new FileService(fileRepository, awsFileService);
const filesController = new FilesController(logger, fileService);

export { filesController };
export { FilesError } from "./libs/exeptions/exeptions.js";
export { type FileMimeType } from "./libs/types/types.js";
