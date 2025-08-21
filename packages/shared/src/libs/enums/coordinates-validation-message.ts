import { CoordinatesValidationRule } from "./coordinates-validation-rule.js";

const CoordinatesValidationMessage = {
	INVALID_COORDINATES: `Location must have at least ${String(CoordinatesValidationRule.MIN_COORDINATES_COUNT)} coordinates.`,
	INVALID_COORDINATES_TYPE: "Coordinates must be a tuple of two numbers.",
	INVALID_LATITUDE: "Latitude must be between -90 and 90.",
	INVALID_LOCATION_TYPE_LINE_STRING: "Location type must be 'LineString'.",
	INVALID_LOCATION_TYPE_POINT: "Location type must be 'Point'.",
	INVALID_LONGITUDE: "Longitude must be between -180 and 180.",
	LATITUDE_MAX: `Latitude must be less than or equal to ${String(CoordinatesValidationRule.LATITUDE_MAX)}.`,
	LATITUDE_MIN: `Latitude must be greater than or equal to ${String(CoordinatesValidationRule.LATITUDE_MIN)}.`,
	LONGITUDE_MAX: `Longitude must be less than or equal to ${String(CoordinatesValidationRule.LONGITUDE_MAX)}.`,
	LONGITUDE_MIN: `Longitude must be greater than or equal to ${String(CoordinatesValidationRule.LONGITUDE_MIN)}.`,
} as const;

export { CoordinatesValidationMessage };
