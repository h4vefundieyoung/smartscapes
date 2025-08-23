import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { PointsOfInterestEntity } from "./points-of-interest.entity.js";
import { type PointsOfInterestRepository } from "./points-of-interest.repository.js";
import { PointsOfInterestService } from "./points-of-interest.service.js";

const EXISTING_ID = 1;

const TEST_LONGITUDE = 30.5234;
const TEST_LATITUDE = 50.4501;
const TEST_COORDINATES: [number, number] = [TEST_LONGITUDE, TEST_LATITUDE];

describe("PointsOfInterestService", () => {
	const mockPointOfInterest: Parameters<
		typeof PointsOfInterestEntity.initialize
	>[0] = {
		createdAt: "2024-01-01T00:00:00Z",
		description: "Point Of Interest Test Description",
		id: 1,
		location: {
			coordinates: TEST_COORDINATES,
			type: "Point" as const,
		},
		name: "Point Of Interest Test Name",
		routes: [],
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
			description: mockPointOfInterest.description,
			location: mockPointOfInterest.location,
			name: mockPointOfInterest.name,
		});

		assert.deepStrictEqual(result, pointOfInterestEntity.toObject());
	});

	it("findAll should return all points of interest", async () => {
		const pointOfInterestEntity = createMockEntity();

		const pointsOfInterestRepository = {
			findAll: () => Promise.resolve([pointOfInterestEntity]),
		} as unknown as PointsOfInterestRepository;

		const pointsOfInterestService = new PointsOfInterestService(
			pointsOfInterestRepository,
		);

		const result = await pointsOfInterestService.findAll(null);

		assert.deepStrictEqual(result, {
			items: [pointOfInterestEntity.toObject()],
		});
	});

	it("findAll should return nearby points of interest when location provided", async () => {
		const pointOfInterestEntity = createMockEntity();

		const pointsOfInterestRepository = {
			findNearby: (() =>
				Promise.resolve([
					pointOfInterestEntity,
				])) as PointsOfInterestRepository["findNearby"],
		} as PointsOfInterestRepository;

		const pointsOfInterestService = new PointsOfInterestService(
			pointsOfInterestRepository,
		);

		const result = await pointsOfInterestService.findAll({
			latitude: TEST_LATITUDE,
			longitude: TEST_LONGITUDE,
			radius: 5,
		});

		assert.deepStrictEqual(result, {
			items: [pointOfInterestEntity.toObject()],
		});
	});

	it("findAll should use default radius when radius not provided", async () => {
		const pointOfInterestEntity = createMockEntity();

		const pointsOfInterestRepository = {
			findNearby: (() =>
				Promise.resolve([
					pointOfInterestEntity,
				])) as PointsOfInterestRepository["findNearby"],
		} as PointsOfInterestRepository;

		const pointsOfInterestService = new PointsOfInterestService(
			pointsOfInterestRepository,
		);

		const result = await pointsOfInterestService.findAll({
			latitude: TEST_LATITUDE,
			longitude: TEST_LONGITUDE,
		});

		assert.deepStrictEqual(result, {
			items: [pointOfInterestEntity.toObject()],
		});
	});

	it("findById should return point of interest by id", async () => {
		const pointOfInterestEntity = createMockEntity();

		const pointsOfInterestRepository = {
			findById: (() =>
				Promise.resolve(
					pointOfInterestEntity,
				)) as PointsOfInterestRepository["findById"],
		} as PointsOfInterestRepository;

		const pointsOfInterestService = new PointsOfInterestService(
			pointsOfInterestRepository,
		);

		const result = await pointsOfInterestService.findById(EXISTING_ID);

		assert.deepStrictEqual(result, pointOfInterestEntity.toDetailsObject());
	});

	it("patch should return updated point of interest", async () => {
		const updatedPointOfInterest = {
			...mockPointOfInterest,
			name: "Updated Point Of Interest Test Name",
		};
		const pointOfInterestEntity = PointsOfInterestEntity.initialize(
			updatedPointOfInterest,
		);

		const pointsOfInterestRepository = {
			findById: (() =>
				Promise.resolve(
					pointOfInterestEntity,
				)) as PointsOfInterestRepository["findById"],
			findByName: (() =>
				Promise.resolve(null)) as PointsOfInterestRepository["findByName"],
			patch: (() =>
				Promise.resolve(
					pointOfInterestEntity,
				)) as PointsOfInterestRepository["patch"],
		} as PointsOfInterestRepository;

		const pointsOfInterestService = new PointsOfInterestService(
			pointsOfInterestRepository,
		);

		const result = await pointsOfInterestService.patch(EXISTING_ID, {
			description: updatedPointOfInterest.description,
			location: updatedPointOfInterest.location,
			name: updatedPointOfInterest.name,
		});

		assert.deepStrictEqual(result, pointOfInterestEntity.toObject());
	});

	it("delete should return true when point of interest deleted", async () => {
		const pointOfInterestEntity = createMockEntity();

		const pointsOfInterestRepository = {
			delete: (() =>
				Promise.resolve(true)) as PointsOfInterestRepository["delete"],
			findById: (() =>
				Promise.resolve(
					pointOfInterestEntity,
				)) as PointsOfInterestRepository["findById"],
		} as PointsOfInterestRepository;

		const pointsOfInterestService = new PointsOfInterestService(
			pointsOfInterestRepository,
		);

		const result = await pointsOfInterestService.delete(EXISTING_ID);

		assert.strictEqual(result, true);
	});

	it("findPaginated should return paginated points of interest", async () => {
		const mockEntities = [
			PointsOfInterestEntity.initialize({
				createdAt: "2025-08-14T00:00:00Z",
				description: "Point Of Interest Test Description 1",
				id: 1,
				location: {
					coordinates: TEST_COORDINATES,
					type: "Point" as const,
				},
				name: "Point 1",
				routes: [],
				updatedAt: "2025-08-14T00:00:00Z",
			}),
			PointsOfInterestEntity.initialize({
				createdAt: "2025-08-15T00:00:00Z",
				description: "Point Of Interest Test Description 2",
				id: 2,
				location: {
					coordinates: TEST_COORDINATES,
					type: "Point" as const,
				},
				name: "Point 2",
				routes: [],
				updatedAt: "2025-08-15T00:00:00Z",
			}),
			PointsOfInterestEntity.initialize({
				createdAt: "2025-08-16T00:00:00Z",
				description: "Point Of Interest Test Description 3",
				id: 3,
				location: {
					coordinates: TEST_COORDINATES,
					type: "Point" as const,
				},
				name: "Point 3",
				routes: [],
				updatedAt: "2025-08-16T00:00:00Z",
			}),
		];

		const mockTotal = mockEntities.length;
		const totalPages = Math.ceil(mockTotal / 10);

		const pointsOfInterestRepository = {
			findPaginated: (() =>
				Promise.resolve({
					items: mockEntities,
					total: mockTotal,
				})) as PointsOfInterestRepository["findPaginated"],
		} as PointsOfInterestRepository;

		const pointsOfInterestService = new PointsOfInterestService(
			pointsOfInterestRepository,
		);

		const result = await pointsOfInterestService.findPaginated({
			page: 1,
			perPage: 10,
			search: "",
		});

		const expectedData = mockEntities.map((item) => item.toSummaryObject());
		assert.deepStrictEqual(result.data, expectedData);

		assert.deepStrictEqual(result.meta, {
			currentPage: 1,
			itemsPerPage: 10,
			total: mockTotal,
			totalPages,
		});
	});
});
