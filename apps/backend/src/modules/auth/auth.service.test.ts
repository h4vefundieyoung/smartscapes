import assert from "node:assert/strict";
import { describe, it, mock } from "node:test";

import { type BaseToken } from "~/libs/modules/token/token.js";
import {
	type UserGetByIdItemResponseDto,
	type UserService,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/users.js";

import { AuthService } from "./auth.service.js";

describe("AuthService", () => {
	const signUpRequestDto: UserSignUpRequestDto = {
		confirmPassword: "Password123!",
		email: "test@example.com",
		firstName: "John",
		lastName: "Doe",
		password: "Password123!",
	};

	it("signUp should create new user", async () => {
		const mockToken = "mock token";

		const mockUserServiceResponse: UserGetByIdItemResponseDto = {
			email: signUpRequestDto.email,
			firstName: signUpRequestDto.firstName,
			id: 1,
			lastName: signUpRequestDto.lastName,
		};

		const mockSignUpResponse: UserSignUpResponseDto = {
			token: mockToken,
			user: {
				...mockUserServiceResponse,
			},
		};

		const mockTokenCreate = mock.fn<BaseToken["create"]>(() =>
			Promise.resolve(mockToken),
		);
		const mockUserCreate = mock.fn<UserService["create"]>(() =>
			Promise.resolve(mockUserServiceResponse),
		);

		const mockFindByEmail = mock.fn<UserService["findByEmail"]>(() =>
			Promise.resolve(null),
		);

		const mockTokenService = {
			create: mockTokenCreate as BaseToken["create"],
		} as BaseToken;
		const mockUserService = {
			create: mockUserCreate as UserService["create"],
			findByEmail: mockFindByEmail as UserService["findByEmail"],
		} as UserService;

		const authService = new AuthService({
			tokenService: mockTokenService,
			userService: mockUserService,
		});

		const result = await authService.signUp(signUpRequestDto);

		const [userCreateCall] = mockUserCreate.mock.calls;
		const [userCreateArgument] = userCreateCall?.arguments ?? [];

		assert.deepStrictEqual(result, mockSignUpResponse);
		assert.deepStrictEqual(userCreateArgument, signUpRequestDto);
	});
});
