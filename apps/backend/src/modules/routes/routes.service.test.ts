import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { HTTPCode } from "~/libs/modules/http/http.js";

import { type PointsOfInterestService } from "../points-of-interest/points-of-interest.service.js";
import { RoutesExceptionMessage } from "./libs/enums/routes-exception-message.enum.js";
import { type RoutesError } from "./libs/exceptions/point-of-interest.exception.js";
import { RouteEntity } from "./routes.entity.js";
import { type RoutesRepository } from "./routes.repository.js";
import { RoutesService } from "./routes.service.js";

const EXISTING_ID = 1;
const FIRST_POI_ID = 1;
const SECOND_POI_ID = 2;
const FIRST_VISIT_ORDER = 0;
const SECOND_VISIT_ORDER = 1;
const NON_EXISTENT_ID = 999;

describe("RoutesService", () => {
	const mockRoute: Parameters<typeof RouteEntity.initializeNew>[0] = {
		description: "Test route description",
		name: "Test Route",
		pois: [
			{ id: FIRST_POI_ID, visitOrder: FIRST_VISIT_ORDER },
			{ id: SECOND_POI_ID, visitOrder: SECOND_VISIT_ORDER },
		],
	};

	const createMockEntity = (): RouteEntity =>
		RouteEntity.initializeNew(mockRoute);

	it("create should return new route", async () => {
		const routeEntity = RouteEntity.initializeNew(mockRoute);

		const routesRepository = {
			create: (() =>
				Promise.resolve(routeEntity)) as RoutesRepository["create"],
		} as RoutesRepository;

		const pointsOfInterestService = {
			findById: ((id: number) =>
				Promise.resolve({
					createdAt: new Date().toISOString(),
					description: "Test POI description",
					id,
					name: "Test POI",
				})) as PointsOfInterestService["findById"],
		} as PointsOfInterestService;

		const routesService = new RoutesService(
			routesRepository,
			pointsOfInterestService,
		);

		const result = await routesService.create({
			description: mockRoute.description,
			name: mockRoute.name,
			pois: [FIRST_POI_ID, SECOND_POI_ID],
		});

		assert.deepStrictEqual(result, routeEntity.toObject());
	});

	it("create should throw error when POI does not exist", async () => {
		const routesRepository = {} as RoutesRepository;

		const pointsOfInterestService = {
			findById: (() =>
				Promise.reject(
					new Error("POI not found"),
				)) as PointsOfInterestService["findById"],
		} as PointsOfInterestService;

		const routesService = new RoutesService(
			routesRepository,
			pointsOfInterestService,
		);

		await assert.rejects(
			async () => {
				await routesService.create({
					description: mockRoute.description,
					name: mockRoute.name,
					pois: [NON_EXISTENT_ID],
				});
			},
			(error: RoutesError) => {
				assert.strictEqual(error.message, RoutesExceptionMessage.POI_NOT_FOUND);
				assert.strictEqual(error.status, HTTPCode.CONFLICT);

				return true;
			},
		);
	});

	it("findAll should return all routes", async () => {
		const routeEntity = createMockEntity();

		const routesRepository = {
			findAll: () => Promise.resolve([routeEntity]),
		} as RoutesRepository;

		const pointsOfInterestService = {} as PointsOfInterestService;

		const routesService = new RoutesService(
			routesRepository,
			pointsOfInterestService,
		);

		const result = await routesService.findAll();

		assert.deepStrictEqual(result, {
			items: [routeEntity.toObject()],
		});
	});

	it("find should return route by id", async () => {
		const routeEntity = createMockEntity();

		const routesRepository = {
			find: (() => Promise.resolve(routeEntity)) as RoutesRepository["find"],
		} as RoutesRepository;

		const pointsOfInterestService = {} as PointsOfInterestService;

		const routesService = new RoutesService(
			routesRepository,
			pointsOfInterestService,
		);

		const result = await routesService.find(EXISTING_ID);

		assert.deepStrictEqual(result, routeEntity.toObject());
	});

	it("find should return null when route not found", async () => {
		const routesRepository = {
			find: (() => Promise.resolve(null)) as RoutesRepository["find"],
		} as RoutesRepository;

		const pointsOfInterestService = {} as PointsOfInterestService;

		const routesService = new RoutesService(
			routesRepository,
			pointsOfInterestService,
		);

		const result = await routesService.find(NON_EXISTENT_ID);

		assert.strictEqual(result, null);
	});

	it("update should return updated route", async () => {
		const updatedRoute = {
			...mockRoute,
			name: "Updated Test Route",
		};
		const routeEntity = RouteEntity.initializeNew(updatedRoute);

		const routesRepository = {
			update: (() =>
				Promise.resolve(routeEntity)) as RoutesRepository["update"],
		} as RoutesRepository;

		const pointsOfInterestService = {
			findById: ((id: number) =>
				Promise.resolve({
					createdAt: new Date().toISOString(),
					description: "Test POI description",
					id,
					name: "Test POI",
				})) as PointsOfInterestService["findById"],
		} as PointsOfInterestService;

		const routesService = new RoutesService(
			routesRepository,
			pointsOfInterestService,
		);

		const result = await routesService.update(EXISTING_ID, {
			description: updatedRoute.description,
			name: updatedRoute.name,
			pois: [FIRST_POI_ID, SECOND_POI_ID],
		});

		assert.deepStrictEqual(result, routeEntity.toObject());
	});

	it("update should return null when route not found", async () => {
		const routesRepository = {
			update: (() => Promise.resolve(null)) as RoutesRepository["update"],
		} as RoutesRepository;

		const pointsOfInterestService = {
			findById: ((id: number) =>
				Promise.resolve({
					createdAt: new Date().toISOString(),
					description: "Test POI description",
					id,
					name: "Test POI",
				})) as PointsOfInterestService["findById"],
		} as PointsOfInterestService;

		const routesService = new RoutesService(
			routesRepository,
			pointsOfInterestService,
		);

		const result = await routesService.update(NON_EXISTENT_ID, {
			description: "Updated description",
			name: "Updated Test Route",
			pois: [FIRST_POI_ID, SECOND_POI_ID],
		});

		assert.strictEqual(result, null);
	});

	it("update should throw error when POI does not exist", async () => {
		const routesRepository = {} as RoutesRepository;

		const pointsOfInterestService = {
			findById: (() =>
				Promise.reject(
					new Error("POI not found"),
				)) as PointsOfInterestService["findById"],
		} as PointsOfInterestService;

		const routesService = new RoutesService(
			routesRepository,
			pointsOfInterestService,
		);

		await assert.rejects(
			async () => {
				await routesService.update(EXISTING_ID, {
					description: "Updated description",
					name: "Updated Test Route",
					pois: [NON_EXISTENT_ID],
				});
			},
			(error: RoutesError) => {
				assert.strictEqual(error.message, RoutesExceptionMessage.POI_NOT_FOUND);
				assert.strictEqual(error.status, HTTPCode.CONFLICT);

				return true;
			},
		);
	});

	it("delete should return true when route deleted", async () => {
		const routesRepository = {
			delete: (() => Promise.resolve(true)) as RoutesRepository["delete"],
		} as RoutesRepository;

		const pointsOfInterestService = {} as PointsOfInterestService;

		const routesService = new RoutesService(
			routesRepository,
			pointsOfInterestService,
		);

		const result = await routesService.delete(EXISTING_ID);

		assert.strictEqual(result, true);
	});

	it("delete should return false when route not found", async () => {
		const routesRepository = {
			delete: (() => Promise.resolve(false)) as RoutesRepository["delete"],
		} as RoutesRepository;

		const pointsOfInterestService = {} as PointsOfInterestService;

		const routesService = new RoutesService(
			routesRepository,
			pointsOfInterestService,
		);

		const result = await routesService.delete(NON_EXISTENT_ID);

		assert.strictEqual(result, false);
	});
});
