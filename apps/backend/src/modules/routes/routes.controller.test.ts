import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { HTTPCode } from "~/libs/enums/enums.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { RoutesController } from "./routes.controller.js";
import { type RoutesService } from "./routes.service.js";

describe("Routes controller", () => {
	const mockUser = {
		email: "null",
		firstName: "null",
		id: 1,
		lastName: "null",
	};
	const mockData = "mockData";
	const constructRouteMockData = {
		body: { pointsOfInterest: [] },
		params: null,
		query: null,
		user: mockUser,
	};
	const routesServiceMock = {
		construct: () => Promise.resolve(mockData),
	} as unknown as RoutesService;

	const mockLogger: Logger = {
		debug: () => {},
		error: () => {},
		info: () => {},
		warn: () => {},
	};

	const routesController = new RoutesController(mockLogger, routesServiceMock);

	it("Should return data with 200 status code", async () => {
		const { payload, status } = await routesController.constructRoute(
			constructRouteMockData,
		);

		assert.equal(status, HTTPCode.OK);
		assert.equal(payload.data, mockData);
	});
});
