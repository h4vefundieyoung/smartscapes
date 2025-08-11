const APIPath = {
	AUTH: "/auth",
	NOTIFICATIONS: "/notifications",
	POINTS_OF_INTEREST: "/points-of-interest",
	REVIEWS: "/reviews",
	ROUTE_CATEGORIES: "/route-categories",
	ROUTES: "/routes",
	ROUTES_$ID: "/routes/*",
	USERS: "/users",
} as const;

export { APIPath };
