import { z } from "zod";

import {
	FileContent,
	type FileContentType,
	FilesValidationMessage,
	FilesValidationRule,
} from "../enums/enums.js";

const BYTES_IN_KB = 1024;
const BYTES_IN_MB = BYTES_IN_KB * BYTES_IN_KB;

const fileCreate = z.strictObject({
	contentType: z
		.string()
		.refine(
			(type): type is FileContentType =>
				Object.values(FileContent).includes(type as FileContentType),
			{
				message: FilesValidationMessage.INVALID_CONTENT_TYPE,
			},
		),
	fileName: z
		.string()
		.min(FilesValidationRule.FILE_NAME_MIN_LENGTH, {
			message: FilesValidationMessage.FILE_NAME_MINIMUM_LENGTH,
		})
		.max(FilesValidationRule.FILE_NAME_MAX_LENGTH, {
			message: FilesValidationMessage.FILE_NAME_MAXIMUM_LENGTH,
		}),
	fileSize: z
		.number()
		.min(FilesValidationRule.FILE_SIZE_MIN_BYTES, {
			message: FilesValidationMessage.FILE_SIZE_MIN_BYTES,
		})
		.max(FilesValidationRule.FILE_SIZE_MAX_MB * BYTES_IN_MB, {
			message: FilesValidationMessage.FILE_SIZE_MAX_MB,
		}),
	url: z.string().max(FilesValidationRule.URL_MAX_LENGTH, {
		message: FilesValidationMessage.URL_MAXIMUM_LENGTH,
	}),
});

export { fileCreate };
