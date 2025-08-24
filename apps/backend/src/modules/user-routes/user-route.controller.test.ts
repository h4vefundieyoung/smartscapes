import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { type APIHandlerOptions } from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import {
	type UserRouteCreateRequestDto,
	type UserRouteParameters,
	type UserRoutePatchRequestDto,
	type UserRouteResponseDto,
} from "./libs/types/type.js";
import { UserRouteController } from "./user-route.controller.js";
import { type UserRouteService } from "./user-route.service.js";

describe("UserRouteController", () => {
	const mockUserRouteResponse: UserRouteResponseDto = {
		actualGeometry: {
			coordinates: [
				[30.528_909, 50.455_232],
				[30.528_209, 50.415_232],
			],
			type: "LineString",
		},
		completedAt: null,
		id: 1,
		plannedGeometry: {
			coordinates: [
				[30.528_909, 50.455_232],
				[30.528_209, 50.415_232],
			],
			type: "LineString",
		},
		routeId: 7,
		startedAt: null,
		status: "not_started",
		userId: 1,
	};

	const mockActiveUserRoute: UserRouteResponseDto = {
		...mockUserRouteResponse,
		id: 2,
		startedAt: "2025-08-21T16:37:51.437Z",
		status: "active",
	};

	const mockCompletedUserRoute: UserRouteResponseDto = {
		...mockUserRouteResponse,
		completedAt: "2025-08-21T16:38:11.183Z",
		id: 3,
		startedAt: "2025-08-21T16:37:51.437Z",
		status: "completed",
	};

	const mockLogger: Logger = {
		debug: () => {},
		error: () => {},
		info: () => {},
		warn: () => {},
	};

	const mockUserRouteService = {
		create: () => Promise.resolve(mockUserRouteResponse),
		finish: () => Promise.resolve(mockCompletedUserRoute),
		getAllByUserId: () =>
			Promise.resolve([
				mockUserRouteResponse,
				mockActiveUserRoute,
				mockCompletedUserRoute,
			]),
		getByRouteIdAndUserId: () => Promise.resolve(mockUserRouteResponse),
		start: () => Promise.resolve(mockActiveUserRoute),
	} as unknown as UserRouteService;

	const userRouteController = new UserRouteController(
		mockLogger,
		mockUserRouteService,
	);

	describe("create", () => {
		it("should create a new user route and return 201 status", async () => {
			const createRequest: UserRouteCreateRequestDto = {
				routeId: 7,
			};

			const parameters: UserRouteParameters = {
				userId: 1,
			};

			const options: APIHandlerOptions<{
				body: UserRouteCreateRequestDto;
				params: UserRouteParameters;
			}> = {
				body: createRequest,
				params: parameters,
			} as APIHandlerOptions<{
				body: UserRouteCreateRequestDto;
				params: UserRouteParameters;
			}>;

			const result = await userRouteController.create(options);

			assert.strictEqual(result.status, HTTPCode.CREATED);
			assert.deepStrictEqual(result.payload.data, mockUserRouteResponse);
			assert.strictEqual(result.payload.data.status, "not_started");
			assert.strictEqual(result.payload.data.startedAt, null);
			assert.strictEqual(result.payload.data.completedAt, null);
		});
	});

	describe("start", () => {
		it("should start a user route and return 200 status with active status", async () => {
			const startRequest: UserRouteCreateRequestDto = {
				routeId: 7,
			};

			const parameters: UserRouteParameters = {
				userId: 1,
			};

			const options: APIHandlerOptions<{
				body: UserRouteCreateRequestDto;
				params: UserRouteParameters;
			}> = {
				body: startRequest,
				params: parameters,
			} as APIHandlerOptions<{
				body: UserRouteCreateRequestDto;
				params: UserRouteParameters;
			}>;

			const result = await userRouteController.start(options);

			assert.strictEqual(result.status, HTTPCode.OK);
			assert.deepStrictEqual(result.payload.data, mockActiveUserRoute);
			assert.strictEqual(result.payload.data.status, "active");
			assert.strictEqual(
				result.payload.data.startedAt,
				"2025-08-21T16:37:51.437Z",
			);
			assert.strictEqual(result.payload.data.completedAt, null);
		});
	});

	describe("finish", () => {
		it("should finish a user route and return 200 status with completed status", async () => {
			const finishRequest: UserRoutePatchRequestDto = {
				actualGeometry: {
					coordinates: [
						[30.528_909, 50.455_232],
						[30.528_209, 50.415_232],
					],
					type: "LineString",
				},
				routeId: 7,
			};

			const parameters: UserRouteParameters = {
				userId: 1,
			};

			const options: APIHandlerOptions<{
				body: UserRoutePatchRequestDto;
				params: UserRouteParameters;
			}> = {
				body: finishRequest,
				params: parameters,
			} as APIHandlerOptions<{
				body: UserRoutePatchRequestDto;
				params: UserRouteParameters;
			}>;

			const result = await userRouteController.finish(options);

			assert.strictEqual(result.status, HTTPCode.OK);
			assert.deepStrictEqual(result.payload.data, mockCompletedUserRoute);
			assert.strictEqual(result.payload.data.status, "completed");
			assert.strictEqual(
				result.payload.data.startedAt,
				"2025-08-21T16:37:51.437Z",
			);
			assert.strictEqual(
				result.payload.data.completedAt,
				"2025-08-21T16:38:11.183Z",
			);
		});
	});

	describe("getAllByUserId", () => {
		it("should get all user routes and return 200 status with array of routes", async () => {
			const parameters: UserRouteParameters = {
				userId: 1,
			};

			const options: APIHandlerOptions<{
				params: UserRouteParameters;
			}> = {
				params: parameters,
			} as APIHandlerOptions<{
				params: UserRouteParameters;
			}>;

			const result = await userRouteController.getAllByUserId(options);

			assert.strictEqual(result.status, HTTPCode.OK);
			assert.strictEqual(Array.isArray(result.payload.data), true);
			assert.strictEqual(result.payload.data.length, 3);

			const [notStartedRoute, activeRoute, completedRoute] = result.payload
				.data as [
				UserRouteResponseDto,
				UserRouteResponseDto,
				UserRouteResponseDto,
			];

			assert.strictEqual(notStartedRoute.status, "not_started");
			assert.strictEqual(notStartedRoute.startedAt, null);
			assert.strictEqual(notStartedRoute.completedAt, null);

			assert.strictEqual(activeRoute.status, "active");
			assert.strictEqual(activeRoute.startedAt, "2025-08-21T16:37:51.437Z");
			assert.strictEqual(activeRoute.completedAt, null);

			assert.strictEqual(completedRoute.status, "completed");
			assert.strictEqual(completedRoute.startedAt, "2025-08-21T16:37:51.437Z");
			assert.strictEqual(
				completedRoute.completedAt,
				"2025-08-21T16:38:11.183Z",
			);
		});
	});

	describe("getByRouteIdAndUserId", () => {
		it("should get user route by route ID and user ID and return 200 status", async () => {
			const getRequest: UserRouteCreateRequestDto = {
				routeId: 7,
			};

			const parameters: UserRouteParameters = {
				userId: 1,
			};

			const options: APIHandlerOptions<{
				body: UserRouteCreateRequestDto;
				params: UserRouteParameters;
			}> = {
				body: getRequest,
				params: parameters,
			} as APIHandlerOptions<{
				body: UserRouteCreateRequestDto;
				params: UserRouteParameters;
			}>;

			const result = await userRouteController.getByRouteIdAndUserId(options);

			assert.strictEqual(result.status, HTTPCode.OK);
			assert.deepStrictEqual(result.payload.data, mockUserRouteResponse);
			assert.strictEqual(result.payload.data.routeId, getRequest.routeId);
			assert.strictEqual(result.payload.data.userId, parameters.userId);
		});
	});
});
