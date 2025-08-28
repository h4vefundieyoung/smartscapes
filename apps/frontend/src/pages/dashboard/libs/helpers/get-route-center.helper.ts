import { type Coordinates } from "~/libs/types/types.js";

const MIDDLE_INDEX_DIVISOR = 2;

const getRouteCenter = (
	coords: Coordinates[] | undefined,
): Coordinates | undefined => {
	if (!coords || coords.length === 0) {
		return undefined;
	}

	const middleIndex = Math.floor(coords.length / MIDDLE_INDEX_DIVISOR);

	return coords[middleIndex];
};

export { getRouteCenter };
