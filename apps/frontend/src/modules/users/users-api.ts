import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type APIResponse } from "~/libs/types/types.js";

import { UserFollowsApiPath, UsersApiPath } from "./libs/enums/enums.js";
import {
	type UserFollowsRequestDto,
	type UserGetByIdItemResponseDto,
	type UserPublicProfileResponseDto,
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

	public async follow(
		id: number,
		followingId: number,
	): Promise<APIResponse<boolean>> {
		const response = await this.load<APIResponse<boolean>>(
			this.getFullEndpoint(UserFollowsApiPath.$USER_ID_FOLLOWERS, {
				userId: id.toString(),
			}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "POST",
				payload: JSON.stringify({ followingId } as UserFollowsRequestDto),
			},
		);

		return await response.json();
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

	public async getProfile(
		id: number,
	): Promise<APIResponse<UserPublicProfileResponseDto>> {
		const response = await this.load<APIResponse<UserPublicProfileResponseDto>>(
			this.getFullEndpoint(UsersApiPath.$ID, {
				id: id.toString(),
			}),
			{
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json();
	}

	public async unfollow(
		id: number,
		currentUserId: number,
	): Promise<APIResponse<boolean>> {
		const response = await this.load<APIResponse<boolean>>(
			this.getFullEndpoint(UserFollowsApiPath.$USER_ID_FOLLOWERS_$ID, {
				id: id.toString(),
				userId: currentUserId.toString(),
			}),
			{
				hasAuth: true,
				method: "DELETE",
			},
		);

		return await response.json();
	}
}

export { UserApi };
