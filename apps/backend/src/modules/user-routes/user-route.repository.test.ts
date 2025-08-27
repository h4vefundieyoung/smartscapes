import knex from "knex";
import { createTracker, MockClient, type Tracker } from "knex-mock-client";
import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";

import { type LineStringGeometry } from "~/libs/types/types.js";

import { UserRouteStatus } from "./libs/enums/enum.js";
import { UserRouteEntity } from "./user-route.entity.js";
import { UserRouteModel } from "./user-route.model.js";
import { UserRouteRepository } from "./user-route.repository.js";

describe("UserRouteRepository", () => {
	const mockGeometry = {
		coordinates: [
			[30.528_909, 50.455_232],
			[30.528_209, 50.415_232],
		],
		type: "LineString" as const,
	};

	const mockEntity = UserRouteEntity.initializeNew({
		actualGeometry: mockGeometry as LineStringGeometry,
		plannedGeometry: mockGeometry as LineStringGeometry,
		routeId: 7,
		routeName: "Park",
		status: UserRouteStatus.NOT_STARTED,
		userId: 1,
	});

	const mockInsertResult = {
		actualGeometry: mockGeometry,
		completedAt: null,
		id: 1,
		plannedGeometry: mockGeometry,
		routeId: 7,
		routeName: "Park",
		startedAt: null,
		status: UserRouteStatus.NOT_STARTED,
		userId: 1,
	};

	const mockPatchResult = [
		{
			actualGeometry: mockGeometry,
			completedAt: null,
			id: 1,
			plannedGeometry: mockGeometry,
			routeId: 7,
			startedAt: "2025-08-21T16:37:51.437Z",
			status: UserRouteStatus.ACTIVE,
			userId: 1,
		},
	];

	const mockWhereResult = [
		{
			actualGeometry: mockGeometry,
			completedAt: null,
			id: 1,
			plannedGeometry: mockGeometry,
			routeId: 7,
			startedAt: null,
			status: UserRouteStatus.NOT_STARTED,
			userId: 1,
		},
	];

	const mockInsertReturning = {
		execute: (): Promise<typeof mockInsertResult> =>
			Promise.resolve(mockInsertResult),
	};

	const mockPatchReturning = {
		execute: (): Promise<typeof mockPatchResult> =>
			Promise.resolve(mockPatchResult),
	};

	const mockWhereReturning = {
		execute: (): Promise<typeof mockWhereResult> =>
			Promise.resolve(mockWhereResult),
	};

	const mockInsertReturningWrapper = {
		returning: (): typeof mockInsertReturning => mockInsertReturning,
	};

	const mockPatchReturningWrapper = {
		returning: (): typeof mockPatchReturning => mockPatchReturning,
	};

	const mockSelectReturning = {
		execute: (): Promise<typeof mockWhereResult> =>
			Promise.resolve(mockWhereResult),
	};

	const mockWithGraphJoinedWrapper = {
		execute: (): Promise<typeof mockWhereResult> =>
			Promise.resolve(mockWhereResult),
		select: (): typeof mockSelectReturning => mockSelectReturning,
	};

	const mockWhereWrapper = {
		execute: (): Promise<never[]> => Promise.resolve([]),
		patch: (): typeof mockPatchReturningWrapper => mockPatchReturningWrapper,
		returning: (): typeof mockWhereReturning => mockWhereReturning,
		select: (): typeof mockSelectReturning => mockSelectReturning,
		withGraphJoined: (): typeof mockWithGraphJoinedWrapper =>
			mockWithGraphJoinedWrapper,
	};

	const mockModel = {
		query: () => ({
			first: (): Promise<null> => Promise.resolve(null),
			insert: (): typeof mockInsertReturningWrapper =>
				mockInsertReturningWrapper,
			patch: (): typeof mockPatchReturningWrapper => mockPatchReturningWrapper,
			select: (): typeof mockSelectReturning => mockSelectReturning,
			where: (): typeof mockWhereWrapper => mockWhereWrapper,
		}),
		raw: (query: string): string => query,
	} as unknown as typeof UserRouteModel;

	const repository = new UserRouteRepository(mockModel);

	describe("create", () => {
		it("should create new user route", async () => {
			const result = await repository.create(mockEntity);

			assert.strictEqual(result instanceof UserRouteEntity, true);
			assert.strictEqual(result.toObject().routeId, mockInsertResult.routeId);
			assert.strictEqual(result.toObject().userId, mockInsertResult.userId);
			assert.strictEqual(result.toObject().status, mockInsertResult.status);
		});
	});

	describe("findByFilter", () => {
		it("should find multiple routes", async () => {
			const result = await repository.findByFilter({ userId: 1 });

			assert.strictEqual(Array.isArray(result), true);
			assert.strictEqual(result.length, 1);
			assert.strictEqual(result[0] instanceof UserRouteEntity, true);
			assert.strictEqual(result[0]?.toObject().userId, 1);
		});
	});

	describe("findByFilter single", () => {
		it("should find single route", async () => {
			const result = await repository.findByFilter({ routeId: 7 });

			assert.strictEqual(result.length, 1);
			assert.strictEqual(result[0] instanceof UserRouteEntity, true);
			assert.strictEqual(result[0]?.toObject().routeId, 7);
		});
	});

	describe("delete", () => {
		const DATABASE = "user_routes";
		const DELETED_COUNT = 5;
		const EXISTING_ID = 1;
		const NON_EXISTING_ID = 9;
		const NON_DELETED_COUNT = 0;
		const USER_ID = 1;
		let databaseTracker: Tracker;
		let userRoutesRepository: UserRouteRepository;

		beforeEach(() => {
			const database = knex({ client: MockClient });

			databaseTracker = createTracker(database);

			UserRouteModel.knex(database);

			userRoutesRepository = new UserRouteRepository(UserRouteModel);
		});

		afterEach(() => {
			databaseTracker.reset();
		});
		it("delete should return true when route deleted", async () => {
			databaseTracker.on.delete(DATABASE).response(DELETED_COUNT);

			databaseTracker.on.delete(DATABASE).response(DELETED_COUNT);

			const result = await userRoutesRepository.deleteSavedRoute(
				EXISTING_ID,
				USER_ID,
			);

			assert.strictEqual(result, true);
		});

		it("delete should return false when route not found", async () => {
			databaseTracker.on.delete(DATABASE).response(NON_DELETED_COUNT);

			const result = await userRoutesRepository.deleteSavedRoute(
				NON_EXISTING_ID,
				NON_EXISTING_ID,
			);

			assert.strictEqual(result, false);
		});
	});
});
