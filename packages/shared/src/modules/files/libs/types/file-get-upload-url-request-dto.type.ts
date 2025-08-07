import { type FileContentType } from "../enums/enums.js";

type GetUploadUrlRequestDto = {
	fileName: string;
	fileSize: number;
	fileType: FileContentType;
};

export { type GetUploadUrlRequestDto };
