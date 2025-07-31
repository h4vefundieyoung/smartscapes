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

	console.log("Fetching route from Mapbox:", url);

	try {
		const response = await fetch(url);
		console.log("Mapbox response status:", response.status);

		const data = (await response.json()) as MapboxResponse;
		console.log("Mapbox response data:", data);

		if (data.routes && data.routes.length > 0) {
			const coordinates = data.routes[0]?.geometry.coordinates ?? null;
			console.log(
				"Route coordinates retrieved:",
				coordinates?.length,
				"points",
			);
			return coordinates;
		}

		console.log("No routes found in response");
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
	console.log(
		"🗺️ BUILDING ROUTE: Creating simple direct route for",
		poisList.length,
		"POIs",
	);

	// Create a simple route connecting all POIs
	const simpleRoute: number[][] = [];
	for (const poi of poisList) {
		simpleRoute.push([poi.longitude, poi.latitude]);
		console.log(
			`📍 Adding POI: ${poi.name} at [${poi.longitude}, ${poi.latitude}]`,
		);
	}

	console.log("✅ ROUTE COMPLETE:", simpleRoute.length, "coordinate points");
	console.log("📊 Route data:", simpleRoute);
	return simpleRoute;
};
export { buildRouteCoordinates, createPopupContent };
