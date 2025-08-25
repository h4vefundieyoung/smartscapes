import { HTTPCode } from "@smartscapes/shared";
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { type RouteService } from "../routes/route.service.js";
import { UserRouteStatus } from "./libs/enums/enum.js";
import { UserRouteError } from "./libs/exceptions/exceptions.js";
import { UserRouteEntity } from "./user-route.entity.js";
import { type UserRouteRepository } from "./user-route.repository.js";
import { UserRouteService } from "./user-route.service.js";

describe("UserRouteService", () => {
	const mockGeometry = {
		coordinates: [
			[30.528_909, 50.455_232] as [number, number],
			[30.528_209, 50.415_232] as [number, number],
		],
		type: "LineString" as const,
	};

	const mockUserRoute = {
		actualGeometry: mockGeometry,
		completedAt: null,
		id: 1,
		plannedGeometry: mockGeometry,
		routeId: 7,
		startedAt: null,
		status: UserRouteStatus.NOT_STARTED,
		userId: 1,
	};

	const mockRouteService = {
		findById: () => Promise.resolve({ geometry: mockGeometry }),
	} as unknown as RouteService;

	const mockRepository = {
		create: () => Promise.resolve(UserRouteEntity.initialize(mockUserRoute)),
		findByFilter: (filters: unknown, options?: { multiple?: boolean }) =>
			options?.multiple
				? Promise.resolve([])
				: Promise.resolve(UserRouteEntity.initialize(mockUserRoute)),
		findMany: () => Promise.resolve([]),
		findOne: () => Promise.resolve(UserRouteEntity.initialize(mockUserRoute)),
		patch: () => Promise.resolve(UserRouteEntity.initialize(mockUserRoute)),
	} as unknown as UserRouteRepository;

	const service = new UserRouteService(mockRepository, mockRouteService);

	describe("create", () => {
		it("should create new user route", async () => {
			const payload = {
				routeId: 7,
				userId: 1,
			};

			const result = await service.create(payload);

			assert.strictEqual(result.routeId, payload.routeId);
			assert.strictEqual(result.userId, payload.userId);
			assert.strictEqual(result.status, UserRouteStatus.NOT_STARTED);
			assert.strictEqual(result.startedAt, null);
			assert.strictEqual(result.completedAt, null);
		});
	});

	describe("finish", () => {
		it("should finish user route", async () => {
			const payload = {
				actualGeometry: mockGeometry,
				routeId: 7,
				userId: 1,
			};

			const mockActiveRoute = Object.assign({}, mockUserRoute, {
				status: UserRouteStatus.ACTIVE,
			});

			const mockRepositoryWithActive = Object.assign({}, mockRepository, {
				findByFilter: (filters: unknown, options?: { multiple?: boolean }) =>
					options?.multiple
						? Promise.resolve([])
						: Promise.resolve(UserRouteEntity.initialize(mockActiveRoute)),
				findOne: () =>
					Promise.resolve(UserRouteEntity.initialize(mockActiveRoute)),
				patch: () =>
					Promise.resolve(
						UserRouteEntity.initialize(
							Object.assign({}, mockActiveRoute, {
								completedAt: "2025-08-21T16:38:11.183Z",
								status: UserRouteStatus.COMPLETED,
							}),
						),
					),
			}) as unknown as UserRouteRepository;

			const serviceWithActive = new UserRouteService(
				mockRepositoryWithActive,
				mockRouteService,
			);

			const result = await serviceWithActive.finish(payload);

			assert.strictEqual(result.routeId, payload.routeId);
			assert.strictEqual(result.userId, payload.userId);
			assert.strictEqual(result.status, UserRouteStatus.COMPLETED);
		});

		it("should throw error when route is not active", async () => {
			const payload = {
				actualGeometry: mockGeometry,
				routeId: 7,
				userId: 1,
			};

			const mockRepositoryWithInactive = Object.assign({}, mockRepository, {
				findByFilter: (filters: unknown, options?: { multiple?: boolean }) =>
					options?.multiple
						? Promise.resolve([])
						: Promise.resolve(UserRouteEntity.initialize(mockUserRoute)),
				findOne: () =>
					Promise.resolve(UserRouteEntity.initialize(mockUserRoute)),
			}) as unknown as UserRouteRepository;

			const serviceWithInactive = new UserRouteService(
				mockRepositoryWithInactive,
				mockRouteService,
			);

			await assert.rejects(async () => {
				await serviceWithInactive.finish(payload);
			}, UserRouteError);
		});
	});

	describe("getAllByUserId", () => {
		it("should get all routes for user", async () => {
			const mockRepositoryWithRoutes = Object.assign({}, mockRepository, {
				findByFilter: (filters: unknown, options?: { multiple?: boolean }) =>
					options?.multiple
						? Promise.resolve([UserRouteEntity.initialize(mockUserRoute)])
						: Promise.resolve(UserRouteEntity.initialize(mockUserRoute)),
				findMany: () =>
					Promise.resolve([UserRouteEntity.initialize(mockUserRoute)]),
			}) as unknown as UserRouteRepository;

			const serviceWithRoutes = new UserRouteService(
				mockRepositoryWithRoutes,
				mockRouteService,
			);

			const result = await serviceWithRoutes.getAllByUserId(1);

			assert.strictEqual(Array.isArray(result), true);
			assert.strictEqual(result.length, 1);
			assert.strictEqual(result[0]?.userId, 1);
		});
	});

	describe("deleteSavedRoute", () => {
		const USER_ROUTE_ID = 1;
		const USER_ID = 1;

		it("delete should delete existing route successfully", async () => {
			const mockUserRoutesRepository = Object.assign({}, mockRepository, {
				deleteSavedRoute: () => Promise.resolve(true),
			}) as unknown as UserRouteRepository;
			const mockUserRoutesService = new UserRouteService(
				mockUserRoutesRepository,
				mockRouteService,
			);

			const result = await mockUserRoutesService.deleteSavedRoute(
				USER_ROUTE_ID,
				USER_ROUTE_ID,
			);

			assert.strictEqual(result, true);
		});

		it("delete should throw an error when trying to delete non-existent route", async () => {
			const mockUserRoutesRepository = Object.assign({}, mockRepository, {
				deleteSavedRoute: () => Promise.resolve(false),
			}) as unknown as UserRouteRepository;
			const mockUserRoutesService = new UserRouteService(
				mockUserRoutesRepository,
				mockRouteService,
			);

			try {
				await mockUserRoutesService.deleteSavedRoute(USER_ROUTE_ID, USER_ID);
				assert.fail();
			} catch (error) {
				assert.equal(error instanceof UserRouteError, true);
				assert.equal((error as UserRouteError).status, HTTPCode.NOT_FOUND);
			}
		});
	});

	describe("start", () => {
		it("should start user route", async () => {
			const payload = {
				routeId: 7,
				userId: 1,
			};

			const mockRepositoryWithActive = Object.assign({}, mockRepository, {
				findByFilter: (filters: unknown, options?: { multiple?: boolean }) =>
					options?.multiple
						? Promise.resolve([])
						: Promise.resolve(UserRouteEntity.initialize(mockUserRoute)),
				findMany: () => Promise.resolve([]),
				findOne: () =>
					Promise.resolve(UserRouteEntity.initialize(mockUserRoute)),
				patch: () =>
					Promise.resolve(
						UserRouteEntity.initialize(
							Object.assign({}, mockUserRoute, {
								startedAt: "2025-08-21T16:37:51.437Z",
								status: UserRouteStatus.ACTIVE,
							}),
						),
					),
			}) as unknown as UserRouteRepository;

			const serviceWithActive = new UserRouteService(
				mockRepositoryWithActive,
				mockRouteService,
			);

			const result = await serviceWithActive.start(payload);

			assert.strictEqual(result.routeId, payload.routeId);
			assert.strictEqual(result.userId, payload.userId);
			assert.strictEqual(result.status, UserRouteStatus.ACTIVE);
		});

		it("should throw error when user already has active route", async () => {
			const payload = {
				routeId: 7,
				userId: 1,
			};

			const mockRepositoryWithActive = Object.assign({}, mockRepository, {
				findByFilter: (filters: unknown, options?: { multiple?: boolean }) =>
					options?.multiple
						? Promise.resolve([UserRouteEntity.initialize(mockUserRoute)])
						: Promise.resolve(UserRouteEntity.initialize(mockUserRoute)),
				findMany: () =>
					Promise.resolve([UserRouteEntity.initialize(mockUserRoute)]),
				findOne: () =>
					Promise.resolve(UserRouteEntity.initialize(mockUserRoute)),
			}) as unknown as UserRouteRepository;

			const serviceWithActive = new UserRouteService(
				mockRepositoryWithActive,
				mockRouteService,
			);

			await assert.rejects(async () => {
				await serviceWithActive.start(payload);
			}, UserRouteError);
		});
	});
});
