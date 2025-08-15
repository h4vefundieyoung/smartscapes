import { type RouteItem } from "../types/types.js";
import { getDistance } from "./get-distance.helper.js";

const ONE = 1;

function sortRouteByDistance(
	routes: RouteItem[],
	referencePoint: [number, number],
): RouteItem[] {
	return [...routes].sort((a, b) => {
		if (!a.startingPOICoordinates) {
			return ONE;
		}

		if (!b.startingPOICoordinates) {
			return -ONE;
		}

		const distanceA = getDistance(referencePoint, [
			a.startingPOICoordinates.latitude,
			a.startingPOICoordinates.longitude,
		]);
		const distanceB = getDistance(referencePoint, [
			b.startingPOICoordinates.latitude,
			b.startingPOICoordinates.longitude,
		]);

		return distanceA - distanceB;
	});
}

export { sortRouteByDistance };
