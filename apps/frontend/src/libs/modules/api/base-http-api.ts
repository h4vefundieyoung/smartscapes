import { APIErrorType } from "~/libs/enums/enums.js";
import {
	type HTTP,
	type HTTPCode,
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
	type QueryValue,
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

	protected getFullEndpoint<T extends Record<string, QueryValue>>(
		...parameters: [...string[], T]
	): string {
		const copiedParameters = [...parameters];
		const options = copiedParameters.pop() as T;

		let path = this.buildPath(copiedParameters as string[]);
		const queryParameters = new URLSearchParams();

		for (const [key, value] of Object.entries(options)) {
			const dynamicPathKey = `:${key}`;

			if (path.includes(dynamicPathKey)) {
				path = this.replaceDynamicPath(path, dynamicPathKey, value);
				continue;
			}

			this.addQueryParameters(queryParameters, key, value);
		}

		const queryString = queryParameters.toString();

		return queryString ? `${path}?${queryString}` : path;
	}

	private addQueryParameters(
		queryParameters: URLSearchParams,
		key: string,
		value: string | string[] | undefined,
	): void {
		if (value !== undefined) {
			if (Array.isArray(value)) {
				for (const v of value) {
					queryParameters.append(key, String(v));
				}
			} else {
				queryParameters.append(key, String(value));
			}
		}
	}

	private buildPath(copiedParameters: string[]): string {
		return [this.baseUrl, this.path, ...copiedParameters].join("");
	}

	private async checkResponse<T>(
		response: HTTPResponse<T>,
	): Promise<HTTPResponse<T>> {
		if (!response.ok) {
			await this.handleError(response);
		}

		return response;
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

		throw new HTTPError({
			details,
			message: errorPayload.message,
			status: response.status as ValueOf<typeof HTTPCode>,
			type: errorPayload.type,
		});
	}

	private replaceDynamicPath(
		path: string,
		dynamicPathKey: string,
		value: string | string[] | undefined,
	): string {
		if (value !== undefined) {
			const replacement = Array.isArray(value) ? value[0] : value;

			if (replacement !== undefined) {
				path = path.replace(dynamicPathKey, encodeURIComponent(replacement));
			}
		}

		return path;
	}
}

export { BaseHTTPApi };
