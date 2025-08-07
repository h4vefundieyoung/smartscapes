import { type FileContentType } from "../types/types.js";

type FileCreateRecordRequestDto = {
	contentType: FileContentType;
	url: string;
};

export { type FileCreateRecordRequestDto };
