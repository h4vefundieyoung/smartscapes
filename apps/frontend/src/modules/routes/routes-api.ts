import { APIPath } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type APIResponse } from "~/libs/types/types.js";

import { RoutesApiPath } from "./libs/enums/enums.js";
import {
	type PatchActionPayload,
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

	public async getRouteById(
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

	public async patchRoute({
		id,
		payload,
	}: PatchActionPayload): Promise<APIResponse<RouteGetByIdResponseDto>> {
		const response = await this.load<APIResponse<RouteGetByIdResponseDto>>(
			this.getFullEndpoint(`${RoutesApiPath.ROOT}${id.toString()}`, {}),
			{
				contentType: "application/json",
				hasAuth: true,
				method: "PATCH",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json();
	}
}

export { RoutesApi };
