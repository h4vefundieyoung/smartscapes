import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type APIResponse } from "~/libs/types/types.js";

import { PointsOfInterestApiPath } from "./libs/enums/enums.js";
import {
	type PointsOfInterestResponseDto,
	type PointsOfInterestSearchQuery,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class PointsOfInterestApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.POINTS_OF_INTEREST, storage });
	}

	public async findAll(
		query?: PointsOfInterestSearchQuery,
	): Promise<APIResponse<PointsOfInterestResponseDto[]>> {
		const queryParameters: Record<string, string> = Object.fromEntries(
			Object.entries(query ?? {}).map(([key, value]) => [key, String(value)]),
		);

		const url = this.getFullEndpoint(
			PointsOfInterestApiPath.ROOT,
			queryParameters,
		);

		const response = await this.load<
			APIResponse<PointsOfInterestResponseDto[]>
		>(url, {
			contentType: ContentType.JSON,
			hasAuth: true,
			method: "GET",
		});

		return await response.json();
	}
}

export { PointsOfInterestApi };
