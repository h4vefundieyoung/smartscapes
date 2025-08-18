import { APIErrorType } from "~/libs/enums/enums.js";
import {
	AuthError,
	type HTTP,
	HTTPCode,
	HTTPError,
	HTTPHeader,
	type HTTPResponse,
} from "~/libs/modules/http/http.js";
import { type Storage, StorageKey } from "~/libs/modules/storage/storage.js";
import { type APIErrorResponse, type ValueOf } from "~/libs/types/types.js";

import {
	type GetHeadersOptions,
	type HTTPApi,
	type HTTPApiOptions,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	path: string;
	storage: Storage;
};

class BaseHTTPApi implements HTTPApi {
	private baseUrl: string;

	private http: HTTP;

	private path: string;

	private storage: Storage;

	public constructor({ baseUrl, http, path, storage }: Constructor) {
		this.baseUrl = baseUrl;
		this.http = http;
		this.path = path;
		this.storage = storage;
	}

	public async load<T = unknown>(
		path: string,
		options: HTTPApiOptions,
	): Promise<HTTPResponse<T>> {
		const {
			contentType = null,
			hasAuth = false,
			method,
			payload = null,
		} = options;

		const headers = await this.getHeaders({
			contentType,
			hasAuth,
		});

		const response = await this.http.load<T>(path, {
			headers,
			method,
			payload,
		});

		return await this.checkResponse<T>(response);
	}

	protected getFullEndpoint<T extends Record<string, string>>(
		...parameters: [...string[], T]
	): string {
		const copiedParameters = [...parameters];
		const options = copiedParameters.pop() as T;

		let path = this.constructPath(copiedParameters as string[]);

		path = this.replaceDynamicPathSegments(path, options);

		const queryString = this.buildQueryString(options, path);

		return queryString ? `${path}?${queryString}` : path;
	}

	private buildQueryString(
		options: Record<string, string>,
		path: string,
	): string {
		const queryParameters = new URLSearchParams();

		for (const [key, value] of Object.entries(options)) {
			const dynamicPathKey = `:${key}`;

			if (path.includes(dynamicPathKey)) {
				continue;
			}

			queryParameters.append(key, value);
		}

		return queryParameters.toString();
	}

	private async checkResponse<T>(
		response: HTTPResponse<T>,
	): Promise<HTTPResponse<T>> {
		if (!response.ok) {
			await this.handleError(response);
		}

		return response;
	}

	private constructPath(copiedParameters: string[]): string {
		return [this.baseUrl, this.path, ...copiedParameters].join("");
	}

	private async getHeaders({
		contentType,
		hasAuth,
	}: GetHeadersOptions): Promise<Headers> {
		const headers = new Headers();

		if (contentType) {
			headers.append(HTTPHeader.CONTENT_TYPE, contentType);
		}

		if (hasAuth) {
			const token = await this.storage.get<string>(StorageKey.TOKEN);

			headers.append(HTTPHeader.AUTHORIZATION, `Bearer ${token ?? ""}`);
		}

		return headers;
	}

	private async handleError(response: HTTPResponse): Promise<never> {
		let errorPayload: APIErrorResponse["error"];

		try {
			const body = (await response.json()) as APIErrorResponse;

			const commonErrorPayload = {
				message: response.statusText,
				type: APIErrorType.COMMON,
			};

			errorPayload = "error" in body ? body.error : commonErrorPayload;
		} catch {
			errorPayload = {
				message: response.statusText,
				type: APIErrorType.COMMON,
			};
		}

		const details = "details" in errorPayload ? errorPayload.details : [];
		const errorData = {
			details,
			message: errorPayload.message,
			status: response.status as ValueOf<typeof HTTPCode>,
			type: errorPayload.type,
		};
		const error =
			response.status === HTTPCode.UNAUTHORIZED
				? new AuthError(errorData)
				: new HTTPError(errorData);

		throw error;
	}

	private replaceDynamicPathSegments(
		path: string,
		options: Record<string, string>,
	): string {
		for (const [key, value] of Object.entries(options)) {
			const dynamicPathKey = `:${key}`;

			if (path.includes(dynamicPathKey)) {
				path = path.replace(dynamicPathKey, encodeURIComponent(value));
			}
		}

		return path;
	}
}

export { BaseHTTPApi };
