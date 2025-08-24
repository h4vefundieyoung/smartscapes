import { APIPath } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type APIResponse } from "~/libs/types/types.js";

import { UserRouteApiPath } from "./libs/enums/enums.js";
import { type UserRouteResponseDto } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class UserRoutesApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.USER_ROUTES, storage });
	}

	public async saveRoute(
		id: number,
	): Promise<APIResponse<UserRouteResponseDto>> {
		const response = await this.load<APIResponse<UserRouteResponseDto>>(
			this.getFullEndpoint(UserRouteApiPath.$ID, { id: id.toString() }),
			{
				hasAuth: true,
				method: "POST",
			},
		);

		return await response.json();
	}
}

export { UserRoutesApi };
