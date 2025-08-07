const UserFollowsApiPath = {
	FOLLOW: "/:userId/followers",
	UNFOLLOW: "/:userId/followers/:id",
} as const;

export { UserFollowsApiPath };
