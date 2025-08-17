import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { HTTPCode } from "~/libs/enums/enums.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

import { GroupEntity } from "../groups/group.entity.js";
import { PermissionEntity } from "../permission/permission.entity.js";
import { RouteController } from "./route.controller.js";
import { type RouteService } from "./route.service.js";

const mockPermission = PermissionEntity.initialize({
	id: 1,
	key: "READ",
	name: "Can read",
});

const mockGroup = GroupEntity.initializeWithPermissions({
	id: 2,
	key: "users",
	name: "Users",
	permissions: [mockPermission.toObject()],
}).toObject();

const mockDelete: RouteService["delete"] = () => {
	return Promise.resolve(true);
};

describe("Routes controller", () => {
	const mockUser = {
		email: "test@example.com",
		firstName: "John",
		group: mockGroup,
		groupId: 2,
		id: 1,
		isVisibleProfile: true,
		lastName: "Doe",
	};

	const mockLogger: Logger = {
		debug: () => {},
		error: () => {},
		info: () => {},
		warn: () => {},
	};

	const FIRST_POI_ID = 1;
	const SECOND_POI_ID = 2;
	const FIRST_VISIT_ORDER = 0;
	const SECOND_VISIT_ORDER = 1;

	const mockRoute = {
		description: "Test route description",
		id: FIRST_POI_ID,
		name: "Test Route",
		pois: [
			{ id: FIRST_POI_ID, visitOrder: FIRST_VISIT_ORDER },
			{ id: SECOND_POI_ID, visitOrder: SECOND_VISIT_ORDER },
		],
	};

	it("Should return data with 200 status code", async () => {
		const mockData = "mockData";
		const constructRouteMockData = {
			body: { pointsOfInterest: [] },
			params: null,
			query: null,
			user: mockUser,
		};
		const routesServiceMock = {
			construct: () => Promise.resolve(mockData),
		} as unknown as RouteService;
		const controller = new RouteController(mockLogger, routesServiceMock);

		const { payload, status } = await controller.constructRoute(
			constructRouteMockData,
		);

		assert.equal(status, HTTPCode.OK);
		assert.equal(payload.data, mockData);
	});

	it("create should return created route", async () => {
		const mockCreate: RouteService["create"] = () => {
			return Promise.resolve(mockRoute);
		};

		const routesService = {
			create: mockCreate,
		} as RouteService;

		const controller = new RouteController(mockLogger, routesService);

		const result = await controller.create({
			body: {
				description: mockRoute.description,
				name: mockRoute.name,
				pois: [FIRST_POI_ID, SECOND_POI_ID],
			},
			params: {},
			query: {},
			user: mockUser,
		});

		assert.deepStrictEqual(result, {
			payload: { data: mockRoute },
			status: HTTPCode.CREATED,
		});
	});

	it("find should return route by id", async () => {
		const mockFind: RouteService["findById"] = () => {
			return Promise.resolve(mockRoute);
		};

		const routesService = {
			findById: mockFind,
		} as RouteService;

		const controller = new RouteController(mockLogger, routesService);

		const result = await controller.findById({
			body: {},
			params: { id: "1" },
			query: {},
			user: mockUser,
		});

		assert.deepStrictEqual(result, {
			payload: { data: mockRoute },
			status: HTTPCode.OK,
		});
	});

	it("findAll should return all routes if query is not provided", async () => {
		const mockFindAll: RouteService["findAll"] = () => {
			return Promise.resolve({ items: [mockRoute] });
		};

		const routesService = {
			findAll: mockFindAll,
		} as RouteService;

		const controller = new RouteController(mockLogger, routesService);

		const result = await controller.findAll({
			body: {},
			params: {},
			query: {},
			user: mockUser,
		});

		assert.deepStrictEqual(result, {
			payload: { data: [mockRoute] },
			status: HTTPCode.OK,
		});
	});

	it("findAll should return response with routes matching search query", async () => {
		const mockFindAll: RouteService["findAll"] = () => {
			return Promise.resolve({ items: [mockRoute] });
		};

		const routesService = {
			findAll: mockFindAll,
		} as RouteService;

		const controller = new RouteController(mockLogger, routesService);

		const mockSearchQuery = mockRoute.name.toLowerCase();

		const result = await controller.findAll({
			body: {},
			params: {},
			query: { name: mockSearchQuery },
			user: mockUser,
		});

		assert.deepStrictEqual(result, {
			payload: { data: [mockRoute] },
			status: HTTPCode.OK,
		});
	});

	it("findAll should return response with empty array if no routes found", async () => {
		const routesService = {
			findAll: (() =>
				Promise.resolve({ items: [] })) as RouteService["findAll"],
		} as RouteService;

		const mockSearchQuery = "nonexistent";

		const controller = new RouteController(mockLogger, routesService);

		const result = await controller.findAll({
			body: {},
			params: {},
			query: { name: mockSearchQuery },
			user: mockUser,
		});

		assert.deepStrictEqual(result, {
			payload: { data: [] },
			status: HTTPCode.OK,
		});
	});

	it("update should return updated route", async () => {
		const updatedRoute = {
			...mockRoute,
			name: "Updated Route",
		};

		const mockUpdate: RouteService["patch"] = () => {
			return Promise.resolve(updatedRoute);
		};

		const routesService = {
			patch: mockUpdate,
		} as RouteService;

		const controller = new RouteController(mockLogger, routesService);

		const result = await controller.patch({
			body: {
				description: updatedRoute.description,
				name: updatedRoute.name,
			},
			params: { id: "1" },
			query: {},
			user: mockUser,
		});

		assert.deepStrictEqual(result, {
			payload: { data: updatedRoute },
			status: HTTPCode.OK,
		});
	});

	it("delete should return deletion status", async () => {
		const routesService = {
			delete: mockDelete,
		} as RouteService;

		const controller = new RouteController(mockLogger, routesService);

		const result = await controller.delete({
			body: {},
			params: { id: "1" },
			query: {},
			user: mockUser,
		});

		assert.deepStrictEqual(result, {
			payload: { data: true },
			status: HTTPCode.OK,
		});
	});
});
