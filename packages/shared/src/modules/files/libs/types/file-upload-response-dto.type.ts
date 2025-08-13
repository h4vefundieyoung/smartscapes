import { type FileMimeType } from "./file-content-type.type.js";

type FileUploadResponseDto = {
	contentType: FileMimeType;
	id: number;
	url: string;
};

export { type FileUploadResponseDto };
