import knex from "knex";
import { createTracker, MockClient, type Tracker } from "knex-mock-client";
import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";

import { GroupModel } from "../groups/group.model.js";
import { type GroupService } from "../groups/group.service.js";
import { type UserEntity } from "./user.entity.js";
import { UserModel } from "./user.model.js";
import { UserRepository } from "./user.repository.js";

class MockGroupService {
	public create(): never {
		throw new Error("Not implemented");
	}
	public find(): never {
		throw new Error("Not implemented");
	}
	public findAll(): never {
		throw new Error("Not implemented");
	}
	public async findByKey(): Promise<{
		id: number;
		key: string;
		name: string;
		permissions: { id: number; key: string; name: string }[];
	}> {
		await Promise.resolve();

		return {
			id: 2,
			key: "users",
			name: "Users",
			permissions: [{ id: 1, key: "READ", name: "Can read" }],
		};
	}
}

describe("UserRepository", () => {
	let userRepository: UserRepository;
	let databaseTracker: Tracker;

	const mockUser: Parameters<typeof UserEntity.initialize>[0] = {
		email: "test@example.com",
		firstName: "John",
		groupId: 2,
		id: 1,
		lastName: "Doe",
		passwordHash: "hash",
		passwordSalt: "salt",
	};

	beforeEach(() => {
		const database = knex({ client: MockClient });
		databaseTracker = createTracker(database);

		UserModel.knex(database);
		GroupModel.knex(database);

		const mockGroupService = new MockGroupService();

		userRepository = new UserRepository(
			UserModel,
			mockGroupService as unknown as GroupService,
		);

		databaseTracker.on.select("users").response([
			{
				email: "test@example.com",
				firstName: "John",
				group_id: 2,
				groupId: 2,
				["groups.id"]: 2,
				["groups.key"]: "users",
				["groups.name"]: "Users",
				id: 1,
				lastName: "Doe",
			},
		]);
	});

	afterEach(() => {
		databaseTracker.reset();
	});

	it("findAll should return all users", async () => {
		const result = await userRepository.findAll();

		const plainResult = result.map((user) => ({
			email: user.email,
			firstName: user.firstName,
			groupId: user.groupId,
			["groups.id"]: 2,
			["groups.key"]: "users",
			["groups.name"]: "Users",
			id: user.id,
			lastName: user.lastName,
		}));

		assert.deepStrictEqual(plainResult, [
			{
				email: mockUser.email,
				firstName: mockUser.firstName,
				groupId: mockUser.groupId,
				["groups.id"]: 2,
				["groups.key"]: "users",
				["groups.name"]: "Users",
				id: mockUser.id,
				lastName: mockUser.lastName,
			},
		]);
	});
});
