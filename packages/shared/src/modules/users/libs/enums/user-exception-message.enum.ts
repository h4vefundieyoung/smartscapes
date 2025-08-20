const ExceptionMessage = {
	INVALID_CREDENTIALS: "Invalid credentials",
	USER_ALREADY_EXISTS: "A user with this email already exists",
	USER_NOT_FOUND: "User not found",
} as const;

export { ExceptionMessage as UserExceptionMessage };
