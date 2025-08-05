import {
	HTTPCode,
	type PointsOfInterestResponseDto,
	type RoutesResponseDto,
} from "@smartscapes/shared";
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { type PointsOfInterestService } from "../points-of-interest/points-of-interest.service.js";
import { RoutesExceptionMessage } from "./libs/enums/routes-exception-message.enum.js";
import { RoutesError } from "./libs/exceptions/routes-error.exception.js";
import { type RoutesRepository } from "./routes.repository.js";
import { RoutesService } from "./routes.service.js";

const EXISTING_ID = 1;
const FIRST_POI_ID = 1;
const SECOND_POI_ID = 2;
const NON_EXISTENT_ID = 999;
const FIRST_COORDINATE = 30.5234;
const SECOND_COORDINATE = 50.4501;
const FIRST_VISIT_ORDER = 0;
const SECOND_VISIT_ORDER = 1;

describe("RoutesService", () => {
	const mockNotFoundError = new RoutesError({
		message: RoutesExceptionMessage.POI_NOT_FOUND,
		status: HTTPCode.NOT_FOUND,
	});
	const mockCreatePayload = {
		description: "Test route description",
		name: "Test Route",
		pois: [FIRST_POI_ID, SECOND_POI_ID],
	};

	const mockRouteResponse: RoutesResponseDto = {
		description: "Test route description",
		id: EXISTING_ID,
		name: "Test Route",
		pois: [
			{ id: FIRST_POI_ID, visitOrder: FIRST_VISIT_ORDER },
			{ id: SECOND_POI_ID, visitOrder: SECOND_VISIT_ORDER },
		],
	};

	const mockPoisFindAll: PointsOfInterestResponseDto[] = [
		{
			id: FIRST_POI_ID,
			location: {
				coordinates: [FIRST_COORDINATE, SECOND_COORDINATE],
				type: "Point",
			},
			name: "POI 1",
		},
		{
			id: SECOND_POI_ID,
			location: {
				coordinates: [SECOND_COORDINATE, FIRST_COORDINATE],
				type: "Point",
			},
			name: "POI 2",
		},
	];

	const mockPatchPayload = {
		description: "Updated description",
		name: "Updated Route",
	};

	const createMockRoutesRepository = (
		overrides = {},
	): Partial<RoutesRepository> => ({
		create: () => Promise.resolve(mockRouteResponse),
		delete: () => Promise.resolve(true),
		findAll: () => Promise.resolve([mockRouteResponse]),
		findById: () => Promise.resolve(mockRouteResponse),
		patch: () => Promise.resolve({ ...mockRouteResponse, ...mockPatchPayload }),
		...overrides,
	});

	const createMockPointsOfInterestService =
		(): Partial<PointsOfInterestService> => ({
			findAll: () =>
				Promise.resolve({
					items: mockPoisFindAll,
				}),
			findById: () =>
				Promise.resolve({
					createdAt: new Date().toISOString(),
					description: "Test POI description",
					id: FIRST_POI_ID,
					location: {
						coordinates: [FIRST_COORDINATE, SECOND_COORDINATE],
						type: "Point",
					},
					name: "Test POI",
				}),
		});

	it("create should return new route", async () => {
		const routesRepository = createMockRoutesRepository();
		const pointsOfInterestService = createMockPointsOfInterestService();
		const routesService = new RoutesService(
			routesRepository as RoutesRepository,
			pointsOfInterestService as PointsOfInterestService,
		);

		const result = await routesService.create(mockCreatePayload);

		assert.deepStrictEqual(result, mockRouteResponse);
	});

	it("findById should return route when it exists", async () => {
		const routesRepository = createMockRoutesRepository();
		const pointsOfInterestService = createMockPointsOfInterestService();
		const routesService = new RoutesService(
			routesRepository as RoutesRepository,
			pointsOfInterestService as PointsOfInterestService,
		);

		const result = await routesService.findById(EXISTING_ID);

		assert.deepStrictEqual(result, mockRouteResponse);
	});

	it("findById should return an error when route does not exist", async () => {
		const routesRepository = createMockRoutesRepository({
			findById: () => Promise.resolve(mockNotFoundError),
		});
		const pointsOfInterestService = createMockPointsOfInterestService();
		const routesService = new RoutesService(
			routesRepository as RoutesRepository,
			pointsOfInterestService as PointsOfInterestService,
		);

		const result = await routesService.findById(NON_EXISTENT_ID);

		assert.strictEqual(result, mockNotFoundError);
	});

	it("findAll should return all routes", async () => {
		const mockRoutes = [mockRouteResponse];
		const routesRepository = createMockRoutesRepository({
			findAll: () => Promise.resolve(mockRoutes),
		});
		const pointsOfInterestService = createMockPointsOfInterestService();
		const routesService = new RoutesService(
			routesRepository as RoutesRepository,
			pointsOfInterestService as PointsOfInterestService,
		);

		const result = await routesService.findAll();

		assert.deepStrictEqual(result, { items: mockRoutes });
	});

	it("findAll should return empty array when no routes exist", async () => {
		const routesRepository = createMockRoutesRepository({
			findAll: () => Promise.resolve([]),
		});
		const pointsOfInterestService = createMockPointsOfInterestService();
		const routesService = new RoutesService(
			routesRepository as RoutesRepository,
			pointsOfInterestService as PointsOfInterestService,
		);

		const result = await routesService.findAll();

		assert.deepStrictEqual(result, { items: [] });
	});

	it("patch should update existing route successfully", async () => {
		const updatedRoute = { ...mockRouteResponse, ...mockPatchPayload };
		const routesRepository = createMockRoutesRepository({
			patch: () => Promise.resolve(updatedRoute),
		});
		const pointsOfInterestService = createMockPointsOfInterestService();
		const routesService = new RoutesService(
			routesRepository as RoutesRepository,
			pointsOfInterestService as PointsOfInterestService,
		);

		const result = await routesService.patch(EXISTING_ID, mockPatchPayload);

		assert.deepStrictEqual(result, updatedRoute);
	});

	it("delete should delete existing route successfully", async () => {
		const routesRepository = createMockRoutesRepository();
		const pointsOfInterestService = createMockPointsOfInterestService();
		const routesService = new RoutesService(
			routesRepository as RoutesRepository,
			pointsOfInterestService as PointsOfInterestService,
		);

		const result = await routesService.delete(EXISTING_ID);

		assert.strictEqual(result, true);
	});

	it("delete should return null when trying to delete non-existent route", async () => {
		const routesRepository = createMockRoutesRepository({
			delete: () => Promise.resolve(null),
		});
		const pointsOfInterestService = createMockPointsOfInterestService();
		const routesService = new RoutesService(
			routesRepository as RoutesRepository,
			pointsOfInterestService as PointsOfInterestService,
		);

		const result = await routesService.delete(NON_EXISTENT_ID);

		assert.strictEqual(result, null);
	});

	it("ensurePoisExist should validate all POIs exist before creating route", async () => {
		const findByIdCalls: number[] = [FIRST_POI_ID, SECOND_POI_ID];
		const pointsOfInterestService = createMockPointsOfInterestService();
		const routesRepository = createMockRoutesRepository();
		const routesService = new RoutesService(
			routesRepository as RoutesRepository,
			pointsOfInterestService as PointsOfInterestService,
		);

		await routesService.create(mockCreatePayload);

		assert.deepStrictEqual(findByIdCalls, [FIRST_POI_ID, SECOND_POI_ID]);
	});
});
