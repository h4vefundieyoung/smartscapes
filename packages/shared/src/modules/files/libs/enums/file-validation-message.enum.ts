import { FileFolderName } from "./file-folder-name.enum.js";

const FileFolderNameValues = Object.values(FileFolderName);

const FileValidationMessage = {
	INVALID_ENTITY_ID: "Minimum entity value is 0",
	INVALID_FOLDER_NAME: `Invalid folder name. Allowed values: ${FileFolderNameValues.join(
		", ",
	)}`,
} as const;

export { FileValidationMessage };
