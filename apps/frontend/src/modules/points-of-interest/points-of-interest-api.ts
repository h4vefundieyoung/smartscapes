import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type APIResponse } from "~/libs/types/types.js";

import { PointsOfInterestApiPath } from "./libs/enums/enums.js";
import {
	type PointsOfInterestRequestDto,
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

	public async create(
		payload: PointsOfInterestRequestDto,
	): Promise<APIResponse<PointsOfInterestResponseDto>> {
		const response = await this.load(
			this.getFullEndpoint(PointsOfInterestApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return (await response.json()) as APIResponse<PointsOfInterestResponseDto>;
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

	public async getById(
		id: number,
	): Promise<APIResponse<PointsOfInterestResponseDto>> {
		const response = await this.load<APIResponse<PointsOfInterestResponseDto>>(
			this.getFullEndpoint(PointsOfInterestApiPath.ROOT, String(id), {}),
			{
				hasAuth: false,
				method: "GET",
			},
		);

		return await response.json();
	}
}

export { PointOfInterestApi };
