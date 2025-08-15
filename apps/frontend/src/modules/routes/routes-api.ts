import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type APIResponse } from "~/libs/types/types.js";

import { RoutesApiPath } from "./libs/enums/enums.js";
import {
	type RouteConstructRequestDto,
	type RouteConstructResponseDto,
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

	public async construct(
		payload: RouteConstructRequestDto,
	): Promise<APIResponse<RouteConstructResponseDto>> {
		const response = await this.load<APIResponse<RouteConstructResponseDto>>(
			this.getFullEndpoint(RoutesApiPath.CONSTRUCT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json();
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
}

export { RoutesApi };
