import { type FileContentType } from "../enums/enums.js";

type CreateFileRecordResponseDto = {
	contentType: FileContentType;
	fileName: string;
	id: number;
	url: string;
};

export { type CreateFileRecordResponseDto };
