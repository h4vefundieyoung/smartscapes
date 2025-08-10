import { APIPath } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type APIResponse } from "~/libs/types/types.js";

import { FilesApiPath } from "./libs/enums/enums.js";
import {
	type FileUploadUrlResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class FilesApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.FILES, storage });
	}

	public async uploadFile(
		folder: string,
		file: File,
	): Promise<APIResponse<FileUploadUrlResponseDto>> {
		const generateFile = this.generateFileName(folder, file.name);
		const formData = new FormData();

		formData.append("file", generateFile);

		const response = await this.load<APIResponse<FileUploadUrlResponseDto>>(
			this.getFullEndpoint(FilesApiPath.UPLOAD, {}),
			{
				hasAuth: true,
				method: "POST",
				payload: formData,
			},
		);

		return await response.json();
	}

	private generateFileName = (folder: string, fileName: string): string => {
		const dotIndex = fileName.lastIndexOf(".");
		const name = fileName.slice(0, dotIndex);
		const extension = fileName.slice(dotIndex);
		const timestamp = String(Date.now());

		return `${folder}/${name}-${timestamp}${extension}`;
	};
}

export { FilesApi };
