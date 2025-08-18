import { z } from "zod";

import { FileFolderName, FileValidationMessage } from "../enums/enums.js";

const fileUploadFolder = z.strictObject({
	entityId: z.string().min(0, {
		message: FileValidationMessage.INVALID_ENTITY_ID,
	}),
	folder: z.enum(Object.values(FileFolderName), {
		message: FileValidationMessage.INVALID_FOLDER_NAME,
	}),
});

export { fileUploadFolder };
