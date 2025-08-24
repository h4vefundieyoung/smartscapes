const FollowNotificationMessage = {
	NOTIFICATION: (firstName: string, lastName: string) =>
		`${firstName} ${lastName} started following you.`,
} as const;

export { FollowNotificationMessage };
