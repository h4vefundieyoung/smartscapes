import { APIPath } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type APIResponse } from "~/libs/types/types.js";

import { CategoriesApiPath } from "./libs/enums/enums.js";
import { type CategoryGetAllItemResponseDto } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class CategoriesApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.CATEGORIES, storage });
	}

	public async getAll(): Promise<APIResponse<CategoryGetAllItemResponseDto[]>> {
		const response = await this.load<
			APIResponse<CategoryGetAllItemResponseDto[]>
		>(this.getFullEndpoint(CategoriesApiPath.ROOT, {}), {
			hasAuth: true,
			method: "GET",
		});

		return await response.json();
	}
}

export { CategoriesApi };
