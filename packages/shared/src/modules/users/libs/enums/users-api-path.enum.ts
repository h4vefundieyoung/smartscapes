const UsersApiPath = {
	FOLLOW: "/:userId/followers/:id",
	ROOT: "/",
	UNFOLLOW: "/:userId/followers/:id",
} as const;

export { UsersApiPath };
