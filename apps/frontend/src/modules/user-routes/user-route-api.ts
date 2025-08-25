import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type APIResponse } from "~/libs/types/types.js";

import { UserRouteApiPath } from "./libs/enums/enums.js";
import {
	type UserRouteCreateRequestDto,
	type UserRouteFinishRequestDto,
	type UserRouteGetItemRequestDto,
	type UserRouteResponseDto,
	type UserRouteStartRequestDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class UserRouteApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.USER_ROUTES, storage });
	}

	public async create(
		payload: UserRouteCreateRequestDto,
	): Promise<APIResponse<UserRouteResponseDto>> {
		const response = await this.load<APIResponse<UserRouteResponseDto>>(
			this.getFullEndpoint(UserRouteApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json();
	}

	public async finish(
		payload: UserRouteFinishRequestDto,
	): Promise<APIResponse<UserRouteResponseDto>> {
		const response = await this.load<APIResponse<UserRouteResponseDto>>(
			this.getFullEndpoint(UserRouteApiPath.FINISH, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PATCH",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json();
	}

	public async getByRouteId(
		payload: UserRouteGetItemRequestDto,
	): Promise<APIResponse<UserRouteResponseDto>> {
		const response = await this.load<APIResponse<UserRouteResponseDto>>(
			this.getFullEndpoint(UserRouteApiPath.$ID, {
				routeId: payload.routeId.toString(),
			}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json();
	}

	public async start(
		payload: UserRouteStartRequestDto,
	): Promise<APIResponse<UserRouteResponseDto>> {
		const response = await this.load<APIResponse<UserRouteResponseDto>>(
			this.getFullEndpoint(UserRouteApiPath.START, {}),
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

export { UserRouteApi };
