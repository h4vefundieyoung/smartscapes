const UserExceptionMessage = {
	INVALID_CREDENTIALS: "Invalid credentials",
	USER_ALLREADY_EXISTS: "A user with this email already exists",
	USER_NOT_FOUND: "User not found",
	USER_PROFILE_NOT_PUBLIC: "User profile are hidden by user",
} as const;

export { UserExceptionMessage };
