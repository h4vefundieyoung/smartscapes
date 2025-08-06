import knex from "knex";
import { createTracker, MockClient, type Tracker } from "knex-mock-client";
import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";

import { GroupModel } from "../groups/group.model.js";
import { type GroupService } from "../groups/group.service.js";
import { UserEntity } from "./user.entity.js";
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

		databaseTracker.on.select("groups").response([{ id: 2 }]);

		const userEntitiesWithGroup = [
			{
				...UserEntity.initialize(mockUser).toObject(),
				group: {
					id: 2,
					key: "users",
					name: "Users",
					permissions: [{ id: 1, key: "READ", name: "Can read" }],
				},
			},
		];
		/* eslint-disable sonarjs/no-nested-functions */

		// @ts-expect-error TS2322 QueryBuilderType<M>
		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		UserModel.query = () => ({
			// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
			withGraphJoined: () => ({
				// eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/explicit-function-return-type
				execute: async () => userEntitiesWithGroup,
			}),
		});
	});

	afterEach(() => {
		databaseTracker.reset();
	});

	it("findAll should return all users", async () => {
		const result = await userRepository.findAll();

		assert.deepStrictEqual(result, [
			{
				email: mockUser.email,
				firstName: mockUser.firstName,
				group: {
					id: 2,
					key: "users",
					name: "Users",
					permissions: [{ id: 1, key: "READ", name: "Can read" }],
				},
				groupId: mockUser.groupId,
				id: mockUser.id,
				lastName: mockUser.lastName,
			},
		]);
	});
});
