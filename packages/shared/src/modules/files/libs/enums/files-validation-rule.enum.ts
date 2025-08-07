const FilesValidationRule = {
	FILE_NAME_MAX_LENGTH: 255,
	FILE_NAME_MIN_LENGTH: 1,
	FILE_SIZE_MAX_MB: 10,
	FILE_SIZE_MIN_BYTES: 1,
	URL_MAX_LENGTH: 2048,
} as const;

export { FilesValidationRule };
