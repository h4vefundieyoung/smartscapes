import { APIPath, ContentType } from "~/libs/enums/enums.js";
import { BaseHTTPApi } from "~/libs/modules/api/api.js";
import { type HTTP } from "~/libs/modules/http/http.js";
import { type Storage } from "~/libs/modules/storage/storage.js";
import { type APIResponse } from "~/libs/types/types.js";

import { AuthApiPath } from "./libs/enums/enums.js";
import {
	type UserAuthResponseDto,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "./libs/types/types.js";

type Constructor = {
	baseUrl: string;
	http: HTTP;
	storage: Storage;
};

class AuthApi extends BaseHTTPApi {
	private _storage: Storage;

	public constructor({ baseUrl, http, storage }: Constructor) {
		super({ baseUrl, http, path: APIPath.AUTH, storage });
		this._storage = storage;
	}
	public async getAuthenticatedUser(): Promise<
		APIResponse<UserAuthResponseDto>
	> {
		const response = await this.load<APIResponse<UserAuthResponseDto>>(
			this.getFullEndpoint(AuthApiPath.AUTH_USER, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: true,
				method: "GET",
			},
		);

		return await response.json();
	}

	public async logout(): Promise<void> {
		await this.load(this.getFullEndpoint(AuthApiPath.LOGOUT, {}), {
			contentType: ContentType.JSON,
			hasAuth: true,
			method: "POST",
			payload: JSON.stringify({}),
		});
	}

	public async signIn(
		payload: UserSignInRequestDto,
	): Promise<APIResponse<UserSignInResponseDto>> {
		const response = await this.load<APIResponse<UserSignInResponseDto>>(
			this.getFullEndpoint(AuthApiPath.SIGN_IN, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json();
	}

	public async signUp(
		payload: UserSignUpRequestDto,
	): Promise<APIResponse<UserSignUpResponseDto>> {
		const response = await this.load<APIResponse<UserSignUpResponseDto>>(
			this.getFullEndpoint(AuthApiPath.SIGN_UP, {}),
			{
				contentType: ContentType.JSON,
				hasAuth: false,
				method: "POST",
				payload: JSON.stringify(payload),
			},
		);

		return await response.json();
	}
}

export { AuthApi };
