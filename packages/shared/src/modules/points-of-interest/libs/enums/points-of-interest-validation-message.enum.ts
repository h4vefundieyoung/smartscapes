import { PointsOfInterestValidationRule } from "./points-of-interest-validation-rule.js";

const PointsOfInterestValidationMessage = {
	COORDS_REQUIRED_TOGETHER:
		"Both latitude and longitude must be provided together.",
	COORDS_REQUIRED_WITH_RADIUS:
		"Location coordinates are required when radius is provided.",
	DESCRIPTION_MAXIMUM_LENGTH: `Description must be less than ${String(PointsOfInterestValidationRule.DESCRIPTION_MAX_LENGTH)} characters long.`,
	INVALID_LOCATION_TYPE: "Location type must be 'Point'.",
	LOCATION_REQUIRED: "Location is required.",
	NAME_MAXIMUM_LENGTH: `Name must be less than ${String(PointsOfInterestValidationRule.NAME_MAX_LENGTH)} characters long.`,
	NAME_MINIMUM_LENGTH: `Name must be at least ${String(PointsOfInterestValidationRule.NAME_MIN_LENGTH)} characters long.`,
	PAGE_MUST_BE_GREATER_THAN_ZERO: "Page must be greater than 0.",
	PAGINATION_PARAMS_REQUIRED_TOGETHER:
		"Both page and perPage must be provided together.",
	PER_PAGE_MUST_BE_GREATER_THAN_ZERO: "Per page must be greater than 0.",
	RADIUS_MAX_KM: `Radius must be less than ${String(PointsOfInterestValidationRule.RADIUS_MAX_KM)} kilometers.`,
	RADIUS_MIN_KM: `Radius must be greater than ${String(PointsOfInterestValidationRule.RADIUS_MIN_KM)} kilometers.`,
	REQUIRED_FIELDS_FOR_UPDATE: "At least one field must be provided for update.",
} as const;

export { PointsOfInterestValidationMessage };
