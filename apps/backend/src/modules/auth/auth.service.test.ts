import {
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "@smartscapes/shared";
import assert from "node:assert/strict";
import { describe, it, mock } from "node:test";

import { type BaseToken } from "~/libs/modules/token/token.js";
import { type UserService } from "~/modules/users/users.js";

import { AuthService } from "./auth.service.js";

describe("AuthService", () => {
	const mockToken = "mock token";

	const signUpRequestDto: UserSignUpRequestDto = {
		email: "test@example.com",
		firstName: "John",
		lastName: "Doe",
		password: "Password123!",
	};

	it("signUp should create new user", async () => {
		const mockResponse: UserSignUpResponseDto = {
			email: signUpRequestDto.email,
			firstName: signUpRequestDto.firstName,
			id: 1,
			lastName: signUpRequestDto.lastName,
		};

		const mockTokenCreate = mock.fn<BaseToken["create"]>(() =>
			Promise.resolve(mockToken),
		);
		const mockUserCreate = mock.fn<UserService["create"]>(() =>
			Promise.resolve(mockResponse),
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

		assert.deepStrictEqual(result, mockResponse);
		assert.deepStrictEqual(userCreateArgument, signUpRequestDto);
	});
});
