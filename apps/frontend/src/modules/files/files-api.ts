import { APIPath } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type APIResponse } from "~/libs/types/types.js";

import { FilesApiPath } from "./libs/enums/enums.js";
import { type FileUploadUrlResponseDto } from "./libs/types/types.js";

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
		const formData = new FormData();

		formData.append("file", file);

		const response = await this.load<APIResponse<FileUploadUrlResponseDto>>(
			this.getFullEndpoint(FilesApiPath.UPLOAD, { folder }),
			{
				hasAuth: true,
				method: "POST",
				payload: formData,
			},
		);

		return await response.json();
	}
}

export { FilesApi };
