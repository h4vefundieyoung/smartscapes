import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type APIResponse } from "~/libs/types/types.js";

import { RoutesApiPath } from "./libs/enums/enums.js";
import {
	type PatchActionPayload,
	type RouteCreateRequestDto,
	type RouteFindAllOptions,
	type RouteGetByIdResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class RoutesApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.ROUTES, storage });
	}

	public async create(
		payload: RouteCreateRequestDto,
	): Promise<APIResponse<RouteGetByIdResponseDto>> {
		const response = await this.load<APIResponse<RouteGetByIdResponseDto>>(
			this.getFullEndpoint("/", {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json();
	}

	public async getAll(
		query?: RouteFindAllOptions,
	): Promise<APIResponse<RouteGetByIdResponseDto[]>> {
		const response = await this.load<APIResponse<RouteGetByIdResponseDto[]>>(
			this.getFullEndpoint(RoutesApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: "GET",
				query,
			},
		);

		return await response.json();
	}

	public async getById(
		id: number,
	): Promise<APIResponse<RouteGetByIdResponseDto>> {
		const response = await this.load<APIResponse<RouteGetByIdResponseDto>>(
			this.getFullEndpoint(`${RoutesApiPath.ROOT}${id.toString()}`, {}),
			{
				hasAuth: false,
				method: "GET",
			},
		);

		return await response.json();
	}

	public async patch({
		id,
		payload,
	}: PatchActionPayload): Promise<APIResponse<RouteGetByIdResponseDto>> {
		const response = await this.load<APIResponse<RouteGetByIdResponseDto>>(
			this.getFullEndpoint(RoutesApiPath.$ID, { id: id.toString() }),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PATCH",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json();
	}
}

export { RoutesApi };
