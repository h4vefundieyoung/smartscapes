const AuthExceptionMessage = {
	INVALID_CREDENTIALS: "Invalid credentials.",
	INVALID_HEADER: "Invalid or missing authrization header.",
	INVALID_TOKEN: "Invalid or expired token.",
	TOKEN_MISS_EXP: "Token payload is missing expiration date.",
	TOKEN_NOT_PROVIDED: "Token is not provided.",
	TOKEN_REVOKED: "Token is revoked.",
	UNAUTHORIZED_REQUEST: "Unauthorized.",
} as const;

export { AuthExceptionMessage };
