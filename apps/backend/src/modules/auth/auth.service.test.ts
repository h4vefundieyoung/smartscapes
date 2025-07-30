import assert from "node:assert/strict";
import { describe, it, mock } from "node:test";

import { type BaseEncryption } from "~/libs/modules/encryption/libs/base-encryption.module.js";
import { type BaseToken } from "~/libs/modules/token/token.js";
import { AuthService } from "~/modules/auth/auth.service.js";
import {
	type UserEntity,
	type UserGetByIdItemResponseDto,
	type UserService,
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/users.js";

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
				email: mockUserServiceResponse.email,
				id: mockUserServiceResponse.id,
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

		const mockEncryptionService = {
			compare: mock.fn(() => Promise.resolve(true)),
			encrypt: mock.fn(() => Promise.resolve("encryptedValue")),
			hash: mock.fn(() => Promise.resolve("hashedPassword")),
		} as unknown as BaseEncryption;

		const authService = new AuthService({
			encryptionService: mockEncryptionService,
			tokenService: mockTokenService,
			userService: mockUserService,
		});

		const result = await authService.signUp(signUpRequestDto);

		const [userCreateCall] = mockUserCreate.mock.calls;
		const [userCreateArgument] = userCreateCall?.arguments ?? [];

		assert.deepStrictEqual(result, mockSignUpResponse);
		assert.deepStrictEqual(userCreateArgument, signUpRequestDto);
	});

	it("signIn should return token and user data when credentials are valid", async () => {
		const mockToken = "mock token";

		const userId = 1;

		const signInRequestDto: UserSignInRequestDto = {
			email: "test@example.com",
			password: "Password123!",
		};

		const mockUser = {
			getId: () => userId,
			getPasswordHash: () => "hashedPassword",
			toObject: () => ({
				email: "test@example.com",
				firstName: "John",
				id: 1,
				lastName: "Doe",
			}),
		} as unknown as UserEntity;

		const expectedSignInResponse: UserSignInResponseDto = {
			token: mockToken,
			user: mockUser.toObject(),
		};

		const mockTokenCreate = mock.fn<BaseToken["create"]>(() =>
			Promise.resolve(mockToken),
		);

		const mockFindEntityByEmail = mock.fn<UserService["findEntityByEmail"]>(
			() => Promise.resolve(mockUser),
		);

		const mockTokenService = {
			create: mockTokenCreate as BaseToken["create"],
		} as BaseToken;

		const mockUserService = {
			findEntityByEmail:
				mockFindEntityByEmail as UserService["findEntityByEmail"],
		} as UserService;

		const mockEncryptionService = {
			compare: mock.fn(() => Promise.resolve(true)),
		} as unknown as BaseEncryption;

		const authService = new AuthService({
			encryptionService: mockEncryptionService,
			tokenService: mockTokenService,
			userService: mockUserService,
		});

		const result = await authService.signIn(signInRequestDto);

		assert.deepStrictEqual(result, expectedSignInResponse);
	});
});
