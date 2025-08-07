import { logger } from "~/libs/modules/logger/logger.js";

import { FilesController } from "./files.controller.js";
import { FilesModel } from "./files.model.js";
import { FilesRepository } from "./files.repository.js";
import { FilesService } from "./files.service.js";

const filesRepository = new FilesRepository(FilesModel);
const filesService = new FilesService(filesRepository);
const filesController = new FilesController(logger, filesService);

export { filesController };
