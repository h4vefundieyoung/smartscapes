import { APIPath } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/base-http-api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type APIResponse } from "~/libs/types/types.js";

import {
	type PointsOfInterestResponseDto,
	type PointsOfInterestSearchQuery,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class PointOfInterestApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.POINTS_OF_INTEREST, storage });
	}

	public async getAll(
		query?: PointsOfInterestSearchQuery,
	): Promise<APIResponse<PointsOfInterestResponseDto[]>> {
		let queryString = "";

		if (query) {
			const queryParameters = new URLSearchParams();

			for (let [key, value] of Object.entries(query)) {
				queryParameters.append(key, String(value));
			}

			queryString = `?${queryParameters.toString()}`;
		}

		const response = await this.load<
			APIResponse<PointsOfInterestResponseDto[]>
		>(this.getFullEndpoint(queryString, {}), {
			hasAuth: true,
			method: "GET",
		});

		return await response.json();
	}
}

export { PointOfInterestApi };
