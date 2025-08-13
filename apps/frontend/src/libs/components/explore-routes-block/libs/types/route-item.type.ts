import { type RoutesResponseDto } from "~/modules/routes/libs/types/types.js";

type RouteItem = RoutesResponseDto & {
	startingPOICoords: null | { lat: number; lon: number };
};

export { type RouteItem };
