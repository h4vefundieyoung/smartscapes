const CoordinatesValidationRule = {
	LATITUDE_MAX: 90,
	LATITUDE_MIN: -90,
	LONGITUDE_MAX: 180,
	LONGITUDE_MIN: -180,
	MIN_COORDINATES_COUNT: 1,
} as const;

export { CoordinatesValidationRule };
