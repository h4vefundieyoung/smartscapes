import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type APIResponse, type PaginationMeta } from "~/libs/types/types.js";

import { CategoriesApiPath } from "./libs/enums/enums.js";
import {
	type CategoryGetAllItemResponseDto,
	type PaginationQuery,
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

	public async getAll(
		payload: PaginationQuery,
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
