import { APIErrorType, APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import {
	type HTTP,
	type HTTPCode,
	HTTPError,
} from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type APIResponse, type ValueOf } from "~/libs/types/types.js";

import { FilesApiPath } from "./libs/enums/enums.js";
import {
	type FileContentType,
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
		const getUploadUrlResponse = await this.getUploadUrl(payload);

		const { fields, uploadUrl } = getUploadUrlResponse.data;

		await this.uploadFileToPresignedUrl(uploadUrl, fields, file);

		const fileName = fields["key"] as string;

		const responseURL = await this.createRecord({
			contentType: file.type as FileContentType,
			url: `${uploadUrl}${fileName}`,
		});

		return responseURL.data.url;
	}

	private addTimestampToFileName = (fileName: string): string => {
		const dotIndex = fileName.lastIndexOf(".");
		const name = fileName.slice(0, dotIndex);
		const extension = fileName.slice(dotIndex);
		const timestamp = String(Date.now());

		return `${name}-${timestamp}${extension}`;
	};

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
		const updatedPayload = {
			...payload,
			name: this.addTimestampToFileName(payload.name),
		};

		const response = await this.load<APIResponse<FileUploadUrlResponseDto>>(
			this.getFullEndpoint(FilesApiPath.UPLOAD_URL, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(updatedPayload),
			},
		);

		return await response.json();
	}

	private async uploadFileToPresignedUrl(
		uploadUrl: string,
		fields: Record<string, string>,
		file: File,
	): Promise<Response> {
		const formData = new FormData();

		for (const [key, value] of Object.entries(fields)) {
			formData.append(key, value);
		}

		formData.append("file", file);

		const response = await fetch(uploadUrl, {
			body: formData,
			method: "POST",
		});

		if (!response.ok) {
			throw new HTTPError({
				details: [],
				message: "Failed to upload file",
				status: response.status as ValueOf<typeof HTTPCode>,
				type: APIErrorType.COMMON,
			});
		}

		return response;
	}
}

export { FilesApi };
