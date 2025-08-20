import { config } from "~/libs/modules/config/config.js";

const MAX_FILE_SIZE = String(config.ENV.AWS.MAX_FILE_SIZE_MB);

const FileExceptionMessage = {
	FILE_REQUIRED: "File is required.",
	FILE_SIZE_EXCEEDS_LIMIT: `File size exceeds the maximum limit of ${MAX_FILE_SIZE}Mb.`,
	INVALID_FILE_TYPE:
		"Invalid file type. Only JPEG, JPG, and PNG files are allowed.",
} as const;

export { FileExceptionMessage };
