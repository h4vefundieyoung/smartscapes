import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { type LineStringGeometry } from "~/libs/types/types.js";

import { UserRouteStatus } from "./libs/enums/enum.js";
import { UserRouteEntity } from "./user-route.entity.js";
import { type UserRouteModel } from "./user-route.model.js";
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
		status: UserRouteStatus.NOT_STARTED,
		userId: 1,
	});

	const mockInsertResult = {
		actualGeometry: mockGeometry,
		completedAt: null,
		id: 1,
		plannedGeometry: mockGeometry,
		routeId: 7,
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

	const mockWhereWrapper = {
		execute: (): Promise<never[]> => Promise.resolve([]),
		patch: (): typeof mockPatchReturningWrapper => mockPatchReturningWrapper,
		returning: (): typeof mockWhereReturning => mockWhereReturning,
		select: (): typeof mockSelectReturning => mockSelectReturning,
	};

	const mockModel = {
		query: (): {
			first: () => Promise<null>;
			insert: () => typeof mockInsertReturningWrapper;
			patch: () => typeof mockPatchReturningWrapper;
			select: () => typeof mockSelectReturning;
			where: () => typeof mockWhereWrapper;
		} => ({
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

	describe("findMany", () => {
		it("should find multiple routes", async () => {
			const result = (await repository.findByFilter(
				{ userId: 1 },
				{ multiple: true },
			)) as UserRouteEntity[];

			assert.strictEqual(Array.isArray(result), true);
			assert.strictEqual(result.length, 1);
			assert.strictEqual(result[0] instanceof UserRouteEntity, true);
			assert.strictEqual(result[0]?.toObject().userId, 1);
		});
	});

	describe("findOne", () => {
		it("should find single route", async () => {
			const result = (await repository.findByFilter({
				routeId: 7,
			})) as UserRouteEntity;

			assert.strictEqual(result instanceof UserRouteEntity, true);
			assert.strictEqual(result.toObject().routeId, 7);
		});
	});
});
