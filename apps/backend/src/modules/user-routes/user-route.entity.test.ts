import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { UserRouteStatus } from "./libs/enums/enum.js";
import { UserRouteEntity } from "./user-route.entity.js";

describe("UserRouteEntity", () => {
	const mockGeometry = {
		coordinates: [
			[30.528_909, 50.455_232] as [number, number],
			[30.528_209, 50.415_232] as [number, number],
		],
		type: "LineString" as const,
	};

	const mockData = {
		actualGeometry: mockGeometry,
		completedAt: null,
		distance: 1000,
		id: 1,
		plannedGeometry: mockGeometry,
		routeId: 7,
		routeName: "Landscape alley",
		startedAt: null,
		status: UserRouteStatus.NOT_STARTED,
		userId: 1,
	};

	describe("initialize", () => {
		it("should initialize entity with provided data", () => {
			const entity = UserRouteEntity.initialize(mockData);

			const result = entity.toObject();

			assert.strictEqual(result.id, mockData.id);
			assert.strictEqual(result.routeId, mockData.routeId);
			assert.strictEqual(result.userId, mockData.userId);
			assert.strictEqual(result.status, mockData.status);
			assert.strictEqual(result.startedAt, mockData.startedAt);
			assert.strictEqual(result.completedAt, mockData.completedAt);
			assert.deepStrictEqual(result.actualGeometry, mockData.actualGeometry);
			assert.deepStrictEqual(result.plannedGeometry, mockData.plannedGeometry);
		});
	});

	describe("initializeNew", () => {
		it("should initialize new entity with null id and timestamps", () => {
			const newData = {
				actualGeometry: mockGeometry,
				distance: 1000,
				plannedGeometry: mockGeometry,
				routeId: 7,
				routeName: "Landscape alley",
				status: UserRouteStatus.NOT_STARTED,
				userId: 1,
			};

			const entity = UserRouteEntity.initializeNew(newData);

			const result = entity.toObject();

			assert.strictEqual(result.id, null);
			assert.strictEqual(result.routeId, newData.routeId);
			assert.strictEqual(result.userId, newData.userId);
			assert.strictEqual(result.status, newData.status);
			assert.strictEqual(result.startedAt, null);
			assert.strictEqual(result.completedAt, null);
			assert.deepStrictEqual(result.actualGeometry, newData.actualGeometry);
			assert.deepStrictEqual(result.plannedGeometry, newData.plannedGeometry);
		});
	});

	describe("toObject", () => {
		it("should return object with all properties", () => {
			const entity = UserRouteEntity.initialize(mockData);

			const result = entity.toObject();

			assert.strictEqual(typeof result.id, "number");
			assert.strictEqual(typeof result.routeId, "number");
			assert.strictEqual(typeof result.userId, "number");
			assert.strictEqual(typeof result.status, "string");
			assert.strictEqual(typeof result.startedAt, "object");
			assert.strictEqual(typeof result.completedAt, "object");
			assert.strictEqual(typeof result.actualGeometry, "object");
			assert.strictEqual(typeof result.plannedGeometry, "object");
		});
	});

	describe("toNewObject", () => {
		it("should return object without id", () => {
			const entity = UserRouteEntity.initialize(mockData);

			const result = entity.toNewObject();

			assert.strictEqual("id" in result, false);
			assert.strictEqual("startedAt" in result, true);
			assert.strictEqual("completedAt" in result, true);
			assert.strictEqual(typeof result.routeId, "number");
			assert.strictEqual(typeof result.userId, "number");
			assert.strictEqual(typeof result.status, "string");
			assert.strictEqual(typeof result.actualGeometry, "object");
			assert.strictEqual(typeof result.plannedGeometry, "object");
		});
	});
});
