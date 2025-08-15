import { type RoutesResponseDto } from "~/modules/routes/libs/types/types.js";

type RouteItem = RoutesResponseDto & {
	startingPOICoordinates: null | { latitude: number; longitude: number };
};

export { type RouteItem };
