import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type APIResponse } from "~/libs/types/types.js";

import { RouteApiPath } from "./libs/enums/enums.js";
import {
	type RoutesFindAllOptions,
	type RoutesResponseDto,
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

	public async findAll(
		query?: RoutesFindAllOptions,
	): Promise<APIResponse<RoutesResponseDto[]>> {
		const queryParameters: Record<string, string> = {};

		if (query?.name) {
			queryParameters["name"] = query.name;
		}

		const response = await this.load<APIResponse<RoutesResponseDto[]>>(
			this.getFullEndpoint(RouteApiPath.ROOT, queryParameters),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json();
	}
}

export { RoutesApi };
