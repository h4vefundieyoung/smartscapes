import { z } from "zod";

import {
	FileContent,
	FilesValidationMessage,
	FilesValidationRule,
} from "../enums/enums.js";
import { type FileContentType } from "../types/types.js";

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
	url: z.string().max(FilesValidationRule.URL_MAX_LENGTH, {
		message: FilesValidationMessage.URL_MAXIMUM_LENGTH,
	}),
});

export { fileCreate };
