const AuthApiPath = {
	AUTHENTICATED_USER: "/authenticated-user",
	AUTHENTICATED_USER_$ID: "/authenticated-user/:id",
	AUTHENTICATED_USER_UPLOAD_AVATAR: "/authenticated-user/:id/upload/avatar",
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
} as const;

export { AuthApiPath };
