import { z } from "zod";

import { FileFolderName, FileValidationMessage } from "../enums/enums.js";

const fileUploadFolder = z.strictObject({
	entityId: z
		.string()
		.trim()
		.transform(Number.parseFloat)
		.pipe(
			z.int().positive({
				message: FileValidationMessage.NEGATIVE_ENTITY_ID,
			}),
		),
	folder: z.enum(Object.values(FileFolderName), {
		message: FileValidationMessage.INVALID_FOLDER_NAME,
	}),
});

export { fileUploadFolder };
