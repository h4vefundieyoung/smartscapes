import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { type APIHandlerOptions } from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import {
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/users.js";

import { AuthController } from "./auth.controller.js";
import { type AuthService } from "./auth.service.js";

describe("AuthController", () => {
	const mockUser: UserSignUpResponseDto = {
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

	it("signUp should create and return new user", async () => {
		const mockSignUp: AuthService["signUp"] = () => {
			return Promise.resolve(mockUser);
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
				data: mockUser,
			},
			status: HTTPCode.CREATED,
		});
	});
});
