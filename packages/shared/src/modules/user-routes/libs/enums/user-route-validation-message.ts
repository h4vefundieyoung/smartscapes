const UserRouteValidationMessage = {
	ACTUAL_GEOMETRY_REQUIRED: "Actual geometry is required.",
	INVALID_LOCATION_TYPE: "Location type must be 'LineString'.",
	ROUTE_ID_INVALID_TYPE: "Route id should be a number.",
	USER_ID_INVALID_TYPE: "User id should be a number.",
} as const;

export { UserRouteValidationMessage };
