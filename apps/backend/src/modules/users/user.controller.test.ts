import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { UserController } from "./user.controller.js";
import { type UserService } from "./user.service.js";

describe("UserController", () => {
	const mockLogger: Logger = {
		debug: () => {},
		error: () => {},
		info: () => {},
		warn: () => {},
	};

	it("findAll should return all users", async () => {
		const users = [
			{
				email: "test@example.com",
				firstName: "John",
				group: {
					id: 2,
					key: "users",
					name: "Users",
					permissions: [{ id: 1, key: "READ", name: "Can read" }],
				},
				groupId: 2,
				id: 1,
				lastName: "Doe",
			},
		];

		const mockFindAll: UserService["findAll"] = () => {
			return Promise.resolve({ items: users });
		};

		const userService = {
			findAll: mockFindAll,
		} as UserService;

		const userController = new UserController(mockLogger, userService);

		const result = await userController.findAll();

		assert.deepStrictEqual(result, {
			payload: {
				data: users,
			},
			status: HTTPCode.OK,
		});
	});
});
