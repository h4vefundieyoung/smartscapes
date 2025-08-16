import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type APIResponse } from "~/libs/types/types.js";

import { PointsOfInterestApiPath } from "./libs/enums/enums.js";
import { type PointsOfInterestResponseDto } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class PointsOfInterestApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.POINTS_OF_INTEREST, storage });
	}

	public async getById(
		id: number,
	): Promise<APIResponse<PointsOfInterestResponseDto>> {
		const response = await this.load<APIResponse<PointsOfInterestResponseDto>>(
			this.getFullEndpoint(PointsOfInterestApiPath.ROOT, String(id), {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json();
	}
}

export { PointsOfInterestApi };
