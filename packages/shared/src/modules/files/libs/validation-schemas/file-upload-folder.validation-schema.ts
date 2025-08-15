import { z } from "zod";

import { FileFolderName, FileValidationMessage } from "../enums/enums.js";

const fileUploadFolder = z.strictObject({
	folder: z.enum(Object.values(FileFolderName), {
		message: FileValidationMessage.INVALID_FOLDER_NAME,
	}),
});

export { fileUploadFolder };
