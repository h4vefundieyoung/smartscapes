import { config } from "../config/config.js";
import { logger } from "../logger/logger.js";
import { AWSFileService } from "./base-aws-file.module.js";

const awsFileService = new AWSFileService(config, logger);

export { awsFileService };
export { type AWSFileService } from "./base-aws-file.module.js";
