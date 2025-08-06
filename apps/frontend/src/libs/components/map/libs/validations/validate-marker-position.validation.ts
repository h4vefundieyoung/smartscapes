import { MAP_PARAMETERS } from "../consts/consts.js";
import { type LngLatLike } from "../types/types.js";

const validateMarkerPosition = (
	position: LngLatLike,
): position is LngLatLike => {
	return (
		Array.isArray(position) &&
		position.length === MAP_PARAMETERS.COORDINATE_ARRAY_LENGTH &&
		position.every(
			(coordinate) =>
				typeof coordinate === "number" && Number.isFinite(coordinate),
		)
	);
};

export { validateMarkerPosition };
