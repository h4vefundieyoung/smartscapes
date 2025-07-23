import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { UserEntity } from "./user.entity.js";
import { type UserRepository } from "./user.repository.js";
import { UserService } from "./user.service.js";

describe("UserService", () => {
	const mockUser: Parameters<typeof UserEntity.initialize>[0] = {
		email: "test@example.com",
		id: 1,
		passwordHash: "hash",
		passwordSalt: "salt",
	};

	it("create should return new user", async () => {
		const userEntity = UserEntity.initialize(mockUser);

		const userRepository = {
			create: (() => Promise.resolve(userEntity)) as UserRepository["create"],
		} as UserRepository;

		const userService = new UserService(userRepository);

		const result = await userService.create({
			email: mockUser.email,
			password: "Password",
		});

		assert.deepStrictEqual(result, {
			email: mockUser.email,
			id: mockUser.id,
		});
	});

	it("findAll should return all users", async () => {
		const userEntity = UserEntity.initialize(mockUser);

		const userRepository = {
			findAll: () => Promise.resolve([userEntity]),
		} as UserRepository;

		const userService = new UserService(userRepository);

		const result = await userService.findAll();

		assert.deepStrictEqual(result, {
			items: [userEntity.toObject()],
		});
	});
});
