import { FileFolderName } from "./file-folder-name.enum.js";

const FileFolderNameValues = Object.values(FileFolderName);

const FilesValidationMessage = {
	INVALID_FOLDER_NAME: `Invalid folder name. Allowed values: ${FileFolderNameValues.join(
		", ",
	)}`,
} as const;

export { FilesValidationMessage };
