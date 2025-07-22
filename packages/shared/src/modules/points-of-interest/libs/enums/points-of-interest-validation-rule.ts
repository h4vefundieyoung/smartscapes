const PointsOfInterestValidationRule = {
	LATITUDE_MAXIMUM: 90,
	LATITUDE_MINIMUM: -90,
	LONGITUDE_MAXIMUM: 180,
	LONGITUDE_MINIMUM: -180,
	NAME_MAXIMUM_LENGTH: 255,
	NAME_MINIMUM_LENGTH: 3,
} as const;

export { PointsOfInterestValidationRule };
