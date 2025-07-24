import {
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "@smartscapes/shared";
import assert from "node:assert/strict";
import { describe, it, mock } from "node:test";

import { type BaseEncryption } from "~/libs/modules/encryption/libs/base-encription.module.js";
import { AuthService } from "~/modules/auth/auth.service.js";
import { MockUserRepository } from "~/modules/users/mock.user.repository.js";
import { type UserModel } from "~/modules/users/user.model.js";
import { type UserService } from "~/modules/users/users.js";

describe("AuthService", () => {
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

		const mockUserCreate = mock.fn<UserService["create"]>(() =>
			Promise.resolve(mockResponse),
		);

		const mockFindByEmail = mock.fn<UserService["findByEmail"]>(() =>
			Promise.resolve(null),
		);

		const mockUserService = {
			create: mockUserCreate as UserService["create"],
			findByEmail: mockFindByEmail as UserService["findByEmail"],
		} as UserService;

		const mockEncryptionService = {
			compare: mock.fn(() => Promise.resolve(true)),
			encrypt: mock.fn(() => Promise.resolve("encryptedValue")),
			hash: mock.fn(() => Promise.resolve("hashedPassword")),
		} as unknown as BaseEncryption;

		const mockUserModel = {} as typeof UserModel;
		const mockUserRepository = new MockUserRepository(mockUserModel);

		const authService = new AuthService(
			mockUserService,
			mockEncryptionService,
			mockUserRepository,
		);

		const result = await authService.signUp(signUpRequestDto);

		const [userCreateCall] = mockUserCreate.mock.calls;
		const [userCreateArgument] = userCreateCall?.arguments ?? [];

		assert.deepStrictEqual(result, mockResponse);
		assert.deepStrictEqual(userCreateArgument, signUpRequestDto);
	});
});
