import { type PointsOfInterestResponseDto } from "~/modules/points-of-interest/libs/types/types.js";
import { type RoutesResponseDto } from "~/modules/routes/libs/types/types.js";

import { type RouteItem } from "../types/types.js";
import { sortRouteByDistance } from "./helpers.js";

const ONE = 1;

const mapAndSortRoutes = (
	routesData: RoutesResponseDto[],
	pois: PointsOfInterestResponseDto[],
	userCoordinates: [number, number],
): RouteItem[] => {
	const poiMap = new Map<number, { latitude: number; longitude: number }>();

	for (const poi of pois) {
		poiMap.set(poi.id, {
			latitude: poi.location.coordinates[0],
			longitude: poi.location.coordinates[ONE],
		});
	}

	const allRoutes: RouteItem[] = [];

	for (const route of routesData) {
		const startPOI = route.pois.find((point) => point.visitOrder === 0);
		const coordinates = startPOI ? (poiMap.get(startPOI.id) ?? null) : null;
		allRoutes.push({ ...route, startingPOICoordinates: coordinates });
	}

	const uniqueRoutesMap = new Map<number, RouteItem>();

	for (const route of allRoutes) {
		uniqueRoutesMap.set(route.id, route);
	}

	return sortRouteByDistance([...uniqueRoutesMap.values()], userCoordinates);
};

export { mapAndSortRoutes };
