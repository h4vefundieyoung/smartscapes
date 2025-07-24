import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { PointsOfInterestEntity } from "./points-of-interest.entity.js";
import { type PointsOfInterestRepository } from "./points-of-interest.repository.js";
import { PointsOfInterestService } from "./points-of-interest.service.js";

const EXISTING_ID = 1;

describe("PointsOfInterestService", () => {
	const mockPointOfInterest: Parameters<
		typeof PointsOfInterestEntity.initialize
	>[0] = {
		createdAt: "2024-01-01T00:00:00Z",
		id: 1,
		name: "Point Of Interest Test Name",
		updatedAt: "2024-01-01T00:00:00Z",
	};

	const createMockEntity = (): PointsOfInterestEntity =>
		PointsOfInterestEntity.initialize(mockPointOfInterest);

	it("create should return new point of interest", async () => {
		const pointOfInterestEntity =
			PointsOfInterestEntity.initialize(mockPointOfInterest);

		const pointsOfInterestRepository = {
			create: (() =>
				Promise.resolve(
					pointOfInterestEntity,
				)) as PointsOfInterestRepository["create"],
			findByName: (() =>
				Promise.resolve(null)) as PointsOfInterestRepository["findByName"],
		} as PointsOfInterestRepository;

		const pointsOfInterestService = new PointsOfInterestService(
			pointsOfInterestRepository,
		);

		const result = await pointsOfInterestService.create({
			name: mockPointOfInterest.name,
		});

		assert.deepStrictEqual(result, {
			id: mockPointOfInterest.id,
			name: mockPointOfInterest.name,
		});
	});

	it("findAll should return all points of interest", async () => {
		const pointOfInterestEntity = createMockEntity();

		const pointsOfInterestRepository = {
			findAll: () => Promise.resolve([pointOfInterestEntity]),
		} as PointsOfInterestRepository;

		const pointsOfInterestService = new PointsOfInterestService(
			pointsOfInterestRepository,
		);

		const result = await pointsOfInterestService.findAll();

		assert.deepStrictEqual(result, {
			items: [pointOfInterestEntity.toObject()],
		});
	});

	it("find should return point of interest by id", async () => {
		const pointOfInterestEntity = createMockEntity();

		const pointsOfInterestRepository = {
			find: (() =>
				Promise.resolve(
					pointOfInterestEntity,
				)) as PointsOfInterestRepository["find"],
		} as PointsOfInterestRepository;

		const pointsOfInterestService = new PointsOfInterestService(
			pointsOfInterestRepository,
		);

		const result = await pointsOfInterestService.find(EXISTING_ID);

		assert.deepStrictEqual(result, pointOfInterestEntity.toObject());
	});

	it("update should return updated point of interest", async () => {
		const updatedPointOfInterest = {
			...mockPointOfInterest,
			name: "Updated Point Of Interest Test Name",
		};
		const pointOfInterestEntity = PointsOfInterestEntity.initialize(
			updatedPointOfInterest,
		);

		const pointsOfInterestRepository = {
			find: (() =>
				Promise.resolve(
					pointOfInterestEntity,
				)) as PointsOfInterestRepository["find"],
			findByName: (() =>
				Promise.resolve(null)) as PointsOfInterestRepository["findByName"],
			update: (() =>
				Promise.resolve(
					pointOfInterestEntity,
				)) as PointsOfInterestRepository["update"],
		} as PointsOfInterestRepository;

		const pointsOfInterestService = new PointsOfInterestService(
			pointsOfInterestRepository,
		);

		const result = await pointsOfInterestService.update(EXISTING_ID, {
			name: updatedPointOfInterest.name,
		});

		assert.deepStrictEqual(result, pointOfInterestEntity.toObject());
	});

	it("delete should return true when point of interest deleted", async () => {
		const pointOfInterestEntity = createMockEntity();

		const pointsOfInterestRepository = {
			delete: (() =>
				Promise.resolve(true)) as PointsOfInterestRepository["delete"],
			find: (() =>
				Promise.resolve(
					pointOfInterestEntity,
				)) as PointsOfInterestRepository["find"],
		} as PointsOfInterestRepository;

		const pointsOfInterestService = new PointsOfInterestService(
			pointsOfInterestRepository,
		);

		const result = await pointsOfInterestService.delete(EXISTING_ID);

		assert.strictEqual(result, true);
	});
});
