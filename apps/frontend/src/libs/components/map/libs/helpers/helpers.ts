import {
	MAPBOX_DIRECTIONS_BASE_URL,
	MAPBOX_WALKING_PROFILE,
	NEXT_POI_INDEX_OFFSET,
	ROUTE_COORDINATE_SLICE_START,
} from "../constants/constants.js";
import { type PointOfInterest } from "../types/types.js";

const FIRST_COORDINATE_INDEX = 0;
const SECOND_COORDINATE_INDEX = 1;

interface MapboxResponse {
	routes?: Array<{
		geometry: {
			coordinates: number[][];
		};
	}>;
}

const getRouteCoordinates = async (
	start: [number, number],
	end: [number, number],
): Promise<null | number[][]> => {
	const accessToken = import.meta.env["VITE_APP_MAPBOX_ACCESS_TOKEN"] as
		| string
		| undefined;

	if (!accessToken) {
		// eslint-disable-next-line no-console
		console.error("Mapbox access token is not configured");

		return null;
	}

	const url = `${MAPBOX_DIRECTIONS_BASE_URL}/${MAPBOX_WALKING_PROFILE}/${String(start[FIRST_COORDINATE_INDEX])},${String(start[SECOND_COORDINATE_INDEX])};${String(end[FIRST_COORDINATE_INDEX])},${String(end[SECOND_COORDINATE_INDEX])}?geometries=geojson&overview=full&steps=true&access_token=${accessToken}`;

	try {
		const response = await fetch(url);
		const data = (await response.json()) as MapboxResponse;

		if (data.routes && data.routes.length > 0) {
			return data.routes[0]?.geometry.coordinates ?? null;
		}

		return null;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error("Error fetching route coordinates:", error);

		return null;
	}
};

const createPopupContent = (name: string): string => {
	return `<h3 style="margin: 0; color: #1f2937;">${name}</h3>`;
};

const buildRouteCoordinates = async (
	poisList: PointOfInterest[],
): Promise<number[][]> => {
	const allRouteCoordinates: number[][] = [];

	for (
		let index = 0;
		index < poisList.length - NEXT_POI_INDEX_OFFSET;
		index += NEXT_POI_INDEX_OFFSET
	) {
		const currentPoi = poisList[index];
		const nextPoi = poisList[index + NEXT_POI_INDEX_OFFSET];

		if (!currentPoi || !nextPoi) {
			continue;
		}

		const start: [number, number] = [currentPoi.longitude, currentPoi.latitude];
		const end: [number, number] = [nextPoi.longitude, nextPoi.latitude];

		const routeCoordinates = await getRouteCoordinates(start, end);

		if (routeCoordinates) {
			if (allRouteCoordinates.length === 0) {
				allRouteCoordinates.push(...routeCoordinates);
			} else {
				allRouteCoordinates.push(
					...routeCoordinates.slice(ROUTE_COORDINATE_SLICE_START),
				);
			}
		} else {
			if (allRouteCoordinates.length === 0) {
				allRouteCoordinates.push(start);
			}

			allRouteCoordinates.push(end);
		}
	}

	return allRouteCoordinates;
};

export { buildRouteCoordinates, createPopupContent };
