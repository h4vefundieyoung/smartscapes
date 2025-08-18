const UserRouteValidationMessage = {
	INVALID_COORDINATES: "Location must have at least 2 coordinates.",
	INVALID_LOCATION_TYPE: "Location type must be a LineString.",
	INVALID_USER_ID: "User id should be a number.",
	ROUTE_ID_INVALID_TYPE: "Route id should be a number.",
	USER_ID_INVALID_TYPE: "User id should be a number.",
} as const;

export { UserRouteValidationMessage };
