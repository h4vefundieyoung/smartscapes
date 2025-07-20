import { ServerErrorType } from "~/libs/enums/enums.js";
import { configureString } from "~/libs/helpers/helpers.js";
import {
	type HTTP,
	type HTTPCode,
	HTTPError,
	HTTPHeader,
} from "~/libs/modules/http/http.js";
import { type Storage, StorageKey } from "~/libs/modules/storage/storage.js";
import { type ServerErrorResponse, type ValueOf } from "~/libs/types/types.js";

import {
	type GetHeadersOptions,
	type HTTPApi,
	type HTTPApiOptions,
	type HTTPApiResponse,
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

	public async load<T>(
		path: string,
		options: HTTPApiOptions,
	): Promise<HTTPApiResponse<T>> {
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

		const response = await this.http.load(path, {
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

		return configureString(
			this.baseUrl,
			this.path,
			...(copiedParameters as string[]),
			options,
		);
	}

	private async checkResponse<T>(
		response: HTTPApiResponse<T>,
	): Promise<HTTPApiResponse<T>> {
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

	private async handleError(response: Response): Promise<never> {
		let parsedException: ServerErrorResponse["error"];

		try {
			const { error } = (await response.json()) as ServerErrorResponse;

			parsedException = error;
		} catch {
			parsedException = {
				message: response.statusText,
				type: ServerErrorType.COMMON,
			};
		}

		const isCustomException = Boolean(parsedException.type);
		const errorType = isCustomException
			? parsedException.type
			: ServerErrorType.COMMON;
		const details = "details" in parsedException ? parsedException.details : [];

		throw new HTTPError({
			details,
			errorType,
			message: parsedException.message,
			status: response.status as ValueOf<typeof HTTPCode>,
		});
	}
}

export { BaseHTTPApi };
