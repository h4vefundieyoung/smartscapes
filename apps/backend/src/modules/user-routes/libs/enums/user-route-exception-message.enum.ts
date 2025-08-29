const UserRouteExeptionMessage = {
	INVALID_ID: "Invalid route id.",
	ROUTE_CANNOT_BE_FINISHED: "Route cannot be finished.",
	USER_ALREADY_ON_ACTIVE_STATUS: "User already on active status.",
	USER_ROUTE_ALREADY_EXISTS: "User route already exists.",
	USER_ROUTE_NOT_FOUND: "User route not found.",
	USER_ROUTE_NOT_OWNED: "User route does not belong to the user.",
} as const;

export { UserRouteExeptionMessage };
