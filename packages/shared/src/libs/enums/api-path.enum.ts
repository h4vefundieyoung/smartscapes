const APIPath = {
	AUTH: "/auth",
	CATEGORIES: "/categories",
	FILES: "/files",
	NOTIFICATIONS: "/notifications",
	POINTS_OF_INTEREST: "/points-of-interest",
	POINTS_OF_INTEREST_$ID: "/points-of-interest/:id",
	REVIEWS: "/reviews",
	ROUTES: "/routes",
	ROUTES_$ID: "/routes/:id",
	USERS: "/users",
} as const;

export { APIPath };
