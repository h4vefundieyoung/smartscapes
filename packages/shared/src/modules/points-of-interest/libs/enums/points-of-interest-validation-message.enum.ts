import { PointsOfInterestValidationRule } from "./points-of-interest-validation-rule.js";

const PointsOfInterestValidationMessage = {
	LATITUDE_MAXIMUM: `Latitude must be less than ${String(PointsOfInterestValidationRule.LATITUDE_MAXIMUM)} degrees.`,
	LATITUDE_MINIMUM: `Latitude must be greater than ${String(PointsOfInterestValidationRule.LATITUDE_MINIMUM)} degrees.`,
	LONGITUDE_MAXIMUM: `Longitude must be less than ${String(PointsOfInterestValidationRule.LONGITUDE_MAXIMUM)} degrees.`,
	LONGITUDE_MINIMUM: `Longitude must be greater than ${String(PointsOfInterestValidationRule.LONGITUDE_MINIMUM)} degrees.`,
	NAME_MAXIMUM_LENGTH: `Name must be less than ${String(PointsOfInterestValidationRule.NAME_MAXIMUM_LENGTH)} characters long.`,
	NAME_MINIMUM_LENGTH: `Name must be at least ${String(PointsOfInterestValidationRule.NAME_MINIMUM_LENGTH)} characters long.`,
} as const;

export { PointsOfInterestValidationMessage };
