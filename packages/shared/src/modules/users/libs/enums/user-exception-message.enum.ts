const UserExceptionMessage = {
	ALREADY_EXISTS: "A user with this email already exists",
	INVALID_CREDENTIALS: "Invalid credentials",
	NOT_FOUND: "User not found",
	USER_ALLREADY_EXISTS: "A user with this email already exists",
	USER_PROFILE_NOT_PUBLIC: "User profile are hidden by user",
} as const;

export { UserExceptionMessage };
