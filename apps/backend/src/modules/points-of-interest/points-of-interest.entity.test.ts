import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { PointsOfInterestEntity } from "./points-of-interest.entity.js";

const TEST_LONGITUDE = 30.5234;
const TEST_LATITUDE = 50.4501;
const TEST_COORDINATES: [number, number] = [TEST_LONGITUDE, TEST_LATITUDE];

describe("PointsOfInterestEntity", () => {
	it("should create new points of interest entity", () => {
		const pointOfInterestData = {
			createdAt: "2024-01-01T00:00:00Z",
			description: "Point Of Interest Test Description",
			id: 1,
			location: {
				coordinates: TEST_COORDINATES,
				type: "Point" as const,
			},
			name: "Point Of Interest Test Name",
			updatedAt: "2024-01-01T00:00:00Z",
		};

		const pointOfInterestEntity =
			PointsOfInterestEntity.initialize(pointOfInterestData);
		const result = pointOfInterestEntity.toObject();

		assert.strictEqual(result.id, pointOfInterestData.id);
		assert.strictEqual(result.name, pointOfInterestData.name);
		assert.strictEqual(result.description, pointOfInterestData.description);
		assert.deepStrictEqual(result.location, pointOfInterestData.location);
	});

	it("should initialize new points of interest without id", () => {
		const pointOfInterestData = {
			description: "Point Of Interest Test Description",
			location: {
				coordinates: TEST_COORDINATES,
				type: "Point" as const,
			},
			name: "Point Of Interest Test Name",
		};

		const pointOfInterestEntity =
			PointsOfInterestEntity.initializeNew(pointOfInterestData);
		const result = pointOfInterestEntity.toNewObject();

		assert.strictEqual(result.name, pointOfInterestData.name);
		assert.strictEqual(result.description, pointOfInterestData.description);
		assert.deepStrictEqual(result.location, pointOfInterestData.location);
	});

	it("should return only id, name, and createdAt without location and description", () => {
		const entity = PointsOfInterestEntity.initializeSummary({
			createdAt: "2025-08-14T00:00:00Z",
			id: 1,
			name: "Point 1",
		});

		const result = entity.toSummaryObject();

		assert.deepStrictEqual(result, {
			createdAt: "2025-08-14T00:00:00Z",
			id: 1,
			name: "Point 1",
		});

		const keys = Object.keys(result);
		assert.strictEqual(keys.includes("location"), false);
		assert.strictEqual(keys.includes("description"), false);
	});
});
