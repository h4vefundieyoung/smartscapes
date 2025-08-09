import { z } from "zod";

import { FILE_SIZE_MB } from "../../../../libs/constants/constants.js";
import {
	FileContent,
	FileFolderName,
	FilesValidationMessage,
	FilesValidationRule,
} from "../enums/enums.js";
import { type FileContentType } from "../types/types.js";

const fileGetUploadUrl = z.strictObject({
	folder: z.enum(Object.values(FileFolderName), {
		message: FilesValidationMessage.INVALID_FOLDER_NAME,
	}),
	name: z
		.string()
		.min(FilesValidationRule.FILE_NAME_MIN_LENGTH, {
			message: FilesValidationMessage.FILE_NAME_MINIMUM_LENGTH,
		})
		.max(FilesValidationRule.FILE_NAME_MAX_LENGTH, {
			message: FilesValidationMessage.FILE_NAME_MAXIMUM_LENGTH,
		}),
	size: z
		.number()
		.min(FilesValidationRule.FILE_SIZE_MIN_BYTES, {
			message: FilesValidationMessage.FILE_SIZE_MIN_BYTES,
		})
		.max(FilesValidationRule.FILE_SIZE_MAX_MB * FILE_SIZE_MB, {
			message: FilesValidationMessage.FILE_SIZE_MAX_MB,
		}),
	type: z
		.string()
		.refine(
			(type): type is FileContentType =>
				Object.values(FileContent).includes(type as FileContentType),
			{
				message: FilesValidationMessage.INVALID_FILE_TYPE,
			},
		),
});

export { fileGetUploadUrl };
