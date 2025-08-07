import { type FileContentType } from "../types/types.js";

type FileCreateRecordResponseDto = {
	contentType: FileContentType;
	id: number;
	url: string;
};

export { type FileCreateRecordResponseDto };
