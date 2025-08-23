import { FileFolderName } from "./file-folder-name.enum.js";

const FileFolderNameValues = Object.values(FileFolderName);

const FileValidationMessage = {
	INVALID_FOLDER_NAME: `Invalid folder name. Allowed values: ${FileFolderNameValues.join(
		", ",
	)}`,
	NEGATIVE_ENTITY_ID: "Entity id should be a positive integer.",
} as const;

export { FileValidationMessage };
