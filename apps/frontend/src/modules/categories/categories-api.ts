import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type APIResponse, type PaginationMeta } from "~/libs/types/types.js";

import { CategoriesApiPath } from "./libs/enums/enums.js";
import {
	type CategoryCreateRequestDto,
	type CategoryGetAllItemResponseDto,
	type CategoryGetAllQuery,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class CategoriesApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.CATEGORIES, storage });
	}

	public async create(
		payload: CategoryCreateRequestDto,
	): Promise<APIResponse<CategoryGetAllItemResponseDto>> {
		const response = await this.load<
			APIResponse<CategoryGetAllItemResponseDto>
		>(this.getFullEndpoint(CategoriesApiPath.ROOT, {}), {
			contentType: ContentType.JSON,
			hasAuth: true,
			method: "POST",
			payload: JSON.stringify(payload),
		});

		return await response.json();
	}

	public async getAll(
		payload: CategoryGetAllQuery | undefined,
	): Promise<APIResponse<CategoryGetAllItemResponseDto[], PaginationMeta>> {
		const response = await this.load<
			APIResponse<CategoryGetAllItemResponseDto[], PaginationMeta>
		>(this.getFullEndpoint(CategoriesApiPath.ROOT, {}), {
			contentType: ContentType.JSON,
			hasAuth: true,
			method: "GET",
			query: payload,
		});

		return await response.json();
	}
}

export { CategoriesApi };
