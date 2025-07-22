import {
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "@smartscapes/shared";
import assert from "node:assert/strict";
import { describe, it, mock } from "node:test";

import { type UserService } from "~/modules/users/users.js";

import { AuthService } from "./auth.service.js";

describe("AuthService", () => {
	const signUpRequestDto: UserSignUpRequestDto = {
		email: "test@example.com",
		firstName: "Test",
		lastName: "User",
		password: "Password123!",
	};

	it("signUp should create new user", async () => {
		const mockResponse: UserSignUpResponseDto = {
			email: signUpRequestDto.email,
			id: 1,
		};

		const mockUserCreate = mock.fn<UserService["create"]>(() =>
			Promise.resolve(mockResponse),
		);

		const mockUserService = {
			create: mockUserCreate as UserService["create"],
		} as UserService;

		const authService = new AuthService(mockUserService);

		const result = await authService.signUp(signUpRequestDto);

		const [userCreateCall] = mockUserCreate.mock.calls;
		const [userCreateArgument] = userCreateCall?.arguments ?? [];

		assert.deepStrictEqual(result, mockResponse);
		assert.deepStrictEqual(userCreateArgument, signUpRequestDto);
	});
});
