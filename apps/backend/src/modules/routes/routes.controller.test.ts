import assert from "node:assert/strict";
import { afterEach, describe, it, mock } from "node:test";

import { HTTPCode } from "~/libs/enums/enums.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { RoutesError } from "./libs/exceptions/exceptions.js";
import { RoutesController } from "./routes.controller.js";
import { type RoutesService } from "./routes.service.js";

describe("Routes controller", () => {
	const REQUESTS_PER_MINUTE = 5;
	const DEBOUNCING_RESET_TIMER = 60_000;
	const mockLogger: Logger = {
		debug: () => {},
		error: () => {},
		info: () => {},
		warn: () => {},
	};

	afterEach(() => {
		mock.timers.reset();
	});

	it("Should return data with 200 status code", async () => {
		const mockData = "mockData";
		const routesServiceMock = {
			buildRoute: () => Promise.resolve(mockData),
		} as unknown as RoutesService;
		const routesController = new RoutesController(
			mockLogger,
			routesServiceMock,
		);
		const { payload, status } = await routesController.constructRoute({
			body: { pointsOfInterest: [] },
			params: null,
			query: null,
			user: null,
		});

		assert.equal(status, HTTPCode.OK);
		assert.equal(payload.data, mockData);
	});

	it("Should debounce with error after 5 request", () => {
		const mockData = "mockData";
		const mockUser = {
			email: "ewqe@gmail.com",
			firstName: "ewqrq",
			id: -1,
			lastName: "dsadas",
		};
		const routesServiceMock = {
			buildRoute: () => Promise.resolve(mockData),
		} as unknown as RoutesService;

		mock.timers.enable();

		const routesController = new RoutesController(
			mockLogger,
			routesServiceMock,
		);
		const constructRouteMockData = {
			body: { pointsOfInterest: [] },
			params: null,
			query: null,
			user: mockUser,
		};

		for (let index = 0; index < REQUESTS_PER_MINUTE; index++) {
			routesController.constructRoute(constructRouteMockData);
		}

		assert.rejects(
			async () => await routesController.constructRoute(constructRouteMockData),
			RoutesError,
		);
	});

	it("Should update debouncing state once in a minute", async () => {
		const mockData = "mockData";
		const mockUser = {
			email: "ewqe@gmail.com",
			firstName: "ewqrq",
			id: -1,
			lastName: "dsadas",
		};
		const routesServiceMock = {
			buildRoute: () => Promise.resolve(mockData),
		} as unknown as RoutesService;

		mock.timers.enable();

		const routesController = new RoutesController(
			mockLogger,
			routesServiceMock,
		);
		const constructRouteMockData = {
			body: { pointsOfInterest: [] },
			params: null,
			query: null,
			user: mockUser,
		};

		for (let index = 0; index < REQUESTS_PER_MINUTE; index++) {
			routesController.constructRoute(constructRouteMockData);
		}

		mock.timers.tick(DEBOUNCING_RESET_TIMER);

		const { payload, status } = await routesController.constructRoute(
			constructRouteMockData,
		);
		assert.equal(status, HTTPCode.OK);
		assert.equal(payload.data, mockData);
	});
});
