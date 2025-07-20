import { APIPath } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type ServerResponse } from "~/libs/types/types.js";

import { UsersApiPath } from "./libs/enums/enums.js";
import { type UserGetAllItemResponseDto } from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class UserApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.USERS, storage });
	}

	public async getAll(): Promise<ServerResponse<UserGetAllItemResponseDto[]>> {
		const response = await this.load<
			ServerResponse<UserGetAllItemResponseDto[]>
		>(this.getFullEndpoint(UsersApiPath.ROOT, {}), {
			hasAuth: false,
			method: "GET",
		});

		return await response.json();
	}
}

export { UserApi };
