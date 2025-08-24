const UserRouteApiPath = {
	$ID: "/:userId",
	FINISH: "/:userId/finish",
	GET_BY_ROUTE_ID: "/:userId/get-by-route-id",
	ROOT: "/",
	START: "/:userId/start",
} as const;

export { UserRouteApiPath };
