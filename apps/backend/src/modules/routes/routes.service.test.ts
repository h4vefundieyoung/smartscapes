import assert from "node:assert/strict";
import { describe, it, mock } from "node:test";

import { type MapBoxDirectionsApi } from "~/libs/modules/map-box/map-box-directions-api.js";

import { type PointsOfInterestService } from "../points-of-interest/points-of-interest.service.js";
import { RoutesError } from "./libs/exceptions/exceptions.js";
import { type Coordinate } from "./libs/types/types.js";
import { RoutesService } from "./routes.service.js";

describe("Routes service", () => {
	const numsMap = {
		"four": 4,
		"one": 1,
		"three": 3,
		"two": 2,
	};

	it("Should build mapbox route", async () => {
		const entitiesIds = [numsMap.one, numsMap.two];
		const entities = [
			{
				id: numsMap.one,
				location: { coordinates: [numsMap.one, numsMap.two] },
			},
			{
				id: numsMap.two,
				location: { coordinates: [numsMap.three, numsMap.four] },
			},
		];
		const getRoute = mock.fn((_: string, coords: Coordinate[]) =>
			Promise.resolve(coords),
		);
		const findAllById = mock.fn((ids: number[]) => {
			return Promise.resolve({
				items: entities.filter(({ id }) => ids.includes(id)),
			});
		});

		const poiServiceMock = {
			findAllById,
		} as unknown as PointsOfInterestService;

		const mapBoxApiMock = {
			getRoute,
		} as unknown as MapBoxDirectionsApi;

		const routeService = new RoutesService(mapBoxApiMock, poiServiceMock);
		const data = (await routeService.buildRoute([
			numsMap.one,
			numsMap.two,
		])) as unknown as [];

		assert.equal(findAllById.mock.callCount(), numsMap.one);
		assert.equal(getRoute.mock.callCount(), numsMap.one);
		assert.equal(Array.isArray(data), true);
		assert.equal(data.length, entitiesIds.length);
		assert.equal(
			data.toString(),
			entities
				.slice(0, numsMap.two)
				.map(({ location }) => location.coordinates)
				.toString(),
		);
	});

	it("Should throw error for unexisting id", () => {
		const entitiesIds = [numsMap.one, numsMap.two, numsMap.three];
		const entities = [
			{
				id: numsMap.one,
				location: { coordinates: [numsMap.one, numsMap.two] },
			},
		];
		const findAllById = mock.fn(
			async (ids: number[]) =>
				await Promise.resolve({
					items: entities.filter(({ id }) => ids.includes(id)),
				}),
		);

		const poiServiceMock = {
			findAllById,
		} as unknown as PointsOfInterestService;

		const mapBoxApiMock = {} as MapBoxDirectionsApi;

		const routeService = new RoutesService(mapBoxApiMock, poiServiceMock);

		assert.rejects(
			async () => await routeService.buildRoute(entitiesIds),
			RoutesError,
		);
	});
});
