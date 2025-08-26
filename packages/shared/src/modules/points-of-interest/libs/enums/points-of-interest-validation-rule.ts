const PointsOfInterestValidationRule = {
	DESCRIPTION_MAX_LENGTH: 8000,
	MIN_PAGE: 1,
	MIN_PER_PAGE: 1,
	NAME_MAX_LENGTH: 255,
	NAME_MIN_LENGTH: 3,
	RADIUS_MAX_KM: 50,
	RADIUS_MIN_KM: 0.1,
} as const;

export { PointsOfInterestValidationRule };
