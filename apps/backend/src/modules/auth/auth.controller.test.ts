import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { type APIHandlerOptions } from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import {
	type UserGetByIdItemResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/users.js";

import { AuthController } from "./auth.controller.js";
import { type AuthService } from "./auth.service.js";

describe("AuthController", () => {
	const mockToken = "mock token";

	const mockUser: UserGetByIdItemResponseDto = {
		email: "test@example.com",
		firstName: "John",
		id: 1,
		lastName: "Doe",
	};

	const mockLogger: Logger = {
		debug: () => {},
		error: () => {},
		info: () => {},
		warn: () => {},
	};

	it("signUp should create and return token and new user", async () => {
		const mockResponseData: UserSignUpResponseDto = {
			token: mockToken,
			user: {
				email: mockUser.email,
				id: mockUser.id,
			},
		};

		const mockSignUp: AuthService["signUp"] = () => {
			return Promise.resolve(mockResponseData);
		};

		const authService = {
			signUp: mockSignUp,
		} as AuthService;

		const authController = new AuthController(mockLogger, authService);

		const signUpOptions = {
			body: {
				email: mockUser.email,
				firstName: mockUser.firstName,
				lastName: mockUser.lastName,
				password: "Password123!",
			},
		} as APIHandlerOptions<{ body: UserSignUpRequestDto }>;

		const result = await authController.signUp(signUpOptions);

		assert.deepStrictEqual(result, {
			payload: {
				data: {
					token: mockToken,
					user: {
						email: mockUser.email,
						id: mockUser.id,
					},
				},
			},
			status: HTTPCode.CREATED,
		});
	});
});
