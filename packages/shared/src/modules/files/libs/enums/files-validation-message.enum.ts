import { FilesValidationRule } from "./files-validation-rule.enum.js";

const FilesValidationMessage = {
	FILE_NAME_MAXIMUM_LENGTH: `File name must be less than ${String(FilesValidationRule.FILE_NAME_MAX_LENGTH)} characters long.`,
	FILE_NAME_MINIMUM_LENGTH: `File name must be at least ${String(FilesValidationRule.FILE_NAME_MIN_LENGTH)} character long.`,
	FILE_SIZE_MAX_MB: `File size must be less than ${String(FilesValidationRule.FILE_SIZE_MAX_MB)}MB.`,
	FILE_SIZE_MIN_BYTES: `File size must be greater than ${String(FilesValidationRule.FILE_SIZE_MIN_BYTES)} byte.`,
	INVALID_FILE_TYPE: "Invalid file type.",
	INVALID_FOLDER_NAME: "Invalid folder name.",
	REQUIRED_FIELDS_FOR_CREATE: "All fields are required for file creation.",
	URL_MAXIMUM_LENGTH: `URL must be less than ${String(FilesValidationRule.URL_MAX_LENGTH)} characters long.`,
} as const;

export { FilesValidationMessage };
