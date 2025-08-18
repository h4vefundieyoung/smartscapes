const UserRouteExeptionMessage = {
	USER_ALREADY_ON_ACTIVE_STATUS: "User already on active status",
	USER_ROUTE_NOT_FOUND: "User route not found",
	USER_ROUTE_NOT_OWNED: "User route does not belong to the user",
	USER_ROUTE_WRONG_STATUS: "User route has wrong status for this operation",
} as const;

export { UserRouteExeptionMessage };
