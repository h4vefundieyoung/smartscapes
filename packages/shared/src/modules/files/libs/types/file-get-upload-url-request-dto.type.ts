import { type FileContentType } from "../types/types.js";

type FileGetUploadUrlRequestDto = {
	fileName: string;
	fileSize: number;
	fileType: FileContentType;
};

export { type FileGetUploadUrlRequestDto };
