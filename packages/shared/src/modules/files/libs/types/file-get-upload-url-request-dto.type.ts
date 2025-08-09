import { type ValueOf } from "../../../../libs/types/types.js";
import { type FileFolderName } from "../enums/file-folder-name.enum.js";
import { type FileContentType } from "../types/types.js";

type FileGetUploadUrlRequestDto = {
	folder: ValueOf<typeof FileFolderName>;
	name: string;
	size: number;
	type: FileContentType;
};

export { type FileGetUploadUrlRequestDto };
