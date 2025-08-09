import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type APIResponse } from "~/libs/types/types.js";

import { FilesApiPath } from "./libs/enums/enums.js";
import {
	type FileCreateRecordRequestDto,
	type FileCreateRecordResponseDto,
	type FileGetUploadUrlRequestDto,
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
		payload: FileGetUploadUrlRequestDto,
		file: File,
	): Promise<string> {
		const response = await this.getUploadUrl(payload);

		// eslint-disable-next-line no-console
		console.log("Full response:", response);

		const { fields, fileKey, uploadUrl } = response.data;

		// eslint-disable-next-line no-console
		console.log("Fields from backend:", fields);

		const uploadResponse = await this.uploadFileToPresignedUrl(
			uploadUrl,
			file,
			fields,
		);

		// eslint-disable-next-line no-console
		console.log(uploadResponse, "uploadFileToPresignedUrl");

		if (!uploadResponse.ok) {
			throw new Error("Upload failed with status ");
		}

		const responseURL = await this.createRecord({
			contentType: "image/jpeg",
			url: `https://vk-ss-img.s3.eu-north-1.amazonaws.com/${String(fileKey)}`,
		});

		// eslint-disable-next-line no-console
		console.log(responseURL, "createRecord");

		return responseURL.data.url;
	}

	private async createRecord(
		payload: FileCreateRecordRequestDto,
	): Promise<APIResponse<FileCreateRecordResponseDto>> {
		const response = await this.load<APIResponse<FileCreateRecordResponseDto>>(
			this.getFullEndpoint(FilesApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json();
	}

	private async getUploadUrl(
		payload: FileGetUploadUrlRequestDto,
	): Promise<APIResponse<FileUploadUrlResponseDto>> {
		const response = await this.load<APIResponse<FileUploadUrlResponseDto>>(
			this.getFullEndpoint(FilesApiPath.UPLOAD_URL, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json();
	}

	private async uploadFileToPresignedUrl(
		url: string,
		file: File,
		fields: Record<string, string>,
	): Promise<Response> {
		// eslint-disable-next-line no-console
		console.log("File type:", file.type);

		const formData = new FormData();

		for (const [key, value] of Object.entries(fields)) {
			formData.append(key, value);
			// eslint-disable-next-line no-console
			console.log(`Adding field: ${key} = ${value}`);
		}

		formData.append("file", file);

		const response = await fetch(url, {
			body: formData,
			method: "POST",
		});

		if (!response.ok) {
			const errorText = await response.text();

			// eslint-disable-next-line no-console
			console.error("Upload error details:", errorText);

			throw new Error(
				`Upload failed with status: ${String(response.status)} - ${errorText}`,
			);
		}

		return response;
	}
}

export { FilesApi };
