import {
	DEGREE_TO_RAD,
	EARTH_RADIUS_KM,
	HALF,
	ONE,
	TWO,
} from "../constants/constants.js";

function getDistance(
	pointA: [number, number],
	pointB: [number, number],
): number {
	const [lat1, lon1] = pointA;
	const [lat2, lon2] = pointB;

	const dLat = (lat2 - lat1) * DEGREE_TO_RAD;
	const dLon = (lon2 - lon1) * DEGREE_TO_RAD;

	const a =
		Math.sin(dLat * HALF) ** TWO +
		Math.cos(lat1 * DEGREE_TO_RAD) *
			Math.cos(lat2 * DEGREE_TO_RAD) *
			Math.sin(dLon * HALF) ** TWO;
	const c = TWO * Math.atan2(Math.sqrt(a), Math.sqrt(ONE - a));

	return EARTH_RADIUS_KM * c;
}

export { getDistance };
