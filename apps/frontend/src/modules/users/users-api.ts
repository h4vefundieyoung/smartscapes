import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type APIResponse } from "~/libs/types/types.js";

import { UsersApiPath } from "./libs/enums/enums.js";
import {
	type UserGetByIdItemResponseDto,
	type UserAuthPatchRequestDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class UserApi extends BaseHTTPApi {
	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.USERS, storage });
	}

	public async getAll(): Promise<APIResponse<UserGetByIdItemResponseDto[]>> {
		const response = await this.load<APIResponse<UserGetByIdItemResponseDto[]>>(
			this.getFullEndpoint(UsersApiPath.ROOT, {}),
			{
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json();
	}

	public async patch(
		id: string,
		payload: UserAuthPatchRequestDto,
	): Promise<APIResponse<UserGetByIdItemResponseDto>> {
		const response = await this.load<APIResponse<UserGetByIdItemResponseDto>>(
			this.getFullEndpoint(UsersApiPath.$ID, { id }),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "PATCH",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json();
	}
}

export { UserApi };
