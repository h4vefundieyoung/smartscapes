import { z } from "zod";

import { FileFolderName, FilesValidationMessage } from "../enums/enums.js";

const fileUploadUrl = z.strictObject({
	file: z.any(),
	folder: z.enum(Object.values(FileFolderName), {
		message: FilesValidationMessage.INVALID_FOLDER_NAME,
	}),
});

export { fileUploadUrl };
