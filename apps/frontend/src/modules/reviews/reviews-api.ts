import { ContentType } from "@smartscapes/shared";

import { APIPath } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type APIResponse } from "~/libs/types/types.js";

import { ReviewsApiPath } from "./libs/enums/enums.js";
import {
	type ReviewGetByIdResponseDto,
	type ReviewRequestDto,
	type ReviewSearchQuery,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class ReviewsApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.REVIEWS, storage });
	}

	public async create(
		payload: ReviewRequestDto,
	): Promise<APIResponse<ReviewGetByIdResponseDto>> {
		const response = await this.load<APIResponse<ReviewGetByIdResponseDto>>(
			this.getFullEndpoint(ReviewsApiPath.ROOT, {}),
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
		query?: ReviewSearchQuery,
	): Promise<APIResponse<ReviewGetByIdResponseDto[]>> {
		const response = await this.load<APIResponse<ReviewGetByIdResponseDto[]>>(
			this.getFullEndpoint(ReviewsApiPath.ROOT, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
				query,
			},
		);

		return await response.json();
	}
}

export { ReviewsApi };
