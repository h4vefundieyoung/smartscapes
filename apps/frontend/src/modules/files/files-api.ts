import { APIPath } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type APIResponse } from "~/libs/types/types.js";

import { FilesApiPath } from "./libs/enums/enums.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class FileApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.FILES, storage });
	}

	public async delete(payload: { id: number }): Promise<APIResponse<boolean>> {
		const { id } = payload;

		const response = await this.load<APIResponse<boolean>>(
			this.getFullEndpoint(FilesApiPath.$ID, { id: id.toString() }),
			{
				hasAuth: true,
				method: "DELETE",
			},
		);

		return await response.json();
	}
}

export { FileApi };
