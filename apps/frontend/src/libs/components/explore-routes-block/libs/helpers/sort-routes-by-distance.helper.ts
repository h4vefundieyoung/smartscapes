import { ONE } from "../constants/constants.js";
import { type RouteItem } from "../types/types.js";
import { getDistance } from "./get-distance.helper.js";

function sortRouteByDistance(
	routes: RouteItem[],
	referencePoint: [number, number],
): RouteItem[] {
	return [...routes].sort((a, b) => {
		if (!a.startingPOICoords) {
			return ONE;
		}

		if (!b.startingPOICoords) {
			return -ONE;
		}

		const distanceA = getDistance(referencePoint, [
			a.startingPOICoords.lat,
			a.startingPOICoords.lon,
		]);
		const distanceB = getDistance(referencePoint, [
			b.startingPOICoords.lat,
			b.startingPOICoords.lon,
		]);

		return distanceA - distanceB;
	});
}

export { sortRouteByDistance };
