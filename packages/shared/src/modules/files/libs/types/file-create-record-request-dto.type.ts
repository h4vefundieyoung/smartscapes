import { type FileContentType } from "../enums/enums.js";

type CreateFileRecordRequestDto = {
	contentType: FileContentType;
	fileName: string;
	fileSize: number;
	url: string;
};

export { type CreateFileRecordRequestDto };
