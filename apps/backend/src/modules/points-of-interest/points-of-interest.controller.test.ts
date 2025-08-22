import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { type PointsOfInterestQueryRequest } from "./libs/types/type.js";
import { PointsOfInterestController } from "./points-of-interest.controller.js";
import { type PointsOfInterestService } from "./points-of-interest.service.js";

const mockDelete: PointsOfInterestService["delete"] = () => {
	return Promise.resolve(true);
};

const TEST_LONGITUDE = 30.5234;
const TEST_LATITUDE = 50.4501;
const TEST_COORDINATES: [number, number] = [TEST_LONGITUDE, TEST_LATITUDE];

describe("PointsOfInterestController", () => {
	const mockLogger: Logger = {
		debug: () => {},
		error: () => {},
		info: () => {},
		warn: () => {},
	};

	const mockPointOfInterest = {
		description: "Point Of Interest Test Description",
		id: 1,
		location: {
			coordinates: TEST_COORDINATES,
			type: "Point" as const,
		},
		name: "Point Of Interest Test Name",
	};

	it("findAll should return all points of interest", async () => {
		const pointsOfInterest = [mockPointOfInterest];

		const mockFindAll: PointsOfInterestService["findAll"] = () => {
			return Promise.resolve({ items: pointsOfInterest });
		};

		const pointsOfInterestService = {
			findAll: mockFindAll,
		} as PointsOfInterestService;

		const pointsOfInterestController = new PointsOfInterestController(
			mockLogger,
			pointsOfInterestService,
		);

		const result = await pointsOfInterestController.findAll({
			body: {},
			params: {},
			query: undefined,
			user: null,
		});

		assert.deepStrictEqual(result, {
			payload: {
				data: pointsOfInterest,
			},
			status: HTTPCode.OK,
		});
	});

	it("create should return created point of interest", async () => {
		const mockCreate: PointsOfInterestService["create"] = () => {
			return Promise.resolve(mockPointOfInterest);
		};

		const pointsOfInterestService = {
			create: mockCreate,
		} as PointsOfInterestService;

		const pointsOfInterestController = new PointsOfInterestController(
			mockLogger,
			pointsOfInterestService,
		);

		const result = await pointsOfInterestController.create({
			body: {
				description: mockPointOfInterest.description,
				location: mockPointOfInterest.location,
				name: mockPointOfInterest.name,
			},
			params: {},
			query: {},
			user: null,
		});

		assert.deepStrictEqual(result, {
			payload: {
				data: mockPointOfInterest,
			},
			status: HTTPCode.CREATED,
		});
	});

	it("findAll should return nearby points of interest when location provided", async () => {
		const pointsOfInterest = [mockPointOfInterest];
		const RADIUS_IN_KM = 5;

		const mockFindAll: PointsOfInterestService["findAll"] = (
			options: null | PointsOfInterestQueryRequest,
		) => {
			assert.ok(options, "Options should be defined");
			assert.strictEqual(Number(options.latitude), TEST_LATITUDE);
			assert.strictEqual(Number(options.longitude), TEST_LONGITUDE);
			assert.strictEqual(Number(options.radius), RADIUS_IN_KM);

			return Promise.resolve({ items: pointsOfInterest });
		};

		const pointsOfInterestService = {
			findAll: mockFindAll,
		} as PointsOfInterestService;

		const pointsOfInterestController = new PointsOfInterestController(
			mockLogger,
			pointsOfInterestService,
		);

		const result = await pointsOfInterestController.findAll({
			body: {},
			params: {},
			query: {
				latitude: TEST_LATITUDE,
				longitude: TEST_LONGITUDE,
				radius: 5,
			},
			user: null,
		});

		assert.deepStrictEqual(result, {
			payload: {
				data: pointsOfInterest,
			},
			status: HTTPCode.OK,
		});
	});

	it("find should return point of interest by id", async () => {
		const mockFind: PointsOfInterestService["findById"] = () => {
			return Promise.resolve(mockPointOfInterest);
		};

		const pointsOfInterestService = {
			findById: mockFind,
		} as PointsOfInterestService;

		const pointsOfInterestController = new PointsOfInterestController(
			mockLogger,
			pointsOfInterestService,
		);

		const result = await pointsOfInterestController.findById({
			body: {},
			params: { id: "1" },
			query: {},
			user: null,
		});

		assert.deepStrictEqual(result, {
			payload: {
				data: mockPointOfInterest,
			},
			status: HTTPCode.OK,
		});
	});

	it("should return points of interest searched by name", async () => {
		const pointsOfInterest = [mockPointOfInterest];
		const TEST_NAME = "Point Of Interest Test Name";

		const mockFindAll: PointsOfInterestService["findAll"] = (
			options: null | PointsOfInterestQueryRequest,
		) => {
			assert.ok(options, "Options should be defined");
			assert.strictEqual(options.name, TEST_NAME);

			const filtered = pointsOfInterest.filter((poi) =>
				poi.name.toLowerCase().includes(options.name?.toLowerCase() ?? ""),
			);

			return Promise.resolve({ items: filtered });
		};

		const pointsOfInterestService = {
			findAll: mockFindAll,
		} as PointsOfInterestService;

		const pointsOfInterestController = new PointsOfInterestController(
			mockLogger,
			pointsOfInterestService,
		);

		const result = await pointsOfInterestController.findAll({
			body: {},
			params: {},
			query: {
				name: TEST_NAME,
			},
			user: null,
		});

		assert.deepStrictEqual(result, {
			payload: {
				data: pointsOfInterest,
			},
			status: HTTPCode.OK,
		});
	});

	it("update should return updated point of interest", async () => {
		const updatedPointOfInterest = {
			...mockPointOfInterest,
			name: "Updated Point Of Interest Test Name",
		};

		const mockUpdate: PointsOfInterestService["patch"] = () => {
			return Promise.resolve(updatedPointOfInterest);
		};

		const pointsOfInterestService = {
			patch: mockUpdate,
		} as PointsOfInterestService;

		const pointsOfInterestController = new PointsOfInterestController(
			mockLogger,
			pointsOfInterestService,
		);

		const result = await pointsOfInterestController.patch({
			body: {
				description: updatedPointOfInterest.description,
				location: updatedPointOfInterest.location,
				name: updatedPointOfInterest.name,
			},
			params: { id: "1" },
			query: {},
			user: null,
		});

		assert.deepStrictEqual(result, {
			payload: {
				data: updatedPointOfInterest,
			},
			status: HTTPCode.OK,
		});
	});

	it("delete should return deletion status", async () => {
		const pointsOfInterestService = {
			delete: mockDelete,
		} as PointsOfInterestService;

		const pointsOfInterestController = new PointsOfInterestController(
			mockLogger,
			pointsOfInterestService,
		);

		const result = await pointsOfInterestController.delete({
			body: {},
			params: { id: "1" },
			query: {},
			user: null,
		});

		assert.deepStrictEqual(result, {
			payload: {
				data: true,
			},
			status: HTTPCode.OK,
		});
	});

	it("findAll should return paginated points of interest when page and perPage provided", async () => {
		const mockPoints = [
			{
				createdAt: "2025-08-14T00:00:00Z",
				description: "Point Of Interest Test Description 1",
				id: 1,
				location: {
					coordinates: TEST_COORDINATES,
					type: "Point" as const,
				},
				name: "Point 1",
			},
			{
				createdAt: "2025-08-15T00:00:00Z",
				description: "Point Of Interest Test Description 2",
				id: 2,
				location: {
					coordinates: TEST_COORDINATES,
					type: "Point" as const,
				},
				name: "Point 2",
			},
			{
				createdAt: "2025-08-16T00:00:00Z",
				description: "Point Of Interest Test Description 3",
				id: 3,
				location: {
					coordinates: TEST_COORDINATES,
					type: "Point" as const,
				},
				name: "Point 3",
			},
		];

		const mockFindPaginated: PointsOfInterestService["findPaginated"] = (
			options,
		) => {
			assert.ok(options, "Options should be defined");
			assert.strictEqual(options.page, 1);
			assert.strictEqual(options.perPage, 10);

			return Promise.resolve({
				data: mockPoints,
				meta: {
					currentPage: 1,
					itemsPerPage: 10,
					total: mockPoints.length,
					totalPages: 1,
				},
			});
		};

		const pointsOfInterestService = {
			findPaginated: mockFindPaginated,
		} as PointsOfInterestService;

		const controller = new PointsOfInterestController(
			mockLogger,
			pointsOfInterestService,
		);

		const result = await controller.findAll({
			body: {},
			params: {},
			query: { page: 1, perPage: 10 },
			user: null,
		});

		const expected = {
			payload: {
				data: {
					data: mockPoints,
					meta: {
						currentPage: 1,
						itemsPerPage: 10,
						total: mockPoints.length,
						totalPages: 1,
					},
				},
			},
			status: HTTPCode.OK,
		};

		assert.deepStrictEqual(result, expected);
	});

	it("findAll should return paginated points of interest with search parameter", async () => {
		const mockPoints = [
			{
				createdAt: "2025-08-14T00:00:00Z",
				description: "Point Of Interest Test Description 1",
				id: 1,
				location: {
					coordinates: TEST_COORDINATES,
					type: "Point" as const,
				},
				name: "Central Park",
			},
		];

		const mockFindPaginated: PointsOfInterestService["findPaginated"] = (
			options,
		) => {
			assert.ok(options, "Options should be defined");
			assert.strictEqual(options.page, 1);
			assert.strictEqual(options.perPage, 10);
			assert.strictEqual(options.search, "Central");

			return Promise.resolve({
				data: mockPoints,
				meta: {
					currentPage: 1,
					itemsPerPage: 10,
					total: mockPoints.length,
					totalPages: 1,
				},
			});
		};

		const pointsOfInterestService = {
			findPaginated: mockFindPaginated,
		} as PointsOfInterestService;

		const controller = new PointsOfInterestController(
			mockLogger,
			pointsOfInterestService,
		);

		const result = await controller.findAll({
			body: {},
			params: {},
			query: { page: 1, perPage: 10, search: "Central" },
			user: null,
		});

		const expected = {
			payload: {
				data: {
					data: mockPoints,
					meta: {
						currentPage: 1,
						itemsPerPage: 10,
						total: mockPoints.length,
						totalPages: 1,
					},
				},
			},
			status: HTTPCode.OK,
		};

		assert.deepStrictEqual(result, expected);
	});
});
