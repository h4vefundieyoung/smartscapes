import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type APIResponse } from "~/libs/types/types.js";

import { type CategoryGetItemResponseDto } from "./categories.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class CategoriesApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.CATEGORIES, storage });
	}

	public async getAll(): Promise<APIResponse<CategoryGetItemResponseDto[]>> {
		const response = await this.load<APIResponse<CategoryGetItemResponseDto[]>>(
			this.getFullEndpoint("/", {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json();
	}
}

export { CategoriesApi };
