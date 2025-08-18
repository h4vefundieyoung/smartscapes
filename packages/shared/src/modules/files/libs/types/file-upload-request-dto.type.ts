import { type ValueOf } from "../../../../libs/types/types.js";
import { type FileFolderName } from "../enums/enums.js";

type FileUploadRequestDto = {
	entityId: string;
	file: File;
	folder: ValueOf<typeof FileFolderName>;
};

export { type FileUploadRequestDto };
