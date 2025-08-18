import { type FileMimeType } from "./file-mime-type.type.js";

type FileUploadResponseDto = {
	contentType: FileMimeType;
	id: number;
	url: string;
};

export { type FileUploadResponseDto };
